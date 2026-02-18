/**
 * Encodes a UTF-8 string to its Base64 representation using crypto-js.
 *
 * First parses the input string into a crypto-js word array using the UTF-8
 * encoder, then stringifies it with the Base64 encoder.
 *
 * @param {string} text - The plain text string to encode.
 * @returns {string} The Base64-encoded string.
 * @category Utility
 *
 * @example
 * encodeBase64('Hello, World!');
 * // 'SGVsbG8sIFdvcmxkIQ=='
 */
export declare const encodeBase64: (text: string) => string;
/**
 * Decodes a Base64-encoded string back to its original UTF-8 text using
 * crypto-js.
 *
 * Parses the Base64 input into a crypto-js word array, then converts it
 * back to a UTF-8 string.
 *
 * @param {string} encodedText - The Base64-encoded string to decode.
 * @returns {string} The decoded UTF-8 string.
 * @category Utility
 *
 * @example
 * decodeBase64('SGVsbG8sIFdvcmxkIQ==');
 * // 'Hello, World!'
 */
export declare const decodeBase64: (encodedText: string) => string;
/**
 * Encrypts any JSON-serializable value using AES with the provided
 * passphrase via crypto-js.
 *
 * The value is first serialized to a JSON string with `JSON.stringify`,
 * then encrypted using AES. The result is returned as an opaque
 * ciphertext string suitable for storage or transmission.
 *
 * @param {any} value - The value to encrypt. Must be JSON-serializable.
 * @param {string} passPhrase - The passphrase used as the encryption key.
 * @returns {string} The AES-encrypted ciphertext string.
 * @category Utility
 *
 * @example
 * const encrypted = encrypt({ user: 'admin' }, 'secret-key');
 * // An opaque ciphertext string
 */
export declare const encrypt: (value: any, passPhrase: string) => string;
/**
 * Decrypts an AES-encrypted ciphertext string and parses the result as
 * JSON using crypto-js.
 *
 * Decrypts the input with the provided passphrase and converts the result
 * to a UTF-8 string. If decryption yields an empty string, `null` is
 * returned instead (via `JSON.parse('null')`).
 *
 * @param {string} item - The AES-encrypted ciphertext string to decrypt.
 * @param {string} passPhrase - The passphrase used as the decryption key.
 *     Must match the passphrase used during encryption.
 * @returns {any} The decrypted and JSON-parsed value, or `null` if the
 *     decrypted string is empty.
 * @category Utility
 *
 * @example
 * const encrypted = encrypt({ user: 'admin' }, 'secret-key');
 * decrypt(encrypted, 'secret-key');
 * // { user: 'admin' }
 */
export declare const decrypt: (item: string, passPhrase: string) => any;
/**
 * Computes the MD5 hash of a string using crypto-js.
 *
 * @param {string} str - The input string to hash.
 * @returns {string} The hexadecimal MD5 hash string.
 * @category Utility
 *
 * @example
 * md5('hello');
 * // '5d41402abc4b2a76b9719d911017c592'
 */
export declare const md5: (str: string) => string;
/**
 * Generates a random identifier string by concatenating two base-36
 * random substrings.
 *
 * Uses `Math.random().toString(36)` to produce alphanumeric characters.
 * This is NOT RFC-compliant and should not be used where true uniqueness
 * guarantees are required. For a UUID-like format, use {@link uuid}
 * instead.
 *
 * @returns {string} A random alphanumeric string (approximately 26
 *     characters).
 * @category Utility
 *
 * @example
 * guid();
 * // 'k7c3h8f2m9x1a4b6n0p5j3'
 */
export declare const guid: () => string;
/**
 * Creates a prefixed identifier by joining the given name with a random
 * {@link guid} separated by a hyphen.
 *
 * @param {string} name - The prefix for the generated identifier.
 * @returns {string} A string in the format `'name-randomguid'`.
 * @category Utility
 *
 * @example
 * generateId('button');
 * // 'button-k7c3h8f2m9x1a4b6n0p5j3'
 */
export declare const generateId: (name: string) => string;
/**
 * Generates a v4-like UUID string with proper version and variant bits.
 *
 * Produces a string in the standard UUID format
 * `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`, where `4` indicates version 4
 * and the variant bits of the `y` position are set to `8`, `9`, `a`, or
 * `b`. Uses `Math.random()` for entropy, so this is not
 * cryptographically secure.
 *
 * @returns {string} A UUID-formatted string
 *     (e.g., `'a1b2c3d4-e5f6-4a7b-8c9d-e0f1a2b3c4d5'`).
 * @category Utility
 *
 * @example
 * uuid();
 * // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 */
export declare const uuid: () => string;
