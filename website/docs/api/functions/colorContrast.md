# Function: colorContrast()

> **colorContrast**(`hexColor`, `opt_diff?`): `string`

Defined in: [utils/color.ts:311](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/color.ts#L311)

Adjusts the brightness of a hex color by a relative difference factor.

Converts the hex color to RGB via [convertHEXToRGB](convertHEXToRGB.md), multiplies
each channel by `opt_diff`, adds the result back to the channel, and
clamps the values to the 0-255 range. Positive `opt_diff` values
lighten the color; negative values darken it.

## Parameters

### hexColor

`string`

The hex color string to adjust
    (e.g., `'#FF0000'`).

### opt\_diff?

The brightness adjustment factor,
    typically between `-1` (fully darken) and `1` (fully lighten).
    Defaults to `0.5`.

`number` | `undefined`

## Returns

`string`

The adjusted uppercase hex color string.

## Examples

```ts
colorContrast('#808080', 0.5);
// A lighter shade of gray
```

```ts
colorContrast('#808080', -0.5);
// A darker shade of gray
```
