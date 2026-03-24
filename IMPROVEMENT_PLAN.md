# SUI-JS Comprehensive Improvement Plan

Based on a thorough exploration of the project, updated at v2.0.3+. Covers all dimensions of the framework.

## Completed Items (across all sections)

- **Build**: ESM bundle output, `exports`/`sideEffects` in package.json, license banner, gzip/brotli size reporting, bundle visualization (`esbuild:analyze` → `dist/bundle-report.html`)
- **Package**: Excluded source maps and plan files from npm publish, SRI hash generation (`esbuild:sri`)
- **TypeScript**: Updated target to ES2020, moduleResolution to Bundler, strict type-checked ESLint rules (5 rules enabled), incremental builds with CI caching
- **Styles**: CSS custom properties (full theme token system), `prefers-color-scheme`, `prefers-reduced-motion`, `focus-visible` on buttons/inputs, logical properties (48+ conversions), dark mode consolidation (42 → 0 Dark.scss files, CSS ~90 KB → ~76 KB), z-index normalization (16 named tokens), `will-change` on animated elements, replaced remaining hardcoded colors with CSS custom properties (v2.0.2)
- **Animations**: Dialog/confirm fade+scale, flash slide-in, replaced undefined bounceInDown
- **Accessibility**: Escape key + focus trap + focus restoration in modals, ARIA on Viewer/Flash/Loader/Dropdown/Table/icon buttons, `setSafeText()` XSS-safe method on Knot, expanded jest-axe tests (48 a11y tests: Loader/Flash/TabPanel/Viewer/Table/Dialog/Confirm/Dropdown/Navigation/BaseField), color contrast audit with fixes
- **Security**: `npm audit` in CI, cookie `SameSite=Lax`, `SECURITY.md`, XSS audit with `setHtml()` warning docs, SRI hashes
- **Documentation**: README.md rewritten, migration guide (v1.1→v2.0 with v2.0.2/v2.0.3 breaking changes), `CONTRIBUTING.md`, release blog posts (v1.0.0, v1.1.0, v1.2.0), removed `@description` JSDoc tags for TypeDoc compatibility (v2.0.3), fixed all 20 TypeDoc warnings to 0, exported internal types (MarkerIcon, DateTimeConfig, EventCallback, XhrType)
- **CI/CD**: Enhanced bundle size checks (JS + CSS + gzip + brotli), bundle size diff on PRs, TypeScript incremental build caching, Playwright visual regression testing (6 tests)
- **Code Quality**: Split `operation.ts` (1,108 LOC → 7 focused modules), split `googleMap.ts` (1,359 LOC → 3 files: googleMap.ts 929 LOC + mapMarkerOps.ts 273 LOC + mapPolygonOps.ts 390 LOC), migrated HTML parsing to DOMParser (v2.0.2), added null safety to Knot/Query (v2.0.2), extracted shared `parseHtml` utility into `domOps.ts` with reused DOMParser instance, removed old explicit DI injection array handlers (only `static inject` auto-detection remains)
- **Components**: Added `fabButton` helper (separated from `iconButton`), label auto-capitalization, dialog title SVG alignment (v2.0.2), error message absolute positioning, AdvancedMarkerElement migration with `mapId` support and `data-map-id` attribute (v2.0.3+)

---

## 1. Test Coverage

Coverage **exceeds configured thresholds** (statements 97.04% vs 97%, branches 87.37% vs 87%, functions 95.65% vs 95%, lines 97.05% vs 97%). **2,223 tests** across 112 suites + **6 Playwright visual tests**.

