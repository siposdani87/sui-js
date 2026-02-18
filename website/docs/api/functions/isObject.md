# Function: isObject()

> **isObject**(`value`): `value is object`

Defined in: [utils/operation.ts:290](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L290)

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
