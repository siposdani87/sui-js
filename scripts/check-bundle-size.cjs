const fs = require('fs');
const path = require('path');

const LIMIT_KB = 250;
const bundlePath = path.join(__dirname, '..', 'dist', 'sui.min.js');

if (!fs.existsSync(bundlePath)) {
    console.error('Bundle not found at dist/sui.min.js — run "npm run esbuild" first.');
    process.exit(1);
}

const sizeBytes = fs.statSync(bundlePath).size;
const sizeKB = sizeBytes / 1024;

if (sizeKB > LIMIT_KB) {
    console.error(
        `Bundle size ${sizeKB.toFixed(1)} KB exceeds ${LIMIT_KB} KB limit.`,
    );
    process.exit(1);
} else {
    console.log(`Bundle size OK: ${sizeKB.toFixed(1)} KB (limit: ${LIMIT_KB} KB)`);
}
