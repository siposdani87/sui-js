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

### Approach: Modern Best Practices

**Rewrite existing skeleton tests** and add new ones. The 87 single-`instanceof` tests should be replaced with proper behavioral test suites. Existing tests with issues (broken async, manual loops, missing cleanup) should also be fixed. Use modern Jest best practices:

- **Nested `describe` blocks** — group tests by method or feature, not flat single-test files
- **`beforeEach` / `afterEach`** — proper setup and teardown per test
- **Isolated DOM** — create minimal DOM per test in `beforeEach`, remove in `afterEach`; avoid relying on shared global DOM from `jest.setup.ts`
- **`test.each` / `describe.each`** — parameterized tests instead of manual `for` loops
- **`jest.fn()`** — verify callbacks, event handlers, and async resolution
- **`jest.useFakeTimers()`** — test scheduled/timed operations deterministically
- **Specific matchers** — use `toHaveLength`, `toMatchObject`, `toBeNull`, `toContain`, `toThrow` instead of generic `toBe(true)`
- **Error paths and edge cases** — test null input, empty arrays, boundary values, invalid data
- **Proper mock lifecycle** — save originals in `beforeEach`, restore in `afterEach`

**Anti-patterns to avoid:**
- Single `instanceof` smoke tests (test zero behavior)
- Manual `for` loops for parameterized tests
- Non-awaited `.then()` assertions (may never execute)
- Shared mutable global DOM without cleanup
- Testing only happy paths

See `.claude/testing-guide.md` for detailed code examples of all patterns.

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

### 6. Fix Existing Tests

Existing tests with quality issues should be rewritten during each phase:

**`deferred.spec.ts`** (6 tests) — fix non-awaited `.then()` assertions; use `jest.fn()` for Promize callbacks:
```typescript
// Before (assertion may never run)
deferred.resolve(1);
deferred.promise().then((value) => {
    expect(value).toBe(1);
});

// After (verified synchronously)
const onResolve = jest.fn();
deferred.promise().then(onResolve);
deferred.resolve(1);
expect(onResolve).toHaveBeenCalledWith(1);
```

**`knot.spec.ts`** (4 tests) — replace manual `for` loops with `test.each`; add `afterEach` cleanup

**`objekt.spec.ts`** (14 tests) — restructure into nested `describe` blocks by method; add edge cases

**`router.spec.ts`** (2 tests) — expand with `test.each` for parameter patterns

**`operation.spec.ts`** (53 tests) — restore commented-out tests; restructure into `describe` blocks by category; replace manual loops with `test.each`

**`coder.spec.ts`** (8 tests), **`color.spec.ts`** (8 tests), **`math.spec.ts`** (14 tests), **`dateio.spec.ts`** (4 tests) — restructure into nested `describe` blocks; add edge case coverage

**All 87 skeleton tests** — replace single `instanceof` checks with full behavioral test suites during the relevant phase

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

### Common Test Structure for All Fields

Every field spec should be rewritten with isolated DOM, nested describes, and proper assertions:

