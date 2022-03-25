/**
 * @param {string} text
 * @return {string}
 */
export declare const encodeBase64: (text: string) => string;
/**
 * @param {string} encodedText
 * @return {string}
 */
export declare const decodeBase64: (encodedText: string) => string;
/**
 * @param {*} value
 * @param {string} passPhrase
 * @return {string}
 */
export declare const encrypt: (value: any, passPhrase: string) => string;
/**
 * @param {string} item
 * @param {string} passPhrase
 * @return {*}
 */
export declare const decrypt: (item: string, passPhrase: string) => any;
/**
 * @param {string} str
 * @return {string}
 */
export declare const md5: (str: string) => string;
/**
 * i6wolnd42rjg2nor7xdg5akv4p
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
export declare const guid: () => string;
/**
 * @param {string} name
 * @return {string}
 */
export declare const generateId: (name: string) => string;
/**
 * 778c4858-5a37-42c3-90e5-f9e4113fb97b
 * https://github.com/LiosK/UUID.js
 * @return {string}
 */
export declare const uuid: () => string;
