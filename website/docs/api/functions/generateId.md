# Function: generateId()

> **generateId**(`name`): `string`

Defined in: [utils/coder.ts:138](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/coder.ts#L138)

Creates a prefixed identifier by joining the given name with a random
[guid](guid.md) separated by a hyphen.

## Parameters

### name

`string`

The prefix for the generated identifier.

## Returns

`string`

A string in the format `'name-randomguid'`.

## Example

```ts
generateId('button');
// 'button-k7c3h8f2m9x1a4b6n0p5j3'
```
