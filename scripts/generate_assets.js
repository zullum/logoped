const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../assets/images');
const OUTPUT_FILE = path.join(__dirname, '../app/(kid)/activities/picture-cards/assets.ts');

const EXCLUDED_DIRS = ['buttons', 'categories', '.DS_Store'];

function generateAssets() {
  const categories = fs.readdirSync(IMAGES_DIR).filter(file => {
    return fs.statSync(path.join(IMAGES_DIR, file)).isDirectory() && !EXCLUDED_DIRS.includes(file);
  });

  let output = `// This file is auto-generated. Do not edit manually.
import { ImageSourcePropType } from 'react-native';

export interface CategoryAsset {
  id: string;
  name: string;
  icon: ImageSourcePropType;
  items: { id: string; image: ImageSourcePropType }[];
}

export const ASSETS: Record<string, CategoryAsset> = {\n`;

  categories.forEach(category => {
    const categoryPath = path.join(IMAGES_DIR, category);
    const files = fs.readdirSync(categoryPath).filter(f => f.match(/\.(webp|png|jpg|jpeg)$/));
    
    // Check for category icon
    const iconPath = path.join(IMAGES_DIR, 'categories', `${category}.webp`);
    const hasIcon = fs.existsSync(iconPath);
    const iconRequire = hasIcon 
      ? `require('@assets/images/categories/${category}.webp')`
      : `require('@assets/images/categories/${category}.png')`; // Fallback attempt, though we saw webp

    output += `  '${category}': {\n`;
    output += `    id: '${category}',\n`;
    output += `    name: '${category}',\n`;
    output += `    icon: ${iconRequire},\n`;
    output += `    items: [\n`;

    files.forEach(file => {
      const itemId = path.parse(file).name;
      output += `      { id: '${itemId}', image: require('@assets/images/${category}/${file}') },\n`;
    });

    output += `    ]\n`;
    output += `  },\n`;
  });

  output += `};\n`;
  
  // Also export a list of categories for easy iteration
  output += `\nexport const CATEGORY_LIST = Object.keys(ASSETS);\n`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Assets generated at ${OUTPUT_FILE}`);
}

generateAssets();
