# Function: each()

> **each**\<`T`\>(`items`, `next`, `opt_start?`, `opt_end?`): `void`

Defined in: [utils/operation.ts:402](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L402)

Universal iterator that delegates to [eachArray](eachArray.md) for arrays or
[eachObject](eachObject.md) for plain objects.

Provides a single entry point for iterating over both arrays and objects.
For arrays, optional `opt_start` and `opt_end` bounds are forwarded to
[eachArray](eachArray.md).

## Type Parameters

### T

`T`

## Parameters

### items

The array or object to iterate over.

`object` | `T`[]

### next

(`item`, `key`) => `void`

Callback invoked
    for each element with the value and its key (index for arrays, property
    name for objects).

### opt\_start?

`number`

Start index for array iteration (inclusive).

### opt\_end?

`number`

End index for array iteration (exclusive).

## Returns

`void`

## Example

```ts
each([10, 20, 30], (value, index) => {
    console.log(index, value);
});

each({ a: 1, b: 2 }, (value, key) => {
    console.log(key, value);
});
```
