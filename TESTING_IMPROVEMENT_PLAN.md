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

## Coverage Targets by Phase

| Phase | Statements | Branches | Functions | Lines |
|-------|-----------|----------|-----------|-------|
| Current | 52.5% | 34.91% | 43.8% | 51.79% |
| After Phase 1 (Core) | 58% | 42% | 50% | 58% |
| After Phase 2 (Utils) | 62% | 48% | 55% | 62% |
| After Phase 3 (Module) | 68% | 52% | 60% | 68% |
| After Phase 4 (Field) | 73% | 56% | 65% | 73% |
| After Phase 5 (Component) | 78% | 60% | 70% | 78% |
| After Phase 6 (Common) | 79% | 61% | 71% | 79% |
| After Phase 7 (Exports) | 79% | 61% | 71% | 79% |
| After Phase 8 (Memory) | 80% | 62% | 72% | 80% |
| After Phase 9 (Integration) | 82% | 65% | 74% | 82% |
| After Phase 10 (Async) | 83% | 66% | 75% | 83% |
| After Phase 11 (Errors) | 84% | 68% | 77% | 84% |
| After Phase 12 (Snapshots) | 84% | 68% | 77% | 84% |
| After Phase 13 (a11y) | **85%** | **69%** | **78%** | **85%** |

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

// After Phase 5
coverageThreshold: {
    global: {
        statements: 75,
        branches: 55,
        functions: 65,
        lines: 75,
    },
},

// Final (after Phase 13)
coverageThreshold: {
    global: {
        statements: 82,
        branches: 65,
        functions: 74,
        lines: 82,
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
| Phase 6: Common | 3 | ~19 | Medium |
| Phase 7: Exports | 1 | ~15 | High |
| Phase 8: Memory Leaks | 10+ | ~18 | Critical |
| Phase 9: Integration | 4 | ~30 | High |
| Phase 10: Async/Timers | 5+ | ~12 | High |
| Phase 11: Error Boundaries | 1+ | ~17 | Medium |
| Phase 12: Snapshots | 15 | ~17 | Medium |
| Phase 13: Accessibility | 10+ | ~17 | Medium |
| **Total** | **~110** | **~545** | |

This would bring the test suite from **180 → ~725 test cases**.

---

## Execution Guidelines

1. **Each phase is a separate PR** — merge and verify coverage increases before proceeding
2. **Rewrite, don't extend** — replace skeleton tests with proper suites; existing `instanceof` tests have no value
3. **Run coverage after each file** — `npx jest --coverage src/path/file.spec.ts`
4. **Prioritize branches** — branch coverage (34.91%) is the weakest metric
5. **Isolate test DOM** — create minimal DOM in `beforeEach`, clean up in `afterEach`; use `jest.setup.ts` DOM only for full-page integration tests (Application, Form)
6. **Mock with lifecycle** — save originals in `beforeEach`, restore in `afterEach`; use `jest.useFakeTimers()` for timing
7. **Use `test.each` / `describe.each`** — parameterized tests for type variants and conversion functions
8. **Use `jest.fn()`** — verify event handlers, callbacks, and Promize resolution (synchronous, not native Promise)
9. **Test error paths** — null inputs, missing elements, invalid data, permission denied
10. **Test edge cases** — empty arrays, boundary values, duplicate IDs, large numbers
11. **Use specific matchers** — `toHaveLength`, `toMatchObject`, `toBeNull`, `toContain`, `toThrow` over generic `toBe`
12. **Phase 6–13 require source changes** — some phases (Memory Leaks, Accessibility) will need `destroy()` methods and ARIA attributes added to production code
13. **Add `jest-axe` dependency** — required for Phase 13 (Accessibility), install before starting that phase
14. **Enable `detectOpenHandles`** — turn on temporarily in Phase 10 to identify async leaks, then remove once fixed
