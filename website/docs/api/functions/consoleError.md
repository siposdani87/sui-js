# Function: consoleError()

> **consoleError**(...`message`): `void`

Defined in: [utils/log.ts:81](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/log.ts#L81)

Logs error messages to `console.error`.

Always outputs regardless of `releaseMode`, ensuring that errors
are never silently swallowed in production.

## Parameters

### message

...`any`[]

One or more values to log.

## Returns

`void`

## Example

```ts
consoleError('Failed to load config', error);
```
