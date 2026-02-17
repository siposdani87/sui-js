# Function: decrypt()

> **decrypt**(`item`, `passPhrase`): `any`

Defined in: [utils/coder.ts:87](https://github.com/siposdani87/sui-js/blob/433cda184a013753ef41bb6ba61d0b3944481fa1/src/utils/coder.ts#L87)

Decrypts an AES-encrypted ciphertext string and parses the result as
JSON using crypto-js.

Decrypts the input with the provided passphrase and converts the result
to a UTF-8 string. If decryption yields an empty string, `null` is
returned instead (via `JSON.parse('null')`).

## Parameters

### item

`string`

The AES-encrypted ciphertext string to decrypt.

### passPhrase

`string`

The passphrase used as the decryption key.
    Must match the passphrase used during encryption.

## Returns

`any`

The decrypted and JSON-parsed value, or `null` if the
    decrypted string is empty.

## Example

```ts
const encrypted = encrypt({ user: 'admin' }, 'secret-key');
decrypt(encrypted, 'secret-key');
// { user: 'admin' }
```
