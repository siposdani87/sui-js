# Website, Docs & Infrastructure Improvement Plan — COMPLETE

All items have been implemented.

## HIGH Priority — COMPLETE

| # | Issue | Status |
|---|-------|--------|
| 1A | **Remove 191 orphaned TypeDoc files** in `website/classes/`, `website/functions/`, `website/type-aliases/`, `website/variables/` | Done |
| 3A | **Update Dockerfile base images** — Node 20 → 24, nginx 1.23.3 → 1.27 | Done |
| 4A | **Add website build verification to CI** | Done |
| 4B | **Jenkinsfile already handles deployment** — no action needed | N/A |
| 5A | **Fix `.nvmrc`** — `20.10.0` → `24.0.0` | Done |

## MEDIUM Priority — COMPLETE

| # | Issue | Status |
|---|-------|--------|
| 1B | `onBrokenLinks: 'warn'` → `'throw'` | Done |
| 1C | Removed missing OG image reference, updated stale descriptions | Done |
| 1D | Fixed placeholder description, removed `markdown-page.md`, fixed `_blanck` typo, removed `Inc.` | Done |
| 1E | Updated `ai.txt` with correct deps and coverage numbers | Done |
| 3B | Dockerfile optimization: `--ignore-scripts`, only copy needed files | Done |
| 3F | `.dockerignore` expanded with proper exclusions | Done |
| 4C | `npm-publish.yml` now runs lint, test, and build before publish | Done |
| 5C | `.gitignore` now excludes `reports/` and orphaned TypeDoc dirs | Done |
| 5D | Nginx: added gzip, security headers, static asset caching | Done |

## LOW Priority — COMPLETE

| # | Issue | Status |
|---|-------|--------|
| 1F | Removed `/_next/` from `robots.txt` | Done |
| 1G | Added v1.0.0, v1.1.0, v1.2.0 release blog posts | Done |
| 1H | Homepage features grid: `col--4` → `col--3` for 4 items | Done |
| 3C | Added `EXPOSE 80` and `HEALTHCHECK` to Dockerfile | Done |
| 3D | Added `USER www-data` to run as non-root | Done |
| 4D | Added npm caching to CI and publish workflows | Done |
| 5B | Website `package.json` engines: `>=16.14` → `>=24.0.0` | Done |
