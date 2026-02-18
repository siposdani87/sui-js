# Function: setDateIOLocale()

> **setDateIOLocale**(`newLocale`): `void`

Defined in: [utils/dateio.ts:84](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/dateio.ts#L84)

Sets the global locale used by all [DateIO](../variables/DateIO.md) formatting and
parsing methods.

Call this once during application bootstrap to ensure dates are
rendered in the correct language and regional format.

## Parameters

### newLocale

`string`

BCP 47 locale identifier (e.g. `'hu-HU'`, `'en-US'`).

## Returns

`void`

## Example

```ts
setDateIOLocale('hu-HU');
```
