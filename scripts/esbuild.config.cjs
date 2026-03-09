const { version } = require('../package.json');

const banner = `/* @siposdani87/sui-js v${version} | BSD-3-Clause */`;

const shared = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify: true,
    sourcemap: true,
    banner: { js: banner },
};

const iife = {
    ...shared,
    format: 'iife',
    globalName: 'SUI',
    outfile: 'dist/sui.min.js',
};

const esm = {
    ...shared,
    format: 'esm',
    outfile: 'dist/sui.esm.js',
};

module.exports = { iife, esm, shared };
