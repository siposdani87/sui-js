# Function: inArray()

> **inArray**\<`T`\>(`items`, `item`): `boolean`

Defined in: [utils/operation.ts:565](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L565)

Checks whether an item exists in an array.

Uses `indexOf` for the lookup, so comparison is by strict equality.

## Type Parameters

### T

`T`

## Parameters

### items

`T`[]

The array to search.

### item

`T`

The item to look for.

## Returns

`boolean`

`true` if the item is found in the array.
