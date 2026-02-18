# Function: round()

> **round**(`value`, `exp`): `number`

Defined in: [utils/math.ts:163](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L163)

Precision-safe rounding to a given decimal place using the
shift-round-shift-back technique via decimalAdjust.

## Parameters

### value

`number`

The number to round.

### exp

`number`

The exponent (power of 10) for the decimal place.
    Use negative values for decimal places (e.g., `-2` rounds to
    hundredths).

## Returns

`number`

The rounded number.

## Examples

```ts
round(1.005, -2);
// 1.01
```

```ts
round(1234, 2);
// 1200
```
