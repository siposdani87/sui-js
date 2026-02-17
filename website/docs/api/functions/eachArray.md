# Function: eachArray()

> **eachArray**\<`T`\>(`items`, `next`, `opt_start?`, `opt_end?`): `void`

Defined in: [utils/operation.ts:434](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L434)

Iterates over an array, invoking a callback for each element.

Supports optional start and end bounds to iterate over a sub-range of the
array. Defaults to iterating over the entire array.

## Type Parameters

### T

`T`

## Parameters

### items

`T`[]

The array to iterate over.

### next

(`item`, `index`) => `void`

Callback invoked with each
    element and its index.

### opt\_start?

`number`

Start index (inclusive). Defaults to `0`.

### opt\_end?

`number`

End index (exclusive). Defaults to `items.length`.

## Returns

`void`

## Example

```ts
eachArray(['a', 'b', 'c', 'd'], (item, i) => {
    console.log(i, item);
}, 1, 3);
// 1 'b'
// 2 'c'
```
