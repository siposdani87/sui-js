# Function: isInteger()

> **isInteger**(`value`): `value is number`

Defined in: [utils/operation.ts:277](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L277)

Type guard that checks whether a value is an integer.

Returns `true` when `parseInt(value, 10)` produces the same value,
indicating the value is already a parsed integer.

## Parameters

### value

`any`

The value to check.

## Returns

`value is number`

`true` if `parseInt(value, 10) === value`.
