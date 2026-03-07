# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SUI-JS is a lightweight TypeScript frontend framework with predefined UI components. Published as `@siposdani87/sui-js` on npm. Uses custom SUI SCSS for styling, esbuild for bundling (IIFE format, global name `SUI`), and SCSS for styles.

## Commands

```bash
npm run dev              # Dev mode: sass:watch + esbuild:watch + serve on :4000
npm run build            # Full build (runs clean → lint → format → test → coverage → build)
npm run lint             # tsc-test + stylelint + eslint
npm run format           # Prettier on CSS and TS files
npm run test             # Run Jest tests
npm run test:watch       # Jest watch mode
npm run test:coverage    # Jest with coverage report

# Single test file
npx jest src/core/state.spec.ts

# Single test by name
npx jest --testNamePattern="should do something"
```

## Architecture

**Layer structure:** `Application` → Components → Modules → Fields

- **`src/core/`** — Framework primitives: `Objekt` (object wrapper with nested get/merge), `Knot` (DOM element wrapper), `Query` (selector wrapper), `Collection<T>` (typed collection), `State` (state management + routing), `Module` (revealing module pattern base)
- **`src/component/`** — UI components: `Application` (main entry, manages DI), `Form`, `Table`, `Calendar`, `GoogleMap`, popups, etc.
- **`src/module/`** — Feature modules: `Http` (fetch-based HTTP client), `Router`, `EventBus` (pub/sub), `Dialog`, `Confirm`, `Cookie`, `Depot` (localStorage/sessionStorage), `Template`, menus
- **`src/field/`** — Form field components extending `BaseField`: text, select, datetime, color, file, location, etc.
- **`src/utils/`** — Utilities: `operation.ts` (type checking, object/array ops), `dateio.ts` (date-fns wrapper), `coder.ts`, `color.ts`, `math.ts`
- **`styles/`** — SCSS organized by component/module/field with SUI custom styles
- **`src/index.ts`** — Single entry point, exports all modules

## Code Patterns

- **Constructor pattern:** `constructor(opt_options = {})` → `_setOptions()` merges defaults via `Objekt` → `_init()` initializes
- **Private members** prefixed with `_` (e.g., `_instance`, `_init()`)
- **Optional parameters** prefixed with `opt_` (e.g., `opt_options`)
- **All classes and public methods** documented with JSDoc

## TypeScript Configuration

- Target: ES2015, Module: ESNext
- **`strict: true`** — all strict mode flags enabled (completed in v1.1.0)
- Additional flags: `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `allowUnreachableCode: false`, `allowUnusedLabels: false`
- `@typescript-eslint/no-explicit-any` is `warn` — explicit `any` is allowed but flagged

## Testing

- Jest with ts-jest and jsdom environment
- Tests colocated as `*.spec.ts` files
- `jest.setup.ts` mocks: Google Maps API, console methods
- **1,696 tests** across 109 suites (expanded from 180 tests in v1.0.0)
- Includes jest-axe automated accessibility tests
- Coverage thresholds: statements 88%, branches 73%, functions 85%, lines 88%
- Current coverage: statements 89.7%, branches 75.8%, functions 86.5%, lines 89.6%

## Formatting

- Prettier: 4-space indent, single quotes, trailing commas, semicolons
- EditorConfig: 4 spaces (2 for JSON/YAML), LF line endings
- ESLint: flat config format (`eslint.config.js`)

## Implementation Roadmap

### Completed Plans

1. **Testing Improvement** — 180 → 1,696 tests, coverage 52% → 89%. jest-axe a11y tests added.
2. **TypeScript Strict Mode** — `strict: true` enabled in `tsconfig.json`. Completed in v1.1.0.
3. **Documentation** — Comprehensive JSDoc on all source files. Docusaurus site with guides, API reference, and Algolia search.

### Modernization (v1.2.0)

See `MODERNIZATION_PRIORITY.md` for details.

1. **Automatic DI** — COMPLETE. Controllers/services support `static inject` for auto-dependency detection.
2. **Native Promise in Promize** — COMPLETE. `Promize` internally backed by native `Promise` (microtask timing).
3. **Fetch Migration** — COMPLETE. `Xhr` uses `fetch` API instead of `XMLHttpRequest`. Exports `HttpResponse` type.
4. **Style Modernization** — COMPLETE. Modern indigo/orange palette, system fonts, soft shadows, 8px radius, focus rings.
5. **Example Page Cleanup** — COMPLETE. Removed MDL dependency.
6. **TypeDoc Audit** — COMPLETE. JSDoc updated for fetch migration.
7. **Claude Docs Audit** — COMPLETE. CLAUDE.md updated to reflect current state.
