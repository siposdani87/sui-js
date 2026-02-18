# Class: Promize\<T, K\>

Defined in: [core/promize.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L35)

The framework's custom promise implementation, used instead of native
`Promise` throughout the codebase. Promize supports resolve/reject
semantics with deferred callback registration: callbacks can be attached
before or after the promise has been settled.

Data is stored and passed as arrays to support multi-argument callback
invocation. The generic type parameters `T` (resolve data) and `K`
(reject data) provide type safety for the callback signatures.

Promize works in tandem with [Deferred](Deferred.md), which wraps a Promize and
exposes its resolve/reject controls externally, and with [Async](Async.md),
which orchestrates serial and parallel execution of Promize-returning
functions.

## Example

```ts
const promize = new Promize<string, Error>();

promize.then(
    (message) => console.log('Resolved:', message),
    (error) => console.error('Rejected:', error),
    () => console.log('Complete'),
);

promize.resolve('Success');
```

## See

 - [Deferred](Deferred.md)
 - [Async](Async.md)

## Type Parameters

### T

`T` = `object`

### K

`K` = `object`

## Constructors

### Constructor

> **new Promize**\<`T`, `K`\>(`opt_options?`): `Promize`\<`T`, `K`\>

Defined in: [core/promize.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L45)

Creates a new Promize instance in an unsettled state.

#### Parameters

##### opt\_options?

Optional configuration object merged into the
    internal options. Typically left empty; used internally by the
    framework for advanced scenarios.

`object` | `undefined`

#### Returns

`Promize`\<`T`, `K`\>

## Properties

### options

> **options**: [`Objekt`](Objekt.md)

Defined in: [core/promize.ts:36](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L36)

## Methods

### defer()

> **defer**(`defer`, `opt_complete?`): `void`

Defined in: [core/promize.ts:198](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L198)

Chains this promise to a [Deferred](Deferred.md), forwarding the resolution
or rejection to the deferred's promise. This is used internally to
propagate results through [Async](Async.md) execution chains.

#### Parameters

##### defer

[`Deferred`](Deferred.md)

The [Deferred](Deferred.md) instance to forward results to.

##### opt\_complete?

() => `void`

Optional complete callback invoked after forwarding.

#### Returns

`void`

#### Example

```ts
const deferred = new Deferred<string[]>();
const promize = new Promize<string>();

promize.defer(deferred);
promize.resolve('result');
// deferred.promise() is now resolved with ['result']
```

***

### reject()

> **reject**(`opt_data?`): `void`

Defined in: [core/promize.ts:113](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L113)

Rejects the promise with the given data. If `then()` callbacks have
already been registered, the reject and complete callbacks are invoked
immediately. Otherwise the data and rejected status are stored for
deferred delivery.

#### Parameters

##### opt\_data?

`K`

Optional data to pass to the reject callback.
    Non-array values are wrapped in an array for consistent
    multi-argument spreading.

#### Returns

`void`

#### Example

```ts
const promize = new Promize<string, Error>();
promize.then(null, (err) => console.error(err));
promize.reject(new Error('Failed'));
```

***

### resolve()

> **resolve**(`opt_data?`): `void`

Defined in: [core/promize.ts:81](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L81)

Resolves the promise with the given data. If `then()` callbacks have
already been registered, they are invoked immediately. Otherwise the
data and settled status are stored so that callbacks registered via a
later `then()` call receive the data synchronously.

#### Parameters

##### opt\_data?

`T`

Optional data to pass to the resolve callback.
    Non-array values are wrapped in an array for consistent
    multi-argument spreading.

#### Returns

`void`

#### Example

```ts
const promize = new Promize<number>();
promize.then((value) => console.log(value));
promize.resolve(42); // logs: 42
```

***

### then()

> **then**(`resolve`, `opt_reject?`, `opt_complete?`): `void`

Defined in: [core/promize.ts:157](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/promize.ts#L157)

Registers resolve, reject, and complete callbacks on this promise.

If the promise has already been settled (resolved or rejected), the
appropriate callbacks are invoked immediately with the stored data.
If the promise is still pending, the callbacks are stored and will be
invoked when `resolve()` or `reject()` is called.

#### Parameters

##### resolve

(...`args`) => `void`

Callback invoked when the promise is resolved.

##### opt\_reject?

(...`args`) => `void`

Callback invoked when the promise is rejected.
    Defaults to a no-op function.

##### opt\_complete?

(...`args`) => `void`

Callback invoked after either resolve or reject.
    Defaults to a no-op function.

#### Returns

`void`

#### Example

```ts
const promize = new Promize<string, string>();

// Register before settlement
promize.then(
    (msg) => console.log('OK:', msg),
    (err) => console.log('Error:', err),
    () => console.log('Done'),
);

promize.resolve('Hello');
// logs: "OK: Hello" then "Done"
```
