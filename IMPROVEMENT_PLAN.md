# SUI-JS Comprehensive Improvement Plan

Based on a thorough exploration of the project at v1.2.0, here's a prioritized improvement plan across all dimensions.

## Completed Items (across all sections)

- **Build**: ESM bundle output, `exports`/`sideEffects` in package.json, license banner, gzip/brotli size reporting
- **Package**: Excluded source maps and plan files from npm publish
- **TypeScript**: Updated target to ES2020, moduleResolution to Bundler
- **Styles**: CSS custom properties (full theme token system: surface, on-surface, primary-action, error-text, overlay, shadow, etc.), `prefers-color-scheme` (existed), `prefers-reduced-motion`, `focus-visible` on buttons/inputs, logical properties (48+ conversions), dark mode consolidation (42 → 0 Dark.scss files eliminated, CSS ~76 KB from ~90 KB)
- **Animations**: Dialog/confirm fade+scale, flash slide-in, replaced undefined bounceInDown
- **Accessibility**: Escape key + focus trap + focus restoration in modals, ARIA on Viewer/Flash/Loader, `setSafeText()` XSS-safe method on Knot, expanded jest-axe tests (Loader/Flash/TabPanel/Viewer), color contrast audit with fixes (`$accent-text` → dark, `$error-default-light` → darker red)
- **Security**: `npm audit` in CI, cookie `SameSite=Lax`, `SECURITY.md`, XSS audit with `setHtml()` warning docs
- **Documentation**: README.md rewritten, migration guide (v1.1→v1.2), `CONTRIBUTING.md`
- **CI/CD**: Enhanced bundle size checks (JS + CSS + gzip + brotli)

---

## 1. Test Coverage

Coverage **exceeds configured thresholds** (statements 92.5% vs 91%, branches 80.5% vs 78%, functions 89.2% vs 88%, lines 92.4% vs 91%). **1,905 tests** across 109 suites.

| Action | Priority | Impact |
|--------|----------|--------|
| ~~Increase coverage for `operation.ts`, `knot.ts`~~ — knot branches 85%→93%, operation branches 79%→84% | P1 | Buffer above thresholds |
| ~~Increase coverage for largest files: `table.ts` (716 LOC)~~ — table branches 79.5%→84.6% | P1 | Buffer above thresholds |
| Increase coverage for `googleMap.ts` (1,359 LOC) — depends heavily on Maps mocking | P1 | Buffer above thresholds |
| ~~Increase branch coverage in `selectField.ts`, `colorField.ts`~~ — selectField branches 50.6%→74.7%, colorField functions 40%→100% | P1 | Biggest branch gaps |
| ~~Increase branch coverage in `baseField.ts`~~ — baseField branches 66.7%→76.3% | P1 | Remaining branch gaps |
| Increase branch coverage in `locationField.ts` — depends heavily on Maps mocking | P1 | Remaining branch gaps |
| ~~Add edge-case tests for `xhr.ts` (fetch error handling, abort, timeouts)~~ — 7 new tests for no Content-Type, pre-set headers | P1 | Security & correctness |
| ~~Add integration-style tests for `application.ts` DI container~~ — 25 new tests for DI, locale, getInstance, run modes | P1 | Core framework confidence |
| ~~Enable stricter test config (remove `strictNullChecks: false` from `tsconfig.spec.json`)~~ — removed `strictNullChecks: false` and `noImplicitAny: false` overrides; 21 spec files fixed | P2 | Catch more bugs in tests |

---

## 2. Bundle Size & Performance

Current: **~223 KB JS + ~76 KB CSS** (limit: 250 KB JS, 100 KB CSS). CSS reduced ~15% via dark mode elimination.

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Tree-shake `date-fns`**~~ — verified: named imports, centralized in `dateio.ts`, only 2 locales — already optimal | P1 | Already optimal |
| **Code-split Google Maps** — `googleMap.ts` (1,359 LOC) is the largest file; make it lazy/optional | P1 | ~15-20 KB savings for non-map users |
| ~~**Add gzip/brotli size reporting**~~ — `check-bundle-size.cjs` reports raw, gzip, and brotli sizes | P2 | Real-world size visibility |
| ~~**CSS purge analysis**~~ — dark mode elimination reduced CSS from ~90 KB to ~76 KB | P2 | ~15% CSS reduction |
| **Consider `terser`** — esbuild minification is fast but terser can squeeze ~5-10% more | P3 | Marginal gains |

---

## 3. Build System

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add ESM bundle output**~~ — `sui.esm.js` alongside `sui.min.js` (IIFE) | P1 | Modern bundler support |
| ~~**Move esbuild config to file**~~ — `scripts/esbuild.config.cjs` shared config, `scripts/esbuild.cjs` build, `scripts/esbuild-watch.cjs` watch, `scripts/esbuild-analyze.cjs` analyze | P2 | Maintainability |
| **CSS modules or CSS layers** — consider `@layer` for better cascade control | P3 | Style isolation |
| ~~**Source map optimization**~~ — already using external source maps (esbuild `sourcemap: true` = linked mode); maps excluded from npm publish via `files` field | P3 | Already optimal |
| **Add bundle visualization** — `esbuild:analyze` exists but no visual output | P3 | Developer experience |

