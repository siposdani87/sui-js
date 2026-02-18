# Function: pluckKeys()

> **pluckKeys**(`obj`, `condition`): `string`[]

Defined in: [utils/operation.ts:823](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L823)

Returns the keys of an object for which a condition function returns `true`.

Iterates over the object's own properties and collects keys where the
condition callback evaluates to `true`.

## Parameters

### obj

`object`

The object whose keys to filter.

### condition

(`value`, `key`) => `boolean`

A predicate function
    invoked with each property value and key.

## Returns

`string`[]

An array of keys where the condition was satisfied.

## Example

```ts
pluckKeys({ a: 1, b: 2, c: 3 }, (value) => value > 1);
// ['b', 'c']
```
