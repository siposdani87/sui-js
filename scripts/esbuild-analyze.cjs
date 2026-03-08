const esbuild = require('esbuild');
const { iife } = require('./esbuild.config.cjs');

async function analyze() {
    const result = await esbuild.build({
        ...iife,
        sourcemap: false,
        metafile: true,
        outfile: 'dist/sui.analyze.js',
    });

    const fs = require('fs');
    fs.writeFileSync('dist/meta.json', JSON.stringify(result.metafile));

    const output = result.metafile.outputs['dist/sui.analyze.js'];
    console.log(`\nBundle size: ${(output.bytes / 1024).toFixed(1)} KB\n`);
    console.log('Top 10 modules by size:');

    Object.entries(output.inputs)
        .sort((a, b) => b[1].bytesInOutput - a[1].bytesInOutput)
        .slice(0, 10)
        .forEach(([name, info]) => {
            console.log(
                `  ${(info.bytesInOutput / 1024).toFixed(1)} KB  ${name}`,
            );
        });

    console.log('');
}

analyze().catch((err) => {
    console.error(err);
    process.exit(1);
});
