# Function: convertHEXToHSV()

> **convertHEXToHSV**(`hexColor`): \[`number`, `number`, `number`\]

Defined in: [utils/color.ts:114](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/color.ts#L114)

Converts a hexadecimal color string to HSV representation.

This is a convenience function that chains [convertHEXToRGB](convertHEXToRGB.md) and
[convertRGBToHSV](convertRGBToHSV.md).

## Parameters

### hexColor

`string`

The hex color string (e.g., `'#FF0000'`).

## Returns

\[`number`, `number`, `number`\]

A tuple of `[h, s, v]` where
    `h` is 0-360, and `s` and `v` are 0-1.

## Example

```ts
convertHEXToHSV('#00FF00');
// [120, 1, 1]
```
