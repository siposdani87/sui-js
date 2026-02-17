# Function: isObject()

> **isObject**(`value`): `value is object`

Defined in: [utils/operation.ts:290](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L290)

Type guard that checks whether a value has `typeof 'object'`.

Note: this returns `true` for arrays, `Date` instances, and `null`.
Use [isPureObject](isPureObject.md) to check for plain objects only.

## Parameters

### value

`any`

The value to check.

## Returns

`value is object`

`true` if `typeof value === 'object'`.
