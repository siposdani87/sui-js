---
slug: modernization-journey
title: "From Closure Compiler to TypeScript Strict: The SUI-JS Modernization Journey"
authors: [dsipos]
tags: [modernization, typescript, sui-js]
---

SUI-JS started in 2014 as a Vanilla JavaScript framework compiled with Google Closure Compiler. Twelve years later, it runs TypeScript strict mode, esbuild, and has 2,200+ tests. Here's how it got there — and what we learned along the way.

<!-- truncate -->

## Phase 1: JavaScript to TypeScript (v0.5.0)

The original codebase used Google Closure Compiler with advanced optimizations. This gave excellent minification but required JSDoc type annotations and a specific coding style that few developers were familiar with.

In 2021, we migrated the entire codebase to TypeScript with esbuild as the bundler. The key decisions:

- **All at once, not incremental** — With ~60 source files, an incremental migration would have meant maintaining two build systems. A full rewrite was faster.
- **esbuild over Webpack/Rollup** — esbuild's speed (sub-second builds) made the development experience dramatically better. The IIFE output format preserved backward compatibility for script-tag users.
- **Keep the same API** — External consumers shouldn't notice the migration. All class names, method signatures, and module structure stayed the same.

## Phase 2: Strict mode (v1.1.0)

TypeScript without strict mode catches surprisingly few bugs. Enabling `strict: true` was the single highest-impact change we made:

- **strictNullChecks** found dozens of places where `null` could flow into methods that didn't handle it. Most were in DOM operations where `querySelector` might return `null`.
- **noImplicitAny** forced explicit types on ~200 function parameters that had been quietly `any`. Many of these revealed actual logic errors.
- **strictPropertyInitialization** caught uninitialized class properties that relied on `_init()` being called.

The migration took careful work because enabling all flags at once produced thousands of errors. We fixed them module by module, starting from core primitives and working up.

## Phase 3: Fetch migration

The `Xhr` class originally used `XMLHttpRequest`. We migrated to the Fetch API:

- **Same external API** — `Xhr.get()`, `Xhr.post()`, etc. kept their signatures. Callers didn't change.
- **Single-use instances** — Each `Xhr` instance handles one request. This simplified the internal state machine compared to reusable `XMLHttpRequest` objects.
- **HttpResponse type** — We introduced a plain response object instead of exposing the raw `Response`, keeping the abstraction clean.

## Phase 4: Testing expansion (v1.1.0 → v1.2.0)

The original framework had 180 tests. We expanded to 2,200+ tests across 112 suites:

| Metric | v1.0.0 | v1.2.0 |
|--------|--------|--------|
| Tests | 180 | 2,212 |
| Statement coverage | 52% | 97% |
| Branch coverage | — | 88% |
| Function coverage | — | 96% |

Key practices that made this tractable:

- **Colocated spec files** — `foo.spec.ts` next to `foo.ts`. No separate test directory to keep in sync.
- **jsdom environment** — All DOM tests run in jsdom, keeping the test suite fast (8 seconds for 2,200 tests).
- **jest-axe for accessibility** — Automated ARIA checks on interactive components (Loader, Flash, TabPanel, Navigation, fields).
- **Google Maps mocks** — `@googlemaps/jest-mocks` made map component testing possible without a real API key.

## Phase 5: Style modernization

The CSS went through its own evolution:

1. **42 separate Dark.scss files → CSS custom properties** — Instead of maintaining parallel dark stylesheets, we switched to `--sui-*` custom properties with a `prefers-color-scheme` media query. This cut the style surface area nearly in half.
2. **Material Design Lite removal** — The example page and some components originally depended on MDL. We replaced all MDL patterns with minimal, custom CSS.
3. **System fonts** — Dropped web font dependencies in favor of the system font stack.

## What we learned

**Migrate all at once when the codebase is small enough.** SUI-JS has ~60 source files — small enough that full migrations (JS→TS, non-strict→strict) were faster than maintaining compatibility shims.

**Strict mode pays for itself immediately.** The bugs it found in the first week justified the migration effort.

**Tests enable everything else.** Without 97% coverage, we couldn't confidently migrate fetch, modernize styles, or refactor modules. The testing investment unlocked every subsequent improvement.

**Keep the external API stable.** Internal modernization is invisible to users if the public API doesn't change. This let us ship breaking internal changes as minor versions.
