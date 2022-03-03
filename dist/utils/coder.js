/**
 * @export
 * @param {string} text
 * @return {string}
 */
export const encodeBase64 = (text) => {
    const words = window['CryptoJS']['enc']['Utf8']['parse'](text);
    return window['CryptoJS']['enc']['Base64']['stringify'](words);
};
/**
 * @export
 * @param {string} encodedText
 * @return {string}
 */
export const decodeBase64 = (encodedText) => {
    const words = window['CryptoJS']['enc']['Base64']['parse'](encodedText);
    return window['CryptoJS']['enc']['Utf8']['stringify'](words);
};
/**
 * @export
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
export const encrypt = (value, passPhrase) => {
    const item = JSON.stringify(value);
    return window['CryptoJS']['AES']['encrypt'](item, passPhrase);
};
/**
 * @export
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
export const decrypt = (item, passPhrase) => {
    const value = window['CryptoJS']['AES']['decrypt'](item, passPhrase)['toString'](window['CryptoJS']['enc']['Utf8']);
    return JSON.parse(value || 'null');
};
/**
 * @export
 * @param {string} str
 * @return {string}
 */
export const md5 = (str) => window['CryptoJS']['MD5'](str);
/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @export
 * @return {string}
 */
export const guid = () => Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
/**
 * @export
 * @param {string} name
 * @return {string}
 */
export const generateId = (name) => [name, guid()].join('-');
/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @export
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
