const esbuild = require('esbuild');
const { iife } = require('./esbuild.config.cjs');

async function watch() {
    const ctx = await esbuild.context({
        ...iife,
    });
    await ctx.watch();
    console.log('Watching for changes...');
}

watch().catch((err) => {
    console.error(err);
    process.exit(1);
});
