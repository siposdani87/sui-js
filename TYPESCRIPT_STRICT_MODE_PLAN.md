# TypeScript Strict Mode Migration Plan

## Current State

**`strict: false`** with Phase 1 flags already enabled:

| Flag | Status |
|------|--------|
| `strictFunctionTypes` | Enabled |
| `strictBindCallApply` | Enabled |
| `noImplicitThis` | Enabled |
| `alwaysStrict` | Enabled |
| `noImplicitReturns` | Enabled |
| `noFallthroughCasesInSwitch` | Enabled |
| `allowUnreachableCode` | Disabled (false) |
| `allowUnusedLabels` | Disabled (false) |

**Remaining flags to enable:**

| Flag | Status | Phase |
|------|--------|-------|
| `noImplicitOverride` | **Enabled** | Phase 1 |
| `noImplicitAny` | **Enabled** | Phase 2 |
| `strictNullChecks` | **Enabled** | Phase 3 |
| `strictPropertyInitialization` | **Enabled** | Phase 4 |
| `strict: true` | **Enabled** | Phase 5 |

## Codebase Statistics

| Metric | Count |
|--------|-------|
| Production `.ts` files | 106 |
| Test `.spec.ts` files | ~97 |
| Explicit `any` usages | ~140 across 28 files |
| Explicit null assignments | ~160 |
| `\| null` union types | 54 |
| `\| undefined` union types | 321 |
| Optional chaining (`?.`) | 180 |
| Nullish coalescing (`??`) | 4 |
| Definite assignment (`!:`) | 3 |
| Classes with `_init()` pattern | ~50 |

## Dependency Graph

```
Phase 0 (Preparation)
    │
    v
Phase 1 (noImplicitOverride) ─── independent, lowest risk
    │
    v
Phase 2 (noImplicitAny) ──────── independent, moderate risk
    │
    v
Phase 3 (strictNullChecks) ────── largest phase, high impact
    │
    v
Phase 4 (strictPropertyInit) ─── REQUIRES Phase 3
    │
    v
Phase 5 (strict: true) ───────── final cleanup
```

> Phases 1 and 2 are independent and can be done in either order or in parallel.
> Phase 3 must precede Phase 4 (TypeScript requires `strictNullChecks` for `strictPropertyInitialization`).

---

## Phase 0: Preparation (No Flag Changes)

**Goal:** Set up infrastructure and tighten linting before enabling any new compiler flags.

### 0A. Update ESLint rules

In `eslint.config.js`, change these rules from `'off'` to `'warn'`:

```javascript
'@typescript-eslint/no-explicit-any': 'warn',
'@typescript-eslint/ban-types': 'warn',
'@typescript-eslint/no-unsafe-function-type': 'warn',
```

This creates visibility into `any` usage without blocking builds.

### 0B. Add helper type

In `src/utils/types.ts`, add:

```typescript
export type Nullable<T> = T | null;
```

### 0C. Verification

```bash
npm run lint    # Should pass with new warnings
npm run test    # Should pass unchanged
npm run build   # Should succeed
```

**Scope:** 2-3 files, ~10 lines changed.

---

## Phase 1: Enable `noImplicitOverride`

**Flag:** `"noImplicitOverride": true`
**Risk:** Very low — purely additive keyword.

### What changes

Add the `override` keyword to all methods that override a parent class method.

### Classes affected

**BaseField subclasses** (~18 field classes):
- Methods to mark: `render()`, `refresh()`, `getValue()`, `setValue()`, `isValid()`, `setDisabled()`, `setLabel()`
- Files: `textField.ts`, `selectField.ts`, `textareaField.ts`, `numberField.ts`, `colorField.ts`, `dateTimeField.ts`, `dateTimeRangeField.ts`, `fileField.ts`, `locationField.ts`, `urlField.ts`, `searchField.ts`, `radiobuttonField.ts`, `baseCheckboxField.ts`, `checkboxField.ts`, `switchField.ts`, `iconToggleField.ts`, `rangeField.ts`, `hiddenField.ts`

**BaseCheckboxField subclasses** (3 classes):
- Methods to mark: `_init()`, `_change()`
- Files: `checkboxField.ts`, `switchField.ts`, `iconToggleField.ts`

