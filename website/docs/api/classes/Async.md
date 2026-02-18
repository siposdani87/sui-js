# Class: Async

Defined in: [core/async.ts:45](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L45)

Provides serial and parallel execution of asynchronous function calls
using the framework's [Deferred](Deferred.md)/[Promize](Promize.md) system rather than
native Promises.

Functions passed to `parallel()` or `serial()` may return a
[Promize](Promize.md) (or any thenable) to signal asynchronous completion, or
return a synchronous value (including `undefined`) to proceed immediately.

The `parallelFunction()` method supports dynamic, incremental additions
to an ongoing parallel batch when the total count is known ahead of time
(set via the constructor's `opt_sum` parameter). When the batch completes,
the overridable `eventComplete()` hook is called.

## Examples

```ts
const async = new Async();

// Serial execution: each function runs after the previous resolves
async.serial([
    () => fetchUser(),
    () => fetchPosts(),
]).then((results) => {
    console.log('All done:', results);
});
```

```ts
const async = new Async();

// Parallel execution: all functions run concurrently
async.parallel([
    () => loadImage('a.png'),
    () => loadImage('b.png'),
]).then((results) => {
    console.log('Images loaded:', results);
});
```

## See

 - [Deferred](Deferred.md)
 - [Promize](Promize.md)

## Constructors

### Constructor

> **new Async**(`opt_sum?`): `Async`

Defined in: [core/async.ts:61](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L61)

Creates a new Async instance.

#### Parameters

##### opt\_sum?

`number`

Optional expected count for parallel batch operations
    using `parallelFunction()`. When set, the batch completes once
    this many functions have finished.

#### Returns

`Async`

## Properties

### call

> **call**: `object`

Defined in: [core/async.ts:47](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L47)

#### counter

> **counter**: `number`

#### isError

> **isError**: `boolean`

#### results

> **results**: `any`[]

#### sum

> **sum**: `number`

***

### sum

> **sum**: `number`

Defined in: [core/async.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L46)

## Methods

### eventComplete()

> **eventComplete**(`isError`, `results`): `void`

Defined in: [core/async.ts:315](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L315)

Overridable hook called when a parallel batch started via
`parallelFunction()` completes (i.e., all expected functions have
finished). Override this method to handle batch completion events.

#### Parameters

##### isError

`boolean`

Whether any function in the batch produced an error.

##### results

`any`[]

Array of results from all functions in the batch.

#### Returns

`void`

#### Example

```ts
const async = new Async(2);
async.eventComplete = (isError, results) => {
    if (!isError) {
        console.log('All parallel functions completed:', results);
    }
};
```

***

### parallel()

> **parallel**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/async.ts:87](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L87)

Executes an array of functions concurrently. Each function may return
a [Promize](Promize.md) for asynchronous work or a synchronous value. The
returned promise resolves with an array of results (one per function)
once all functions have completed, or rejects if any function fails.

#### Parameters

##### calls

`Function`[]

Array of functions to execute in parallel.

##### opt\_args?

`any`[]

Optional arguments array passed to each function call.
    When provided, the results array in the resolution will contain
    these args instead of the individual function results.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A [Promize](Promize.md) that resolves with the collected results.

#### Example

```ts
const async = new Async();
async.parallel([
    () => loadResource('config.json'),
    () => loadResource('data.json'),
]).then((results) => {
    const [config, data] = results;
});
```

***

### parallelFunction()

> **parallelFunction**(`call`, `opt_args?`, `opt_index?`): `void`

Defined in: [core/async.ts:132](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L132)

Adds a single function to an ongoing parallel batch. Unlike
`parallel()`, this method does not return a promise; instead, the
overridable `eventComplete()` hook is called when all expected
functions (determined by the constructor's `opt_sum`) have finished.

This is useful for dynamic, incremental parallel execution where
functions are added one at a time rather than all at once.

#### Parameters

##### call

`Function`

The function to execute as part of the parallel batch.

##### opt\_args?

`any`[]

Optional arguments array passed to the function.

##### opt\_index?

`number`

Optional explicit index for storing the result.
    If omitted, an auto-incrementing counter is used.

#### Returns

`void`

#### Example

```ts
const async = new Async(3);
async.eventComplete = (isError, results) => {
    console.log('Batch complete:', results);
};

async.parallelFunction(() => loadItem(1));
async.parallelFunction(() => loadItem(2));
async.parallelFunction(() => loadItem(3));
```

***

### serial()

> **serial**(`calls`, `opt_args?`): [`Promize`](Promize.md)\<`object`, `object`\>

Defined in: [core/async.ts:342](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L342)

Executes an array of functions sequentially, one after another. Each
function receives the optional args concatenated with accumulated
results from previous functions. The returned promise resolves with
the collected results array once all functions have completed, or
rejects on the first failure.

#### Parameters

##### calls

`Function`[]

Array of functions to execute in order.

##### opt\_args?

`any`[]

Optional arguments array passed to each function
    call and used as the results payload when provided.

#### Returns

[`Promize`](Promize.md)\<`object`, `object`\>

A [Promize](Promize.md) that resolves with the collected results.

#### Example

```ts
const async = new Async();
async.serial([
    () => authenticate(),
    () => loadUserProfile(),
    () => loadDashboard(),
]).then(
    (results) => console.log('All steps complete:', results),
    (error) => console.error('Step failed:', error),
);
```

***

### setStatus()

> **setStatus**(`sum`, `isError`, `counter`, `results`): `void`

Defined in: [core/async.ts:287](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/core/async.ts#L287)

Manually sets the internal counter state. This is primarily used for
testing or external control scenarios where the internal tracking
needs to be adjusted without going through the normal execution flow.

#### Parameters

##### sum

`number`

The current completed count.

##### isError

`boolean`

Whether an error has occurred in the batch.

##### counter

`number`

The auto-increment counter for `parallelFunction()`.

##### results

`any`[]

The current results array.

#### Returns

`void`

#### Example

```ts
const async = new Async(5);
async.setStatus(2, false, 2, [resultA, resultB]);
```
