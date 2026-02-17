# Function: md5()

> **md5**(`str`): `string`

Defined in: [utils/coder.ts:103](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L103)

Computes the MD5 hash of a string using crypto-js.

## Parameters

### str

`string`

The input string to hash.

## Returns

`string`

The hexadecimal MD5 hash string.

## Example

```ts
md5('hello');
// '5d41402abc4b2a76b9719d911017c592'
```
