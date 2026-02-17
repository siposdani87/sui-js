# Function: encrypt()

> **encrypt**(`value`, `passPhrase`): `string`

Defined in: [utils/coder.ts:62](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L62)

Encrypts any JSON-serializable value using AES with the provided
passphrase via crypto-js.

The value is first serialized to a JSON string with `JSON.stringify`,
then encrypted using AES. The result is returned as an opaque
ciphertext string suitable for storage or transmission.

## Parameters

### value

`any`

The value to encrypt. Must be JSON-serializable.

### passPhrase

`string`

The passphrase used as the encryption key.

## Returns

`string`

The AES-encrypted ciphertext string.

## Example

```ts
const encrypted = encrypt({ user: 'admin' }, 'secret-key');
// An opaque ciphertext string
```
