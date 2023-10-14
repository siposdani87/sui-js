import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import MD5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';

export const encodeBase64 = (text: string): string => {
    const words = Utf8.parse(text);
    return Base64.stringify(words);
};

export const decodeBase64 = (encodedText: string): string => {
    const words = Base64.parse(encodedText);
    return Utf8.stringify(words);
};

export const encrypt = (value: any, passPhrase: string): string => {
    const item = JSON.stringify(value);
    return AES.encrypt(item, passPhrase).toString();
};

export const decrypt = (item: string, passPhrase: string): any => {
    const value = AES.decrypt(item, passPhrase).toString(Utf8);
    return JSON.parse(value || 'null');
};

export const md5 = (str: string): string => MD5(str).toString();

export const guid = (): string =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

export const generateId = (name: string): string => [name, guid()].join('-');

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
