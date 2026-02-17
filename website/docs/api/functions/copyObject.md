# Function: copyObject()

> **copyObject**(`item`): `object`

Defined in: [utils/operation.ts:704](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L704)

Creates a deep copy of a plain object.

Recursively copies nested arrays (via [copyArray](copyArray.md)) and plain objects
(via copyObject). Primitive values are copied by value.

## Parameters

### item

`object`

The object to deep copy.

## Returns

`object`

A new object containing deep copies of all properties.
