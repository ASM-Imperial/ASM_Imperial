const fs = require('fs');
const path = require('path');

const customizeDir = './src/components/products/Customize';

// Get all product files (excluding Layer files, Template, and New files)
const files = fs.readdirSync(customizeDir).filter(f => 
  f.endsWith('.tsx') && 
  !f.includes('Layer') && 
  !f.includes('New') && 
  !f.includes('Template') &&
  !f.includes('ProductCustomizer') &&
  !f.includes('colorData1000')
);

const products = [];

files.forEach(file => {
  const filePath = path.join(customizeDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract product name from file name
  const productName = file.replace('.tsx', '');
  
  // Extract INITIAL_COLORS
  const colorsMatch = content.match(/INITIAL_COLORS[^{]*{([^}]+)}/s);
  if (!colorsMatch) {
    console.log(`Skipping ${file} - no INITIAL_COLORS found`);
    return;
  }
  
  // Extract layers
  const layersMatch = content.match(/layers\s*=\s*useMemo\(\(\)\s*=>\s*\[([\s\S]*?)\],\s*\[colors\]/);
  if (!layersMatch) {
    console.log(`Skipping ${file} - no layers found`);
    return;
  }
  
  // Extract layerNameList
  const nameListMatch = content.match(/layerNameList.*useState\(\[(.*?)\]\)/);
  if (!nameListMatch) {
    console.log(`Skipping ${file} - no layerNameList found`);
    return;
  }
  
  // Extract detail images
  const detailImagesMatch = content.match(/ProductDetailImages\/([\w]+)1\.webp/);
  const detailImageBase = detailImagesMatch ? detailImagesMatch[1] : productName.toLowerCase();
  
  // Parse colors
  const colorEntries = colorsMatch[1].match(/(\d+):\s*"(#[a-fA-F0-9]+)"/g) || [];
  const colors = {};
  colorEntries.forEach(entry => {
    const [, num, color] = entry.match(/(\d+):\s*"(#[a-fA-F0-9]+)"/);
    colors[parseInt(num)] = color;
  });
  
  // Parse layer paths
  const layerPaths = layersMatch[1].match(/src:\s*"([^"]+)"/g)?.map(m => m.match(/"([^"]+)"/)[1]) || [];
  
  // Parse layer names
  const names = nameListMatch[1].match(/"([^"]+)"/g)?.map(m => m.replace(/"/g, '')) || [];
  
  // Extract Layer component name
  const layerComponentMatch = content.match(/<(\w+Layer)\s+layers=/);
  const layerComponent = layerComponentMatch ? layerComponentMatch[1] : `${productName}Layer`;
  
  // Build layers config
  const layers = Object.keys(colors).map((key, index) => ({
    src: layerPaths[index] || `/layers/${productName}/${productName}${key}.png`,
    defaultColor: colors[key],
    defaultName: names[index] || `Layer ${key}`
  }));
  
  products.push({
    fileName: file,
    productName,
    layerComponent,
    layers,
    detailImageBase
  });
});

// Generate new files
products.forEach(product => {
  const newFileName = `${product.productName}New.tsx`;
  const newFilePath = path.join(customizeDir, newFileName);
  
  // Skip if file already exists
  if (fs.existsSync(newFilePath)) {
    console.log(`Skipping ${newFileName} - already exists`);
    return;
  }
  
  const layersString = product.layers.map(l => 
    `    { src: "${l.src}", defaultColor: "${l.defaultColor}", defaultName: "${l.defaultName}" },`
  ).join('\n');
  
  const displayName = product.productName.replace(/([A-Z])/g, ' $1').trim();
  
  const content = `import React from 'react';
import ProductCustomizer from './ProductCustomizer';
import ${product.layerComponent} from './${product.layerComponent}';
import colorDataA from '../../../../color.json';
import colorDataB from '../../../../colorb.json';
import colorDataC from '../../../../colorC.json';
import colorDataD from '../../../../colorD.json';
import colorDataE from '../../../../colorE.json';
import { colorData1000 } from './colorData1000';

const config = {
  name: "${displayName}",
  layers: [
${layersString}
  ],
  detailImages: [
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/${product.detailImageBase}1.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/${product.detailImageBase}2.webp',
    'https://pub-c2cf1f77f6a849c7a4b53fbc7d6573d1.r2.dev/ProductDetailImages/${product.detailImageBase}3.webp',
  ],
};

const ${product.productName}New: React.FC = () => (
  <ProductCustomizer
    config={config}
    colorData1000={colorData1000}
    colorData1200A={colorDataA}
    colorData1200B={colorDataB}
    colorData1200C={colorDataC}
    colorData1200D={colorDataD}
    colorData1200E={colorDataE}
    LayerComponent={${product.layerComponent}}
  />
);

export default ${product.productName}New;
`;
  
  fs.writeFileSync(newFilePath, content);
  console.log(`Created ${newFileName}`);
});

console.log(`\nTotal products processed: ${products.length}`);

