/**
 * Converts a string to an array of UTF-8 byte values.
 *
 * @param {string} str - The input string.
 * @returns {number[]} Array of byte values.
 */
const _toBytes = (str: string): number[] => {
    const binary = unescape(encodeURIComponent(str));
    const bytes: number[] = [];
    for (let i = 0; i < binary.length; i++) {
        bytes.push(binary.charCodeAt(i));
    }
    return bytes;
};

/**
 * Converts an array of UTF-8 byte values back to a string.
 *
 * @param {number[]} bytes - Array of byte values.
 * @returns {string} The decoded string.
 */
const _fromBytes = (bytes: number[]): string => {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]!);
    }
    try {
        return decodeURIComponent(escape(binary));
    } catch {
        return binary;
    }
};

/**
 * Encodes a UTF-8 string to its Base64 representation using native APIs.
 *
 * Handles Unicode via encodeURIComponent before Base64 conversion.
 *
 * @param {string} text - The plain text string to encode.
 * @returns {string} The Base64-encoded string.
 * @category Utility
 *
 * @example
 * encodeBase64('Hello, World!');
 * // 'SGVsbG8sIFdvcmxkIQ=='
 */
export const encodeBase64 = (text: string): string => {
    return btoa(unescape(encodeURIComponent(text)));
};

/**
 * Decodes a Base64-encoded string back to its original UTF-8 text using
 * native APIs.
 *
 * Parses the Base64 input and converts it back to a UTF-8 string.
 *
 * @param {string} encodedText - The Base64-encoded string to decode.
 * @returns {string} The decoded UTF-8 string.
 * @category Utility
 *
 * @example
 * decodeBase64('SGVsbG8sIFdvcmxkIQ==');
 * // 'Hello, World!'
 */
export const decodeBase64 = (encodedText: string): string => {
    try {
        return decodeURIComponent(escape(atob(encodedText)));
    } catch {
        return atob(encodedText);
    }
};

/**
 * Encrypts any JSON-serializable value using XOR obfuscation with the
 * provided passphrase.
 *
 * The value is first serialized to a JSON string with `JSON.stringify`,
 * then each byte is XORed with the repeating passphrase. The result is
 * Base64-encoded for safe storage or transmission.
 *
 * @param {any} value - The value to encrypt. Must be JSON-serializable.
 * @param {string} passPhrase - The passphrase used as the encryption key.
 * @returns {string} The XOR-encrypted, Base64-encoded ciphertext string.
 * @category Utility
 *
 * @example
 * const encrypted = encrypt({ user: 'admin' }, 'secret-key');
 * // An opaque ciphertext string
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encrypt = (value: any, passPhrase: string): string => {
    const itemBytes = _toBytes(JSON.stringify(value));
    const keyBytes = _toBytes(passPhrase);
    let binary = '';
    for (let i = 0; i < itemBytes.length; i++) {
        binary += String.fromCharCode(
            itemBytes[i]! ^ keyBytes[i % keyBytes.length]!,
        );
    }
    return btoa(binary);
};

/**
 * Decrypts an XOR-encrypted ciphertext string and parses the result as
 * JSON.
 *
 * Decodes the Base64 input, XORs with the provided passphrase, and
 * converts the result to a UTF-8 string. If decryption yields an empty
 * string, `null` is returned instead (via `JSON.parse('null')`).
 *
 * @param {string} item - The encrypted ciphertext string to decrypt.
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decrypt = (item: string, passPhrase: string): any => {
    try {
        const binary = atob(item);
        const keyBytes = _toBytes(passPhrase);
        const resultBytes: number[] = [];
        for (let i = 0; i < binary.length; i++) {
            resultBytes.push(
                binary.charCodeAt(i) ^ keyBytes[i % keyBytes.length]!,
            );
        }
        const value = _fromBytes(resultBytes);
        return JSON.parse(value || 'null');
    } catch {
        return null;
    }
};

/**
 * Computes the MD5 hash of a string.
 *
 * Implements the MD5 message-digest algorithm (RFC 1321) inline for
 * Gravatar API compatibility.
 *
 * @param {string} str - The input string to hash.
 * @returns {string} The hexadecimal MD5 hash string.
 * @category Utility
 *
 * @example
 * md5('hello');
 * // '5d41402abc4b2a76b9719d911017c592'
 */