---

## 4. TypeScript & Code Quality

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Reduce `any` usage**~~ — 22 `any` usages eliminated in table.ts, selectField.ts, canvas.ts, popupContainer.ts, state.ts; remaining ~151 are genuinely needed in utility/generic code | P2 | Type safety |
| ~~**Modernize `moduleResolution`**~~ — changed to `Bundler` | P2 | Better module semantics |
| ~~**Update `target` to ES2020+**~~ — changed to ES2020 | P2 | Cleaner output, smaller bundle |
| ~~**Split `operation.ts`**~~ — split 1,108 LOC into 7 focused modules: `comparison.ts`, `typeGuards.ts`, `iteration.ts`, `arrayOps.ts`, `objectOps.ts`, `stringOps.ts`, `domOps.ts`; `operation.ts` is now a barrel re-export (zero consumer changes) | P2 | Maintainability |
| **Split `googleMap.ts`** (1,359 LOC) — extract `MapMarker`, `MapPolygon`, `MapRoute` etc. | P2 | Maintainability |
| **Add `@typescript-eslint/strict-type-checked`** rules | P3 | Catch more issues |
| **Consider branded types** for IDs, URLs, coordinates | P3 | Domain safety |

---

## 5. Styles & Design System

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**CSS custom properties**~~ — full `--sui-*` token system: surface, on-surface, primary-action, error-text, overlay, shadow, etc. | P1 | Theme customization |
| ~~**Dark mode via `prefers-color-scheme`**~~ — media query + `.dark-theme` class + `.light-theme` opt-out, all via CSS custom properties | P2 | Better UX |
| ~~**Reduce dark mode duplication**~~ — ALL 42 Dark.scss files eliminated; CSS custom properties auto-switch light/dark | P1 | 100% fewer Dark files, ~15% CSS reduction |
| ~~**Add focus-visible**~~ — `:focus-visible` on buttons, inputs, checkboxes, radios, switches, icon toggles | P2 | Accessibility |
| ~~**Logical properties**~~ — 48+ conversions across 27 SCSS files | P3 | Internationalization |
| **Container queries** — for component-level responsive design | P3 | Modern CSS |
| ~~**Reduce z-index scale**~~ — normalized from 95-150+999 to 10-110 scale with 16 named tokens; eliminated hardcoded `999` values | P3 | Maintainability |

---

## 6. Animations & Transitions

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**`prefers-reduced-motion`**~~ — added to `_base.scss`, disables all animations/transitions | P1 | Accessibility |
| ~~**Standardize transitions**~~ — verified: all transitions use `$transition-fast/base/slow` tokens consistently | P2 | Polish |
| ~~**Add subtle micro-interactions**~~ — button `:active` press, field `:focus-visible` ring | P2 | UX quality |
| ~~**Dialog/modal animations**~~ — fade + scale on open/close | P2 | Polish |
| ~~**Flash/toast animations**~~ — slide-in via `flash-slide-in` keyframes | P2 | Polish |
| **Use `will-change`** sparingly for known animated elements | P3 | Performance |
| **Consider CSS `@starting-style`** for entry animations | P3 | Modern CSS |

---

## 7. Accessibility

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Audit ARIA roles**~~ — dialog, alertdialog, navigation, tablist/tab/tabpanel, menu/menuitem, status, alert roles added | P1 | Compliance |
| ~~**Keyboard navigation**~~ — Escape key + focus trap + focus restoration in modals; Tab cycling in dialogs | P1 | WCAG 2.1 |
| ~~**Expand jest-axe tests**~~ — added axe checks for Loader, Flash, TabPanel, Viewer | P1 | Automated a11y |
| ~~**Color contrast audit**~~ — `$accent-text` changed to dark (7.16:1), `$error-default-light` uses `$red-dark` (≥4.6:1); remaining palette colors used as borders/backgrounds, not text | P2 | Compliance |
| ~~**Screen reader testing**~~ — `aria-live` on Flash container and Loader; `aria-modal`, `aria-labelledby` on Dialog/Confirm/Viewer | P2 | Assistive tech |
| ~~**Focus trap in modals**~~ — dialog, confirm, viewer trap focus with Tab cycling and restore on close | P1 | WCAG requirement |

---

