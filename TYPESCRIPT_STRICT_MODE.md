# TypeScript Strict Mode Migration Guide

This document outlines the incremental approach to enabling TypeScript strict mode in the sui-js project.

## Current Status: Phase 1 Complete ✅

We've successfully enabled several strict mode flags that improve type safety without requiring extensive code refactoring.

### Phase 1 - Enabled Flags

The following TypeScript compiler options are now enabled in [tsconfig.json](tsconfig.json):

```json
{
  "strictFunctionTypes": true,
  "strictBindCallApply": true,
  "noImplicitThis": true,
  "alwaysStrict": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "allowUnreachableCode": false,
  "allowUnusedLabels": false
}
```

#### What These Flags Do

- **`strictFunctionTypes`**: Ensures function types are checked more strictly for compatibility
- **`strictBindCallApply`**: Type checks `bind`, `call`, and `apply` methods on functions
- **`noImplicitThis`**: Raises errors on `this` expressions with an implied `any` type
- **`alwaysStrict`**: Parse files in strict mode and emit `"use strict"` in output
- **`noImplicitReturns`**: Report error when not all code paths return a value
- **`noFallthroughCasesInSwitch`**: Report errors for fallthrough cases in switch
- **`allowUnreachableCode`**: Disallows unreachable code after `return`, `throw`, etc.
- **`allowUnusedLabels`**: Disallows unused labels

### Code Changes Made

1. **Fixed missing return statements** in error handling:
   - [src/utils/dateio.ts](src/utils/dateio.ts#L60-L90): Added fallback `return new Date()` in catch blocks
   - [src/module/xhr.ts](src/module/xhr.ts#L287): Changed empty return to `return ''`

2. **Fixed type safety in promise handling**:
   - [src/module/http.ts](src/module/http.ts#L113-L120): Improved parameter destructuring and type assertions

## Phase 2 - Planned (Not Yet Enabled)

The following flags require more extensive code changes:

### `noImplicitOverride: true`

**Effort**: Medium
**Impact**: ~60 methods need `override` keyword

This flag requires adding the `override` keyword to all methods that override base class methods, primarily in the field classes:

```typescript
// Current
class TextField extends BaseField {
    render() { /* ... */ }
}

// Required with noImplicitOverride
class TextField extends BaseField {
    override render() { /* ... */ }
}
```

**Files Affected**: All field classes in `src/field/`

### `strictNullChecks: true`

**Effort**: High
**Impact**: Extensive - requires null checks throughout codebase

This is the most impactful strict mode flag. It treats `null` and `undefined` as distinct types, requiring explicit handling:

```typescript
// Current - compiles without errors
let value: string;
console.log(value.length); // Runtime error if undefined

// With strictNullChecks - compile error
let value: string | undefined;
console.log(value.length); // Error: value might be undefined
console.log(value?.length); // OK - optional chaining
```

**Major Impact Areas**:
- DOM element queries (querySelector returns `Element | null`)
- Property initialization in constructors
- Array/Collection access (may return undefined)

### `strictPropertyInitialization: true`

**Effort**: Medium-High
**Impact**: Requires definite assignment in constructors

Ensures all class properties are initialized, either with a value or marked as potentially undefined:

```typescript
// Current - compiles
class Application {
    private _module: Module;  // Error with strict initialization
    constructor() {
        // _module not assigned
    }
}

// Required changes
class Application {
    private _module!: Module;  // Definite assignment assertion
    // OR
    private _module?: Module;  // Optional property
    // OR
    private _module: Module = new Module();  // Direct initialization
}
```

**Files Affected**: Primarily [src/component/application.ts](src/component/application.ts) (30+ properties)

### `noImplicitAny: true`

**Effort**: Low-Medium
**Impact**: Requires explicit types for parameters and variables

The codebase already has good type coverage, but some areas still rely on implicit `any`:

```typescript
// Current
function process(data) { /* ... */ }  // implicit any

// Required
function process(data: unknown) { /* ... */ }  // explicit type
```

## Migration Strategy

### Recommended Order

1. ✅ **Phase 1** (Complete): Safe flags with minimal code changes
2. **Phase 2a**: Enable `noImplicitOverride` - Add ~60 `override` keywords
3. **Phase 2b**: Enable `noImplicitAny` - Add explicit types
4. **Phase 3**: Enable `strictNullChecks` + `strictPropertyInitialization` together
   - These work best when enabled together
   - Will require significant refactoring
   - Consider using `skipLibCheck: true` to avoid type errors in dependencies

### Tools & Techniques

**For adding override keywords**:
```bash
# Find all methods that need override keyword
npx tsc --noEmit --noImplicitOverride 2>&1 | grep "must have an 'override' modifier"
```

**For finding implicit any**:
```bash
# Test with noImplicitAny
npx tsc --noEmit --noImplicitAny
```

**For strictNullChecks migration**:
- Use TypeScript's `--strictNullChecks` flag incrementally
- Add `// @ts-expect-error` comments for known issues
- Gradually fix file by file

## Benefits of Full Strict Mode

Once all flags are enabled, you'll benefit from:

- **Fewer runtime errors**: Catch null/undefined errors at compile time
- **Better IDE support**: More accurate autocomplete and error detection
- **Improved code quality**: Explicit types make code more maintainable
- **Easier refactoring**: TypeScript can catch breaking changes automatically
- **Better documentation**: Types serve as inline documentation

## Testing

All changes have been tested:
- ✅ TypeScript compilation: `npm run tsc-test`
- ✅ Full test suite: 95 test suites, 180 tests passed
- ✅ Build process: Successfully generates dist artifacts
- ✅ Bundle sizes unchanged: 242KB JS + 78KB CSS

## Further Reading

- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [TypeScript Strict Mode](https://www.typescriptlang.org/tsconfig#strict)
- [Migrating to Strict Mode](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html#enabling-errors-on-stricter-checking)
