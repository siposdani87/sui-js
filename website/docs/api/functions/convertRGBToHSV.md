# Function: convertRGBToHSV()

> **convertRGBToHSV**(`red`, `green`, `blue`): \[`number`, `number`, `number`\]

Defined in: [utils/color.ts:27](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/color.ts#L27)

Converts an RGB color to HSV (Hue, Saturation, Value) representation.

Normalizes the RGB channels to the 0-1 range, computes the chroma
(difference between max and min channels), then derives hue, saturation,
and value. The returned hue is in degrees (0-360), while saturation and
value are in the 0-1 range rounded to two decimal places via
[round](round.md).

## Parameters

### red

`number`

The red channel value (0-255).

### green

`number`

The green channel value (0-255).

### blue

`number`

The blue channel value (0-255).

## Returns

\[`number`, `number`, `number`\]

A tuple of `[h, s, v]` where `h` is
    0-360, and `s` and `v` are 0-1.

## Examples

```ts
convertRGBToHSV(255, 0, 0);
// [0, 1, 1]
```

```ts
convertRGBToHSV(0, 128, 255);
// [210, 1, 1]
```
