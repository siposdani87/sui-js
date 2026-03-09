const esbuild = require('esbuild');
const { iife, esm } = require('./esbuild.config.cjs');

async function build() {
    await esbuild.build(iife);
    await esbuild.build(esm);
}

build().catch((err) => {
    console.error(err);
    process.exit(1);
});
