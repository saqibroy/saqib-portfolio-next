const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const { glob } = require('glob');
const rimraf = require('rimraf');

const imagesDir = 'public/images';
const optimizedDir = 'public/optimized-images';

// WebP-only configuration optimized for PNG and JPG sources
const TARGET_WIDTHS = [1920, 1200, 900, 600, 300];

// WebP-only format with adaptive quality based on source format
const WEBP_CONFIG = {
  png: {
    quality: 95,        // Higher quality for PNG sources (they're usually lossless)
    effort: 6,
    lossless: false,
    nearLossless: false,
    smartSubsample: true
  },
  jpg: {
    quality: 88,        // Slightly lower for JPG sources (already compressed)
    effort: 6,
    lossless: false,
    nearLossless: false,
    smartSubsample: true
  },
  default: {
    quality: 90,        // Default for other formats
    effort: 6,
    lossless: false,
    nearLossless: false,
    smartSubsample: true
  }
};

// Sharpening settings for better detail preservation
const SHARPEN_SETTINGS = {
  sigma: 1,
  flat: 1,
  jagged: 2
};

// Helper function to check if image has already been optimized
async function isImageOptimized(imagePath: any, outputDir: any, imageName: any) {
  try {
    // Check if WebP exists for the largest target width
    const largestWidth = Math.max(...TARGET_WIDTHS);
    const webpPath = path.join(outputDir, `${imageName}-${largestWidth}w.webp`);
    
    const webpExists = await fs.access(webpPath).then(() => true).catch(() => false);
    
    if (webpExists) {
      // Check if the source file is newer than the optimized files
      const sourceStats = await fs.stat(imagePath);
      const optimizedStats = await fs.stat(webpPath);
      
      // If source is newer, we need to re-optimize
      if (sourceStats.mtime > optimizedStats.mtime) {
        console.log(`  - Source file is newer than optimized versions, re-optimizing...`);
        return false;
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

async function optimizeImages() {
  console.log('Starting smart WebP-only optimization...');

  // Create optimized directory if it doesn't exist (but don't clean it)
  await fs.mkdir(optimizedDir, { recursive: true });

  const files = glob.sync(`${imagesDir}/**/*.{png,jpg,jpeg,webp,tiff,tif}`);

  if (files.length === 0) {
    console.log('No images found to optimize. Skipping.');
    return;
  }

  console.log(`Found ${files.length} images to check...`);
  
  let processedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    const { dir, name, ext } = path.parse(file);
    const relativeDir = dir.replace(imagesDir, '');

    console.log(`\nChecking: ${file}`);

    try {
      const outputDir = path.join(optimizedDir, relativeDir);
      await fs.mkdir(outputDir, { recursive: true });

      // Check if this image has already been optimized
      if (await isImageOptimized(file, outputDir, name)) {
        console.log(`  - ✅ Already optimized, skipping...`);
        skippedCount++;
        continue;
      }

      console.log(`  - 🔄 Processing to WebP...`);
      processedCount++;

      const metadata = await sharp(file).metadata();
      if (!metadata.width || !metadata.height) {
        console.warn(`  - Could not get dimensions for ${file}, skipping.`);
        continue;
      }

      // Determine source format for optimal WebP settings
      const sourceFormat = ext.toLowerCase().replace('.', '');
      const isPng = sourceFormat === 'png';
      const isJpg = sourceFormat === 'jpg' || sourceFormat === 'jpeg';
      
      // Select appropriate WebP config based on source format
      let webpConfig;
      if (isPng) {
        webpConfig = WEBP_CONFIG.png;
        console.log(`  - PNG source detected, using quality: ${webpConfig.quality}`);
      } else if (isJpg) {
        webpConfig = WEBP_CONFIG.jpg;
        console.log(`  - JPG source detected, using quality: ${webpConfig.quality}`);
      } else {
        webpConfig = WEBP_CONFIG.default;
        console.log(`  - ${sourceFormat.toUpperCase()} source detected, using quality: ${webpConfig.quality}`);
      }

      console.log(`  - Original: ${metadata.width}x${metadata.height}, ${Math.round((await fs.stat(file)).size / 1024)}KB`);

      // Process each target width
      for (const width of TARGET_WIDTHS) {
        if (width > metadata.width) {
          console.log(`  - Skipping ${width}px (larger than original ${metadata.width}px)`);
          continue;
        }

        // Calculate height to maintain aspect ratio
        const height = Math.round((metadata.height / metadata.width) * width);

        // Create sharp instance with quality settings
        const outputPath = path.join(outputDir, `${name}-${width}w.webp`);

        try {
          await sharp(file)
            .resize(width, height, {
              kernel: sharp.kernel.lanczos3, // High-quality resampling
              withoutEnlargement: true,
            })
            .sharpen(SHARPEN_SETTINGS) // Add sharpening to preserve detail
            .webp(webpConfig)
            .toFile(outputPath);
          
          const outputSize = Math.round((await fs.stat(outputPath)).size / 1024);
          console.log(`  - Created ${width}px WebP: ${outputSize}KB`);

        } catch (resizeError) {
          if (resizeError instanceof Error) {
            console.error(`  - Failed to create ${width}px WebP:`, resizeError.message);
          } else {
            console.error(`  - Failed to create ${width}px WebP:`, resizeError);
          }
        }
      }

      // Create a full-size optimized WebP version
      console.log(`  - Creating full-size WebP...`);
      const fullSizeOutputPath = path.join(outputDir, `${name}-original.webp`);
      
      try {
        // Use slightly higher quality for full-size versions
        const fullSizeConfig = {
          ...webpConfig,
          quality: Math.min(webpConfig.quality + 3, 100)
        };

        await sharp(file)
          .webp(fullSizeConfig)
          .toFile(fullSizeOutputPath);
        
        const outputSize = Math.round((await fs.stat(fullSizeOutputPath)).size / 1024);
        console.log(`  - Created original WebP: ${outputSize}KB`);

      } catch (formatError) {
        if (formatError instanceof Error) {
          console.error(`  - Failed to create original WebP:`, formatError.message);
        } else {
          console.error(`  - Failed to create original WebP:`, formatError);
        }
      }

      console.log(`  - ✅ WebP optimization complete!`);

    } catch (mainError) {
      console.error(`Error processing ${file}:`, mainError);
    }
  }

  console.log(`\n🎉 WebP-only optimization complete!`);
  console.log(`📊 Summary: ${processedCount} processed, ${skippedCount} skipped (already optimized)`);
  console.log('\nWebP optimization settings:');
  console.log('- PNG sources: 95% quality (preserves detail from lossless originals)');
  console.log('- JPG sources: 88% quality (optimal for already-compressed images)');
  console.log('- Other formats: 90% quality (balanced approach)');
  console.log('- All images: Smart subsampling + effort level 6 for best compression');
  console.log('\nOutput files generated:');
  console.log('- Multiple widths: image-name-300w.webp, image-name-600w.webp, etc.');
  console.log('- Full size: image-name-original.webp');
  console.log('\nNext.js usage example:');
  console.log(`import Image from 'next/image';
  
<Image
  src="/optimized-images/your-image-1200w.webp"
  alt="Description"
  width={1200}
  height={800}
  sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, 1200px"
  quality={95}
/>`);
}

// Helper function to generate Next.js Image component code
function generateNextImageCode(imageName: any, alt = 'Image description') {
  return `
// Next.js Image component with WebP optimization:
import Image from 'next/image';

<Image
  src="/optimized-images/${imageName}-1200w.webp"
  alt="${alt}"
  width={1200}
  height={800} // Adjust based on your aspect ratio
  sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, (max-width: 1200px) 1200px, 1920px"
  priority={false} // Set to true for above-the-fold images
  quality={95}
/>

// Or with responsive srcSet for manual control:
<img
  src="/optimized-images/${imageName}-1200w.webp"
  srcSet="/optimized-images/${imageName}-300w.webp 300w,
          /optimized-images/${imageName}-600w.webp 600w,
          /optimized-images/${imageName}-900w.webp 900w,
          /optimized-images/${imageName}-1200w.webp 1200w,
          /optimized-images/${imageName}-1920w.webp 1920w"
  sizes="(max-width: 300px) 300px, (max-width: 600px) 600px, (max-width: 900px) 900px, (max-width: 1200px) 1200px, 1920px"
  alt="${alt}"
  loading="lazy"
/>
`;
}

optimizeImages().catch(console.error);