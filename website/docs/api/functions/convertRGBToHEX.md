# Function: convertRGBToHEX()

> **convertRGBToHEX**(`red`, `green`, `blue`): `string`

Defined in: [utils/color.ts:82](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/color.ts#L82)

Converts an RGB color to an uppercase hexadecimal color string.

Each channel is converted to a two-character hex value, zero-padded
for values at or below 16, and joined with a leading `'#'`.

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

`string`

The uppercase hex color string (e.g., `'#FF0000'`).

## Examples

```ts
convertRGBToHEX(255, 0, 0);
// '#FF0000'
```

```ts
convertRGBToHEX(0, 128, 255);
// '#0080FF'
```
