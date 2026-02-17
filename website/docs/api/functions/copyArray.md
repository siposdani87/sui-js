# Function: copyArray()

> **copyArray**\<`T`\>(`items`): `T`[]

Defined in: [utils/operation.ts:680](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L680)

Creates a deep copy of an array.

Recursively copies nested arrays (via copyArray) and plain objects
(via [copyObject](copyObject.md)). Primitive values are copied by value.

## Type Parameters

### T

`T`

## Parameters

### items

`T`[]

The array to deep copy.

## Returns

`T`[]

A new array containing deep copies of all elements.
