# Function: consoleInfo()

> **consoleInfo**(...`message`): `void`

Defined in: [utils/log.ts:46](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/log.ts#L46)

Logs informational messages to `console.info`.

Output is suppressed when `releaseMode` is `true`.

## Parameters

### message

...`any`[]

One or more values to log.

## Returns

`void`

## Example

```ts
consoleInfo('Cache refreshed');
```
