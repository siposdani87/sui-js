# Function: encodeBase64()

> **encodeBase64**(`text`): `string`

Defined in: [utils/coder.ts:20](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L20)

Encodes a UTF-8 string to its Base64 representation using crypto-js.

First parses the input string into a crypto-js word array using the UTF-8
encoder, then stringifies it with the Base64 encoder.

## Parameters

### text

`string`

The plain text string to encode.

## Returns

`string`

The Base64-encoded string.

## Example

```ts
encodeBase64('Hello, World!');
// 'SGVsbG8sIFdvcmxkIQ=='
```