export const md5 = (str: string): string => {
    const bytes = _toBytes(str);
    const len = bytes.length;
    const bitLen = len * 8;

    // Pre-processing: pad to 64-byte blocks
    const padLen = (len % 64 < 56 ? 56 : 120) - (len % 64);
    const totalLen = len + padLen + 8;
    const padded: number[] = new Array<number>(totalLen).fill(0);
    for (let i = 0; i < len; i++) {
        padded[i] = bytes[i]!;
    }
    padded[len] = 0x80;
    // Append bit length as 64-bit little-endian
    for (let i = 0; i < 4; i++) {
        padded[len + padLen + i] = (bitLen >>> (i * 8)) & 0xff;
    }

    // Per-round shift amounts
    const s = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14,
        20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16,
        23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
        15, 21, 6, 10, 15, 21,
    ];

    // Pre-computed constants (floor(2^32 * abs(sin(i+1))))
    const K: number[] = [];
    for (let i = 0; i < 64; i++) {
        K.push((Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0) | 0);
    }

    let a0 = 0x67452301 | 0;
    let b0 = 0xefcdab89 | 0;
    let c0 = 0x98badcfe | 0;
    let d0 = 0x10325476 | 0;

    for (let offset = 0; offset < totalLen; offset += 64) {
        const M: number[] = [];
        for (let j = 0; j < 16; j++) {
            const idx = offset + j * 4;
            M.push(
                (padded[idx]! |
                    (padded[idx + 1]! << 8) |
                    (padded[idx + 2]! << 16) |
                    (padded[idx + 3]! << 24)) >>>
                    0,
            );
        }

        let A = a0;
        let B = b0;
        let C = c0;
        let D = d0;

        for (let i = 0; i < 64; i++) {
            let F: number;
            let g: number;
            if (i < 16) {
                F = (B & C) | (~B & D);
                g = i;
            } else if (i < 32) {
                F = (D & B) | (~D & C);
                g = (5 * i + 1) % 16;
            } else if (i < 48) {
                F = B ^ C ^ D;
                g = (3 * i + 5) % 16;
            } else {
                F = C ^ (B | ~D);
                g = (7 * i) % 16;
            }
            F = ((F >>> 0) + A + K[i]! + M[g]!) >>> 0;
            A = D;
            D = C;
            C = B;
            const si = s[i]!;
            const rot = ((F << si) | (F >>> (32 - si))) >>> 0;
            B = (B + rot) >>> 0;
        }

        a0 = (a0 + A) >>> 0;
        b0 = (b0 + B) >>> 0;
        c0 = (c0 + C) >>> 0;
        d0 = (d0 + D) >>> 0;
    }

    // Convert to hex string (little-endian)
    const hex = (n: number): string =>
        Array.from({ length: 4 }, (_, i) =>
            ((n >>> (i * 8)) & 0xff).toString(16).padStart(2, '0'),
        ).join('');

    return hex(a0) + hex(b0) + hex(c0) + hex(d0);
};

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
export const guid = (): string =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

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
export const generateId = (name: string): string => [name, guid()].join('-');

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
export const uuid = (): string =>
    [
        Math.random().toString(16).slice(2, 10),
        Math.random().toString(16).slice(2, 6),
        (Math.random() * 0.0625 /* 0x.1 */ + 0.25) /* 0x.4 */
            .toString(16)
            .slice(2, 6),
        (Math.random() * 0.25 /* 0x.4 */ + 0.5) /* 0x.8 */
            .toString(16)
            .slice(2, 6),
        Math.random().toString(16).slice(2, 14),
    ].join('-');
