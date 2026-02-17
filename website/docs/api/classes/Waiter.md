# Class: Waiter

Defined in: [component/waiter.ts:12](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L12)

## Description

Debounce/delay utility for input waiting and scheduled callbacks. Provides both
simple (counter-based) and advanced (floating-point counter) debounce mechanisms
with pause/resume support.

## Example

```ts
const waiter = new Waiter();
waiter.advancedWaiting(() => search(query), 500);
```

## Constructors

### Constructor

> **new Waiter**(): `Waiter`

Defined in: [component/waiter.ts:20](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L20)

#### Returns

`Waiter`

#### Description

Creates a new Waiter with zeroed counters.

## Properties

### counter

> **counter**: `number`

Defined in: [component/waiter.ts:14](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L14)

***

### intervall

> **intervall**: `number`

Defined in: [component/waiter.ts:15](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L15)

***

### timeoutWaiting

> **timeoutWaiting**: `number`

Defined in: [component/waiter.ts:13](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L13)

## Methods

### advancedWaiting()

> **advancedWaiting**(`callback`, `opt_duration?`): `void`

Defined in: [component/waiter.ts:36](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L36)

#### Parameters

##### callback

`Function`

The function to execute after the delay.

##### opt\_duration?

`number`

Delay in milliseconds (defaults to 3000).

#### Returns

`void`

#### Description

Schedules a callback after a debounce delay. Each call resets the timer;
the callback only fires when no new calls arrive within the duration.

#### Example

```ts
input.addEventListener('keyup', () => {
    waiter.advancedWaiting(() => fetchResults(input.value), 500);
});
```

***

### simpleWaiting()

> **simpleWaiting**(`callback`, `opt_duration?`): `void`

Defined in: [component/waiter.ts:99](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L99)

#### Parameters

##### callback

`Function`

The function to execute after the delay.

##### opt\_duration?

`number`

Delay in milliseconds (defaults to 3000).

#### Returns

`void`

#### Description

Schedules a callback using a simple integer-counter debounce mechanism.

#### Example

```ts
waiter.simpleWaiting(() => save(), 1000);
```

***

### startAdvancedWaiting()

> **startAdvancedWaiting**(): `void`

Defined in: [component/waiter.ts:86](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L86)

#### Returns

`void`

#### Description

Resumes the advanced waiting mechanism by stopping the interval and
decrementing the counter to allow the pending callback to fire.

#### Example

```ts
waiter.startAdvancedWaiting(); // Resume debounce
```

***

### stopAdvancedWaiting()

> **stopAdvancedWaiting**(): `void`

Defined in: [component/waiter.ts:72](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/component/waiter.ts#L72)

#### Returns

`void`

#### Description

Pauses the advanced waiting mechanism by continuously incrementing the counter,
preventing any pending callback from firing.

#### Example

```ts
waiter.stopAdvancedWaiting(); // Pause debounce
```
