---
id: migration-v1.1-to-v2.0
title: Migration Guide (v1.1 to v2.0)
sidebar_label: Migration (v1.1 → v2.0)
sidebar_position: 10
description: Upgrade guide from SUI-JS v1.1 to v2.0, covering removed dependencies, fetch migration, native Promise, style modernization, and tooling changes.
keywords: [sui-js, migration, upgrade, v2.0]
---

# Migration Guide: v1.1 to v2.0

This guide covers breaking changes and required actions when upgrading from SUI-JS v1.1 to v2.0.

## Node.js Requirement

**Minimum Node.js version is now 24.0.0** (was 18.0.0).

```bash
node --version  # Must be >= 24.0.0
```

## Removed Dependencies

### Material Design Lite

MDL has been completely removed. If your code references MDL classes or `componentHandler`, you must update:

```typescript
// Before (v1.1) — MDL classes in templates
<div class="mdl-button mdl-js-button">Click</div>

// After (v2.0) — SUI classes only
<div class="button">Click</div>
```

**Action required:** Remove any `material-design-lite` imports from your project. Replace MDL CSS classes with SUI equivalents.

### crypto-js

Replaced with native browser implementations (`crypto.subtle`, `btoa`/`atob`). The `encrypt`, `decrypt`, `md5`, `encodeBase64`, `decodeBase64` functions still exist with the same signatures — no code changes needed unless you imported `crypto-js` directly.

## Fetch Migration (Xhr)

The `Xhr` class now uses the `fetch` API internally instead of `XMLHttpRequest`.

### What changed

- `Xhr` responses are now typed as `HttpResponse` instead of raw `XMLHttpRequest`
- The response object structure is the same (`Objekt`-wrapped), so most code is unaffected

### Action required

If you were accessing the raw `XMLHttpRequest` object directly, update to use the `HttpResponse` type:

```typescript
// Before (v1.1)
import { Xhr } from '@siposdani87/sui-js';

// After (v2.0) — use HttpResponse type for response typing
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

## Automatic Dependency Injection

Controllers and services now support automatic dependency detection via a static `inject` property.

```typescript
class UserController extends Controller {
    static inject = ['http', 'flash'] as const;

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

## Style Changes

v2.0 introduces a fully modernized design system with no MDL dependency:

- **Color palette**: New indigo/orange palette replacing MDL colors
- **System fonts**: Native system font stack instead of Roboto
- **CSS custom properties**: Theme colors exposed as `--sui-*` variables for runtime customization
- **Dark mode**: Automatic via `prefers-color-scheme`, manual via `.dark-theme` / `.light-theme` classes
- **Reduced motion**: Respects `prefers-reduced-motion` user preference
- **Soft shadows**: Modern single-layer box shadows (`$shadow-sm`, `$shadow-md`, `$shadow-lg`)
- **Border radius**: 8px default radius (`$radius-md`)
- **Focus rings**: Consistent `outline` focus indicators on interactive elements

### CSS custom properties

You can override theme colors at runtime:

```css
:root {
    --sui-primary: #your-color;
    --sui-accent: #your-accent;
}
```

### Action required

- Remove any Roboto font imports — system fonts are used automatically
- Replace any MDL class references in your HTML/templates with SUI equivalents
- If you customized dark mode via `Dark.scss` overrides, switch to `--sui-*` custom properties

## Package Exports

v2.0 uses the `exports` field in `package.json` for proper ESM support:

```json
{
    "exports": {
        ".": {
            "types": "./dist/index.d.ts",
            "import": "./dist/sui.esm.js",
            "default": "./dist/index.js"
        },
        "./styles": "./dist/sui.min.css"
    }
}
```

Import styles with:

```typescript
import '@siposdani87/sui-js/styles';
```

## Conventional Commits

The repository now enforces conventional commit format via commitlint + husky. All commits must follow:

```
type: description

# Examples:
feat: add user profile page
fix: correct date parsing in DateIO
chore: upgrade dependencies
```

## Summary of Breaking Changes

| Area | Change | Action |
| ---- | ------ | ------ |
| Node.js | Minimum version 24.0.0 | Upgrade Node.js |
| Dependencies | MDL removed | Replace MDL classes |
| Dependencies | crypto-js removed | None (native replacements have same API) |
| HTTP | `fetch` replaces `XMLHttpRequest` | Update if accessing raw XHR object |
| Async | `Promize` backed by native `Promise` | Check if relying on sync timing |
| Styles | MDL classes removed | Replace with SUI classes |
| Styles | Roboto font removed | None (system fonts automatic) |
| Styles | Dark mode via CSS custom properties | Update if using Dark.scss overrides |
| Commits | Conventional commit format enforced | Follow `type: description` format |