| Action | Priority | Impact |
|--------|----------|--------|
| ~~Increase coverage for `operation.ts`, `knot.ts`~~ — knot branches 85%→93%, operation branches 79%→84% | P1 | Buffer above thresholds |
| ~~Increase coverage for largest files: `table.ts` (716 LOC)~~ — table branches 79.5%→84.6% | P1 | Buffer above thresholds |
| ~~Increase coverage for `googleMap.ts`~~ — split into 3 files with dedicated specs (`mapMarkerOps.spec.ts`, `mapPolygonOps.spec.ts`); googleMap branches 92.9%, marker ops 87%, polygon ops 76% | P1 | Buffer above thresholds |
| ~~Increase branch coverage in `selectField.ts`, `colorField.ts`~~ — selectField branches 50.6%→74.7%→80%, colorField functions 40%→100%, branches 60%→80% | P1 | Biggest branch gaps |
| ~~Increase branch coverage in `baseField.ts`~~ — baseField branches 66.7%→76.3% | P1 | Remaining branch gaps |
| ~~Increase branch coverage in `locationField.ts`~~ — expanded from 1 to 27 tests; branches 0%→50%+, functions 13%→80%+ | P1 | Remaining branch gaps |
| ~~Add edge-case tests for `xhr.ts` (fetch error handling, abort, timeouts)~~ — 7 new tests for no Content-Type, pre-set headers | P1 | Security & correctness |
| ~~Add integration-style tests for `application.ts` DI container~~ — 25 new tests for DI, locale, getInstance, run modes | P1 | Core framework confidence |
| ~~Enable stricter test config (remove `strictNullChecks: false` from `tsconfig.spec.json`)~~ — removed `strictNullChecks: false` and `noImplicitAny: false` overrides; 21 spec files fixed | P2 | Catch more bugs in tests |
| ~~**Expand jest-axe tests**~~ — added axe checks for Table, Dialog, Confirm (total 48 a11y tests) | P2 | Comprehensive a11y testing |

---

## 2. Bundle Size & Performance

Current: **224.4 KB JS (IIFE) + 223.7 KB JS (ESM) + 76.9 KB CSS** (limit: 250 KB JS, 100 KB CSS). Gzip: 58.5 KB JS, 11.9 KB CSS. Brotli: 49.8 KB JS, 9.8 KB CSS.

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Tree-shake `date-fns`**~~ — verified: named imports, centralized in `dateio.ts`, only 2 locales — already optimal | P1 | Already optimal |
| ~~**Add gzip/brotli size reporting**~~ — `check-bundle-size.cjs` reports raw, gzip, and brotli sizes | P2 | Real-world size visibility |
| ~~**CSS purge analysis**~~ — dark mode elimination reduced CSS from ~90 KB to ~76 KB | P2 | ~15% CSS reduction |

---

## 3. Build System

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add ESM bundle output**~~ — `sui.esm.js` alongside `sui.min.js` (IIFE) | P1 | Modern bundler support |
| ~~**Move esbuild config to file**~~ — `scripts/esbuild.config.cjs` shared config, `scripts/esbuild.cjs` build, `scripts/esbuild-watch.cjs` watch, `scripts/esbuild-analyze.cjs` analyze | P2 | Maintainability |
| ~~**Source map optimization**~~ — already using external source maps (esbuild `sourcemap: true` = linked mode); maps excluded from npm publish via `files` field | P3 | Already optimal |
| ~~**Add bundle visualization**~~ — `esbuild:analyze` now generates `dist/bundle-report.html` with treemap by group, per-module table with bar charts, and raw esbuild analysis | P3 | Developer experience |

---

## 4. TypeScript & Code Quality

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Reduce `any` usage**~~ — 22 `any` usages eliminated in table.ts, selectField.ts, canvas.ts, popupContainer.ts, state.ts; remaining ~117 explicit `: any` annotations + ~259 `as any` assertions are genuinely needed in utility/generic code | P2 | Type safety |
| ~~**Modernize `moduleResolution`**~~ — changed to `Bundler` | P2 | Better module semantics |
| ~~**Update `target` to ES2020+**~~ — changed to ES2020 | P2 | Cleaner output, smaller bundle |
| ~~**Split `operation.ts`**~~ — split 1,108 LOC into 7 focused modules: `comparison.ts`, `typeGuards.ts`, `iteration.ts`, `arrayOps.ts`, `objectOps.ts`, `stringOps.ts`, `domOps.ts`; `operation.ts` is now a barrel re-export (zero consumer changes) | P2 | Maintainability |
| ~~**Split `googleMap.ts`** (1,359 LOC) — extracted `mapMarkerOps.ts` (273 LOC, 10 functions) and `mapPolygonOps.ts` (390 LOC, 16 functions); `googleMap.ts` reduced to 929 LOC~~ | P2 | Maintainability |
| ~~**Add `@typescript-eslint/strict-type-checked`** rules~~ — enabled 5 type-aware rules: `no-floating-promises`, `await-thenable`, `no-unnecessary-type-assertion` (45 auto-fixed), `no-misused-promises`, `restrict-template-expressions`; fixed 3 floating promises with `void` operator | P3 | Catch more issues |
| ~~**Remove old explicit DI handlers**~~ — removed `string[]` injection array overload from `Module.add()`, `Application.controller()`, `Application.service()`; only `static inject` auto-detection remains; `Dependency.moduleInjections` field removed from types | P2 | API simplification |

