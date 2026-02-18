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
- Incremental strict mode: Phase 1 enabled (strictFunctionTypes, strictBindCallApply, noImplicitThis, alwaysStrict, noImplicitReturns)
- Phase 2 NOT yet enabled: strictNullChecks, noImplicitAny, strictPropertyInitialization
- `@typescript-eslint/no-explicit-any` is off — `any` is allowed

## Testing

- Jest with ts-jest and jsdom environment
- Tests colocated as `*.spec.ts` files
- `jest.setup.ts` mocks: Material Design Lite `componentHandler`, Google Maps API, console methods
- Coverage thresholds: statements 50%, branches 33%, functions 42%, lines 50%

## Formatting

- Prettier: 4-space indent, single quotes, trailing commas, semicolons
- EditorConfig: 4 spaces (2 for JSON/YAML), LF line endings
- ESLint: flat config format (`eslint.config.js`)

## Implementation Roadmap

Three improvement plans exist. Execute in this order:

### 1. Testing Improvement (do first)
- **Full plan:** `TESTING_IMPROVEMENT_PLAN.md`
- **Claude Code instructions:** `.claude/plans/testing.md`
- **Why first:** Builds safety net before type-level and doc changes. Coverage 52% → 78%, tests 180 → ~580.
- **Phases:** Infrastructure → Core → Utils → Module (critical) → Field → Component

### 2. TypeScript Strict Mode (do second)
- **Full plan:** `TYPESCRIPT_STRICT_MODE_PLAN.md`
- **Claude Code instructions:** `.claude/plans/strict-mode.md`
- **Why second:** With tests protecting against regressions, type changes are safe. Fixes types before writing docs.
- **Phases:** Preparation → noImplicitOverride → noImplicitAny → strictNullChecks → strictPropertyInitialization → strict:true

### 3. Documentation (do last)
- **Full plan:** `DOCUMENTATION_PLAN.md`
- **Claude Code instructions:** `.claude/plans/documentation.md`
- **Why last:** JSDoc should describe final type signatures (after strict mode). Two tracks: JSDoc + Docusaurus.
- **Phases:** Core JSDoc → Utils JSDoc → Module JSDoc → Component JSDoc → Field JSDoc + Site enhancements
