# Testing Improvement & Coverage Plan

## Current State

### Test Suite Overview

| Metric | Value |
|--------|-------|
| Test suites | 95 |
| Total test cases | 180 |
| Avg tests per suite | 1.9 |
| Suites with only 1 test | 87 (84%) |
| Suites with 2+ tests | 16 |
| Files with no tests | 11 |
| Execution time | ~35s |

### Coverage Summary

| Category | Statements | Branches | Functions | Lines |
|----------|-----------|----------|-----------|-------|
| **src/core** | 72.31% | 67.20% | 67.73% | 72.31% |
| **src/utils** | 79.30% | 62.55% | 71.21% | 75.31% |
| **src/component** | 70.23% | 42.11% | 50.62% | 70.42% |
| **src/field** | 58.13% | 36.52% | 49.31% | 58.21% |
| **src/module** | 37.71% | 13.95% | 29.04% | 37.77% |
| **TOTAL** | **52.5%** | **34.91%** | **43.8%** | **51.79%** |

### Current Thresholds

```
statements: 50% | branches: 33% | functions: 42% | lines: 50%
```

### Lowest Coverage Files

| File | Stmts | Branches | Priority |
|------|-------|----------|----------|
| `module/helper.ts` | 7.52% | 0% | Critical |
| `module/cookie.ts` | 14.63% | 3.57% | Critical |
| `module/xhr.ts` | 17.39% | 1.33% | Critical |
| `module/geoLocation.ts` | 18.51% | 0% | Critical |
| `field/textareaField.ts` | 19.23% | 23.52% | High |
| `module/http.ts` | 29.26% | 50% | High |
| `module/eventBus.ts` | 34.78% | 20% | High |
| `module/depot.ts` | ~30% | ~10% | High |

### The Skeleton Test Problem

87 of 95 spec files contain only a single `instanceof` smoke test:

```typescript
// This is what 84% of tests look like
describe('ComponentName', () => {
    it('should be instance of ComponentName', () => {
        const component = new ComponentName(...args);
        expect(component).toBeInstanceOf(ComponentName);
    });
});
```

These validate that constructors don't throw, but test **zero** behavior.

---

## Test Infrastructure Upgrades

Before expanding tests, improve the test tooling.

### 1. Add Test Helper Factories

Create `src/test-helpers.ts` (excluded from build via tsconfig `exclude`):

```typescript
import { Knot } from './core/knot';
import { Objekt } from './core/objekt';
import { Query } from './core/query';

/** Create a Knot wrapping a fresh DOM element */
export function createKnot<T extends HTMLElement>(
    tag: string,
    attributes: Record<string, string> = {},
): Knot<T> {
    const el = document.createElement(tag) as T;
    for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(key, value);
    }
    document.body.appendChild(el);
    return new Knot<T>(el);
}

/** Create an Objekt with default test data */
export function createObjekt(data: object = {}): Objekt {
    return new Objekt({ id: 'test-1', name: 'Test', ...data });
}

/** Clean up DOM elements added during a test */
export function cleanupDOM(): void {
    document.body.innerHTML = '';
}
```

### 2. Adopt `test.each` for Parameterized Tests

Replace manual `for` loops with Jest's built-in parameterized testing:

```typescript
// Before (current pattern in knot.spec.ts)
const values = [1, 'hello', null];
for (const val of values) {
    expect(knot.getData('key')).toBe(val);
}

// After
test.each([1, 'hello', null])('getData returns %p', (val) => {
    knot.setData('key', val);
    expect(knot.getData('key')).toBe(val);
});
```

### 3. Fix Async Test Patterns

Current async tests don't use `await` or `done`, so assertions may not execute:

```typescript
// Before (current pattern — assertion may never run)
deferred.resolve(1);
deferred.promise().then((value) => {
    expect(value).toBe(1);
});

// After (proper async testing)
it('should resolve with value', async () => {
    deferred.resolve(1);
    const value = await deferred.promise();
    expect(value).toBe(1);
});
```

### 4. Add Per-Test DOM Setup/Teardown

Reduce reliance on the monolithic `jest.setup.ts` DOM. Individual tests should create their own DOM when possible:

