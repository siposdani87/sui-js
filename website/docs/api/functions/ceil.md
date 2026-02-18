# Function: ceil()

> **ceil**(`value`, `exp`): `number`

Defined in: [utils/math.ts:205](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/math.ts#L205)

Precision-safe ceil operation to a given decimal place using the
shift-round-shift-back technique via decimalAdjust.

## Parameters

### value

`number`

The number to ceil.

### exp

`number`

The exponent (power of 10) for the decimal place.
    Use negative values for decimal places (e.g., `-1` ceils to tenths).

## Returns

`number`

The ceiled number.

## Examples

```ts
ceil(1.21, -1);
// 1.3
```

```ts
ceil(1234, 2);
// 1300
```
