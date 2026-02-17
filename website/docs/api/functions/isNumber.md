# Function: isNumber()

> **isNumber**(`value`): `value is number`

Defined in: [utils/operation.ts:246](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L246)

Type guard that checks whether a value can be safely cast to a finite number.

Returns `true` for numeric strings and numbers that represent finite values.
Excludes empty strings, `null`, values starting with `'0'` (except `'0'` itself)
or `'+'`, `Infinity`, and `NaN`.

## Parameters

### value

`any`

The value to check.

## Returns

`value is number`

`true` if the value represents a valid finite number.

## Example

```ts
isNumber(42);      // true
isNumber('3.14');   // true
isNumber('');       // false
isNumber('007');    // false (leading zero)
isNumber(Infinity); // false
```