```typescript
describe('Dropdown', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = '<div class="dropdown">...</div>';
        document.body.appendChild(container);
    });

    afterEach(() => {
        container.remove();
    });
});
```

### 5. Uncomment Existing Tests

`operation.spec.ts` has ~12 commented-out test cases for `each()`, `eachArray()`, `eachObject()`, `sleepEach()`, `list()`, `capitalize()`, `pluck()`. These should be restored.

---

## Phase 1: Core Layer Tests

**Target:** 72% → **85%** statements, 67% → **80%** branches
**Files:** 11 files, currently 8 have tests

### collection.spec.ts (currently 1 test → target 15+)

```
- should instantiate with an array of items
- should set and get items
- should find item by ID
- should return null when item not found by ID
- should find item by property value (findBy)
- should find item by condition callback (findByCondition)
- should find all items matching condition (findAllByCondition)
- should delete item by ID
- should delete item by condition
- should delete all items matching condition
- should replace an existing item
- should return collection length
- should iterate with each()
- should filter items
- should clear all items
```

### state.spec.ts (currently 1 test → target 10+)

```
- should instantiate with routes array
- should register a route with URL pattern
- should parse a simple path and match route
- should parse a path with parameters
- should return null for unmatched path
- should handle base path configuration
- should set and get current state
- should navigate to a route by ID
- should handle route with query parameters
- should call route handler on match
```

### query.spec.ts (currently 1 test → target 8+)

```
- should instantiate with a CSS selector
- should return a Knot from getKnot()
- should return null for non-matching selector
- should return all matching knots from getKnots()
- should return empty array for no matches
- should support typed element selection (Query<HTMLInputElement>)
- should support querySelectorAll behavior
- should handle nested selectors
```

### async.spec.ts (currently 1 test → target 8+)

```
- should instantiate
- should execute parallel calls and collect results
- should execute serial calls in order
- should handle empty call array
- should handle single call
- should handle failed calls gracefully
- should pass results between serial calls
- should support mixed sync/async calls
```

### promize.spec.ts (currently 1 test → target 8+)

```
- should instantiate
- should resolve with a value
- should reject with a reason
- should chain then handlers
- should call complete handler after resolve
- should call complete handler after reject
- should handle multiple then calls
- should not resolve after rejection
```

### module.spec.ts (currently 1 test → target 6+)

```
- should instantiate
- should load with instances and injections
- should register controllers
- should resolve dependencies in order
- should call enter() on controller activation
- should call exit() on controller deactivation
```

### router.spec.ts (currently 2 tests → target 8+)

```
- should resolve URL parameters (existing)
- should stringify query parameters (existing)
- should handle optional parameters
- should encode special characters
- should handle empty parameter objects
- should parse URLs with multiple segments
- should handle trailing slashes
- should match route patterns with wildcards
```

### knot.spec.ts (currently 4 tests → target 15+)

```
- should set and get attributes (existing)
- should handle data attributes (existing)
- should add and remove CSS classes
- should toggle CSS classes
- should check hasClass
- should set and get text content
- should set and get HTML content
- should append child knot
- should remove child knot
- should get parent knot
- should get next/previous sibling
- should add and remove event listeners
- should set inline styles
- should check isEmpty
- should destroy and remove from DOM
```

---

## Phase 2: Utils Layer Tests

**Target:** 79% → **90%** statements, 62% → **80%** branches
**Files:** 9 files, strongest layer but still has gaps

### operation.spec.ts (currently 53 tests → target 65+)

Restore the ~12 commented-out tests:

```
- each() — iterate arrays and objects
- eachArray() — iterate arrays with index
- eachObject() — iterate objects with key/value
- sleepEach() — iterate with delay
- list() — convert to list
- capitalize() — capitalize strings
- pluck() — extract property from array of objects
- format() — string formatting
- merge() — deep object merge
- scrollTo() — scroll animation
- scrollIntoView() — element scroll
- debounce() — debounce utility
```

### dateio.spec.ts (currently 4 tests → target 15+)

