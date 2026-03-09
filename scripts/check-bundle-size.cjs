const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const JS_LIMIT_KB = 250;
const CSS_LIMIT_KB = 100;

const bundles = [
    { name: 'JS (IIFE)', path: 'dist/sui.min.js', limit: JS_LIMIT_KB },
    { name: 'JS (ESM)', path: 'dist/sui.esm.js', limit: JS_LIMIT_KB },
    { name: 'CSS', path: 'dist/sui.min.css', limit: CSS_LIMIT_KB },
];

let failed = false;

for (const bundle of bundles) {
    const fullPath = path.join(__dirname, '..', bundle.path);

    if (!fs.existsSync(fullPath)) {
        console.warn(`  SKIP ${bundle.name}: ${bundle.path} not found`);
        continue;
    }

    const content = fs.readFileSync(fullPath);
    const sizeKB = content.length / 1024;
    const gzipKB = zlib.gzipSync(content).length / 1024;
    const brotliKB = zlib.brotliCompressSync(content).length / 1024;

    const status = sizeKB > bundle.limit ? 'FAIL' : 'OK  ';
    const line = `  ${status} ${bundle.name}: ${sizeKB.toFixed(1)} KB | gzip: ${gzipKB.toFixed(1)} KB | brotli: ${brotliKB.toFixed(1)} KB (limit: ${bundle.limit} KB)`;

    if (sizeKB > bundle.limit) {
        console.error(line);
        failed = true;
    } else {
        console.log(line);
    }
}

if (failed) {
    process.exit(1);
}
