# Testing & Coverage Guide

This document outlines the testing strategy and coverage requirements for the sui-js project.

## Test Suite Overview

### Current Coverage Metrics

As of the latest build:

| Metric | Coverage | Threshold | Status |
|--------|----------|-----------|--------|
| **Statements** | 52.5% | ≥ 50% | ✅ Passing |
| **Branches** | 34.96% | ≥ 33% | ✅ Passing |
| **Functions** | 43.8% | ≥ 42% | ✅ Passing |
| **Lines** | 51.79% | ≥ 50% | ✅ Passing |

### Test Statistics

- **Test Suites**: 95 files
- **Total Tests**: 180 test cases
- **Test Framework**: Jest 30.2.0 with ts-jest
- **Test Environment**: jsdom (browser-like DOM)

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode (for development)
npm run test:watch

# Run tests and open HTML coverage report
npm run test:coverage:open
```

### CI/CD Integration

Tests automatically run as part of the build process:

```bash
npm run build  # Includes: clean → lint → format → test → coverage → build
```

## Coverage Thresholds

Coverage thresholds are configured in [jest.config.cjs](jest.config.cjs#L14-L21) and will cause builds to fail if coverage drops below these minimum values:

```javascript
coverageThreshold: {
  global: {
    statements: 50,   // At least 50% of statements must be covered
    branches: 33,     // At least 33% of branches must be covered
    functions: 42,    // At least 42% of functions must be covered
    lines: 50         // At least 50% of lines must be covered
  }
}
```

### Why These Thresholds?

These thresholds are set based on the current coverage levels to:

1. **Prevent regression**: Ensure coverage doesn't decrease
2. **Encourage improvement**: Set realistic goals for incremental improvement
3. **Maintain quality**: Block PRs that significantly reduce test coverage

### Future Goals

| Metric | Current | Short-term Goal | Long-term Goal |
|--------|---------|-----------------|----------------|
| Statements | 52.5% | 60% | 80% |
| Branches | 34.96% | 40% | 70% |
| Functions | 43.8% | 50% | 75% |
| Lines | 51.79% | 60% | 80% |

## Coverage Reports

### Available Formats

Jest generates coverage reports in multiple formats (configured in [jest.config.cjs](jest.config.cjs#L6)):

1. **LCOV** (`coverage/lcov.info`) - For SonarCloud integration
2. **Text** - Console output during test runs
3. **Text Summary** - Brief summary in console
4. **HTML** (`coverage/index.html`) - Interactive browsable report

### Viewing HTML Report

```bash
# Generate and automatically open in browser
npm run test:coverage:open

# Or manually:
npm run test:coverage
open coverage/index.html
```

## Test Structure

### File Organization

Tests are co-located with source files:

```
src/
├── component/
│   ├── calendar.ts
│   └── calendar.spec.ts
├── field/
│   ├── textField.ts
│   └── textField.spec.ts
└── utils/
    ├── math.ts
    └── math.spec.ts
```

### Test Setup

Global test setup is configured in [jest.setup.ts](jest.setup.ts):

- Google Maps API mocks
- Material Design Lite initialization
- Console method mocks
- DOM container setup for modals, flash messages, etc.

### Coverage Exclusions

The following files are excluded from coverage metrics:

- Test files (`**/*.spec.ts`)
- Node modules
- Build output (`dist/`)

## Writing Tests

### Best Practices

1. **Test file naming**: Use `.spec.ts` suffix
2. **Test structure**: Follow AAA pattern (Arrange, Act, Assert)
3. **Descriptive names**: Test names should describe what they test
4. **One assertion per test**: Keep tests focused and simple
5. **Mock external dependencies**: Use Jest mocks for APIs, timers, etc.

### Example Test Structure

```typescript
describe('MyComponent', () => {
    let component: MyComponent;

    beforeEach(() => {
        // Arrange - Set up test fixtures
        component = new MyComponent();
    });

    afterEach(() => {
        // Cleanup
        component.destroy();
    });

    it('should initialize with default values', () => {
        // Act
        const value = component.getValue();

        // Assert
        expect(value).toBe('default');
    });

    it('should update value when set', () => {
        // Arrange
        const newValue = 'test';

        // Act
        component.setValue(newValue);

        // Assert
        expect(component.getValue()).toBe(newValue);
    });
});
```

## Improving Coverage

### Identifying Gaps

Use the HTML coverage report to find untested code:

```bash
npm run test:coverage:open
```

The HTML report shows:
- **Red**: Uncovered code
- **Yellow**: Partially covered branches
- **Green**: Fully covered code

### Priority Areas for Improvement

Based on current coverage analysis, focus on:

1. **Branch coverage** (34.96%) - Add tests for edge cases and error paths
2. **Functions** (43.8%) - Ensure all public methods have tests
3. **Complex utilities** - Files like `operation.ts` have lower coverage

### Testing Guidelines

#### Test Critical Paths First

1. Public API methods
2. User-facing functionality
3. Error handling paths
4. Edge cases and boundary conditions

#### Don't Over-Test

- Avoid testing private methods directly
- Don't test framework code
- Focus on behavior, not implementation

## CI/CD Integration

### GitHub Actions

Coverage is automatically checked in the CI pipeline ([.github/workflows/ci.yml](.github/workflows/ci.yml)):

```yaml
- name: Run tests
  run: npm run test
```

### SonarCloud

Coverage data is sent to SonarCloud for analysis:

- **Report**: `coverage/lcov.info`
- **Format**: LCOV
- **Integration**: Automatic via `jest-sonar` reporter

## Troubleshooting

### Common Issues

#### "Coverage threshold not met"

```
Jest: "global" coverage threshold for statements (50%) not met: 48.5%
```

**Solution**: Either improve test coverage or adjust thresholds if the decrease is intentional.

#### "Worker process failed to exit"

This is a known issue with Jest and async operations. The tests still pass, but you may see:

```
A worker process has failed to exit gracefully and has been force exited.
```

**Solution**: This doesn't affect test results. To investigate, run:

```bash
npx jest --detectOpenHandles
```

#### Coverage not updating

**Solution**: Clear Jest cache:

```bash
npx jest --clearCache
npm test
```

## Continuous Improvement

### Coverage Goals by Phase

**Phase 1** (Current):
- Maintain current coverage levels
- Prevent regression
- Set up infrastructure

**Phase 2** (Next 3 months):
- Increase to 60% line coverage
- Focus on critical business logic
- Add integration tests

**Phase 3** (6+ months):
- Reach 80% line coverage
- Comprehensive branch coverage
- End-to-end test scenarios

### Monitoring Progress

Track coverage trends using:

1. **SonarCloud Dashboard**: Historical coverage data
2. **Pull Request Checks**: Coverage diff for each PR
3. **Local Reports**: `npm run test:coverage:open`

## Related Documentation

- [TypeScript Strict Mode Guide](TYPESCRIPT_STRICT_MODE.md)
- [Contributing Guidelines](CONTRIBUTING.md) *(if exists)*
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
