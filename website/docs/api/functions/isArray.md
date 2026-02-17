# Function: isArray()

> **isArray**\<`T`\>(`value`): `value is T[]`

Defined in: [utils/operation.ts:207](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L207)

Type guard that checks whether a value is an array.

Delegates to `Array.isArray` and narrows the type to `Array<T>`.

## Type Parameters

### T

`T`

## Parameters

### value

`any`

The value to check.

## Returns

`value is T[]`

`true` if the value is an array.
