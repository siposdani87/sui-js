# Function: pluck()

> **pluck**\<`T`, `K`\>(`items`, `attribute`): `T`[]

Defined in: [utils/operation.ts:795](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L795)

Extracts values of a given attribute from an array of [Objekt](../classes/Objekt.md) instances.

Calls `get()` on each [Objekt](../classes/Objekt.md) with the specified attribute name,
collecting results into a new array.

## Type Parameters

### T

`T`

### K

`K` *extends* [`Objekt`](../classes/Objekt.md)\<`object`\> = [`Objekt`](../classes/Objekt.md)\<`object`\>

## Parameters

### items

`K`[]

The array of [Objekt](../classes/Objekt.md) instances to pluck from.

### attribute

`string`

The dot-notation attribute path to extract
    (passed to [Objekt.get](../classes/Objekt.md#get)).

## Returns

`T`[]

An array of extracted attribute values.

## Example

```ts
const items = [new Objekt({ name: 'Alice' }), new Objekt({ name: 'Bob' })];
pluck(items, 'name'); // ['Alice', 'Bob']
```
