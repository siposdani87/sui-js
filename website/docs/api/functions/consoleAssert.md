# Function: consoleAssert()

> **consoleAssert**(`condition`, ...`data`): `void`

Defined in: [utils/log.ts:114](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/log.ts#L114)

Asserts a condition using `console.assert`.

Always outputs regardless of `releaseMode`. If `condition` is falsy,
the assertion message and optional data are written to the console.

## Parameters

### condition

`boolean`

The boolean condition to assert.

### data

...`any`[]

Additional values to include in the assertion output.

## Returns

`void`

## Example

```ts
consoleAssert(items.length > 0, 'Items array must not be empty');
```
