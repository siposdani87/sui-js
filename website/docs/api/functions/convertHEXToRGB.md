# Function: convertHEXToRGB()

> **convertHEXToRGB**(`hexColor`): \[`number`, `number`, `number`\]

Defined in: [utils/color.ts:138](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/color.ts#L138)

Converts a hexadecimal color string to an RGB tuple.

Parses the hex string by extracting two-character substrings for each
channel (positions 1-2, 3-4, 5-6) and converting them from base-16.
An empty or falsy input is treated as an empty string, which will
produce `NaN` values.

## Parameters

### hexColor

`string`

The hex color string (e.g., `'#FF0000'`).

## Returns

\[`number`, `number`, `number`\]

A tuple of `[r, g, b]`
    with each channel in the range 0-255.

## Example

```ts
convertHEXToRGB('#FF8000');
// [255, 128, 0]
```
