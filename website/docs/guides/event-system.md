---
id: event-system
title: Event System
sidebar_label: Event System
sidebar_position: 7
description: Use the SUI-JS EventBus for publish/subscribe messaging and lifecycle events.
keywords: [sui-js, events, eventbus, pub-sub, lifecycle]
---

# Event System

SUI-JS uses an `EventBus` for publish/subscribe messaging between components.

## Basic Usage

```typescript
// Subscribe to an event
eventBus.on('user:updated', (data) => {
    console.log('User updated:', data);
});

// Publish an event
eventBus.trigger('user:updated', { id: 1, name: 'John' });
```

## Lifecycle Events

The `Application` class emits lifecycle events during initialization and routing.

## Next Steps

- [State & Routing](./state-routing) — Route change events
- [Application Setup](./application-setup) — Application lifecycle
