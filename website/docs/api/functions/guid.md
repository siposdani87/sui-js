# Function: guid()

> **guid**(): `string`

Defined in: [utils/coder.ts:122](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L122)

Generates a random identifier string by concatenating two base-36
random substrings.

Uses `Math.random().toString(36)` to produce alphanumeric characters.
This is NOT RFC-compliant and should not be used where true uniqueness
guarantees are required. For a UUID-like format, use [uuid](uuid.md)
instead.

## Returns

`string`

A random alphanumeric string (approximately 26
    characters).

## Example

```ts
guid();
// 'k7c3h8f2m9x1a4b6n0p5j3'
```
