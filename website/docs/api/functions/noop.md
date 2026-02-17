# Function: noop()

> **noop**\<`T`\>(`opt_result?`): () => `T` \| `undefined`

Defined in: [utils/operation.ts:129](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L129)

Returns a function that always returns the given value (or `undefined`).

Useful as a default callback or placeholder function when a callable is
required but no meaningful operation is needed.

## Type Parameters

### T

`T`

## Parameters

### opt\_result?

`T`

The value the returned function will produce.

## Returns

A no-operation function that returns `opt_result`.

> (): `T` \| `undefined`

### Returns

`T` \| `undefined`

## Example

```ts
const fn = noop();
fn(); // undefined

const fn42 = noop(42);
fn42(); // 42
```
