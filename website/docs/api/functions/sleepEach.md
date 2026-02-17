# Function: sleepEach()

> **sleepEach**(`next`, `i`, `length`, `duration`): `void`

Defined in: [utils/operation.ts:494](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L494)

Iterates with a configurable delay between each invocation.

Calls the `next` callback starting at index `i`, incrementing on each
iteration. Each subsequent call is delayed by `duration` milliseconds
using `setTimeout`. Stops when `i` reaches `length`.

## Parameters

### next

(`_index`) => `void`

Callback invoked with the current index.

### i

`number`

The starting index.

### length

`number`

The total number of iterations (exclusive upper bound).

### duration

`number`

Delay in milliseconds between each iteration.

## Returns

`void`

## Example

```ts
sleepEach((index) => {
    console.log('Processing item', index);
}, 0, 5, 1000);
// Logs items 0-4 with 1 second between each
```