```
- should set locale (existing)
- should format to ISO string (existing)
- should parse date from number (existing)
- should parse date from string (existing)
- should format date with custom pattern
- should get year, month, day components
- should add days/months/years
- should subtract days/months/years
- should compare dates (isBefore, isAfter, isSame)
- should handle start/end of day/month/year
- should calculate difference between dates
- should handle invalid date input
- should format relative time
- should handle timezone-aware operations
- should handle edge cases (leap years, DST)
```

### color.spec.ts (currently 8 tests → target 12+)

```
- (existing 8 tests)
- should handle edge case colors (black, white, transparent)
- should validate hex color strings
- should calculate luminance
- should generate color palette variations
```

### math.spec.ts (currently 14 tests → target 18+)

```
- (existing 14 tests)
- should handle negative numbers in readableNumber
- should handle zero values
- should handle very large numbers
- should handle precision edge cases
```

---

## Phase 3: Module Layer Tests (Critical Priority)

**Target:** 37% → **60%** statements, 13% → **40%** branches
**Files:** 28 files, weakest layer

### http.spec.ts (currently 1 test → target 12+)

```
- should instantiate (existing)
- should set authorization with username/password
- should set authorization with bearer token
- should clear authorization
- should make GET request via XHR
- should make POST request with body
- should make PUT request
- should make DELETE request
- should handle successful response
- should handle error response (4xx)
- should handle server error (5xx)
- should handle network timeout
```

**Mocking strategy:** Mock `XMLHttpRequest` globally in the test file:

```typescript
const mockXHR = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    status: 200,
    responseText: '{}',
    onreadystatechange: null,
};
jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => mockXHR as any);
```

### xhr.spec.ts (currently 1 test → target 10+)

```
- should instantiate (existing)
- should set request headers
- should set authorization header
- should handle JSON response parsing
- should handle text response
- should extract filename from Content-Disposition header
- should handle CORS requests
- should handle abort
- should handle timeout
- should build query string for GET params
```

### eventBus.spec.ts (currently 1 test → target 10+)

```
- should instantiate (existing)
- should subscribe to an event
- should publish an event and notify subscribers
- should pass data to event handlers
- should support multiple subscribers on same event
- should unsubscribe from an event
- should not notify unsubscribed handlers
- should handle publishing with no subscribers
- should support wildcard/namespace events (if applicable)
- should preserve subscription order
```

### depot.spec.ts (currently 1 test → target 10+)

```
- should instantiate (existing)
- should set and get item from localStorage
- should set and get item from sessionStorage
- should remove item
- should handle complex objects (serialize/deserialize)
- should handle null/undefined values
- should clear all items
- should handle storage quota exceeded
- should check if key exists
- should return default when key not found
```

**Mocking strategy:** jsdom provides `localStorage`/`sessionStorage` by default.

### cookie.spec.ts (currently 1 test → target 8+)

```
- should instantiate (existing)
- should set a cookie
- should get a cookie value
- should remove a cookie
- should handle cookie expiration
- should handle cookie path/domain
- should return null for non-existent cookie
- should handle special characters in values
```

### browser.spec.ts (currently 1 test → target 8+)

```
- should instantiate (existing)
- should detect browser type
- should detect operating system
- should detect mobile vs desktop
- should detect browser features
- should handle unknown user agents
- should check specific feature support
- should return browser version info
```

### helper.spec.ts (currently 1 test → target 12+)

```
- should instantiate (existing)
- should detect screen size breakpoints
- should handle orientation changes
- should provide viewport dimensions
- should handle resize events
- should detect touch capability
- should handle scroll events
- should provide device pixel ratio
- should detect dark mode preference
- should handle media query matching
- should manage event cleanup
- should handle multiple resize listeners
```

### baseModal.spec.ts / dialog.spec.ts / confirm.spec.ts (each currently 1 test → target 6+ each)

```
- should instantiate (existing)
- should open modal
- should close modal
- should set title
- should set body content
- should handle OK action callback
- should handle Cancel action callback
- should handle minimize/maximize (if configured)
```

