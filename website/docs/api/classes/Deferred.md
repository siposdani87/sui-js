# Class: Deferred\<T, K\>

Defined in: [core/deferred.ts:29](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/deferred.ts#L29)

A deferred pattern wrapper around [Promize](Promize.md) that separates promise
creation from resolution. The Deferred holds an internal [Promize](Promize.md)
and exposes `resolve()` and `reject()` methods so that the promise can be
settled from outside the callback scope.

This is the primary mechanism used throughout the framework to create
resolvable promises from within asynchronous flows such as
[Async](Async.md) serial/parallel execution and controller lifecycle events.

## Example

```ts
const deferred = new Deferred<string, Error>();
const promise = deferred.promise();

promise.then(
    (message) => console.log('Resolved:', message),
    (error) => console.error('Rejected:', error),
);

// Resolve later from any scope that has a reference to the deferred
deferred.resolve('Operation complete');
```

## See

 - [Promize](Promize.md)
 - [Async](Async.md)

## Type Parameters

### T

`T` = `object`

### K

`K` = `object`

## Constructors

### Constructor

> **new Deferred**\<`T`, `K`\>(): `Deferred`\<`T`, `K`\>

Defined in: [core/deferred.ts:35](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/deferred.ts#L35)

Creates a new Deferred instance with an unsettled [Promize](Promize.md).

#### Returns

`Deferred`\<`T`, `K`\>

## Methods

### promise()

> **promise**(): [`Promize`](Promize.md)\<`T`, `K`\>

Defined in: [core/deferred.ts:52](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/deferred.ts#L52)

Returns the underlying [Promize](Promize.md) instance so that consumers can
register `then()` callbacks without having access to the resolve/reject
controls.

#### Returns

[`Promize`](Promize.md)\<`T`, `K`\>

The internal [Promize](Promize.md) associated with this deferred.

#### Example

```ts
const deferred = new Deferred<number>();
const promise = deferred.promise();
promise.then((value) => console.log(value));
deferred.resolve(42);
```

***

### reject()

> **reject**(`opt_data?`): `void`

Defined in: [core/deferred.ts:82](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/deferred.ts#L82)

Rejects the deferred's [Promize](Promize.md) with the given data, triggering
any registered reject and complete callbacks.

#### Parameters

##### opt\_data?

`K`

Optional data to pass to the reject callback.

#### Returns

`void`

#### Example

```ts
const deferred = new Deferred<string, Error>();
deferred.promise().then(null, (err) => console.error(err));
deferred.reject(new Error('Something went wrong'));
```

***

### resolve()

> **resolve**(`opt_data?`): `void`

Defined in: [core/deferred.ts:67](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/deferred.ts#L67)

Resolves the deferred's [Promize](Promize.md) with the given data, triggering
any registered resolve and complete callbacks.

#### Parameters

##### opt\_data?

`T`

Optional data to pass to the resolve callback.

#### Returns

`void`

#### Example

```ts
const deferred = new Deferred<string>();
deferred.promise().then((msg) => console.log(msg));
deferred.resolve('Done');
```