**BaseModal subclasses** (3 classes):
- Methods to mark: `_init()`, `_actionOK()`, `_actionCancel()`
- Files: `dialog.ts`, `confirm.ts`, `viewer.ts`

### Example

```typescript
// Before
render(): void {

// After
override render(): void {
```

```typescript
// Before (protected)
protected _init(): void {

// After
protected override _init(): void {
```

### Verification

```bash
# Enable flag in tsconfig.json, then:
npx tsc --noEmit
npm run test
npm run build
```

**Scope:** ~25-35 method signatures across ~20 files.

---

## Phase 2: Enable `noImplicitAny`

**Flag:** `"noImplicitAny": true`
**Risk:** Moderate — requires adding explicit type annotations where TypeScript infers `any`.

> Note: This flag only catches *implicit* `any`. The ~140 *explicit* `: any` annotations are unaffected.

### Category 1: Replace `Function` type with typed signatures

| File | Current | Replacement |
|------|---------|-------------|
| `src/core/collection.ts` (4x) | `conditionCallback: Function` | `conditionCallback: (item: T, index: number) => boolean` |
| `src/core/knot.ts` (1x) | `callback: Function` | `callback: (cssClass: string) => void` |
| `src/core/async.ts` | `calls: Array<Function>` | `calls: Array<(...args: any[]) => any>` |
| `src/module/eventBus.ts` (3x) | Function params | `(...args: any[]) => void` |
| `src/module/scheduler.ts` (1x) | Function param | specific callback type |
| `src/component/table.ts` (1x) | Function param | specific callback type |
| `src/component/navigation.ts` (1x) | Function param | specific callback type |
| `src/component/popupContainer.ts` (1x) | Function param | specific callback type |

### Category 2: Callback parameters without types

Add explicit types to callback parameters in:
- `src/utils/operation.ts` — `each()`, `eachObject()` callbacks
- Event handler parameters across component files
- Generic function parameters in utility files

### Category 3: Untyped function returns

Add explicit return types where TypeScript cannot infer them, particularly in:
- `src/module/http.ts` — `_getPromise()` return type
- `src/core/objekt.ts` — methods returning generic types

### Strategy

Keep `any` where it serves as a genuine "any type" for utility functions. The goal is to make all `any` usage **explicit** and **intentional**, satisfying `noImplicitAny`.

### Verification

```bash
# Enable flag in tsconfig.json, then:
npx tsc --noEmit    # Fix errors iteratively
npm run test
npm run build
```

**Scope:** ~40-60 type annotations across ~25-30 files.

---

## Phase 3: Enable `strictNullChecks`

**Flag:** `"strictNullChecks": true`
**Risk:** High — largest and most impactful phase, ~150-200 changes across ~50+ files.

This phase is broken into sub-phases for manageability. All sub-phases are completed before enabling the flag.

### Sub-Phase 3A: Fix null assignments to non-nullable types

Properties typed without `| null` but assigned `null`:

| File | Property | Current | Fix |
|------|----------|---------|-----|
| `src/module/http.ts` | `username` | `string` | `string \| null` |
| `src/module/http.ts` | `password` | `string` | `string \| null` |
| `src/module/http.ts` | `token` | `string` | `string \| null` |
| `src/module/xhr.ts` | `authorization` | `string` | `string \| null` |
| `src/module/browser.ts` | `os` | `string` | `string \| null` |
| `src/component/dropdown.ts` | `item` | `Objekt` | `Objekt \| null` |
| `src/field/fileField.ts` | `valueSrc` | `string` | `string \| null` |

### Sub-Phase 3B: Fix local variable null assignments

| File | Variable | Fix |
|------|----------|-----|
| `src/utils/operation.ts:313` | `_scrollInterval: number = null` | `number \| null = null` |
| `src/core/state.ts:115-117` | `state`, `params`, `matches` | Add `\| null` to types |
| `src/component/formField.ts:44-45,94` | `label`, `error`, `result` | Add `\| null` |
| `src/component/clock.ts:47` | `result` | Add `\| null` |
| `src/component/calendar.ts:143` | `result` | Add `\| null` |
| `src/module/depot.ts:63` | `result` | Add `\| null` |
| `src/field/radiobuttonField.ts:112` | `value` | Add `\| null` |

