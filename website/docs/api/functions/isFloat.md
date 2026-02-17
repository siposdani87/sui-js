# Function: isFloat()

> **isFloat**(`value`): `value is number`

Defined in: [utils/operation.ts:264](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L264)

Type guard that checks whether a value is a floating-point number.

Returns `true` when `parseFloat(value)` produces the same value,
indicating the value is already a parsed float.

## Parameters

### value

`any`

The value to check.

## Returns

`value is number`

`true` if `parseFloat(value) === value`.
