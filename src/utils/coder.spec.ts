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

describe('coder', () => {
    it('should be valid base64 encoded text', () => {
        const text = '123456';

        const encodedText = encodeBase64(text);
        const newText = decodeBase64(encodedText);

        expect(newText).toEqual(text);
    });

    it('should be valid base64 decoded text', () => {
        const encodedText = 'MTIzNDU2';

        const text = decodeBase64(encodedText);
        const newEncodedText = encodeBase64(text);

        expect(newEncodedText).toEqual(encodedText);
    });

    it('should be valid encrypt text', () => {
        const text = '123456';
        const passPhrase = 'ABCDEFG';

        const encodedText = encrypt(text, passPhrase);
        console.log(encodedText);
        const newText = decrypt(encodedText, passPhrase);

        expect(newText).toEqual(text);
    });

    it('should be valid decrypt text', () => {
        const text = '123456';
        const encodedText = 'U2FsdGVkX1/2ztazRNLgdfO+0c/1jk/t1TTJOcW0a0w=';
        const passPhrase = 'ABCDEFG';

        const decryptedText = decrypt(encodedText, passPhrase);

        expect(decryptedText).toEqual(text);
    });

    it('should be valid md5 text', () => {
        const text = '123456';

        const md5Text = md5(text);

        expect(md5Text).toEqual('e10adc3949ba59abbe56e057f20f883e');
    });

    it('should be valid guid ext', () => {
        const guidText = guid();

        expect(guidText).toMatch(/[a-z0-9]+/);
    });

    it('should be valid generateId text', () => {
        const id = generateId('name');

        expect(id).toEqual(expect.stringContaining('name'));
    });

    it('should be valid uuid text', () => {
        const uuidText = uuid();

        expect(uuidText).toMatch(/[a-z0-9-]+/);
    });
});
