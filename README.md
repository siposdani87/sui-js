# SUI-JS

[![Version](https://img.shields.io/npm/v/@siposdani87/sui-js.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-js)
[![Download](https://img.shields.io/npm/dt/@siposdani87/sui-js.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-js)
[![License](https://img.shields.io/npm/l/@siposdani87/sui-js.svg?style=square)](./LICENSE)

A lightweight TypeScript frontend framework with predefined UI components. Built with esbuild, styled with custom SCSS, and fully documented with JSDoc.

## Features

- **Application Shell** — routing, dependency injection, state management
- **24 UI Components** — Calendar, Form, Table, GoogleMap, Carousel, Popup, Navigation, and more
- **20+ Form Fields** — text, select, datetime, color, file, checkbox, radio, range, autocomplete
- **HTTP Client** — fetch-based with typed responses
- **Utility Modules** — EventBus, Cookie, Depot (storage), Dialog, Flash, Template
- **TypeScript** — strict mode, full type declarations
- **Accessibility** — jest-axe tested, ARIA support

## Getting Started

### Installing

```bash
npm install @siposdani87/sui-js
```

### Basic Usage

```typescript
import { Application, Route } from '@siposdani87/sui-js';

const config = {
    app_id: 'APP_ID',
    locale: 'en-GB',
    backend: 'http://localhost:3000',
    production: false,
};
const routes: Route[] = [];
const services: string[] = [];

const app = new Application(config);
app.run(routes, services);
```

### IIFE / Script Tag

```html
<link rel="stylesheet" href="node_modules/@siposdani87/sui-js/dist/sui.min.css" />
<script src="node_modules/@siposdani87/sui-js/dist/sui.min.js"></script>
<script>
    const app = new SUI.Application(config);
    app.run(routes, services);
</script>
```

## Documentation

Full documentation, guides, and API reference available at [sui-js.siposdani87.com](https://sui-js.siposdani87.com/).

## Preview

![Overview](https://raw.githubusercontent.com/siposdani87/sui-js/master/images/sui-js.png)

## Development

```bash
npm run dev          # Dev server on :4000 with watch mode
npm run build        # Full build (lint + test + bundle)
npm run test         # Run tests
npm run lint         # TypeScript + ESLint + Stylelint
```

## Bugs or Requests

If you encounter any problems feel free to open an [issue](https://github.com/siposdani87/sui-js/issues/new?template=bug_report.md). If you feel the library is missing a feature, please raise a [ticket](https://github.com/siposdani87/sui-js/issues/new?template=feature_request.md). Pull requests are also welcome.

## Developer

[Daniel Sipos](https://siposdani87.com)

## Sponsors

This project is generously supported by [TrophyMap](https://trophymap.org), [I18Nature](https://i18nature.com), and several other amazing organizations.

<a href="https://www.buymeacoffee.com/siposdani87" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" width="150" height="39" /></a>

## License

[BSD 3-Clause](./LICENSE)
