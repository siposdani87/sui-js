# Function: isEmpty()

> **isEmpty**\<`T`\>(`items`): `boolean`

Defined in: [utils/operation.ts:733](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L733)

Checks whether an array or object is empty.

For arrays, checks if `length === 0`. For plain objects, counts own
properties and returns `true` if there are none.

## Type Parameters

### T

`T`

## Parameters

### items

The array or object to check.

`object` | `T`[]

## Returns

`boolean`

`true` if the collection has no elements or properties.

## Example

```ts
isEmpty([]);        // true
isEmpty([1]);       // false
isEmpty({});        // true
isEmpty({ a: 1 }); // false
```
