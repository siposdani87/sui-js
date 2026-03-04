# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SUI-JS is a lightweight TypeScript frontend framework with predefined UI components. Published as `@siposdani87/sui-js` on npm. Uses Material Design Lite for base styling, esbuild for bundling (IIFE format, global name `SUI`), and SCSS for styles.

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
- **`src/module/`** — Feature modules: `Http` (XHR client), `Router`, `EventBus` (pub/sub), `Dialog`, `Confirm`, `Cookie`, `Depot` (localStorage/sessionStorage), `Template`, menus
- **`src/field/`** — Form field components extending `BaseField`: text, select, datetime, color, file, location, etc.
- **`src/utils/`** — Utilities: `operation.ts` (type checking, object/array ops), `dateio.ts` (date-fns wrapper), `coder.ts`, `color.ts`, `math.ts`
- **`styles/`** — SCSS organized by component/module/field with MDL overrides
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
- `jest.setup.ts` mocks: Material Design Lite `componentHandler`, Google Maps API, console methods
- **1,315 tests** across 108 suites (expanded from 180 tests in v1.0.0)
- Coverage thresholds: statements 65%, branches 52%, functions 59%, lines 65%
- Current coverage: statements 77%, branches 62%, functions 73%, lines 77%

## Formatting

- Prettier: 4-space indent, single quotes, trailing commas, semicolons
- EditorConfig: 4 spaces (2 for JSON/YAML), LF line endings
- ESLint: flat config format (`eslint.config.js`)

## Implementation Roadmap

Three improvement plans exist. Two are complete; testing has remaining phases.

### 1. Testing Improvement (IN PROGRESS — Phases 0–17 done, Phases 18–23 remain)
- **Full plan:** `TESTING_IMPROVEMENT_PLAN.md`
- **Claude Code instructions:** `.claude/plans/testing.md`
- **Progress:** 180 → 1,315 tests, coverage 52% → 77%. Phases 0–17 complete (infrastructure, core, utils, module, field, component, common, exports, memory leak tests, integration tests, async cleanup, error scenarios, snapshots, a11y tests, HTTP deep testing, major component deep testing, destroy() methods, menu modules).
- **Remaining:** Phase 18 (canvas) → Phase 19 (Google Maps) → Phase 20 (remaining fields) → Phase 21 (low-coverage modules) → Phase 22 (medium-coverage improvements) → Phase 23 (jest-axe a11y)
- **Target:** All phases reach ~95%.

### 2. TypeScript Strict Mode — COMPLETE
- **Full plan:** `TYPESCRIPT_STRICT_MODE_PLAN.md`
- **Claude Code instructions:** `.claude/plans/strict-mode.md`
- **Result:** All phases (0–5) complete. `strict: true` enabled in `tsconfig.json`. Completed in v1.1.0.

### 3. Documentation — COMPLETE
- **Full plan:** `DOCUMENTATION_PLAN.md`
- **Claude Code instructions:** `.claude/plans/documentation.md`
- **Result:** All phases (1–10) complete. Comprehensive JSDoc on all source files. Docusaurus site with guides, API reference, and Algolia search. Completed in v1.1.0.
