# Function: normalize()

> **normalize**(`str`): `string`

Defined in: [utils/operation.ts:1064](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L1064)

Strips diacritical marks (accents) from a string.

Applies Unicode NFD normalization to decompose characters, then removes
all combining diacritical marks (Unicode range U+0300 to U+036F).

## Parameters

### str

`string`

The string to normalize.

## Returns

`string`

The string with all diacritical marks removed.

## Example

```ts
normalize('cafe\u0301'); // 'cafe'
normalize('nino');       // 'nino'
```
