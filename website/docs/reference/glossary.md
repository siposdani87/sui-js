---
id: glossary
title: Glossary
sidebar_label: Glossary
sidebar_position: 2
description: Definitions of key terminology used throughout the SUI-JS framework.
keywords: [sui-js, glossary, terminology, definitions]
---

# Glossary

Key terms used throughout the SUI-JS framework.

| Term | Definition |
|------|-----------|
| **Knot** | A DOM element wrapper class, similar to jQuery's `$()`. Wraps a native `HTMLElement` with convenience methods for class manipulation, event binding, attribute access, and child management. |
| **Objekt** | An object wrapper that supports dot-notation property access (e.g., `obj.get('a.b.c')`) and deep merge operations. Used throughout the framework for options and data. |
| **Query** | A CSS selector wrapper that returns `Knot` instances instead of raw DOM elements. |
| **Collection** | A typed, iterable collection class with `each()`, `filter()`, `push()`, `delete()`, and sorting support. |
| **Promize** | The framework's custom promise implementation, used instead of native `Promise`. Supports `.then()`, `.catch()`, and deferred resolution. |
| **Deferred** | A deferred value pattern that creates a `Promize` whose resolve/reject functions are exposed for external control. |
| **Module** | Base class implementing the revealing module pattern. Subclasses expose only their public API. |
| **State** | Manages application state and integrates with the `Router` for URL-based navigation. |
| **Depot** | A Web Storage wrapper that provides a consistent API for `localStorage` and `sessionStorage`. |
| **EventBus** | A publish/subscribe messaging bus for decoupled communication between components. |
| **MDL** | Material Design Lite — the CSS/JS library that provides base styling and component upgrades. |
| **coreResources** | The default set of module instances (Http, EventBus, etc.) that `Application` creates during initialization. |
| **Controller** | A user-defined class registered with `Application` that handles a route's logic and DOM setup. |
| **Service** | A user-defined singleton class registered with `Application` for shared business logic. |
| **Route** | An object defining a URL pattern, controller name, and template path for client-side routing. |
| **opt_** | Prefix convention for optional parameters (e.g., `opt_options`, `opt_selector`). |
| **_prefix** | Prefix convention for private members (e.g., `_init()`, `_instance`). |
