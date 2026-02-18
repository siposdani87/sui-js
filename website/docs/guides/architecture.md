---
id: architecture
title: Architecture
sidebar_label: Architecture
sidebar_position: 2
description: Understand the SUI-JS framework architecture with its four-layer design, dependency injection, and constructor pattern.
keywords: [sui-js, architecture, layers, dependency-injection, constructor-pattern]
---

# Architecture

SUI-JS follows a four-layer architecture with dependency injection for service management.

## Layer Diagram

```
┌─────────────────────────────────────────────────┐
│                  Application                     │
│            (DI container, lifecycle)             │
├─────────────────────────────────────────────────┤
│              Components Layer                    │
│   Form, Table, Calendar, Navigation, ...        │
├─────────────────────────────────────────────────┤
│               Modules Layer                      │
│   Http, EventBus, Dialog, Depot, Cookie, ...    │
├─────────────────────────────────────────────────┤
│                Core Layer                        │
│   Objekt, Knot, Query, Collection, State, ...   │
└─────────────────────────────────────────────────┘
```

## Core Primitives

| Class | Purpose |
|-------|---------|
| **Objekt** | Object wrapper with dot-notation access and deep merge |
| **Knot** | DOM element wrapper (similar to jQuery) |
| **Query** | CSS selector wrapper returning Knot instances |
| **Collection** | Typed, observable collection with iteration |
| **State** | State management integrated with routing |
| **Module** | Base class for the revealing module pattern |

## Constructor Pattern

All SUI-JS classes follow a consistent initialization pattern:

```typescript
constructor(opt_options = {}) → _setOptions() → _init()
```

1. `constructor` receives an optional options object
2. `_setOptions()` merges defaults via `Objekt`
3. `_init()` performs setup (DOM binding, event wiring, etc.)

## Dependency Injection

The `Application` class acts as a DI container. Controllers and services are registered by name and resolved at runtime.

## Next Steps

- [Application Setup](./application-setup) — Configure the DI container
- [DOM Manipulation](./dom-manipulation) — Work with Knot and Query
