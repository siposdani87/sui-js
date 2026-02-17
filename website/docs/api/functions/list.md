# Function: list()

> **list**\<`T`\>(`args`, `callback`): `void`

Defined in: [utils/operation.ts:761](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L761)

Spreads an array as individual arguments to a callback function.

Equivalent to `callback(...args)`, providing a functional way to apply
array elements as positional arguments.

## Type Parameters

### T

`T`

## Parameters

### args

`T`[]

The array of arguments to spread.

### callback

(...`rest`) => `void`

The function to invoke with the spread arguments.

## Returns

`void`

## Example

```ts
list([1, 2, 3], (a, b, c) => {
    console.log(a, b, c); // 1 2 3
});
```
