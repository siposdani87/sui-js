## SUI-JS

[![Version](https://img.shields.io/npm/v/@siposdani87/sui-js.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-js)
[![Download](https://img.shields.io/npm/dt/@siposdani87/sui-js.svg?style=square)](https://www.npmjs.com/package/@siposdani87/sui-js)
[![License](https://img.shields.io/npm/l/@siposdani87/sui-js.svg?style=square)](./LICENSE)

<a href="https://www.buymeacoffee.com/siposdani87" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-green.png" alt="Buy Me A Coffee" style="width: 150px !important;"></a>

This is a lightweight FE framework. It is written in the TypeScript language. The codebase was documented with JSDoc and compiled with ESbuild advanced settings. In this framework there are a lot of predefined UI components.

## Getting Started

### Installing

```bash
npm install @siposdani87/sui-js
```

### Basic Usage

Check example directory for more samples and options.

```typescript
import { Application, Route } from '@siposdani87/sui-js';

const config = {
    app_id: 'APP_ID',
    locale: 'en-GB',
    backend: 'http://localhost:3000',
    production: false
};
const routes: Route[] = [];
const services: string[] = [];

const app = new Application(config);
app.run(routes, services);
```

## Preview

![Overview](https://raw.githubusercontent.com/siposdani87/sui-js/master/images/sui-js.png)

## Bugs or Requests

If you encounter any problems feel free to open an [issue](https://github.com/siposdani87/sui-js/issues/new?template=bug_report.md). If you feel the library is missing a feature, please raise a [ticket](https://github.com/siposdani87/sui-js/issues/new?template=feature_request.md). Pull request are also welcome.

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=b992bb656478&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

## Developer

[Dániel Sipos](https://siposdani87.com)

## Sponsors

This project is generously supported by [TrophyMap](https://trophymap.org), [I18Nature](https://i18nature.com), and several other amazing organizations.
