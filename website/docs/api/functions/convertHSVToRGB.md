# Function: convertHSVToRGB()

> **convertHSVToRGB**(`h`, `s`, `v`): \[`number`, `number`, `number`\]

Defined in: [utils/color.ts:171](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/color.ts#L171)

Converts an HSV color to an RGB tuple.

Uses the standard HSV-to-RGB sector-based algorithm. The hue is divided
into six 60-degree sectors, and intermediate values are computed to
determine the final red, green, and blue channels, each rounded to the
nearest integer in the range 0-255.

## Parameters

### h

`number`

The hue in degrees (0-360).

### s

`number`

The saturation (0-1).

### v

`number`

The value/brightness (0-1).

## Returns

\[`number`, `number`, `number`\]

A tuple of `[r, g, b]`
    with each channel in the range 0-255.

## Examples

```ts
convertHSVToRGB(0, 1, 1);
// [255, 0, 0]
```

```ts
convertHSVToRGB(120, 1, 0.5);
// [0, 128, 0]
```
