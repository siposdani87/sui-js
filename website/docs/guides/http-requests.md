---
id: http-requests
title: HTTP Requests
sidebar_label: HTTP Requests
sidebar_position: 4
description: Make HTTP requests with the SUI-JS Http module, including authentication, error handling, and the request lifecycle.
keywords: [sui-js, http, xhr, api, requests, rest]
---

# HTTP Requests

The `Http` module provides an HTTP client built on `Xhr` with `Promize`-based responses.

## Basic Usage

```typescript
// GET request
http.get('/api/users', { page: 1 }).then(
    (response) => console.log(response.get('users')),
    (error) => console.error(error.get('message')),
);

// POST request
http.post('/api/users', { name: 'John', email: 'john@example.com' }).then(
    (response) => console.log(response.get('id')),
    (error) => console.error(error),
);
```

## Available Methods

| Method | Description |
|--------|-------------|
| `http.get(url, params?, headers?)` | GET request |
| `http.post(url, data?, headers?)` | POST request |
| `http.put(url, data?, headers?)` | PUT request |
| `http.patch(url, data?, headers?)` | PATCH request |
| `http.delete(url, data?, headers?)` | DELETE request |

## Response Handling

Responses are wrapped in `Objekt` for dot-notation access:

```typescript
http.get('/api/user/1').then((response) => {
    const name = response.get('name');
    const email = response.get('profile.email');
});
```

## Next Steps

- [State & Routing](./state-routing) — Navigate between pages
- [Forms & Fields](./forms-fields) — Submit forms via HTTP
