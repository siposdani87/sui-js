/**
 * @param {string} text
 * @return {string}
 */
export const encodeBase64 = (text: string): string => {
    const words = window['CryptoJS']['enc']['Utf8']['parse'](text);
    return window['CryptoJS']['enc']['Base64']['stringify'](words);
};

/**
 * @param {string} encodedText
 * @return {string}
 */
export const decodeBase64 = (encodedText: string): string => {
    const words = window['CryptoJS']['enc']['Base64']['parse'](encodedText);
    return window['CryptoJS']['enc']['Utf8']['stringify'](words);
};

/**
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
export const encrypt = (value: any, passPhrase: string): string => {
    const item = JSON.stringify(value);
    return window['CryptoJS']['AES']['encrypt'](item, passPhrase);
};

/**
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
export const decrypt = (item: string, passPhrase: string): any => {
    const value = window['CryptoJS']['AES']
        ['decrypt'](item, passPhrase)
        ['toString'](window['CryptoJS']['enc']['Utf8']);
    return JSON.parse(value || 'null');
};

/**
 * @param {string} str
 * @return {string}
 */
export const md5 = (str: string): string => window['CryptoJS']['MD5'](str);

/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
export const guid = (): string =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

/**
 * @param {string} name
 * @return {string}
 */
export const generateId = (name: string): string => [name, guid()].join('-');

/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @return {string}
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
