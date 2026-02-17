# Function: decodeBase64()

> **decodeBase64**(`encodedText`): `string`

Defined in: [utils/coder.ts:40](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L40)

Decodes a Base64-encoded string back to its original UTF-8 text using
crypto-js.

Parses the Base64 input into a crypto-js word array, then converts it
back to a UTF-8 string.

## Parameters

### encodedText

`string`

The Base64-encoded string to decode.

## Returns

`string`

The decoded UTF-8 string.

## Example

```ts
decodeBase64('SGVsbG8sIFdvcmxkIQ==');
// 'Hello, World!'
```