```typescript
describe('FieldName', () => {
    let field: FieldName;
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
            <div class="input-block field-type">
                <input type="text" name="test-field" />
                <label>Test</label>
                <span class="error"></span>
            </div>
        `;
        document.body.appendChild(container);

        const inputBlock = new Knot(container.querySelector('.input-block')!);
        const input = new Knot(container.querySelector('input')!);
        const label = new Knot(container.querySelector('label')!);
        const error = new Knot(container.querySelector('.error')!);
        field = new FieldName(input, label, error, inputBlock);
    });

    afterEach(() => {
        container.remove();
    });

    describe('getValue / setValue', () => {
        it('should set and return value', () => {
            field.setValue('test-value');
            expect(field.getValue()).toBe('test-value');
        });

        it('should track previous value', () => {
            field.setValue('first');
            field.setValue('second');
            expect(field.getPreviousValue()).toBe('first');
        });
    });

    describe('validation', () => {
        it('should be invalid when empty and required', () => {
            // set required attribute on input
            expect(field.isValid()).toBe(false);
        });

        it('should be valid with value', () => {
            field.setValue('value');
            expect(field.isValid()).toBe(true);
        });
    });

    describe('disabled state', () => {
        it('should toggle disabled', () => {
            field.setDisabled(true);
            expect(field.isDisabled()).toBe(true);
            field.setDisabled(false);
            expect(field.isDisabled()).toBe(false);
        });
    });

    describe('render', () => {
        it('should render without errors', () => {
            expect(() => field.render()).not.toThrow();
        });
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

## Phase 6: Missing File Tests (`src/common/`)

**Target:** Add test coverage for files not covered by Phase 1–5
**Files:** 3 production files with zero tests

### config.spec.ts (new file, target 5+)

```
- should set release mode to true
- should set release mode to false
- should return current release mode
- should default to release mode off
- should affect logging behavior when release mode changes
```

### controller.spec.ts (new file, target 8+)

```
- should instantiate
- should call enter() on activation
- should call exit() on deactivation
- should receive injected dependencies
- should handle missing dependencies gracefully
- should call lifecycle methods in correct order
- should support multiple enter/exit cycles
- should not throw when exit() called without prior enter()
```

### service.spec.ts (new file, target 6+)

```
- should instantiate
- should register in DI container
- should be retrievable after registration
- should support singleton pattern
- should handle initialization with options
- should expose public API methods
```

---

## Phase 7: Module Export Validation

**Target:** Ensure all public classes are exported from the package entry point
**Files:** 1 new test file

### index.spec.ts (new file, target 15+)

The `src/index.ts` is the single entry point re-exporting all modules. There is no test verifying completeness — a class could be accidentally removed from barrel exports (e.g., `treeView` is already commented out in `component/index.ts`) without detection.

```typescript
import * as SUI from './index';

describe('Module exports', () => {
    describe('core exports', () => {
        it.each([
            'Knot', 'Objekt', 'Query', 'Collection',
            'State', 'Module', 'Deferred', 'Promize', 'Async',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('field exports', () => {
        it.each([
            'TextField', 'SelectField', 'CheckboxField',
            'RadiobuttonField', 'FileField', 'DateTimeField',
            'NumberField', 'ColorField', 'TextareaField',
            'LocationField', 'RangeField', 'SearchField',
            'UrlField', 'HiddenField', 'SwitchField',
            'IconToggleField', 'AutoCompleteField',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('component exports', () => {
        it.each([
            'Application', 'Form', 'Table', 'Calendar',
            'Dropdown', 'Navigation', 'Pager', 'TabPanel',
            'Popup', 'PopupContainer', 'GoogleMap',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('module exports', () => {
        it.each([
            'Http', 'EventBus', 'Dialog', 'Confirm',
            'Cookie', 'Depot', 'Browser', 'Screen',
            'Template', 'Scheduler', 'Flash',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });

    describe('utils exports', () => {
        it.each([
            'DateIO', 'Coder', 'Color', 'Math',
        ])('should export %s', (name) => {
            expect(SUI[name]).toBeDefined();
        });
    });
});
```

---

## Phase 8: Memory Leak Tests

**Target:** Verify event listener cleanup and component disposal
**Priority:** Critical — 109 `addEventListener` calls vs only 8 `removeEventListener` calls (13:1 ratio)

### The Problem

Multiple modules add DOM/window event listeners but never remove them:

| File | Listeners Added | Cleanup Method |
|------|----------------|----------------|
| `module/screen.ts` | resize, scroll, online, offline | None |
| `module/page.ts` | document click | None |
| `component/form.ts` | keydown, submit, reset | None |
| `component/popup.ts` | close button click | None |
| `component/carousel.ts` | touch events | None |
| `module/helper.ts` | resize, orientation | None |

Additionally, `PopupContainer` stores state on `window['popup_collection']` which is never cleaned up.

### Test Strategy

Use a helper to count listeners before/after lifecycle:

```typescript
function countListeners(element: EventTarget): number {
    // Use Knot's internal listener store
    return (element as any)['_listeners']?.length ?? 0;
}
```

### memory-leak.spec.ts (new file, target 15-20)

```
- should remove all event listeners when Knot is destroyed
- should not leak listeners after repeated Popup open/close cycles
- should clean up Form listeners on destroy
- should remove Screen resize/scroll listeners on cleanup
- should remove Page document click listener on cleanup
- should clean up Carousel touch listeners on destroy
- should not grow window['popup_collection'] after repeated popup creation
- should clean up Helper resize/orientation listeners
- should not leak listeners after Dialog open/close cycle
- should not leak listeners after Confirm open/close cycle
- should clean up Timer/Scheduler intervals on destroy
- should not retain references to removed Knot nodes
- should clean up EventBus subscriptions when module is destroyed
- should not leak DOM nodes after repeated Table re-render
- should clean up Navigation click listeners on destroy
```

### Implementation Note

This phase likely requires adding `destroy()` methods to components that lack them. Each test should verify:
1. Create component → check initial listener count
2. Interact with component (open, click, resize, etc.)
3. Call `destroy()` or equivalent cleanup
4. Verify listener count returns to zero

---

## Phase 9: Integration Tests

**Target:** Test module interactions and end-to-end workflows
**Files:** New `src/__integration__/` directory or `*.integration.spec.ts` naming

### The Gap

Phase 1–5 tests each class in isolation. These integration tests verify that classes work together correctly.

### application-lifecycle.integration.spec.ts (target 8+)

```
- should initialize all core modules (EventBus, Http, Router, Screen)
- should route to correct controller on URL change
- should trigger state.change → module.afterInit → controller.loaded sequence
- should propagate EventBus events through Application to modules
- should handle routing errors gracefully (404 route)
- should clean up previous controller when navigating to new route
- should pass DI instances to controllers correctly
- should call controller exit() before enter() on route change
```

### form-field.integration.spec.ts (target 10+)

```
- should initialize all field types from DOM
- should collect form model as Objekt from all fields
- should cascade validation across all fields on submit
- should prevent submission when any field is invalid
- should reset all fields to initial values on reset
- should set model data and update field values
- should handle field enable/disable affecting form validity
- should fire change event when any field value changes
- should lock/unlock all fields simultaneously
- should handle dynamic field addition and removal
```

### http-template-flash.integration.spec.ts (target 6+)

```
- should load template via HTTP and render into DOM
- should show flash error message on HTTP failure
- should show flash success message on HTTP success
- should handle network timeout with appropriate flash message
- should retry failed template loads
- should handle concurrent HTTP requests without race conditions
```

### eventbus-module.integration.spec.ts (target 6+)

```
- should deliver events from one module to another
- should support multiple subscribers across modules
- should handle unsubscribe during event delivery
- should preserve event delivery order
- should isolate event namespaces between modules
- should handle events fired during module initialization
```

---

## Phase 10: Async Leak Detection & Timer Tests

**Target:** Fix `forceExit: true` requirement and ensure clean test teardown
**Priority:** High — Jest currently cannot shut down cleanly

### The Problem

`jest.config.cjs` has `forceExit: true`, indicating hanging async operations. Test output shows:
> Force exiting Jest: Have you considered using `--detectOpenHandles` to detect async operations that kept running after all tests finished?

Root causes:
- `deferred.spec.ts` has non-awaited `.then()` assertions with `setTimeout`
- `Scheduler` creates timers without cleanup tests
- XHR mocks may leave pending requests
- Debounced functions in `Screen`, `Helper` leave active timers

### Infrastructure Changes

```javascript
// jest.config.cjs — add after forceExit
detectOpenHandles: true, // Enable temporarily to find leaking handles
```

### async-cleanup.spec.ts (new file, target 10-15)

```
- should not leave pending timers after Scheduler destroy
- should not leave pending XHR requests after Http abort
- should not leave pending timers after debounce cancellation
- should clean up setTimeout in Deferred after resolution
- should clean up setTimeout in Deferred after rejection
- should not leave pending intervals after Screen cleanup
- should not leave pending timers after Helper cleanup
- should cancel all pending Promize chains on module destroy
- should handle rapid resolve/reject without leaking
- should clean up animation frames after component destroy
```

### Timer Test Pattern

All tests involving timers should use fake timers:

```typescript
describe('Scheduler', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('should execute callback after delay', () => {
        const callback = jest.fn();
        scheduler.setTimeout(callback, 1000);
        jest.advanceTimersByTime(1000);
        expect(callback).toHaveBeenCalledTimes(1);
    });
});
```

---

## Phase 11: Error Boundary & Failure Mode Tests

**Target:** Verify graceful handling of error scenarios
**Files:** Distributed across existing spec files + new error-scenarios.spec.ts

### error-scenarios.spec.ts (new file, target 15-20)

```
- should handle controller throw during initialization without crashing Application
- should handle Template.load() network failure gracefully
- should handle localStorage quota exceeded in Depot
- should handle sessionStorage quota exceeded in Depot
- should handle Google Maps API load failure
- should handle invalid JSON response in Http
- should handle malformed URL in Router
- should handle missing DOM element in Query without throwing
- should handle null/undefined Knot operations gracefully
- should handle EventBus handler throw without blocking other subscribers
- should handle Form submission with destroyed fields
- should handle Cookie access when cookies are disabled
- should handle navigator.geolocation permission denied
- should handle navigator.geolocation position unavailable
- should handle invalid date input in DateIO
- should handle Collection operations on empty collection
- should handle concurrent Http requests when one fails
```

---

## Phase 12: Snapshot Tests

**Target:** Catch unintended DOM structure changes in UI components
**Priority:** Medium — add after unit tests are solid

### Snapshot Test Strategy

Use `toMatchSnapshot()` for complex rendered output. Store snapshots in `__snapshots__/` directories next to spec files.

### Components to Snapshot (target 15-20)

```
- Calendar — month view with days grid
- Table — header and row structure
- Form — rendered field layout with labels and errors
- Dropdown — open state with menu items
- Navigation — rendered nav items with active state
- Dialog — open state with header, body, footer
- Confirm — open state with action buttons
- Pager — rendered pagination controls
- TabPanel — tabs with active panel
- Flash — rendered flash messages (success, error, warning)
- LeftMenu — open state with main and sub menus
- Header — rendered header with brand and menu buttons
- CardCollection — rendered card grid with template
- ProgressStatus — rendered progress indicator
- Tooltip — rendered tooltip with content
```

### Snapshot Test Pattern

```typescript
describe('Calendar snapshots', () => {
    it('should match month view snapshot', () => {
        const container = document.createElement('div');
        // ... setup calendar
        calendar.render();
        expect(container.innerHTML).toMatchSnapshot();
    });

    it('should match month view with selected date', () => {
        calendar.selectDate(new Date(2024, 5, 15));
        calendar.render();
        expect(container.innerHTML).toMatchSnapshot();
    });
});
```

**Note:** Run `npx jest --updateSnapshot` when intentional DOM changes are made.

---

## Phase 13: Accessibility (a11y) Tests

**Target:** Verify keyboard navigation, ARIA attributes, and screen reader support
**Priority:** Medium — requires `jest-axe` dependency

### Infrastructure

```bash
npm install --save-dev jest-axe @types/jest-axe
```

### a11y Test Pattern

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Dialog a11y', () => {
    it('should have no accessibility violations', async () => {
        dialog.open('Title', '<p>Content</p>');
        const results = await axe(document.getElementById('dialog'));
        expect(results).toHaveNoViolations();
    });
});
```

### a11y Tests per Component (target 15-20)

```
- Dialog should have role="dialog" and aria-modal="true"
- Dialog should trap focus within modal when open
- Dialog should return focus to trigger element on close
- Confirm should have role="alertdialog"
- Dropdown should have aria-expanded attribute
- Dropdown should support Arrow key navigation
- Form fields should have associated labels (aria-labelledby)
- Form errors should use aria-describedby
- Navigation should have role="navigation"
- TabPanel should have role="tablist" with aria-selected
- Flash messages should use role="alert" for screen readers
- Pager buttons should have aria-label for screen readers
- Close buttons should have aria-label="Close"
- Icon-only buttons should have accessible names
- Calendar should support keyboard date selection
```

### Implementation Note

This phase may require source code changes to add ARIA attributes. Each a11y test should:
1. Render the component
2. Run `axe()` for automated checks
3. Verify specific keyboard interactions
4. Verify ARIA attributes are present and correct

---

## Implementation Results (Phases 0–13)

All 14 phases have been executed. Summary of outcomes:

| Metric | Before | After (Phase 13) | After (Latest) | Plan Target |
|--------|--------|-------------------|-----------------|-------------|
| Test suites | 95 | 108 | **108** | — |
| Test cases | 180 | 1,025 | **1,187** | ~725 |
| Statements | 52.5% | 65.83% | **75.02%** | 85% |
| Branches | 34.91% | 52.77% | **60.98%** | 69% |
| Functions | 43.8% | 60.03% | **69.26%** | 78% |
| Lines | 51.79% | 65.31% | **74.64%** | 85% |
| Snapshots | 0 | 15 | **15** | 15–20 |

Coverage thresholds in `jest.config.cjs` updated to: `statements: 65, branches: 52, functions: 59, lines: 65`.

---

## Phase 14: HTTP Layer Deep Testing

**Target:** `xhr.ts` → 90%+, `http.ts` → 90%+, `template.ts` → 80%+
**Impact:** ~+3% overall statements
**Prerequisite:** XMLHttpRequest mock in `src/test-helpers.ts`

### Infrastructure: Add `createMockXHR()` to `src/test-helpers.ts`

```typescript
export function createMockXHR() {
    const xhr: any = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        getResponseHeader: jest.fn(),
        abort: jest.fn(),
        readyState: 0,
        status: 0,
        responseText: '',
        response: null,
        responseType: '',
        onreadystatechange: null as Function | null,
        onload: null as Function | null,
        onerror: null as Function | null,
        ontimeout: null as Function | null,
        upload: { addEventListener: jest.fn() },
    };
    xhr.respond = (status: number, body: string, headers: Record<string, string> = {}) => {
        xhr.status = status;
        xhr.readyState = 4;
        xhr.responseText = body;
        xhr.response = body;
        xhr.getResponseHeader.mockImplementation((h: string) => headers[h] ?? null);
        xhr.onreadystatechange?.();
        xhr.onload?.();
    };
    return xhr;
}
```

### xhr.spec.ts (target 15+)

```
- should set request headers
- should set authorization header (basic auth)
- should set authorization header (bearer token)
- should handle JSON response parsing
- should handle text response
- should handle blob response type
- should extract filename from Content-Disposition header
- should build query string for GET params
- should handle CORS requests
- should handle abort
- should handle timeout
- should handle network error
- should handle readyState lifecycle transitions
- should handle empty response body
- should handle HTTP error status codes (4xx, 5xx)
```

### http.spec.ts (target 15+)

```
- should make GET request via XHR
- should make POST request with JSON body
- should make PUT request
- should make PATCH request
- should make DELETE request
- should set authorization with username/password
- should set authorization with bearer token
- should clear authorization
- should handle successful JSON response
- should handle error response (4xx)
- should handle server error (5xx)
- should handle network timeout
- should add default headers
- should handle concurrent requests
- should handle request with query parameters
```

### template.spec.ts (target 10+)

```
- should load template from URL via Http
- should parse template variables
- should render template with data
- should handle missing template (404)
- should cache loaded templates
- should handle template with nested variables
- should inject rendered content into DOM
- should handle empty template
- should handle template load network error
- should replace existing content on re-render
```

Verify: `npx jest src/module/xhr.spec.ts src/module/http.spec.ts src/module/template.spec.ts --coverage`

---

## Phase 15: Deep-Test Major Components

**Target:** `table.ts` → 70%+, `form.ts` → 80%+, `calendar.ts` → 80%+
**Impact:** ~+4% overall statements

### table.spec.ts (target 15+)

```
- should set table headers from column config
- should render rows from Collection data
- should handle empty data set
- should sort by column (ascending)
- should sort by column (descending)
- should handle row click event callback
- should render action buttons per row
- should handle pagination integration
- should update rows with new data
- should handle column visibility toggle
- should render custom cell templates
- should handle row selection (single)
- should handle row selection (multiple)
- should apply row CSS classes conditionally
- should handle large datasets without errors
```

### form.spec.ts (target 15+)

```
- should initialize form fields from DOM input elements
- should get form model as Objekt
- should set form model data and update fields
- should validate all fields on submit
- should return list of invalid fields
- should prevent submission when any field is invalid
- should call submit callback on valid submission
- should reset all fields to initial values
- should lock/unlock all fields
- should handle field change event propagation
- should get field by name
- should delete field by name
- should set button CSS classes
- should set field CSS classes
- should handle keydown events (Enter to submit)
```

### calendar.spec.ts (target 12+)

```
- should render current month with correct day count
- should navigate to next month
- should navigate to previous month
- should select a date and emit event
- should highlight today's date
- should handle date range constraints (min/max)
- should render day name headers
- should navigate to next year
- should navigate to previous year
- should handle month/year picker views
- should handle edge cases (Feb 29, month boundaries)
- should apply selected CSS class to chosen date
```

Verify: `npx jest src/component/table.spec.ts src/component/form.spec.ts src/component/calendar.spec.ts --coverage`

---

## Phase 16: Add `destroy()` Methods to Production Code

**Target:** Enable proper cleanup + remove `forceExit: true` from `jest.config.cjs`
**Impact:** No direct coverage gain, but unblocks Phase 17 and fixes Jest shutdown

All changes are additive — add a `destroy()` public method that removes event listeners added during construction or `_init()`.

### Files to modify

| File | Listeners to remove in `destroy()` |
|------|------------------------------------|
| `module/screen.ts` | `window` resize, scroll, online, offline |
| `module/page.ts` | `document` click |
| `component/form.ts` | keydown, submit, reset on form element |
| `component/carousel.ts` | touch event listeners |
| `module/helper.ts` | `window` resize, orientationchange |
| `core/state.ts` | `window` popstate |

### Pattern

Store listener references during `_init()` so they can be removed:

```typescript
private _onResize: () => void;

