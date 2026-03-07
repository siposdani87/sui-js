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

## Phase 5 — Type Safety: COMPLETE

| # | Issue | Files | Status |
|---|-------|-------|--------|
| 5a | ~~`Collection.Type` typed as `any` → `CollectionType<T>` constructor type~~ | `src/core/collection.ts`, `src/component/form.ts` | **Done** — `FormField` factory cast at call site |
| 5b | ~~Define typed `Objekt<T>` generics for type-safe config access~~ | 9 modules typed (Xhr, Http, Flash, Confirm, Dialog, Cookie, Depot, Screen, Viewer, Loader); Header/Footer/Page/Script have empty options | **Done** |
| 5c | ~~Tighten `getValue()` return types per field subclass~~ | `TextField` → `string` (done); others use `typeCast` which is inherently `any` | Partial |

## Phase 6 — Structural: COMPLETE

| # | Issue | Status |
|---|-------|--------|
| 6a | ~~Replace `javascript:void(0)` anchor elements with semantic buttons~~ | **Done** — field icon buttons → `<button>` with `icon-button` reset class; menu/nav toggles → `href="#"`; button reset added to `_base.scss`; `_form.scss` selectors updated |
| 6b | ~~Replace mutable event callback properties (`eventChange`, `eventClick`) with internal event emitter pattern~~ | **Done** — New `Emitter` base class (`src/core/emitter.ts`) with `on()`/`off()`/`emit()`. All 30+ classes updated to extend `Emitter`. ~120 `.eventXxx = handler` assignments replaced with `.on('xxx', handler)`. All internal `this.eventXxx()` calls replaced with `this.emit('xxx')`. 19 test files updated. |
| 6c | ~~Template method for `_init()` in `BaseField` to remove boilerplate from subclasses~~ | **Done** — `protected _init()` hook in `BaseField` called at end of constructor. 15 subclasses removed their constructor entirely; 5 kept theirs (Button, SubmitButton, ResetButton, HiddenField for restricted signature; RadiobuttonField, DateTimeRangeField for extra params). All `private _init()` → `protected override _init()`. |

## Phase 7 — Additional Modernization: COMPLETE

| # | Issue | Files | Status |
|---|-------|-------|--------|
| 7a | ~~Remove `event.srcElement` legacy fallback~~ | `src/component/form.ts` | **Done** |
| 7b | ~~Replace remaining `indexOf` checks with `includes()`/`startsWith()`~~ | 7 files: `query.ts`, `browser.ts`, `flash.ts`, `depot.ts`, `navigation.ts`, `textareaField.ts` | **Done** |
| 7c | ~~Replace `switch(x.constructor)` with `typeof`/`instanceof`~~ | `src/module/depot.ts`, `src/module/cookie.ts` | **Done** |
| 7d | ~~**Bug fix:** `merge()` uses `isPureObject(obj.constructor)` instead of `isPureObject(obj)`~~ | `src/utils/operation.ts` | **Done** — deep merge was broken for plain objects |

## Implementation Notes

- Each phase should be followed by `npx tsc --noEmit` and `npm run test` to verify
- Phase 6b (event emitter) completed — `Emitter` base class with `on()`/`off()`/`emit()` replaces all mutable callback properties
- Phase 6c (template method) completed — `protected _init()` hook in `BaseField` constructor; subclasses override instead of repeating constructor boilerplate
