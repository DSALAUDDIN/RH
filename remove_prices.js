const fs = require('fs');
const path = 'C:\\Users\\alauddin.mazumder.x\\OneDrive - Akij Venture Ltd\\Desktop\\alauddin\\RH\\src\\app\\treatments\\page.tsx';

let content = fs.readFileSync(path, 'utf8');

// Remove price field from interface
content = content.replace(/price\?:\s*string;\r?\n?/g, '');

// Remove price assignments from objects
// like: price: '৳1,000', or price: '৳4,000 – 8,000',
content = content.replace(/price:\s*'[^']+',?\s*/g, '');

// Remove the rendering of the price in category list
content = content.replace(/\{treatment\.price\s*&&\s*\(\s*<div className="tr-treatment-price"[\s\S]*?<\/div>\s*\)\}/g, '');

// Remove the rendering of the price in signature treatments
content = content.replace(/<span className="tr-bento-price"[\s\S]*?<\/span>/g, '');

fs.writeFileSync(path, content, 'utf8');
console.log('Prices removed successfully!');