### geoLocation.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should request current position
- should handle permission denied
- should watch position changes
- should stop watching position
- should handle unavailable location
```

**Mocking strategy:** Already mocked via `@googlemaps/jest-mocks`. Add navigator.geolocation mock:

```typescript
const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
    clearWatch: jest.fn(),
};
Object.defineProperty(navigator, 'geolocation', { value: mockGeolocation });
```

### template.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should load template from URL
- should parse template variables
- should render template with data
- should handle missing template
- should cache loaded templates
```

### scheduler.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should schedule a callback
- should cancel a scheduled callback
- should handle recurring schedules
- should handle immediate execution
- should manage multiple schedules
```

### screen.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should detect screen dimensions
- should handle orientation
- should detect breakpoints
- should handle resize
- should manage lock/unlock
```

---

## Phase 4: Field Layer Tests

**Target:** 58% → **75%** statements, 36% → **55%** branches
**Files:** 24 field types, all with skeleton tests

### Common Test Pattern for All Fields

Every field spec should be expanded with these standard tests:

```typescript
describe('FieldName', () => {
    let field: FieldName;

    beforeEach(() => {
        const inputBlock = new Query('.input-block.field-type').getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        field = new FieldName(input, label, error, inputBlock);
    });

    it('should be instance of FieldName', () => {
        expect(field).toBeInstanceOf(FieldName);
    });

    it('should get and set value', () => {
        field.setValue('test-value');
        expect(field.getValue()).toBe('test-value');
    });

    it('should get previous value after change', () => {
        field.setValue('first');
        field.setValue('second');
        expect(field.getPreviousValue()).toBe('first');
    });

    it('should validate required field', () => {
        // Test with required attribute
        expect(field.isValid()).toBe(false); // empty
        field.setValue('value');
        expect(field.isValid()).toBe(true);
    });

    it('should set and check disabled state', () => {
        field.setDisabled(true);
        expect(field.isDisabled()).toBe(true);
        field.setDisabled(false);
        expect(field.isDisabled()).toBe(false);
    });

    it('should set label text', () => {
        field.setLabel('New Label');
        // assert label content changed
    });

    it('should show error state', () => {
        field.setError('Error message');
        // assert error is displayed
    });

    it('should render correctly', () => {
        field.render();
        // assert DOM structure is correct
    });

    it('should refresh correctly', () => {
        field.refresh();
        // assert DOM is updated
    });
});
```

### Priority Fields (lowest coverage or most complex)

**textareaField.spec.ts** (19.23% → target 70%):
```
- Standard tests above
- should handle multiline content
- should handle maxlength attribute
- should handle rich text mode (if applicable)
- should resize on content change
```

**selectField.spec.ts** (45.53% → target 70%):
```
- Standard tests above
- should render options list
- should select option by value
- should handle multiple selection
- should filter options with search
- should handle empty options
- should open/close dropdown popup
```

**fileField.spec.ts** (~50% → target 70%):
```
- Standard tests above
- should handle file selection
- should display file name
- should clear selected file
- should validate file type
- should handle image preview
```

**dateTimeField.spec.ts** (~50% → target 70%):
```
- Standard tests above
- should handle date input
- should handle time input
- should format date/time display
- should validate date ranges
- should handle calendar popup
```

**locationField.spec.ts** (~40% → target 65%):
```
- Standard tests above
- should handle coordinates input
- should display map marker
- should handle geocoding
- should validate coordinate format
```

**radiobuttonField.spec.ts** (~50% → target 70%):
```
- Standard tests above
- should render radio options
- should select one option at a time
- should handle default selection
- should emit change event
```

---

## Phase 5: Component Layer Tests

**Target:** 70% → **80%** statements, 42% → **55%** branches
**Files:** 29 components, all with skeleton tests

### form.spec.ts (currently 1 test → target 15+)

```
- should instantiate (existing)
- should initialize form fields from DOM
- should get form model as Objekt
- should set form model data
- should validate all fields
- should return invalid fields list
- should handle form submission
- should prevent submission when invalid
- should reset form to initial values
- should lock/unlock form
- should handle field change events
- should get field by name
- should delete field
- should set button classes
- should set field classes
```

### table.spec.ts (currently 1 test → target 12+)

