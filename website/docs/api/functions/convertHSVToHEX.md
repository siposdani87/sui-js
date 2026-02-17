# Function: convertHSVToHEX()

> **convertHSVToHEX**(`h`, `s`, `v`): `string`

Defined in: [utils/color.ts:241](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/color.ts#L241)

Converts an HSV color to an uppercase hexadecimal color string.

This is a convenience function that chains [convertHSVToRGB](convertHSVToRGB.md) and
[convertRGBToHEX](convertRGBToHEX.md).

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

`string`

The uppercase hex color string (e.g., `'#FF0000'`).

## Example

```ts
convertHSVToHEX(0, 1, 1);
// '#FF0000'
```
