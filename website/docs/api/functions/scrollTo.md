# Function: scrollTo()

> **scrollTo**(`x`, `y`, `opt_duration?`, `opt_step?`): `void`

Defined in: [utils/operation.ts:854](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L854)

Performs an animated smooth scroll to the specified coordinates.

Uses `setInterval` to incrementally scroll the window toward the target
position over the given duration. Any previously active scroll animation
is cancelled before starting a new one.

## Parameters

### x

`number`

The target horizontal scroll position in pixels.

### y

`number`

The target vertical scroll position in pixels.

### opt\_duration?

`number` = `500`

Total animation duration in milliseconds.

### opt\_step?

`number` = `20`

Interval between scroll increments in milliseconds.

## Returns

`void`

## Example

```ts
scrollTo(0, 500);        // Scroll to y=500 over 500ms
scrollTo(0, 0, 1000, 10); // Scroll to top over 1 second with 10ms steps
```
