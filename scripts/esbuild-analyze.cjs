const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const { iife } = require('./esbuild.config.cjs');

async function analyze() {
    const result = await esbuild.build({
        ...iife,
        sourcemap: false,
        metafile: true,
        outfile: 'dist/sui.analyze.js',
    });

    fs.writeFileSync('dist/meta.json', JSON.stringify(result.metafile));

    const output = result.metafile.outputs['dist/sui.analyze.js'];
    const totalKB = (output.bytes / 1024).toFixed(1);
    console.log(`\nBundle size: ${totalKB} KB\n`);
    console.log('Top 10 modules by size:');

    const sorted = Object.entries(output.inputs).sort(
        (a, b) => b[1].bytesInOutput - a[1].bytesInOutput,
    );

    sorted.slice(0, 10).forEach(([name, info]) => {
        console.log(
            `  ${(info.bytesInOutput / 1024).toFixed(1)} KB  ${name}`,
        );
    });

    console.log('');

    // Generate HTML visualization
    const textAnalysis = await esbuild.analyzeMetafile(result.metafile, {
        verbose: true,
    });

    const groups = {};
    for (const [name, info] of sorted) {
        const parts = name.replace(/^src\//, '').split('/');
        const group = parts.length > 1 ? parts[0] : 'root';
        if (!groups[group]) groups[group] = { bytes: 0, modules: [] };
        groups[group].bytes += info.bytesInOutput;
        groups[group].modules.push({ name, bytes: info.bytesInOutput });
    }

    const groupColors = {
        component: '#4f46e5',
        module: '#0891b2',
        field: '#059669',
        core: '#d97706',
        utils: '#7c3aed',
        root: '#6b7280',
        node_modules: '#dc2626',
    };

    const groupsSorted = Object.entries(groups).sort(
        (a, b) => b[1].bytes - a[1].bytes,
    );

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>SUI-JS Bundle Analysis</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; padding: 2rem; }
  h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
  .summary { color: #64748b; margin-bottom: 2rem; }
  .treemap { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 2rem; }
  .group { border-radius: 8px; padding: 12px; color: #fff; min-width: 80px; cursor: default; }
  .group h3 { font-size: 0.85rem; opacity: 0.9; }
  .group .size { font-size: 1.2rem; font-weight: 700; }
  .group .count { font-size: 0.75rem; opacity: 0.7; }
  table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
  th { background: #f1f5f9; text-align: left; padding: 8px 12px; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
  td { padding: 6px 12px; border-top: 1px solid #f1f5f9; font-size: 0.85rem; }
  .bar-cell { width: 40%; }
  .bar { height: 18px; border-radius: 3px; min-width: 2px; }
  .mono { font-family: ui-monospace, monospace; font-size: 0.8rem; }
</style>
</head>
<body>
<h1>SUI-JS Bundle Analysis</h1>
<p class="summary">Total: ${totalKB} KB &mdash; ${sorted.length} modules</p>
<div class="treemap">
${groupsSorted
    .map(([group, data]) => {
        const kb = (data.bytes / 1024).toFixed(1);
        const pct = ((data.bytes / output.bytes) * 100).toFixed(0);
        const color = groupColors[group] || '#6b7280';
        const width = Math.max(10, (data.bytes / output.bytes) * 100);
        return `  <div class="group" style="background:${color};flex:${width}"><h3>${group}/</h3><div class="size">${kb} KB</div><div class="count">${data.modules.length} files &middot; ${pct}%</div></div>`;
    })
    .join('\n')}
</div>
<table>
<thead><tr><th>Module</th><th style="width:90px">Size</th><th style="width:60px">%</th><th class="bar-cell">Chart</th></tr></thead>
<tbody>
${sorted
    .map(([name, info]) => {
        const kb = (info.bytesInOutput / 1024).toFixed(1);
        const pct = ((info.bytesInOutput / output.bytes) * 100).toFixed(1);
        const group = name.replace(/^src\//, '').split('/')[0];
        const color = groupColors[group] || '#6b7280';
        return `<tr><td class="mono">${name}</td><td>${kb} KB</td><td>${pct}%</td><td class="bar-cell"><div class="bar" style="width:${pct}%;background:${color}"></div></td></tr>`;
    })
    .join('\n')}
</tbody>
</table>
<details style="margin-top:2rem"><summary style="cursor:pointer;color:#64748b">Raw esbuild analysis</summary><pre style="margin-top:1rem;padding:1rem;background:#fff;border-radius:8px;overflow:auto;font-size:0.8rem">${textAnalysis}</pre></details>
</body>
</html>`;

    fs.writeFileSync('dist/bundle-report.html', html);
    console.log(
        `HTML report: ${path.resolve('dist/bundle-report.html')}\n`,
    );
}

analyze().catch((err) => {
    console.error(err);
    process.exit(1);
});
