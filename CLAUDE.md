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
- **`src/utils/`** — Utilities: `operation.ts` (barrel re-export for `comparison.ts`, `typeGuards.ts`, `iteration.ts`, `arrayOps.ts`, `objectOps.ts`, `stringOps.ts`, `domOps.ts`), `dateio.ts` (date-fns wrapper), `coder.ts`, `color.ts`, `math.ts`
- **`styles/`** — SCSS organized by component/module/field; uses CSS custom properties (`--sui-*`) for theming — dark mode handled via `prefers-color-scheme` media query and `.dark-theme` class, no separate Dark.scss files
- **`src/index.ts`** — Single entry point, exports all modules

## Code Patterns

- **Constructor pattern:** `constructor(opt_options = {})` → `_setOptions()` merges defaults via `Objekt` → `_init()` initializes
- **Private members** prefixed with `_` (e.g., `_instance`, `_init()`)
- **Optional parameters** prefixed with `opt_` (e.g., `opt_options`)
- **All classes and public methods** documented with JSDoc

## TypeScript Configuration

- Target: ES2020, Module: ESNext, moduleResolution: Bundler
- **`strict: true`** — all strict mode flags enabled (completed in v1.1.0)
- Additional flags: `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noImplicitOverride`, `allowUnreachableCode: false`, `allowUnusedLabels: false`
- `@typescript-eslint/no-explicit-any` is `warn` — explicit `any` is allowed but flagged

## Testing

- Jest with ts-jest and jsdom environment
- Tests colocated as `*.spec.ts` files
- `jest.setup.ts` mocks: Google Maps API, console methods
- **2,212 tests** across 112 suites (expanded from 180 tests in v1.0.0)
- Includes jest-axe automated accessibility tests (Loader, Flash, TabPanel, Viewer, Dropdown, Navigation, BaseField)
- `tsconfig.spec.json` inherits `strict: true` from base config (strictNullChecks + noImplicitAny enabled)
- Coverage thresholds: statements 97%, branches 87%, functions 95%, lines 97%
- Current coverage: statements 97.2%, branches 87.7%, functions 95.7%, lines 97.2%

## Formatting

- Prettier: 4-space indent, single quotes, trailing commas, semicolons
- EditorConfig: 4 spaces (2 for JSON/YAML), LF line endings
- ESLint: flat config format (`eslint.config.js`)

## Implementation Roadmap

### Completed (v2.0.0)

- **Testing** — 180 → 2,212 tests, coverage 97%+. jest-axe a11y tests. Strict null checks in test config.
- **TypeScript Strict Mode** — `strict: true` in `tsconfig.json` (v1.1.0).
- **Documentation** — Comprehensive JSDoc. Docusaurus site with guides, API reference, Algolia search.
- **Automatic DI** — `static inject` for auto-dependency detection on controllers/services.
- **Native Promise in Promize** — `Promize` backed by native `Promise` (microtask timing).
- **Fetch Migration** — `Xhr` uses `fetch` API. Exports `HttpResponse` type.
- **Style Modernization** — Indigo/orange palette, system fonts, CSS custom properties (`--sui-*`), all 42 Dark.scss files eliminated.
- **Example Page** — Full component showcase across 4 tabs (Form, Components, Modals, Services). MDL dependency removed.
- **Scheduler** — Implemented `_callRunner()` with 30s interval, `stop()` method.

### Remaining — See `REMAINING_TASKS.md`

- **AdvancedMarkerElement Migration** (P1) — See `ADVANCED_MARKER_MIGRATION.md`
- **Code-Split Google Maps** (P1) — Dynamic import for lazy loading
- **Modern CSS / TS / Tooling** (P3) — See `IMPROVEMENT_PLAN.md`