---

## 5. Styles & Design System

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**CSS custom properties**~~ — full `--sui-*` token system: surface, on-surface, primary-action, error-text, overlay, shadow, etc. | P1 | Theme customization |
| ~~**Dark mode via `prefers-color-scheme`**~~ — media query + `.dark-theme` class + `.light-theme` opt-out, all via CSS custom properties | P2 | Better UX |
| ~~**Reduce dark mode duplication**~~ — ALL 42 Dark.scss files eliminated; CSS custom properties auto-switch light/dark | P1 | 100% fewer Dark files, ~15% CSS reduction |
| ~~**Add focus-visible**~~ — `:focus-visible` on buttons, inputs, checkboxes, radios, switches, icon toggles | P2 | Accessibility |
| ~~**Logical properties**~~ — 48+ conversions across 27 SCSS files | P3 | Internationalization |
| ~~**Replace remaining hardcoded colors**~~ — select options, contentHandler, menu, button, spinner, slider migrated to CSS custom properties (v2.0.2) | P2 | Dark mode correctness |
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
| ~~**Use `will-change`** sparingly for known animated elements~~ — dialog/confirm overlays (opacity), dialog/confirm windows (opacity, transform), flash (opacity, transform), spinner (transform), progress indeterminate (left), layout blur (filter), select expander (transform) | P3 | Performance |

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
| ~~**Add `aria-label` to icon-only buttons**~~ — Helper `iconButtonElement` sets `aria-label` from description | P2 | Screen reader support |
| ~~**Add `aria-controls` to menu toggles**~~ — Dropdown button has `aria-controls` + `aria-label="Actions"` linking to menu | P2 | ARIA best practice |
| ~~**Expand ARIA on Table component**~~ — `aria-label` on table, `aria-sort` on sorted column headers | P2 | Data table accessibility |

---

## 8. Security

All items complete.

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
| ~~**Release blog posts**~~ — v1.0.0, v1.1.0, v1.2.0 release posts on Docusaurus blog | P3 | Community |
| ~~**Remove `@description` JSDoc tags**~~ — 473 occurrences removed across 48 files for TypeDoc compatibility (v2.0.3) | P2 | Docusaurus build |
| ~~**Audit and improve JSDoc/TypeDoc**~~ — fixed all 20 TypeDoc warnings to 0: corrected @param names, removed unsupported sub-property syntax, replaced broken {@link} refs, exported internal types (MarkerIcon, DateTimeConfig, EventCallback, XhrType) | P2 | API documentation quality |
| ~~**Migration guide v1.x→v2.0**~~ — updated with v2.0.2/v2.0.3 breaking changes: AdvancedMarkerElement, DI removal, fabButton/iconButton, label capitalization | P2 | User retention |
| ~~**Release blog posts v2.0.x**~~ — v2.0.1, v2.0.2, v2.0.3 blog posts added to Docusaurus site | P3 | Community |
| ~~**Blog posts**~~ — architecture decisions + modernization journey posts already published | P3 | SEO & community |

---

## 10. Package & Distribution

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add `exports` map**~~ — types/import/default entries in `package.json` | P1 | Bundler compatibility |
| ~~**Exclude plan files from npm**~~ — `files` field limits to dist + src + styles | P1 | Smaller package |
| ~~**Add `sideEffects: false`**~~ — added to `package.json` | P1 | Smaller consumer bundles |
| ~~**Publish type declarations as separate entry**~~ — verified: `typings` + `exports["."].types` both point to `dist/index.d.ts` | P2 | TypeScript consumers |
| ~~**Add `CHANGELOG` automation**~~ — commitlint + husky + `npm run changelog` via conventional-changelog; `CHANGELOG.md` in Keep a Changelog format | P3 | Release process |

---

## 11. CI/CD & DevOps

| Action | Priority | Impact |
|--------|----------|--------|
| ~~**Add bundle size diff**~~ — CI comments bundle size report on PRs via `scripts/bundle-size-diff.cjs` | P2 | Prevent bloat |
| ~~**Add visual regression testing**~~ — Playwright with 6 visual tests (buttons light/dark, table, form, modals, services); baseline screenshots in `e2e/snapshots/`; `npm run test:visual` | P2 | Style confidence |
| ~~**Cache improvements**~~ — TypeScript incremental builds (`incremental: true` + `.tsbuildinfo`); CI caches `.tsbuildinfo` via `actions/cache@v4` keyed on source hash | P3 | CI speed |

