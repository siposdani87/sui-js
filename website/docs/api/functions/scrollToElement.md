# Function: scrollToElement()

> **scrollToElement**(`selector`, `opt_duration?`, `opt_step?`): `void`

Defined in: [utils/operation.ts:898](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L898)

Performs an animated smooth scroll to a DOM element's position.

Queries the DOM for the first element matching the given CSS selector,
then delegates to [scrollTo](scrollTo.md) using the element's offset position.

## Parameters

### selector

`string`

A CSS selector identifying the target element.

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
scrollToElement('#section-2');
scrollToElement('.target', 1000);
```
