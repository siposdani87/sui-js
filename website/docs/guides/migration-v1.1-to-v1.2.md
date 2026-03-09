---
id: migration-v1.1-to-v1.2
title: Migration Guide (v1.1 to v1.2)
sidebar_label: Migration (v1.1 → v1.2)
sidebar_position: 10
description: Upgrade guide from SUI-JS v1.1 to v1.2, covering automatic DI, fetch migration, native Promise, and style changes.
keywords: [sui-js, migration, upgrade, v1.2]
---

# Migration Guide: v1.1 to v1.2

This guide covers the breaking changes and new features when upgrading from SUI-JS v1.1 to v1.2.

## Automatic Dependency Injection

Controllers and services now support automatic dependency detection via a static `inject` property.

**Before (v1.1):** Dependencies resolved by parameter name convention.

**After (v1.2):** Use `static inject` to explicitly declare dependencies:

```typescript
class UserController extends Controller {
    static inject = ['http', 'flash'];

    private http: Http;
    private flash: Flash;

    constructor(http: Http, flash: Flash) {
        super();
        this.http = http;
        this.flash = flash;
    }
}
```

This is optional — the previous convention still works, but `static inject` is recommended for clarity and minification safety.

## Fetch Migration (Xhr)

The `Xhr` class now uses the `fetch` API internally instead of `XMLHttpRequest`.

### What changed

- `Xhr` responses are now typed as `HttpResponse` instead of raw `XMLHttpRequest`
- The response object structure is the same (`Objekt`-wrapped), so most code is unaffected
- Abort handling uses `AbortController` internally

### Action required

If you were accessing the raw `XMLHttpRequest` object directly, update to use the `HttpResponse` type:

```typescript
// Before (v1.1)
import { Xhr } from '@siposdani87/sui-js';

// After (v1.2) — use HttpResponse type for response typing
import { Xhr, HttpResponse } from '@siposdani87/sui-js';
```

Response handling via `Http` methods (`get`, `post`, etc.) is unchanged.

## Native Promise in Promize

`Promize` is now internally backed by a native `Promise`. This means:

- **Microtask timing**: Promize callbacks now execute as microtasks (same as native Promises), not synchronously
- **Interop**: `Promize` instances can be awaited with `async/await`
- The `Promize` and `Deferred` API surface is unchanged

### Potential impact

If your code relied on synchronous resolution timing of Promize callbacks, you may need to adjust:

```typescript
// This now executes asynchronously (microtask)
const deferred = new Deferred();
deferred.promise.then(() => {
    // Runs on next microtask, not synchronously
});
deferred.resolve();
```

## Style Changes

v1.2 introduces a modernized design system:

- **Color palette**: New indigo/orange palette replacing the previous colors
- **System fonts**: Native system font stack instead of external font dependencies
- **Soft shadows**: Modern single-layer box shadows (`$shadow-sm`, `$shadow-md`, `$shadow-lg`)
- **Border radius**: 8px default radius (`$radius-md`)
- **Focus rings**: Consistent `outline` focus indicators on interactive elements
- **CSS custom properties**: Theme colors exposed as `--sui-*` variables for runtime customization
- **Dark mode**: Automatic via `prefers-color-scheme`, manual via `.dark-theme` / `.light-theme` classes
- **Reduced motion**: Respects `prefers-reduced-motion` user preference

### CSS custom properties

You can now override theme colors at runtime:

```css
:root {
    --sui-primary: #your-color;
    --sui-accent: #your-accent;
}
```

## Summary of changes

| Area | Change | Breaking |
|------|--------|----------|
| DI | `static inject` support | No (additive) |
| HTTP | `fetch` replaces `XMLHttpRequest` | Minor (raw access) |
| HTTP | `HttpResponse` type exported | No (additive) |
| Async | `Promize` backed by native `Promise` | Minor (timing) |
| Styles | New color palette and design tokens | Visual (no API change) |
| Styles | CSS custom properties (`--sui-*`) | No (additive) |
| Styles | `prefers-color-scheme` dark mode | No (additive) |
| Styles | `prefers-reduced-motion` support | No (additive) |
