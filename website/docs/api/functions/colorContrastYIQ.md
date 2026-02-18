# Function: colorContrastYIQ()

> **colorContrastYIQ**(`hexColor`, `opt_lightColor?`, `opt_darkColor?`): `string`

Defined in: [utils/color.ts:277](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/color.ts#L277)

Returns a contrasting text color (light or dark) for a given background
color, determined by the YIQ luminance formula.

Computes the YIQ brightness value from the RGB channels of the input
hex color. If the brightness is at or above 128 (a relatively light
background), the dark color is returned; otherwise the light color is
returned. This ensures readable text contrast on any background.

## Parameters

### hexColor

`string`

The background hex color string
    (e.g., `'#FF0000'`).

### opt\_lightColor?

The color to use on dark
    backgrounds. Defaults to `'#FEFEFE'`.

`string` | `undefined`

### opt\_darkColor?

The color to use on light
    backgrounds. Defaults to `'#252525'`.

`string` | `undefined`

## Returns

`string`

Either `opt_lightColor` or `opt_darkColor`, whichever
    provides better contrast against the given background.

## Examples

```ts
colorContrastYIQ('#000000');
// '#FEFEFE'
```

```ts
colorContrastYIQ('#FFFFFF');
// '#252525'
```

```ts
colorContrastYIQ('#336699', '#FFFFFF', '#000000');
// '#FFFFFF'
```
