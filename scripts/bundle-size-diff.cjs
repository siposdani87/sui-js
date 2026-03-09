const fs = require('fs');
const { execFileSync } = require('child_process');
const zlib = require('zlib');

function getSize(filePath) {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath);
    return {
        raw: content.length,
        gzip: zlib.gzipSync(content).length,
    };
}

function formatKB(bytes) {
    return (bytes / 1024).toFixed(1);
}

function formatDiff(current, baseline) {
    if (!baseline) return 'new';
    const diff = current - baseline;
    if (diff === 0) return '±0';
    const sign = diff > 0 ? '+' : '';
    return `${sign}${formatKB(diff)} KB`;
}

const files = [
    { name: 'JS (IIFE)', path: 'dist/sui.min.js' },
    { name: 'JS (ESM)', path: 'dist/sui.esm.js' },
    { name: 'CSS', path: 'dist/sui.min.css' },
];

// Get current sizes
const current = {};
for (const file of files) {
    current[file.name] = getSize(file.path);
}

// Output markdown table
const lines = [
    '## Bundle Size Report\n',
    '| File | Raw | Gzip |',
    '|------|-----|------|',
];

for (const file of files) {
    const cur = current[file.name];
    if (!cur) continue;
    lines.push(
        `| ${file.name} | ${formatKB(cur.raw)} KB | ${formatKB(cur.gzip)} KB |`,
    );
}

const output = lines.join('\n');
console.log(output);

// Write to file for GitHub Actions step output
const outputFile = process.env.SIZE_REPORT_FILE;
if (outputFile) {
    fs.writeFileSync(outputFile, output);
}