_init(): void {
    this._onResize = () => { /* ... */ };
    window.addEventListener('resize', this._onResize);
}

destroy(): void {
    window.removeEventListener('resize', this._onResize);
}
```

### Update existing tests

Add `afterEach` cleanup to all tests that instantiate these classes:

```typescript
afterEach(() => {
    instance.destroy();
});
```

### Remove `forceExit`

After all `destroy()` methods are in place and tests call them in `afterEach`:
- Remove `forceExit: true` from `jest.config.cjs`
- Run `npx jest --detectOpenHandles` to confirm no leaking handles remain

Verify: `npx tsc --noEmit && npm run test`

---

## Phase 17: Menu Module Tests

**Target:** `footer.ts` → 70%+, `topMenu.ts` → 70%+, `navBar.ts` → 70%+, `header.ts` → 70%+, `leftMenu.ts` → 70%+, `bottomMenu.ts` → 70%+
**Impact:** ~+3% overall statements

All menu modules follow a similar pattern: receive a DOM container, render menu items from config, handle active state. Use a shared test structure.

### Common test cases per menu module (target 8+ each)

```
- should instantiate with container element
- should render menu items from config
- should set active menu item
- should handle menu item click callback
- should handle empty items list
- should toggle open/close state
- should render submenu items (if applicable)
- should apply CSS classes to active item
```

### Module-specific additions

**header.spec.ts:**
```
- should render brand/logo area
- should show/hide progress bar
- should render menu trigger button
```

**leftMenu.spec.ts:**
```
- should toggle submenu expand/collapse
- should handle nested submenu levels
- should close other submenus on open
```

**footer.spec.ts:**
```
- should render footer menu items
- should handle copyright text
```

Verify: `npx jest src/module/footer.spec.ts src/module/topMenu.spec.ts src/module/navBar.spec.ts src/module/header.spec.ts src/module/leftMenu.spec.ts src/module/bottomMenu.spec.ts --coverage`

---

## Phase 18: Canvas 2D Mock + Tests

**Target:** `canvas.ts` → 70%+
**Impact:** ~+1% overall statements
**Prerequisite:** Canvas 2D context mock in `src/test-helpers.ts`

### Infrastructure: Add `createMockCanvasContext()` to `src/test-helpers.ts`

```typescript
export function createMockCanvasContext() {
    const context: any = {
        fillRect: jest.fn(),
        clearRect: jest.fn(),
        getImageData: jest.fn(() => ({ data: new Uint8ClampedArray(4) })),
        putImageData: jest.fn(),
        createImageData: jest.fn(),
        setTransform: jest.fn(),
        drawImage: jest.fn(),
        save: jest.fn(),
        fillText: jest.fn(),
        restore: jest.fn(),
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        translate: jest.fn(),
        scale: jest.fn(),
        rotate: jest.fn(),
        arc: jest.fn(),
        fill: jest.fn(),
        measureText: jest.fn(() => ({ width: 0 })),
        transform: jest.fn(),
        rect: jest.fn(),
        clip: jest.fn(),
        canvas: { width: 300, height: 150 },
    };
    return context;
}
```

### canvas.spec.ts (target 10+)

```
- should instantiate with canvas element
- should get 2D rendering context
- should set canvas dimensions
- should draw rectangle
- should draw circle (arc)
- should draw line path
- should draw text
- should draw image
- should clear canvas
- should handle save/restore state
- should handle coordinate transformations (translate, scale, rotate)
```

Verify: `npx jest src/component/canvas.spec.ts --coverage`

---

## Phase 19: Google Maps Deep Mock + Tests

**Target:** `googleMap.ts` → 60%+, `mapLabel.ts` → 60%+
**Impact:** ~+2% overall statements
**Effort:** High — requires supplementary mock beyond `@googlemaps/jest-mocks`

### Infrastructure: Extend Google Maps mock

The existing `@googlemaps/jest-mocks` covers basic constructors. Add supplementary mocks for:
- `google.maps.Marker` — setPosition, setMap, setIcon, addListener
- `google.maps.InfoWindow` — open, close, setContent
- `google.maps.OverlayView` — onAdd, draw, onRemove, getProjection, getPanes
- `google.maps.Geocoder` — geocode callback
- `google.maps.event` — addListener, removeListener, trigger

### googleMap.spec.ts (target 12+)

```
- should instantiate with container element
- should create map with center and zoom options
- should add marker to map
- should remove marker from map
- should handle marker click event
- should open info window on marker
- should set map center
- should set map zoom
- should handle geocoding request
- should handle geocoding error
- should fit bounds to markers
- should handle map type change
```

### mapLabel.spec.ts (target 8+)

```
- should instantiate as OverlayView
- should draw label on map
- should update label text
- should position label correctly
- should handle label click
- should remove label from map
- should update label style
- should handle projection changes
```

Verify: `npx jest src/component/googleMap.spec.ts src/component/mapLabel.spec.ts --coverage`

---

## Phase 20: Remaining Field Tests

**Target:** `selectField.ts` → 70%+, `textareaField.ts` → 65%+, `baseCheckboxField.ts` → 70%+, `radiobuttonField.ts` → 75%+, `colorField.ts` → 75%+, `fileField.ts` → 70%+, `locationField.ts` → 75%+, `dateTimeRangeField.ts` → 75%+
**Impact:** ~+2% overall statements

### selectField.spec.ts (target 10+)

```
- should render options list from data
- should select option by value
- should return selected value
- should handle multiple selection mode
- should filter options with search input
- should handle empty options list
- should open/close dropdown popup
- should handle option click callback
- should set default selected option
- should clear selection
```

### textareaField.spec.ts (target 8+)

```
- should render textarea element
- should set and get multiline text value
- should handle maxlength attribute
- should resize on content change (auto-grow)
- should handle rich text mode (if applicable)
- should handle empty/null value
- should apply character count display
- should handle disabled state
```

### baseCheckboxField.spec.ts (target 8+)

```
- should render MDL checkbox component
- should toggle checked state
- should return boolean value
- should handle label click to toggle
- should handle disabled state
- should handle required validation
- should emit change event on toggle
- should handle MutationObserver for MDL upgrade
```

### Other fields — add 3-5 tests each for uncovered methods

Target uncovered areas listed in the gap analysis:
- `radiobuttonField.ts` — option rendering, selection, change events
- `colorField.ts` — color picker rendering, HSV conversion
- `fileField.ts` — file selection, preview, upload display
- `locationField.ts` — map integration, geocoding, coordinate parsing
- `dateTimeRangeField.ts` — range rendering, start/end coupling

Verify: `npx jest src/field/ --coverage`

---

## Phase 21: Remaining Low-Coverage Modules

**Target:** Each file → 65%+
**Impact:** ~+3% overall statements

### dialog.spec.ts (target 10+)

```
- should open modal with title and body
- should close modal
- should handle OK button callback
- should handle Cancel button callback
- should set custom button labels
- should render dynamic body content
- should handle minimize/maximize
- should handle close on overlay click
- should handle close on Escape key
- should update body content after open
```

### progressBar.spec.ts (target 6+)

```
- should instantiate with container
- should show progress bar
- should hide progress bar
- should set progress value (0-100)
- should handle indeterminate mode
- should handle timer-based animation
```

### waiter.spec.ts (target 6+)

```
- should instantiate with container
- should show loading indicator
- should hide loading indicator
- should handle show/hide cycle
- should handle DOM animation classes
- should handle timeout auto-hide
```

### script.spec.ts (target 6+)

```
- should load external script by URL
- should handle script load success callback
- should handle script load error
- should avoid loading duplicate scripts
- should append script element to DOM
- should handle script with attributes
```

### style.spec.ts (target 6+)

```
- should load external stylesheet by URL
- should handle stylesheet load success
- should handle stylesheet load error
- should avoid loading duplicate stylesheets
- should append link element to DOM
- should handle stylesheet with media query
```

### module.spec.ts (DI container, target 8+)

```
- should register controller classes
- should resolve dependencies in correct order
- should inject instances into controllers
- should call enter() on controller activation
- should call exit() on controller deactivation
- should handle controller lifecycle (enter → exit → re-enter)
- should handle missing dependency gracefully
- should load with multiple controllers
```

### cardCollection.spec.ts (target 6+)

```
- should instantiate with container
- should render cards from Collection data
- should handle empty collection
- should apply card template
- should handle card click callback
- should update cards when collection changes
```

Verify: `npx jest src/module/dialog.spec.ts src/module/progressBar.spec.ts src/component/waiter.spec.ts src/module/script.spec.ts src/module/style.spec.ts src/core/module.spec.ts src/component/cardCollection.spec.ts --coverage`

---

## Phase 22: Medium-Coverage File Improvements

**Target:** Each file → 75%+
**Impact:** ~+2% overall statements

Add targeted tests for specific uncovered methods in these files:

| File | Tests to Add | Target Methods |
|------|-------------|----------------|
| `module/screen.ts` | 4+ | resize/scroll handlers, breakpoint detection, orientation |
| `module/depot.ts` | 4+ | encrypted storage, key enumeration, quota handling |
| `component/progressStatus.ts` | 3+ | status update, DOM rendering, percentage display |
| `component/month.ts` | 4+ | day grid rendering, day selection, disabled days |
| `component/year.ts` | 4+ | month grid rendering, month selection |
| `component/dropdown.ts` | 4+ | menu rendering, item selection, close on outside click |

Verify: `npm run test`

---

## Phase 23: Install `jest-axe` + Automated Accessibility Tests

**Target:** Automated a11y violation scanning for all interactive components
**Impact:** Quality improvement, no coverage change
**Prerequisite:** ARIA attributes added to production code

### Step 1: Install dependency

```bash
npm install --save-dev jest-axe @types/jest-axe
```

### Step 2: Add ARIA attributes to production code

| File | Attributes to Add |
|------|-------------------|
| `module/dialog.ts` | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| `module/confirm.ts` | `role="alertdialog"`, `aria-modal="true"` |
| `component/dropdown.ts` | `aria-expanded`, `aria-haspopup` |
| `component/tabPanel.ts` | `role="tablist"`, `role="tab"`, `aria-selected` |
| `module/flash.ts` | `role="alert"` on flash messages |
| `component/navigation.ts` | `role="navigation"` |
| Form fields | `aria-describedby` linking to error message elements |

### Step 3: Add a11y test suite

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

### a11y.spec.ts (target 15+)

```
- Dialog should have no a11y violations when open
- Dialog should have role="dialog" and aria-modal="true"
- Dialog should trap focus within modal
- Confirm should have role="alertdialog"
- Dropdown should have aria-expanded attribute
- Dropdown should support Arrow key navigation
- Form fields should have associated labels
- Form error messages should use aria-describedby
- Navigation should have role="navigation"
- TabPanel should have role="tablist" with aria-selected
- Flash messages should use role="alert"
- Pager buttons should have aria-label
- Close buttons should have aria-label="Close"
- Calendar should support keyboard date selection
- Icon-only buttons should have accessible names
```

Verify: `npx tsc --noEmit && npm run test`

---

## Coverage Targets Summary

| Phase | Files | Estimated Impact | Cumulative Target |
|-------|-------|-----------------|-------------------|
| 14 | xhr, http, template | +3% stmts | ~78% |
| 15 | table, form, calendar | +4% stmts | ~82% |
| 16 | destroy() methods | +0% (infrastructure) | ~82% |
| 17 | menu modules (6 files) | +3% stmts | ~85% |
| 18 | canvas | +1% stmts | ~86% |
| 19 | googleMap, mapLabel | +2% stmts | ~88% |
| 20 | field layer (8 files) | +2% stmts | ~90% |
| 21 | dialog, progressBar, waiter, script, style, module, cardCollection | +3% stmts | ~93% |
| 22 | medium-coverage improvements (6 files) | +2% stmts | ~95% |
| 23 | jest-axe + a11y | +0% (quality) | ~95% |

**Completing phases 14–17** would reach the original **85% target**.
Completing all phases would bring coverage to approximately **95%**.
