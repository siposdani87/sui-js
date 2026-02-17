# Class: Scheduler

Defined in: [module/scheduler.ts:24](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/scheduler.ts#L24)

Simple daily task scheduler that registers callbacks to run at
specific times of day. Callbacks are stored in an [Objekt](Objekt.md)
keyed by time string, allowing multiple callbacks to be registered
for the same time slot.

## Example

```ts
const scheduler = new Scheduler();

scheduler.everyDay('08:00', () => {
    console.log('Good morning!');
});

scheduler.everyDay('17:30', () => {
    console.log('End of work day');
});
```

## See

[Objekt](Objekt.md)

## Constructors

### Constructor

> **new Scheduler**(): `Scheduler`

Defined in: [module/scheduler.ts:31](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/scheduler.ts#L31)

Creates a new Scheduler instance with an empty callback store
and initializes the internal runner.

#### Returns

`Scheduler`

## Properties

### schedulerStore

> **schedulerStore**: [`Objekt`](Objekt.md)

Defined in: [module/scheduler.ts:25](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/scheduler.ts#L25)

## Methods

### everyDay()

> **everyDay**(`time`, `callback`): `Function`

Defined in: [module/scheduler.ts:66](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/module/scheduler.ts#L66)

Registers a callback to be executed every day at the specified time.
Multiple callbacks can be registered for the same time slot; they
are accumulated in an array within the scheduler store.

#### Parameters

##### time

`string`

The time of day to execute the callback, as a string
    (e.g., `'08:00'`, `'17:30'`).

##### callback

`Function`

The function to invoke at the specified time.

#### Returns

`Function`

The registered callback function.

#### Example

```ts
const scheduler = new Scheduler();

const cb = scheduler.everyDay('09:00', () => {
    console.log('Daily report');
});
```
