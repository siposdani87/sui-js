---
id: storage
title: Storage
sidebar_label: Storage
sidebar_position: 9
description: Persist data with SUI-JS Depot (localStorage/sessionStorage) and Cookie modules.
keywords: [sui-js, storage, depot, cookie, localstorage, sessionstorage]
---

# Storage

SUI-JS provides two storage modules: `Depot` for Web Storage and `Cookie` for cookies.

## Depot — localStorage / sessionStorage

```typescript
// Store a value
depot.set('user', { name: 'John', role: 'admin' });

// Retrieve a value
const user = depot.get('user');

// Remove a value
depot.remove('user');
```

## Cookie

```typescript
// Set a cookie
cookie.set('session_id', 'abc123');

// Get a cookie
const sessionId = cookie.get('session_id');

// Remove a cookie
cookie.remove('session_id');
```

## Next Steps

- [HTTP Requests](./http-requests) — Authentication tokens
- [Application Setup](./application-setup) — Configuration persistence
