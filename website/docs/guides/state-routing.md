---
id: state-routing
title: State & Routing
sidebar_label: State & Routing
sidebar_position: 5
description: Manage application state and client-side routing with the SUI-JS State and Router classes.
keywords: [sui-js, state, routing, navigation, url-params, router]
---

# State & Routing

SUI-JS provides client-side routing through the `State` and `Router` classes.

## Defining Routes

```typescript
const routes = [
    {
        id: 'home',
        url: '/',
        controller: 'homeController',
        template: 'home.html',
    },
    {
        id: 'user-detail',
        url: '/users/:id',
        controller: 'userController',
        template: 'user.html',
    },
];
```

## Navigating

```typescript
// Navigate to a route by ID
state.go('user-detail', { id: 42 });

// Get the current route
const currentState = state.getCurrent();
```

## URL Parameters

Route parameters (`:id`, `:slug`) are automatically extracted and available in the controller.

## Next Steps

- [Event System](./event-system) — React to lifecycle events
- [Application Setup](./application-setup) — Configure routes