```
- should instantiate (existing)
- should set table headers
- should render rows from data
- should handle empty data
- should sort by column
- should handle row selection
- should handle row click events
- should render action buttons per row
- should handle pagination integration
- should update with new data
- should handle column visibility
- should render custom cell templates
```

### application.spec.ts (currently 1 test → target 10+)

```
- should instantiate (existing)
- should register module instances
- should provide access to registered instances
- should initialize event bus
- should initialize HTTP client
- should initialize router
- should handle routing on startup
- should log development mode message
- should set config options
- should run the application lifecycle
```

### calendar.spec.ts (currently 1 test → target 8+)

```
- should instantiate (existing)
- should render current month
- should navigate to next/previous month
- should select a date
- should highlight today
- should handle date range constraints
- should render day names
- should emit date selection event
```

### dropdown.spec.ts (currently 1 test → target 8+)

```
- should instantiate (existing)
- should open dropdown menu
- should close dropdown menu
- should render menu items
- should handle item selection
- should handle item click callback
- should set selected item
- should handle empty items list
```

### navigation.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should render navigation items
- should set active item
- should handle item click
- should handle nested navigation
- should highlight current route
```

### pager.spec.ts (currently 1 test → target 8+)

```
- should instantiate (existing)
- should render page numbers
- should handle next/previous page
- should handle first/last page
- should update on page change
- should handle total count changes
- should calculate page count correctly
- should disable buttons at boundaries
```

### tabPanel.spec.ts (currently 1 test → target 6+)

```
- should instantiate (existing)
- should render tabs
- should switch active tab
- should show/hide tab content
- should handle tab click event
- should set default active tab
```

---

## Coverage Targets by Phase

| Phase | Statements | Branches | Functions | Lines |
|-------|-----------|----------|-----------|-------|
| Current | 52.5% | 34.91% | 43.8% | 51.79% |
| After Phase 1 (Core) | 58% | 42% | 50% | 58% |
| After Phase 2 (Utils) | 62% | 48% | 55% | 62% |
| After Phase 3 (Module) | 68% | 52% | 60% | 68% |
| After Phase 4 (Field) | 73% | 56% | 65% | 73% |
| After Phase 5 (Component) | **78%** | **60%** | **70%** | **78%** |

### Update Thresholds in jest.config.cjs

After each phase, increase the coverage thresholds:

```javascript
// After Phase 1
coverageThreshold: {
    global: {
        statements: 55,
        branches: 38,
        functions: 47,
        lines: 55,
    },
},

// After Phase 3
coverageThreshold: {
    global: {
        statements: 65,
        branches: 48,
        functions: 57,
        lines: 65,
    },
},

// Final (after Phase 5)
coverageThreshold: {
    global: {
        statements: 75,
        branches: 55,
        functions: 65,
        lines: 75,
    },
},
```

---

## Estimated Scope

| Phase | Files Modified | New Tests | Priority |
|-------|---------------|-----------|----------|
| Infrastructure | 3 | 0 | Setup |
| Phase 1: Core | 7 | ~70 | High |
| Phase 2: Utils | 5 | ~30 | Medium |
| Phase 3: Module | 15+ | ~120 | Critical |
| Phase 4: Field | 20+ | ~100 | High |
| Phase 5: Component | 10+ | ~80 | Medium |
| **Total** | **~60** | **~400** | |

This would bring the test suite from **180 → ~580 test cases**.

---

## Execution Guidelines

1. **Each phase is a separate PR** — merge and verify coverage increases before proceeding
2. **Run coverage after each file** — `npx jest --coverage src/path/file.spec.ts`
3. **Prioritize branches** — branch coverage (34.91%) is the weakest metric
4. **Don't test trivially** — avoid testing simple getters/setters unless they contain logic
5. **Mock external dependencies** — XMLHttpRequest, localStorage, navigator, Google Maps
6. **Use existing DOM from jest.setup.ts** — leverage the pre-built DOM structure where possible
7. **Create isolated DOM for new tests** — when the global DOM doesn't have the needed structure
8. **Fix async tests** — always `await` promises or use `done` callback
9. **Test error paths** — most current tests only cover happy paths
10. **Test edge cases** — null inputs, empty arrays, boundary values