### Sub-Phase 3C: Fix nullable return types

Methods that can return `null` but don't declare it:

| File | Method | Current Return | New Return |
|------|--------|---------------|------------|
| `src/core/collection.ts` | `findById()` | `T` | `T \| null` |
| `src/core/collection.ts` | `findBy()` | `T` | `T \| null` |
| `src/core/collection.ts` | `findByCondition()` | `T` | `T \| null` |
| `src/core/collection.ts` | `deleteByCondition()` | `T` | `T \| null` |
| `src/core/knot.ts` | `getText()` | `string` | `string \| null` |

### Sub-Phase 3D: Fix callers of newly-nullable methods

Once `Collection.findById()` returns `T | null`, every caller must handle null. This cascades through:

- All `this.routes.findById(id)` calls in `State`
- All `findById()` calls in `SelectField`, `Form`
- All `findByCondition()` calls across modules

**Strategy:** Add null guards or optional chaining:

```typescript
// Before
const route = this.routes.findById(id);
const stateUrl = route.get<string>('url');

// After
const route = this.routes.findById(id);
if (route) {
    const stateUrl = route.get<string>('url');
}
```

### Sub-Phase 3E: Fix Instance type in Application

`Application._instances` initializes all properties to `undefined`, but the `Instance` type requires all fields.

**Recommended approach:** Use type assertion since `_init()` synchronously fills everything:

```typescript
private _instances = {} as Instance;
```

### Sub-Phase 3F: Fix Promize/Deferred null patterns

`src/core/promize.ts` stores status, data, resolve, reject callbacks as Objekt properties initialized to `null`. Update the Objekt option types to include `| null` where defaults are null.

### Sub-Phase 3G: Fix BaseModal conditional properties

Properties only assigned conditionally (e.g., minimize/maximize buttons):

```typescript
// Before
btnMinimize: Knot;
btnMaximize: Knot;
btnClose: Knot;

// After (optional — may not exist depending on config)
btnMinimize?: Knot;
btnMaximize?: Knot;
btnClose?: Knot;
```

Properties set in subclass `_init()`:

```typescript
// Use definite assignment (will be formalized in Phase 4)
modal!: Knot;
body!: Knot;
```

### Verification

```bash
# Enable flag in tsconfig.json, then:
npx tsc --noEmit    # Expect 100+ errors initially, fix iteratively
npm run test
npm run build
```

**Scope:** ~150-200 type annotations and null checks across ~50+ files.

---

## Phase 4: Enable `strictPropertyInitialization`

**Flag:** `"strictPropertyInitialization": true`
**Risk:** Moderate — requires `strictNullChecks` (Phase 3) to be enabled first.

### Strategy: Definite Assignment Assertions (`!:`)

The codebase's `constructor → _setOptions() → _init()` pattern means properties ARE initialized synchronously in the constructor, just not directly. Use `!:` to assert this rather than refactoring ~50 classes.

### Category 1: Classes with `_setOptions → _init` pattern (~50 classes)

For properties set in `_setOptions()`:
```typescript
options!: Objekt;  // Set in _setOptions() called from constructor
```

For properties set in `_init()`:
```typescript
collection!: Collection;  // Set in _init() called from constructor
```

**Classes include:** `Http`, `Xhr`, `Browser`, `Dropdown`, `State`, `Router`, `Screen`, `Table`, `Calendar`, `Clock`, `DateTime`, `Pager`, `CardCollection`, `ContentHandler`, `Navigation`, `ProgressStatus`, `Tooltip`, `TabPanel`, `Popup`, `PopupContainer`, `Template`, `Flash`, `Loader`, `Header`, `Footer`, `TopMenu`, `LeftMenu`, `BottomMenu`, `NavBar`, `Cookie`, `Depot`, `GeoLocation`, `Helper`, `Page`, `ProgressBar`, `Scheduler`, `Script`, `Style`, `Viewer`, `Dialog`, `Confirm`, `EventBus`, etc.

### Category 2: BaseField subclasses (~20 classes)

