# Function: copy()

> **copy**\<`T`\>(`items`): `object` \| `T`[] \| `undefined`

Defined in: [utils/operation.ts:658](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L658)

Creates a deep copy of an array or plain object.

Delegates to [copyArray](copyArray.md) for arrays or [copyObject](copyObject.md) for plain
objects. Nested arrays and objects are recursively deep-copied.

## Type Parameters

### T

`T`

## Parameters

### items

The array or object to copy.

`object` | `T`[]

## Returns

`object` \| `T`[] \| `undefined`

A deep copy of the input, or
    `undefined` if the input is neither an array nor a plain object.
