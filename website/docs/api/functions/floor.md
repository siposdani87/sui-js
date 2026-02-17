# Function: floor()

> **floor**(`value`, `exp`): `number`

Defined in: [utils/math.ts:184](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L184)

Precision-safe floor operation to a given decimal place using the
shift-round-shift-back technique via decimalAdjust.

## Parameters

### value

`number`

The number to floor.

### exp

`number`

The exponent (power of 10) for the decimal place.
    Use negative values for decimal places (e.g., `-1` floors to tenths).

## Returns

`number`

The floored number.

## Examples

```ts
floor(1.89, -1);
// 1.8
```

```ts
floor(1567, 2);
// 1500
```