BaseField properties set in constructor are fine. Subclass properties set in `_init()`:

```typescript
// SelectField example
query!: string;
ids!: string[];
containerKnot!: Knot;
listKnot!: Knot;
popup!: Popup;
```

Properties set later in `render()` (called by Form lifecycle, not constructor):

```typescript
// Use !: since Form lifecycle guarantees render() before access
iconKnot!: Knot;
selectContainerKnot!: Knot;
```

### Category 3: BaseModal and subclasses

Properties set in `_initBase()` (called from subclass constructors):

```typescript
windowWidth!: number;
windowHeight!: number;
mainContainerKnot!: Knot;
hasBlur!: boolean;
```

Conditional properties (already made optional in Phase 3G):

```typescript
btnMinimize?: Knot;   // Already optional from Phase 3
btnMaximize?: Knot;
btnClose?: Knot;
```

### Category 4: Form class

```typescript
formKnot!: Knot<HTMLFormElement>;
previousModel!: Objekt;
model!: Objekt;
initFields!: string[];
buttonClasses!: string[];
fieldClasses!: string[];
```

### Category 5: Module class

```typescript
private _instances!: Instance;   // Set in load()
private _injections!: Injection; // Set in load()
```

### Verification

```bash
# Enable flag in tsconfig.json, then:
npx tsc --noEmit
npm run test
npm run build
```

**Scope:** ~150-180 property declarations across ~62 files. Most changes are adding `!` after the property name.

---

## Phase 5: Enable `strict: true` and Clean Up

**Flag:** Replace all individual strict flags with `"strict": true`

### 5A. Replace tsconfig flags

```jsonc
{
  "compilerOptions": {
    "strict": true,
    // Keep these (not part of strict):
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false
    // Remove all individual strict-mode flags
  }
}
```

### 5B. Handle `useUnknownInCatchVariables`

`strict: true` enables `useUnknownInCatchVariables`, which types `catch (e)` as `unknown` instead of `any`. Fix all catch blocks:

```typescript
// Before
catch (e) {
    consoleWarn(e);
}

// After
catch (e: unknown) {
    consoleWarn(e);
}
// Or if accessing error properties:
catch (e) {
    if (e instanceof Error) {
        consoleWarn(e.message);
    }
}
```

Known catch blocks:
- `src/core/knot.ts:274`
- `src/module/xhr.ts:295`

### 5C. Tighten ESLint rules

```javascript
'@typescript-eslint/no-explicit-any': 'warn',           // Keep as warn
'@typescript-eslint/ban-types': 'error',                 // Upgrade to error
'@typescript-eslint/no-unsafe-function-type': 'error',   // Upgrade to error
```

### 5D. Optional additional flags

Consider enabling:
- `"noUnusedLocals": true` — flag unused variables
- `"noUnusedParameters": true` — flag unused params (may need `_` prefix convention)

**Do NOT enable** `noUncheckedIndexedAccess` — too invasive for the `Objekt` pattern.

### Verification

```bash
npx tsc --noEmit
npm run test
npm run build
```

**Scope:** ~5-10 files for catch block fixes + config changes.

---

## Summary

| Phase | Flag | Files | Changes | Risk |
|-------|------|-------|---------|------|
| 0 | (preparation) | 2-3 | ~10 | Very Low |
| 1 | `noImplicitOverride` | ~20 | ~35 | Very Low |
| 2 | `noImplicitAny` | ~25-30 | ~60 | Moderate |
| 3 | `strictNullChecks` | ~50+ | ~200 | High |
| 4 | `strictPropertyInitialization` | ~62 | ~180 | Moderate |
| 5 | `strict: true` | ~5-10 | ~30 | Low |
| **Total** | | **~80-90** | **~515** | |

## Risk Mitigation

- **Each phase is a separate commit/PR** — merge and verify before starting the next
- **Tests must pass at each phase** — 97 test files serve as regression suite
- **No runtime behavior changes** — all changes are type-level only
- **Escape hatches** — `as any`, `!:`, `// @ts-expect-error` can be used sparingly for edge cases
- **Coverage thresholds maintained** — type-only changes do not affect coverage
