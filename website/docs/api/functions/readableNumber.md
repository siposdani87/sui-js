# Function: readableNumber()

> **readableNumber**(`num`, `opt_around?`): `string`

Defined in: [utils/math.ts:79](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L79)

Converts a large number into a compact, human-readable string using
SI suffixes (K, M, G, T, P, E, Z, Y).

Iterates through SI magnitude thresholds to find the best fit and
divides the number accordingly. Trailing zeros after the decimal point
are stripped. When `opt_around` is true, rounding is applied at the
magnitude level, and a `'+'` is appended if the rounded value is less
than the original.

## Parameters

### num

`number`

The number to convert.

### opt\_around?

When `true`, rounds the number
    to its order of magnitude and appends `'+'` if truncated.
    Defaults to `false`.

`boolean` | `undefined`

## Returns

`string`

The SI-suffixed string representation (e.g., `'1.5K'`,
    `'3M+'`).

## Examples

```ts
readableNumber(1500);
// '1.5K'
```

```ts
readableNumber(1500000, true);
// '1M+'
```
