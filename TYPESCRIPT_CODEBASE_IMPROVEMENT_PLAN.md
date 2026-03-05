# TypeScript Codebase Improvement Plan

## Phase 1 — Quick Wins (Low effort, immediate value)

| # | Issue | Files | Impact |
|---|-------|-------|--------|
| 1a | **Bug fix:** `Knot._getListenersFromStore` uses `\|\|` instead of `&&` — would throw TypeError in edge cases | `src/core/knot.ts` | High |
| 1b | **Naming:** Private methods like `_convertobject`, `_attributesToobject`, `_parseobject` should be camelCase | `src/core/objekt.ts`, `src/module/xhr.ts` | Low |
| 1c | **Modernize:** `contain()` → `includes()`, `inArray()` → `includes()` internally | `src/utils/operation.ts` | Low |

## Phase 2 — Field Duplication (High impact, medium effort)

| # | Issue | Files |
|---|-------|-------|
| 2a | Extract common `refresh()` logic (`is-invalid` / `is-disabled` / `sui()`) into `BaseField._refreshBase()` | `baseField.ts` + 8 field subclasses |
| 2b | Extract common `render()` textfield class additions into `BaseField._renderTextFieldBase()` | `baseField.ts` + 6 field subclasses |
| 2c | Use optional chaining `this.label?.exists()` instead of `this.label && this.label.exists()` (11 files) | All field files with label checks |

## Phase 3 — Deprecated APIs (Medium impact, low effort)

| # | Issue | Files |
|---|-------|-------|
| 3a | Replace `event.keyCode` with `event.key === 'Enter'` | 5 files (`textareaField`, `searchField`, `locationField`, `form`, `table`) |
| 3b | Modernize `copyToClipboard` to use `navigator.clipboard.writeText` with fallback | `src/utils/operation.ts` |

## Phase 4 — Performance (Medium impact, low effort)

| # | Issue | Files |
|---|-------|-------|
| 4a | `Objekt._getByAttributes` iterates all keys per level instead of direct O(1) access | `src/core/objekt.ts` |
| 4b | `isEmpty` counts all properties instead of early-returning | `src/utils/operation.ts` |
| 4c | `isSame` uses both JSON.stringify and recursive comparison redundantly | `src/utils/operation.ts` |

## Phase 5 — Type Safety (Medium impact, higher effort)

| # | Issue | Files |
|---|-------|-------|
| 5a | `Collection.Type` typed as `any` → constructor type | `src/core/collection.ts` |
| 5b | Define option interfaces instead of `Objekt` for type-safe config access | Multiple components |
| 5c | Tighten `getValue()` return types per field subclass | Field classes |

## Phase 6 — Structural (Future consideration)

- Replace mutable event callback properties with internal event emitter pattern
- Template method for `_init()` in `BaseField` to remove boilerplate from subclasses
- Replace `javascript:void(0)` anchor elements with semantic buttons (32 occurrences)

## Implementation Notes

- Each phase should be followed by `npx tsc --noEmit` and `npm run test` to verify
- Phase 1a (bug fix) should be done first as it affects runtime correctness
- Phase 2 has the highest overall value — eliminates significant duplication across field classes
- Phase 5b is the largest effort and may warrant its own sub-plan
