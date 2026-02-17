# Function: scrollIntoView()

> **scrollIntoView**(`selector`, `opt_behavior?`): `void`

Defined in: [utils/operation.ts:924](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/operation.ts#L924)

Scrolls a DOM element into view using the native `scrollIntoView` API.

Queries the DOM for the first element matching the given CSS selector
and calls `scrollIntoView` with the specified scroll behavior.

## Parameters

### selector

`string`

A CSS selector identifying the target element.

### opt\_behavior?

`ScrollBehavior` = `'smooth'`

The scroll behavior
    (`'smooth'`, `'instant'`, or `'auto'`).

## Returns

`void`

## Example

```ts
scrollIntoView('#footer');
scrollIntoView('.section', 'instant');
```
