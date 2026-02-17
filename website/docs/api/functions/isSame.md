# Function: isSame()

> **isSame**(`a`, `b`): `boolean`

Defined in: [utils/operation.ts:616](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L616)

Performs a deep equality comparison between two values.

For plain objects with equal JSON string lengths, recursively compares
each property using `isSame`. For all other types, compares their
JSON serialized representations via strict equality.

## Parameters

### a

`any`

The first value to compare.

### b

`any`

The second value to compare.

## Returns

`boolean`

`true` if the two values are deeply equal.

## Example

```ts
isSame({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] }); // true
isSame([1, 2], [1, 3]);                              // false
```
