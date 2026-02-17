# Function: consoleDebug()

> **consoleDebug**(...`message`): `void`

Defined in: [utils/log.ts:97](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/log.ts#L97)

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
