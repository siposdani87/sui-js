# Function: is()

> **is**(`value`, `type`): `value is string`

Defined in: [utils/operation.ts:359](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L359)

Low-level type check using the `typeof` operator.

Compares the `typeof` result of the value against the given type string.
Acts as a type guard narrowing the value to `typeof type`.

## Parameters

### value

`any`

The value to check.

### type

`string`

The expected `typeof` string (e.g., `'string'`, `'number'`, `'object'`).

## Returns

`value is string`

`true` if `typeof value === type`.
