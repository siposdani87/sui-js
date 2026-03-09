const meta = require('../dist/meta.json');
const output = meta.outputs['dist/sui.analyze.js'];

console.log(`\nBundle size: ${(output.bytes / 1024).toFixed(1)} KB\n`);
console.log('Top 10 modules by size:');

Object.entries(output.inputs)
    .sort((a, b) => b[1].bytesInOutput - a[1].bytesInOutput)
    .slice(0, 10)
    .forEach(([name, info]) => {
        console.log(`  ${(info.bytesInOutput / 1024).toFixed(1)} KB  ${name}`);
    });

console.log('');
