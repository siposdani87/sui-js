---
id: application-setup
title: Application Setup
sidebar_label: Application Setup
sidebar_position: 3
description: Configure the SUI-JS Application class with routes, controllers, services, and coreResources.
keywords: [sui-js, application, config, controllers, services, routes]
---

# Application Setup

The `Application` class is the main entry point for SUI-JS applications. It manages dependency injection, routing, and the component lifecycle.

## Configuration

```typescript
import { Application } from '@siposdani87/sui-js';

const config = {
    app_id: 'my-app',
    locale: 'en-GB',
    backend: 'https://api.example.com',
    production: false,
};

const app = new Application(config);
```

## Routes

Routes map URL patterns to controllers and templates:

```typescript
const routes = [
    {
        id: 'home',
        url: '/',
        controller: 'homeController',
        template: 'home.html',
    },
    {
        id: 'users',
        url: '/users/:id',
        controller: 'userController',
        template: 'user.html',
    },
];
```

## Running the Application

```typescript
app.run(routes, ['homeController', 'userController']);
```

## Next Steps

- [State & Routing](./state-routing) — Navigate between routes
- [HTTP Requests](./http-requests) — Fetch data from your backend
