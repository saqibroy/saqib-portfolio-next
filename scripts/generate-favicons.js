const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16', size: 16 },
  { name: 'favicon-32x32', size: 32 },
  { name: 'apple-touch-icon', size: 180 },
  { name: 'android-chrome-192x192', size: 192 },
  { name: 'android-chrome-512x512', size: 512 },
];

async function generateFavicons() {
  const svgBuffer = fs.readFileSync(path.join(__dirname, '../public/favicon.svg'));
  
  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, `../public/${name}.png`));
    
    console.log(`Generated ${name}.png`);
  }

  // Generate Safari pinned tab SVG
  fs.copyFileSync(
    path.join(__dirname, '../public/favicon.svg'),
    path.join(__dirname, '../public/safari-pinned-tab.svg')
  );
  console.log('Generated safari-pinned-tab.svg');
}

generateFavicons().catch(console.error); 