# Function: pluckKeys()

> **pluckKeys**(`obj`, `condition`): `string`[]

Defined in: [utils/operation.ts:823](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L823)

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
