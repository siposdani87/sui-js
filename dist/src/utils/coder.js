import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import MD5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
/**
 * @param {string} text
 * @return {string}
 */
export const encodeBase64 = (text) => {
    const words = Utf8.parse(text);
    return Base64.stringify(words);
};
/**
 * @param {string} encodedText
 * @return {string}
 */
export const decodeBase64 = (encodedText) => {
    const words = Base64.parse(encodedText);
    return Utf8.stringify(words);
};
/**
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
export const encrypt = (value, passPhrase) => {
    const item = JSON.stringify(value);
    return AES.encrypt(item, passPhrase).toString();
};
/**
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
export const decrypt = (item, passPhrase) => {
    const value = AES.decrypt(item, passPhrase).toString(Utf8);
    return JSON.parse(value || 'null');
};
/**
 * @param {string} str
 * @return {string}
 */
export const md5 = (str) => MD5(str).toString();
/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
export const guid = () => Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
/**
 * @param {string} name
 * @return {string}
 */
export const generateId = (name) => [name, guid()].join('-');
/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
export const uuid = () => [
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
