const sharp = require('sharp');
const fs = require('fs').promises; // Use promises version for async/await
const path = require('path');
const { glob } = require('glob'); // glob is a named export now
const rimraf = require('rimraf'); // rimraf is promise-based now

const imagesDir = 'public/images'; // Your source image directory
const optimizedDir = 'public/optimized-images'; // Where optimized images will go

const TARGET_WIDTHS = [1200, 900, 600, 300]; // Common widths for responsive images
const WEBP_QUALITY = 80; // Global quality setting for WebP (0-100, 80 is a good balance)

async function optimizeImages() {
  console.log('Starting image optimization...');

  // 1. Clean the optimized directory first to avoid stale files
  try {
    await rimraf(optimizedDir); // rimraf is Promise-based
    console.log(`Successfully cleaned ${optimizedDir}`);
  } catch (err: any) {
    console.warn(`Could not clean ${optimizedDir}: ${err.message}. Continuing anyway.`);
  }
  await fs.mkdir(optimizedDir, { recursive: true });

  // Find all png, jpg, jpeg files in the source directory and its subdirectories
  const files = glob.sync(`${imagesDir}/**/*.{png,jpg,jpeg}`);

  if (files.length === 0) {
    console.log('No PNG, JPG, or JPEG images found to optimize. Skipping.');
    return;
  }

  for (const file of files) {
    const { dir, name, ext } = path.parse(file); // Use path.parse
    const relativeDir = dir.replace(imagesDir, '');

    console.log(`Processing original image: ${file}`);

    let originalOptimizedCount = 0;

    try {
      const metadata = await sharp(file).metadata();
      if (!metadata.width || !metadata.height) {
        console.warn(`  - Could not get dimensions for ${file}, skipping all resizing for this file.`);
        continue;
      }

      for (const width of TARGET_WIDTHS) {
        const outputDir = path.join(optimizedDir, relativeDir); // Use path.join
        const outputPath = path.join(outputDir, `${name}-${width}w.webp`);

        if (width > 0 && width <= metadata.width) {
          try {
            await fs.mkdir(outputDir, { recursive: true });
            console.log(`  - Resizing and optimizing to ${width}px wide: ${outputPath}`);
            await sharp(file)
              .resize({ width: width })
              .webp({ quality: WEBP_QUALITY })
              .toFile(outputPath);
            originalOptimizedCount++;
          } catch (resizeError) {
            console.error(`  - Failed to create ${width}px WebP for ${file}:`, resizeError);
          }
        } else if (width > metadata.width) {
          console.log(`  - Skipping ${width}px for ${file} as it's larger than original width (${metadata.width}px).`);
        }
      }

      if (originalOptimizedCount > 0) {
        console.log(`  - Deleting original image: ${file}`);
        await fs.unlink(file);
      } else {
        console.log(`  - No WebP files were successfully created for ${file}. Original kept.`);
      }

    } catch (mainError) {
      console.error(`Error processing ${file}:`, mainError);
      console.log(`  - Original image ${file} kept due to processing error.`);
    }
  }
  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);