## 8. Security

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add `npm audit` to CI**~~ — added to CI and publish workflows | P1 | Supply chain security |
| ~~**CSP-friendly code**~~ — audited `innerHTML`; added `setSafeText()` XSS-safe alternative, warning JSDoc on `setHtml()` | P1 | XSS prevention |
| ~~**Sanitize HTML insertion**~~ — `setSafeText()` uses `textContent`; `setHtml()` documented as unsafe for untrusted input | P1 | XSS prevention |
| ~~**Add `Subresource Integrity`**~~ — `npm run esbuild:sri` generates SHA-384 hashes for JS/CSS dist files, outputs `dist/sri-hashes.json` + example CDN tags | P2 | Integrity |
| ~~**Add `SECURITY.md`**~~ — vulnerability reporting policy added | P2 | Community trust |
| ~~**Cookie security**~~ — `SameSite=Lax` added to `cookie.ts` `set()` method | P2 | Cookie hardening |

---

## 9. Documentation & Docusaurus

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Update and improve `README.md`**~~ — rewritten with features, usage examples, badges | P1 | First impression & adoption |
| ~~**Migration guide**~~ — v1.1→v1.2 migration guide on Docusaurus site | P1 | User retention |
| ~~**API docs improvements**~~ — all public methods now have `@example` JSDoc tags; added examples to Xhr HTTP methods (post, put, patch, delete) | P2 | Usability |
| ~~**Add `CONTRIBUTING.md`**~~ — contribution guidelines, PR process | P2 | Community |
| **Blog posts** — write about architecture decisions, modernization journey | P3 | SEO & community |

---

## 10. Package & Distribution

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add `exports` map**~~ — types/import/default entries in `package.json` | P1 | Bundler compatibility |
| ~~**Exclude plan files from npm**~~ — `files` field limits to dist + src + styles | P1 | Smaller package |
| ~~**Add `sideEffects: false`**~~ — added to `package.json` | P1 | Smaller consumer bundles |
| ~~**Publish type declarations as separate entry**~~ — verified: `typings` + `exports["."].types` both point to `dist/index.d.ts` | P2 | TypeScript consumers |
| **Add `CHANGELOG` automation** — conventional commits + auto-changelog | P3 | Release process |

---

## 11. CI/CD & DevOps

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add bundle size diff**~~ — CI comments bundle size report on PRs via `scripts/bundle-size-diff.cjs` | P2 | Prevent bloat |
| **Add visual regression testing** — screenshot comparison for UI components | P2 | Style confidence |
| **Cache improvements** — cache sass compilation, TypeScript incremental builds | P3 | CI speed |

---

## 12. Obfuscation & IP Protection

| Action | Priority | Impact |
|--------|----------|--------|
| **esbuild already minifies** — variable names mangled, but structure visible | Info | — |
| **Consider `javascript-obfuscator`** for IIFE build only — adds control flow flattening, string encryption | P3 | IP protection |
| ~~**Exclude source maps from npm**~~ — `files` field excludes `*.map` | P2 | Don't ship debug info |
| ~~**License header injection**~~ — esbuild `--banner:js` adds BSD-3-Clause copyright | P3 | Legal |

---

## Recommended Execution Order

### Phase 1 — Stabilize & Package (COMPLETE)

1. ~~Add `npm audit` to CI~~
2. ~~Add `exports` and `sideEffects` to `package.json`~~
3. ~~Clean up published files (exclude plans, source maps)~~
4. ~~Update and improve `README.md`~~

### Phase 2 — Modernize Output (COMPLETE)

5. ~~Add ESM bundle output~~
6. ~~CSS custom properties for theming (unify light/dark)~~ (already existed)
7. ~~`prefers-reduced-motion` support~~
8. ~~Migration guide documentation~~

### Phase 3 — Quality & Polish (COMPLETE)

9. ~~Accessibility audit (ARIA, keyboard, focus trap)~~ — escape key, focus trap, focus restoration in modals; ARIA on Viewer, Flash, Loader; expanded jest-axe tests; color contrast fixes
10. Reduce `any` usage — deferred (most `any` is genuinely needed in utility/generic code)
11. Split large files (`googleMap.ts`, `operation.ts`) — deferred (high interdependency, risky refactor)
12. ~~Micro-interaction animations~~ — dialog/confirm fade+scale, flash slide-in, replaced undefined bounceInDown

### Phase 4 — Advanced (COMPLETE)

13. Visual regression tests — deferred (requires new dependency)
14. ~~Bundle size CI checks~~ — enhanced check-bundle-size.cjs to cover JS (IIFE + ESM) and CSS with separate limits
15. ~~Logical properties~~ — converted 48+ physical margin/padding/border/text-align to logical properties across 27 SCSS files
16. Obfuscation for IIFE builds — deferred (requires new dependency)
17. ~~Dark mode consolidation~~ — ALL 42 Dark.scss files eliminated via CSS custom property system; CSS ~90 KB → ~76 KB
18. ~~Color contrast audit~~ — `$accent-text` darkened (7.16:1), `$error-default-light` darkened (≥4.6:1)
