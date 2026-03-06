# TypeScript Codebase Improvement Plan

## Phase 1 — Quick Wins: COMPLETE

| # | Issue | Files | Impact |
|---|-------|-------|--------|
| 1a | ~~**Bug fix:** `Knot._getListenersFromStore` uses `\|\|` instead of `&&`~~ | `src/core/knot.ts` | High |
| 1b | ~~**Naming:** Private methods like `_convertobject`, `_attributesToobject`, `_parseobject` should be camelCase~~ | `src/core/objekt.ts`, `src/module/xhr.ts` | Low |
| 1c | ~~**Modernize:** `contain()` → `includes()`, `inArray()` → `includes()` internally~~ | `src/utils/operation.ts` | Low |

## Phase 2 — Field Duplication: COMPLETE

| # | Issue | Files |
|---|-------|-------|
| 2a | ~~Extract common `refresh()` logic into `BaseField._refreshBase()`~~ | `baseField.ts` + 6 field subclasses |
| 2b | ~~Extract common `render()` textfield class additions into `BaseField._renderTextField()`~~ | `baseField.ts` + 7 field subclasses |
| 2c | ~~Use optional chaining `this.label?.exists()` instead of `this.label && this.label.exists()`~~ | 5 field files |

## Phase 3 — Deprecated APIs: COMPLETE

| # | Issue | Files |
|---|-------|-------|
| 3a | ~~Replace `event.keyCode` with `event.key === 'Enter'`~~ | 5 source files + 2 test files |
| 3b | ~~Modernize `copyToClipboard` to use `navigator.clipboard.writeText` with fallback~~ | `src/utils/operation.ts` |

## Phase 4 — Performance: COMPLETE

| # | Issue | Files |
|---|-------|-------|
| 4a | ~~`Objekt._getByAttributes` iterates all keys per level instead of direct O(1) access~~ | `src/core/objekt.ts` |
| 4b | ~~`isEmpty` counts all properties instead of early-returning~~ | `src/utils/operation.ts` |
| 4c | ~~`isSame` uses both JSON.stringify and recursive comparison redundantly~~ | `src/utils/operation.ts` |

## Phase 5 — Type Safety: PARTIAL

| # | Issue | Files | Status |
|---|-------|-------|--------|
| 5a | `Collection.Type` typed as `any` → constructor type | `src/core/collection.ts` | **Blocked** — `FormField` is a factory function, not a class; needs refactoring to type properly |
| 5b | ~~Define typed `Objekt<T>` generics for type-safe config access~~ | 9 modules typed (Xhr, Http, Flash, Confirm, Dialog, Cookie, Depot, Screen, Viewer, Loader); Header/Footer/Page/Script have empty options | **Done** |
| 5c | ~~Tighten `getValue()` return types per field subclass~~ | `TextField` → `string` (done); others use `typeCast` which is inherently `any` | Partial |

## Phase 6 — Structural: PARTIAL

| # | Issue | Status |
|---|-------|--------|
| 6a | ~~Replace `javascript:void(0)` anchor elements with semantic buttons~~ | **Done** — field icon buttons → `<button>` with `icon-button` reset class; menu/nav toggles → `href="#"`; button reset added to `_base.scss`; `_form.scss` selectors updated |
| 6b | Replace mutable event callback properties (`eventChange`, `eventClick`) with internal event emitter pattern | Open |
| 6c | Template method for `_init()` in `BaseField` to remove boilerplate from subclasses | Open |

## Implementation Notes

- Each phase should be followed by `npx tsc --noEmit` and `npm run test` to verify
- Phase 6b (event emitter) would be a significant API change requiring careful migration
- Phase 6b (event emitter) would be a significant API change requiring careful migration
