import { each } from './iteration';

/**
 * Checks whether a string contains a given substring.
 *
 * @param {string} str The string to search within.
 * @param {string} subStr The substring to look for.
 * @returns {boolean} `true` if the substring is found.
 * @category Utility
 */
export const contain = (str: string, subStr: string): boolean =>
    str.includes(subStr);

/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The string with its first character converted to uppercase.
 * @example
 * capitalize('hello'); // 'Hello'
 * @category Utility
 */
export const capitalize = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Template string formatter that replaces token placeholders with values.
 *
 * Replaces `{key}` tokens in the input string with corresponding values from
 * the params object or array. The delimiter characters around keys are
 * configurable via `opt_prefix` and `opt_postfix` (regex patterns).
 *
 * @param {string} str The template string containing `{key}` placeholders.
 * @param {object | Array<T> | null | undefined} opt_params An object or array
 *     providing replacement values. Object keys or array indices serve as token names.
 * @param {string | undefined} opt_prefix Regex pattern for the opening delimiter.
 *     Defaults to `'\\{'`.
 * @param {string | undefined} opt_postfix Regex pattern for the closing delimiter.
 *     Defaults to `'\\}'`.
 * @returns {string} The formatted string with all matched tokens replaced.
 * @example
 * format('Hello {name}!', { name: 'World' });
 * // 'Hello World!'
 *
 * format('{0} + {1} = {2}', [1, 2, 3]);
 * // '1 + 2 = 3'
 *
 * format('Hello <name>', { name: 'World' }, '<', '>');
 * // 'Hello World'
 * @category Utility
 */
export const format = <T>(
    str: string,
    opt_params: object | Array<T> | null | undefined = null,
    opt_prefix: string | undefined = '\\{',
    opt_postfix: string | undefined = '\\}',
): string => {
    each(opt_params as object | Array<T>, (value, key) => {
        const regex = new RegExp(opt_prefix + key + opt_postfix, 'gm');
        str = str.replace(regex, value as string);
    });
    return str;
};

/**
 * Extracts the file extension from a URL.
 *
 * Strips any query string before extracting the extension. Returns the
 * portion of the URL after the last `.` character.
 *
 * @param {string} url The URL or file path to extract the extension from.
 * @returns {string} The file extension without the leading dot, or an empty
 *     string if no extension is found.
 * @example
 * getExtensionName('https://example.com/image.png?v=2'); // 'png'
 * getExtensionName('document.pdf');                       // 'pdf'
 * getExtensionName('no-extension');                       // ''
 * @category Utility
 */
export const getExtensionName = (url: string): string => {
    const realUrl = url.split('?', 2)[0]!;
    return realUrl.slice(
        (Math.max(0, realUrl.lastIndexOf('.')) || Infinity) + 1,
    );
};

/**
 * Strips diacritical marks (accents) from a string.
 *
 * Applies Unicode NFD normalization to decompose characters, then removes
 * all combining diacritical marks (Unicode range U+0300 to U+036F).
 *
 * @param {string} str The string to normalize.
 * @returns {string} The string with all diacritical marks removed.
 * @example
 * normalize('cafe\u0301'); // 'cafe'
 * normalize('nino');       // 'nino'
 * @category Utility
 */
export const normalize = (str: string): string =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

/**
 * Returns a function that always returns the given value (or `undefined`).
 *
 * Useful as a default callback or placeholder function when a callable is
 * required but no meaningful operation is needed.
 *
 * @param {T} [opt_result] The value the returned function will produce.
 * @returns {() => T | undefined} A no-operation function that returns `opt_result`.
 * @example
 * const fn = noop();
 * fn(); // undefined
 *
 * const fn42 = noop(42);
 * fn42(); // 42
 * @category Utility
 */
export const noop =
    <T>(opt_result?: T): (() => T | undefined) =>
    () => {
        return opt_result;
    };
