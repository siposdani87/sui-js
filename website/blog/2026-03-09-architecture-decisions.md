---
slug: architecture-decisions
title: Architecture Decisions Behind SUI-JS
authors: [dsipos]
tags: [architecture, sui-js]
---

Every framework reflects a set of trade-offs. Here are the key architecture decisions behind SUI-JS and why they were made.

<!-- truncate -->

## Why a custom DOM abstraction?

SUI-JS wraps every DOM element in a `Knot` class rather than working with raw `HTMLElement` references. This was a deliberate choice:

- **Consistent API** — Methods like `addClass`, `setStyle`, `addEventListener` all return `Knot`, enabling fluent chaining without remembering which native methods return `void`.
- **Event normalization** — `Knot.addEventListener` automatically wraps callbacks to receive `(knot, event)` and calls `event.stopPropagation()` by default. This eliminates a class of event-bubbling bugs.
- **Selector safety** — `Query` returns `Knot` instances (or `null`), so the type system catches missing null checks before runtime.

The trade-off is an extra abstraction layer. For a framework that owns the full page, this cost is negligible. For drop-in widgets, it would be too heavy.

## The constructor pattern

Every class follows the same three-step initialization:

```typescript
constructor(opt_options = {}) → _setOptions() → _init()
```

This pattern emerged from a practical need: most UI components share the same lifecycle — merge user options with defaults, then set up DOM and events. Formalizing it into a convention means:

- New components are predictable to write and review.
- Options merging via `Objekt` handles nested defaults automatically.
- `_init()` is always the place to look for setup logic.

## Objekt over plain objects

`Objekt` provides dot-notation deep access (`get('a.b.c')`) and recursive merge. The alternative was spreading plain objects, but nested defaults made that error-prone. `Objekt` ensures that missing nested keys return `undefined` gracefully instead of throwing `TypeError: Cannot read property of undefined`.

## Revealing module pattern

SUI-JS modules expose a public API object from `_init()` while keeping internal state private via closures and `_`-prefixed members. This predates ES modules and private class fields, but remains useful because:

- It enforces a clear public/private boundary without relying on TypeScript's `private` keyword (which is erased at runtime).
- The `_` prefix convention is visible in stack traces and debugger, making it obvious when internal state is accessed.

## Dependency injection via Application

The `Application` class acts as a simple DI container. Controllers and services declare their dependencies via a static `inject` property, and `Application` resolves them at instantiation.

This was chosen over a global service locator or manual wiring because:

- Controllers don't import services directly — they receive them, making testing straightforward.
- The DI graph is centralized, so circular dependencies surface immediately.
- Adding a new service requires no changes to existing controllers.

## Four-layer architecture

```
Application → Components → Modules → Core
```

Each layer depends only on the layers below it. Components use modules (e.g., `Form` uses `Http`), modules use core primitives (e.g., `Http` uses `Objekt`), but never the reverse. This keeps the dependency graph acyclic and makes each layer independently testable.

## What we'd do differently

Looking back, `Promize` (a custom Promise wrapper) would not be written today — native `Promise` is sufficient. It exists because the framework predates widespread `Promise` support. Internally, `Promize` now delegates to native `Promise`, but the wrapper remains for API compatibility.

Similarly, `Collection` duplicates some `Array` functionality. In a greenfield project, a typed `Array` subclass or simple utility functions would suffice. The abstraction earns its keep through observable iteration and typed access, but it's more API surface than strictly necessary.

These are the honest trade-offs of a framework that started in 2014 and evolved through a decade of real-world use.
