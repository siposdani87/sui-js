# Function: uuid()

> **uuid**(): `string`

Defined in: [utils/coder.ts:157](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L157)

Generates a v4-like UUID string with proper version and variant bits.

Produces a string in the standard UUID format
`xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`, where `4` indicates version 4
and the variant bits of the `y` position are set to `8`, `9`, `a`, or
`b`. Uses `Math.random()` for entropy, so this is not
cryptographically secure.

## Returns

`string`

A UUID-formatted string
    (e.g., `'a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5'`).

## Example

```ts
uuid();
// 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
```
