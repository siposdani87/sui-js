# SUI-JS Comprehensive Improvement Plan

## Context

SUI-JS v1.2.0 was just released with 1,315 tests (77% coverage), upgraded dependencies (ESLint 10, Stylelint 17), and completed testing phases 14-17. This plan addresses remaining improvements across testing, code quality, build optimization, and CI/CD to bring the project to production-grade quality.

## Phase 1: Stricter TypeScript (tsconfig.json)

Enable the 3 remaining optional strict checks incrementally:

1. **Enable `noUnusedLocals: true`** in `tsconfig.json`
   - Run `npx tsc --noEmit`, fix all unused local variable errors
   - Remove dead variables or prefix with `_` if intentionally unused

2. **Enable `noUnusedParameters: true`** in `tsconfig.json`
   - Fix errors by prefixing unused params with `_` (follows existing convention)
   - Framework callbacks often have unused params — use `_` prefix

3. **Enable `noUncheckedIndexedAccess: true`** in `tsconfig.json`
   - Adds `| undefined` to all index access results
   - Fix with optional chaining (`?.`) or null checks where needed
   - Most impactful change — likely 50-100+ fixes needed

**Files:** `tsconfig.json`, various `src/**/*.ts` files

## Phase 2: ESLint Rule Tightening (eslint.config.js)

1. **Re-enable `no-prototype-builtins`** — replace `obj.hasOwnProperty(x)` with `Object.prototype.hasOwnProperty.call(obj, x)` or `Object.hasOwn(obj, x)`
2. **Re-enable `no-case-declarations`** — wrap switch case bodies in blocks `{}`
3. **Add `@typescript-eslint/consistent-type-imports`** — enforce `import type` for type-only imports
4. **Escalate `@typescript-eslint/no-explicit-any` to `error`** after reducing usages (long-term goal, not in this pass)

**Files:** `eslint.config.js`, affected source files

## Phase 3: Code Cleanup

1. **Fix 5 TODO/FIXME comments:**
   - `src/core/knot.ts:681` — "refactor to use other technique"
   - `src/component/table.ts:141` — "reinit other components of table"
   - `src/field/rangeField.ts:90` — "check the tooltip"
   - `src/module/template.ts:172` — "FIXME: ViewTransition not working properly"
   - `src/module/script.ts:105` — "check performance solution for script load"

2. **Remove TreeView stub** — `src/component/treeView.ts` is an empty class placeholder
   - Remove file, remove commented export from `src/component/index.ts`
   - Remove `src/component/treeView.spec.ts`

3. **Add `.prettierignore`** — explicitly exclude `dist/`, `coverage/`, `node_modules/`, `website/`

**Files:** 5 TODO files, `treeView.ts`, `treeView.spec.ts`, `component/index.ts`, `.prettierignore`

## Phase 4: Replace crypto-js with Web Crypto API

crypto-js adds ~88KB to the bundle. The Web Crypto API is native and supports AES, MD5 (via SubtleCrypto), Base64 (via btoa/atob).

1. **Audit crypto-js usage** in `src/utils/coder.ts`
2. **Replace with native alternatives:**
   - AES → `window.crypto.subtle.encrypt/decrypt`
   - MD5 → `window.crypto.subtle.digest('SHA-256', ...)` (or keep MD5 if required for API compat)
   - Base64 → `btoa()`/`atob()` (already available in browsers)
3. **Remove `crypto-js` and `@types/crypto-js` from dependencies**
4. **Update tests**

**Files:** `src/utils/coder.ts`, `src/utils/coder.spec.ts`, `package.json`

## Phase 5: Build & Bundle Improvements

1. **Add bundle analysis script** to `package.json`:
   - `"esbuild:analyze"` using `--metafile` to output bundle composition
2. **Add bundle size check** — fail build if bundle exceeds 250KB threshold
3. **Update coverage thresholds** in `jest.config.cjs` to match actual coverage:
   - Statements: 65% → 75%, Branches: 52% → 60%, Functions: 59% → 70%, Lines: 65% → 75%

**Files:** `package.json`, `jest.config.cjs`

## Phase 6: CI/CD Pipeline Improvements

Update `.github/workflows/ci.yml`:

1. **Add Node.js version matrix** — test on Node 20 and 22 (match engine requirement)
2. **Add coverage regression check** — fail if coverage drops >2%
3. **Add lint step** — run `npm run lint` in CI (currently only runs tests)
4. **Add build step** — run `npm run build` to verify compilation
5. **Pin Node version in npm-publish.yml** to match engine requirement (currently v20)

**Files:** `.github/workflows/ci.yml`, `.github/workflows/npm-publish.yml`

## Phase 7: Continue Testing Plan (Phases 18-23)

Continue the existing TESTING_IMPROVEMENT_PLAN.md:

- **Phase 18:** Canvas module tests
- **Phase 19:** Google Maps integration tests
- **Phase 20:** Remaining field tests (textarea, select, color, file deep coverage)
- **Phase 21:** Low-coverage modules (progressBar, dialog, script, style)
- **Phase 22:** Medium-coverage improvements (push all modules >80%)
- **Phase 23:** jest-axe accessibility tests

**Target:** 1,500+ tests, 90%+ statement coverage

## Execution Order

| Order | Phase | Effort | Impact |
|-------|-------|--------|--------|
| 1 | Phase 1: Stricter TypeScript | Medium | High |
| 2 | Phase 2: ESLint rules | Low | Medium |
| 3 | Phase 3: Code cleanup | Low | Medium |
| 4 | Phase 5: Build & thresholds | Low | Medium |
| 5 | Phase 6: CI/CD | Medium | Medium |
| 6 | Phase 4: Replace crypto-js | Medium | Medium |
| 7 | Phase 7: Testing phases 18-23 | High | High |

## Verification

After each phase:
- `npx tsc --noEmit` — types pass
- `npx eslint .` — no lint errors
- `npm run test` — all 1,315+ tests pass
- `npm run stylelint` — no style errors
- Check coverage hasn't regressed
