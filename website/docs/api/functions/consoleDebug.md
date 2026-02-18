# Function: consoleDebug()

> **consoleDebug**(...`message`): `void`

Defined in: [utils/log.ts:97](https://github.com/siposdani87/sui-js/blob/27883240db7565f37a562e906b93c8d6552ac058/src/utils/log.ts#L97)

Logs debug messages to `console.debug`.

Always outputs regardless of `releaseMode`, allowing fine-grained
debugging that can be filtered in browser developer tools.

## Parameters

### message

...`any`[]

One or more values to log.

## Returns

`void`

## Example

```ts
consoleDebug('State transition', prevState, nextState);
```
