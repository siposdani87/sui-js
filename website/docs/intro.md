---
id: intro
title: SUI-JS Documentation
sidebar_label: Overview
sidebar_position: 0
description: SUI-JS is a lightweight frontend framework written in TypeScript with 60+ UI components, Material Design styling, and comprehensive API.
keywords: [sui-js, typescript, framework, frontend, ui, components, material-design]
---

# SUI-JS Documentation

SUI-JS is a lightweight frontend framework written in TypeScript with predefined UI components. It uses Material Design Lite for base styling and provides 60+ ready-to-use components for building single-page applications.

## Quick Start

```bash
npm install @siposdani87/sui-js
```

```typescript
import { Application, Route } from '@siposdani87/sui-js';

const config = {
    app_id: 'my-app',
    locale: 'en-GB',
    backend: 'https://api.example.com',
    production: false,
};

const app = new Application(config);
app.run([], []);
```

## Architecture

SUI-JS is organized in four layers:

| Layer | Description | Examples |
|-------|-------------|----------|
| **Core** | Framework primitives for data, DOM, routing | Objekt, Knot, Query, Collection, State |
| **Modules** | Feature modules for HTTP, events, storage | Http, EventBus, Dialog, Depot, Cookie |
| **Components** | UI components for layout and interaction | Application, Form, Table, Calendar, Navigation |
| **Fields** | Form field components for user input | TextField, SelectField, DateTimeField, FileField |

## Documentation Sections

- **[Guides](/docs/guides/getting-started)** — Step-by-step tutorials for common tasks
- **[API Reference](/docs)** — Auto-generated TypeDoc documentation for all classes, functions, and types

## Links

- [GitHub Repository](https://github.com/siposdani87/sui-js)
- [NPM Package](https://www.npmjs.com/package/@siposdani87/sui-js)
