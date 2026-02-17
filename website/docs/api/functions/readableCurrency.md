# Function: readableCurrency()

> **readableCurrency**(`price`, `opt_delimiter?`, `opt_separator?`, `opt_precision?`): `string`

Defined in: [utils/math.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L27)

Formats a number as a human-readable currency string with configurable
thousands delimiter, decimal separator, and decimal precision.

Splits the integer portion into groups of three digits separated by the
delimiter, and appends the decimal portion (if any) after the separator.
Falsy price values are treated as zero.

## Parameters

### price

`number`

The numeric value to format.

### opt\_delimiter?

Character inserted between
    every three digits of the integer part. Defaults to a space `' '`.

`string` | `undefined`

### opt\_separator?

Character placed between the
    integer and decimal parts. Defaults to `','`.

`string` | `undefined`

### opt\_precision?

Number of decimal places to
    include in the output. Defaults to `0` (no decimals).

`number` | `undefined`

## Returns

`string`

The formatted currency string.

## Examples

```ts
readableCurrency(1234567, ' ', ',', 2);
// '1 234 567,00'
```

```ts
readableCurrency(9999.995, '.', ',', 2);
// '10.000,00'
```
