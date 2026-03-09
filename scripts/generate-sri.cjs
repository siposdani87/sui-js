const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

const files = ['sui.min.js', 'sui.esm.js', 'sui.min.css'];

console.log('\nSubresource Integrity (SRI) hashes:\n');

const hashes = {};
for (const file of files) {
    const filePath = path.join(distDir, file);
    if (!fs.existsSync(filePath)) {
        console.log(`  SKIP  ${file} (not found)`);
        continue;
    }
    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha384').update(content).digest('base64');
    const integrity = `sha384-${hash}`;
    hashes[file] = integrity;
    console.log(`  ${file}`);
    console.log(`  ${integrity}\n`);
}

// Write hashes to JSON file for programmatic use
const outputPath = path.join(distDir, 'sri-hashes.json');
fs.writeFileSync(outputPath, JSON.stringify(hashes, null, 2) + '\n');
console.log(`Hashes written to dist/sri-hashes.json\n`);

// Print example usage
const { version } = require('../package.json');
console.log('Example usage:\n');
if (hashes['sui.min.js']) {
    console.log(
        `<script src="https://cdn.jsdelivr.net/npm/@siposdani87/sui-js@${version}/dist/sui.min.js" integrity="${hashes['sui.min.js']}" crossorigin="anonymous"></script>\n`,
    );
}
if (hashes['sui.min.css']) {
    console.log(
        `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@siposdani87/sui-js@${version}/dist/sui.min.css" integrity="${hashes['sui.min.css']}" crossorigin="anonymous">\n`,
    );
}
