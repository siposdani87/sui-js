---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
sidebar_position: 1
description: Install SUI-JS and create your first application with routing and UI components.
keywords: [sui-js, getting-started, install, setup, hello-world]
---

# Getting Started

Learn how to install SUI-JS and create your first application.

## Installation

```bash
npm install @siposdani87/sui-js
```

## Setup

```typescript
import { Application, Route } from '@siposdani87/sui-js';

const config = {
    app_id: 'my-app',
    locale: 'en-GB',
    backend: 'https://api.example.com',
    production: false,
};

const routes: Route[] = [
    {
        id: 'home',
        url: '/',
        controller: 'homeController',
        template: 'home.html',
    },
];

const app = new Application(config);
app.run(routes, ['homeController']);
```

## Build

SUI-JS uses esbuild to bundle as an IIFE with the global name `SUI`:

```bash
npm run build
```

The output is:
- `dist/sui.min.js` — JavaScript bundle
- `dist/sui.min.css` — Styles (Material Design Lite + custom SCSS)

## Next Steps

- [Architecture](./architecture) — Understand the framework layers
- [Application Setup](./application-setup) — Configure your application
- [HTTP Requests](./http-requests) — Communicate with a backend API
