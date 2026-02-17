# Function: convertToISOFormat()

> **convertToISOFormat**(`formatString`): `string`

Defined in: [utils/dateio.ts:101](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/dateio.ts#L101)

Converts legacy date format tokens to date-fns-compatible format strings.

Replaces `YYYY` with `yyyy` and every `D` with `d` so that format strings
authored for Moment.js or similar libraries work with date-fns.

## Parameters

### formatString

`string`

A date format string that may contain legacy tokens.

## Returns

`string`

The format string with legacy tokens replaced.

## Example

```ts
convertToISOFormat('YYYY-MM-DD'); // 'yyyy-MM-dd'
```
