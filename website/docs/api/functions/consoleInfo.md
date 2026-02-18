# Function: consoleInfo()

> **consoleInfo**(...`message`): `void`

Defined in: [utils/log.ts:46](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/log.ts#L46)

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
