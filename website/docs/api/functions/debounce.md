# Function: debounce()

> **debounce**(`func`, `opt_wait?`, `opt_immediate?`): (`this`, `ev`) => `void`

Defined in: [utils/operation.ts:952](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/operation.ts#L952)

Creates a debounced version of a function that delays invocation.

The returned function postpones calling `func` until `opt_wait` milliseconds
have elapsed since the last invocation. If `opt_immediate` is `true`, the
function fires on the leading edge instead of the trailing edge.

## Parameters

### func

(`ev`) => `void`

The function to debounce.

### opt\_wait?

`number` = `250`

Delay in milliseconds before the function is invoked.

### opt\_immediate?

`boolean` = `false`

If `true`, trigger the function on the
    leading edge instead of the trailing edge.

## Returns

The debounced function.

> (`this`, `ev`): `void`

### Parameters

#### this

`Window`

#### ev

`Event`

### Returns

`void`

## Example

```ts
const debouncedSearch = debounce((ev) => {
    performSearch(ev.target.value);
}, 300);
inputElement.addEventListener('input', debouncedSearch);
```
