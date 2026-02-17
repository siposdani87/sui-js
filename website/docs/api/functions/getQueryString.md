# Function: getQueryString()

> **getQueryString**(`opt_params?`): `string`

Defined in: [utils/operation.ts:1015](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L1015)

Builds a query string from an object of key-value pairs.

Array values are encoded with bracket notation (`key[]=value`). Properties
with `undefined` or `null` values are skipped.

## Parameters

### opt\_params?

`object`

An object of key-value pairs to encode.

## Returns

`string`

The encoded query string without a leading `?`, or an
    empty string if no valid parameters are provided.

## Example

```ts
getQueryString({ name: 'test', tags: ['a', 'b'] });
// 'name=test&tags[]=a&tags[]=b'

getQueryString({ a: 1, b: null, c: undefined });
// 'a=1'
```
