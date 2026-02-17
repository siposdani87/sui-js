# Function: clear()

> **clear**\<`T`\>(`items`): `void`

Defined in: [utils/operation.ts:519](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L519)

Clears all elements from an array or all own properties from an object.

Delegates to [clearArray](clearArray.md) for arrays or [clearObject](clearObject.md) for
plain objects. The original reference is mutated in-place.

## Type Parameters

### T

`T`

## Parameters

### items

The array or object to clear.

`object` | `T`[]

## Returns

`void`
