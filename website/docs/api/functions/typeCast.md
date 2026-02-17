# Function: typeCast()

> **typeCast**(`value`): `any`

Defined in: [utils/operation.ts:21](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L21)

Casts string representations to their native JavaScript types.

Converts common string literals such as `'true'`, `'false'`, `'null'`,
`'undefined'`, `'infinity'`, and numeric strings into their corresponding
native types. Non-string values and multi-word strings (containing spaces)
pass through unchanged.

## Parameters

### value

`any`

The value to cast. Only single-word strings are processed.

## Returns

`any`

The cast native value, or the original value if no conversion applies.

## Example

```ts
typeCast('true');       // true
typeCast('null');       // null
typeCast('123');        // 123
typeCast('hello world'); // 'hello world' (unchanged, contains space)
typeCast(42);           // 42 (unchanged, not a string)
```
