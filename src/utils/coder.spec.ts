import {
    encodeBase64,
    decodeBase64,
    encrypt,
    decrypt,
    md5,
    guid,
    generateId,
    uuid,
} from './coder';

describe('Coder', () => {
    describe('Base64', () => {
        it('should encode and decode roundtrip', () => {
            const text = '123456';
            const encoded = encodeBase64(text);
            expect(decodeBase64(encoded)).toBe(text);
        });

        it('should decode known base64', () => {
            expect(decodeBase64('MTIzNDU2')).toBe('123456');
        });

        it('should encode to known base64', () => {
            expect(encodeBase64('123456')).toBe('MTIzNDU2');
        });

        it('should handle empty string', () => {
            const encoded = encodeBase64('');
            expect(decodeBase64(encoded)).toBe('');
        });

        it('should handle special characters', () => {
            const text = 'hello world! @#$%';
            expect(decodeBase64(encodeBase64(text))).toBe(text);
        });
    });

    describe('AES encrypt/decrypt', () => {
        it('should encrypt and decrypt roundtrip', () => {
            const text = '123456';
            const passPhrase = 'ABCDEFG';
            const encrypted = encrypt(text, passPhrase);
            expect(decrypt(encrypted, passPhrase)).toBe(text);
        });

        it('should decrypt known ciphertext', () => {
            const encrypted = 'U2FsdGVkX1/2ztazRNLgdfO+0c/1jk/t1TTJOcW0a0w=';
            expect(decrypt(encrypted, 'ABCDEFG')).toBe('123456');
        });

        it('should handle object values', () => {
            const obj = { key: 'value' };
            const encrypted = encrypt(obj, 'secret');
            expect(decrypt(encrypted, 'secret')).toEqual(obj);
        });
    });

    describe('md5', () => {
        it('should generate correct md5 hash', () => {
            expect(md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
        });

        it('should generate different hashes for different inputs', () => {
            expect(md5('abc')).not.toBe(md5('def'));
        });

        it('should handle empty string', () => {
            expect(md5('')).toBe('d41d8cd98f00b204e9800998ecf8427e');
        });
    });

    describe('guid', () => {
        it('should return a non-empty string', () => {
            expect(guid()).toMatch(/[a-z0-9]+/);
        });

        it('should generate unique values', () => {
            const a = guid();
            const b = guid();
            expect(a).not.toBe(b);
        });
    });

    describe('generateId', () => {
        it('should include the name prefix', () => {
            expect(generateId('name')).toContain('name');
        });

        it('should contain a hyphen separator', () => {
            expect(generateId('test')).toContain('-');
        });
    });

    describe('uuid', () => {
        it('should match UUID-like format', () => {
            expect(uuid()).toMatch(/[a-z0-9-]+/);
        });

        it('should have 5 segments separated by hyphens', () => {
            const parts = uuid().split('-');
            expect(parts).toHaveLength(5);
        });

        it('should generate unique values', () => {
            expect(uuid()).not.toBe(uuid());
        });
    });
});
