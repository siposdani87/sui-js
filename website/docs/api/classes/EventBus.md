# Class: EventBus

Defined in: [module/eventBus.ts:35](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L35)

Publish/subscribe event system that uses an [Objekt](Objekt.md) as the
internal event store. Each named event can have multiple callback
functions registered against it. Callbacks are invoked serially via
[Async](Async.md) when the event is triggered, and the result is returned
as a [Promize](Promize.md).

EventBus supports four operations on callbacks: register
([EventBus.set](#set)), remove by reference ([EventBus.remove](#remove)),
remove the most recently registered ([EventBus.pop](#pop)), and invoke
all registered callbacks ([EventBus.call](#call)). The
[EventBus.override](#override) method provides a fallback pattern where a
default callback is used when no listeners have been registered.

## Example

```ts
const eventBus = new EventBus();

const onUserLogin = eventBus.set('user.login', (user) => {
    console.log('User logged in:', user.get('name'));
});

eventBus.call('user.login', [currentUser]);

// Later, remove the specific callback
eventBus.remove('user.login', onUserLogin);
```

## See

 - [Async](Async.md)
 - [Objekt](Objekt.md)

## Constructors

### Constructor

> **new EventBus**(): `EventBus`

Defined in: [module/eventBus.ts:41](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L41)

Creates a new EventBus with an empty event store.

#### Returns

`EventBus`

## Properties

### eventStore

> **eventStore**: [`Objekt`](Objekt.md)

Defined in: [module/eventBus.ts:36](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L36)

## Methods

### call()

> **call**(`name`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [module/eventBus.ts:122](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L122)

Invokes all callbacks registered for the named event in serial
order via [Async](Async.md). If no callbacks are registered, a single
no-op callback is executed. Returns a [Promize](Promize.md) that resolves
when all callbacks have completed.

#### Parameters

##### name

`string`

The event name to trigger.

##### opt\_args?

`any`[] = `[]`

Arguments passed to each callback.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

Resolves when all callbacks have been executed.

#### Example

```ts
eventBus.call('app.ready', [config]).then(() => {
    console.log('All ready handlers complete');
});
```

***

### override()

> **override**(`name`, `args`, `callback`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [module/eventBus.ts:145](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L145)

Invokes the registered callbacks for the named event, or falls back
to the provided callback if no listeners have been registered. This
enables a pattern where the caller supplies default behavior that
can be overridden by event subscribers.

#### Parameters

##### name

`string`

The event name to trigger.

##### args

`any`[]

Arguments passed to each callback.

##### callback

`Function`

The fallback callback used when no
    listeners are registered for the event.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

Resolves when all callbacks have been executed.

#### Example

```ts
eventBus.override('confirm.action', [message], (msg) => {
    return window.confirm(msg);
});
```

***

### pop()

> **pop**(`name`): `void`

Defined in: [module/eventBus.ts:101](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L101)

Removes the most recently registered callback for the named event.
This is a convenience method when the caller does not hold a
reference to the callback function.

#### Parameters

##### name

`string`

The event name.

#### Returns

`void`

#### Example

```ts
eventBus.pop('data.loaded');
```

***

### remove()

> **remove**(`name`, `callback`): `void`

Defined in: [module/eventBus.ts:83](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L83)

Removes a specific callback from the named event's callback list.
Uses reference equality, so the exact function reference originally
passed to [EventBus.set](#set) must be provided.

#### Parameters

##### name

`string`

The event name.

##### callback

`Function`

The callback reference to remove.

#### Returns

`void`

#### Example

```ts
eventBus.remove('data.loaded', handler);
```

***

### set()

> **set**(`name`, `callback`): `Function`

Defined in: [module/eventBus.ts:63](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/eventBus.ts#L63)

Registers a callback function for the named event. If the callback
is a valid function, it is appended to the event's callback list.
The callback reference is returned so it can be passed to
[EventBus.remove](#remove) later.

#### Parameters

##### name

`string`

The event name (dot-notation supported via
    [Objekt](Objekt.md)).

##### callback

`Function`

The function to invoke when the event
    fires.

#### Returns

`Function`

The registered callback (same reference as the
    input), useful for later removal.

#### Example

```ts
const handler = eventBus.set('data.loaded', (items) => {
    console.log('Loaded', items.length, 'items');
});
```