---

## 12. Obfuscation & IP Protection

| Action | Priority | Impact |
|--------|----------|--------|
| **esbuild already minifies** — variable names mangled, but structure visible | Info | — |
| ~~**Exclude source maps from npm**~~ — `files` field excludes `*.map` | P2 | Don't ship debug info |
| ~~**License header injection**~~ — esbuild `--banner:js` adds BSD-3-Clause copyright | P3 | Legal |

---

## 13. Upcoming Work (Separate Plans)

These items have dedicated planning documents and are tracked outside this improvement plan:

| Item | Document | Summary |
|------|----------|---------|
| ~~**AdvancedMarkerElement migration**~~ | `ADVANCED_MARKER_MIGRATION.md` | ✅ Complete — migrated to `AdvancedMarkerElement`, `MarkerIcon` uses HTMLElement content, DOM events, `mapId` support |
| **Example page expansion** | `EXAMPLE_EXPANSION_PLAN.md` | ✅ Complete — all component/module/service demos implemented across 4 tabs |

---

## Remaining Items Summary

### P1 — High Priority
1. ~~**AdvancedMarkerElement migration**~~ — COMPLETE

### P2 — Medium Priority
2. ~~**Expand ARIA on Dropdown, Table, icon buttons**~~ — COMPLETE
3. ~~**Audit and improve JSDoc/TypeDoc**~~ — COMPLETE (20 → 0 TypeDoc warnings)
4. ~~**Expand jest-axe tests**~~ — COMPLETE (Table, Dialog, Confirm)
5. ~~**Migration guide v1.x→v2.0**~~ — COMPLETE (v2.0.2/v2.0.3 breaking changes added)
6. ~~**Add visual regression testing**~~ — COMPLETE (Playwright, 6 tests)
7. ~~**Release blog posts v2.0.x**~~ — COMPLETE
8. ~~**Blog posts**~~ — COMPLETE (architecture decisions + modernization journey already exist)
9. ~~**`CHANGELOG` automation**~~ — COMPLETE (already implemented)

---

## Recommended Execution Order

### Phase 1 — Stabilize & Package (COMPLETE)

1. ~~Add `npm audit` to CI~~
2. ~~Add `exports` and `sideEffects` to `package.json`~~
3. ~~Clean up published files (exclude plans, source maps)~~
4. ~~Update and improve `README.md`~~

### Phase 2 — Modernize Output (COMPLETE)

5. ~~Add ESM bundle output~~
6. ~~CSS custom properties for theming (unify light/dark)~~
7. ~~`prefers-reduced-motion` support~~
8. ~~Migration guide documentation~~

### Phase 3 — Quality & Polish (COMPLETE)

9. ~~Accessibility audit (ARIA, keyboard, focus trap)~~
10. ~~Reduce `any` usage~~
11. ~~Split large files (`googleMap.ts`, `operation.ts`)~~
12. ~~Micro-interaction animations~~

### Phase 4 — Advanced (COMPLETE)

13. ~~Bundle size CI checks~~
14. ~~Logical properties~~
15. ~~Dark mode consolidation~~
16. ~~Color contrast audit~~
17. ~~Replace remaining hardcoded colors with CSS custom properties~~
18. ~~Remove `@description` JSDoc tags for TypeDoc compatibility~~
19. ~~DOMParser migration, null safety, helper refactoring~~
20. ~~Extract shared `parseHtml` utility, reduce code duplication~~
21. ~~Remove old explicit DI injection array handlers~~
22. ~~Error message absolute positioning~~

### Phase 5 — Next (v2.1.0+)

23. ~~**AdvancedMarkerElement migration**~~ — COMPLETE (see `ADVANCED_MARKER_MIGRATION.md`)
24. ~~**Code-split Google Maps**~~ — removed (not needed)
25. ~~**Expand ARIA on Dropdown, Table, icon buttons**~~ — COMPLETE
26. ~~**Audit and improve JSDoc/TypeDoc**~~ — COMPLETE (20 → 0 warnings)
27. ~~**Expand jest-axe tests**~~ — COMPLETE (Table, Dialog, Confirm)
28. ~~**Migration guide v1.x→v2.0**~~ — COMPLETE (v2.0.2/v2.0.3 breaking changes)
29. ~~**Visual regression testing**~~ — COMPLETE (Playwright, 6 tests, baseline screenshots)
30. ~~**Release blog posts v2.0.x**~~ — COMPLETE
31. ~~**Changelog automation**~~ — COMPLETE
