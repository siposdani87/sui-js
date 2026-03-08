import { eq } from './comparison';

/**
 * Low-level type check using the `typeof` operator.
 *
 * Compares the `typeof` result of the value against the given type string.
 * Acts as a type guard narrowing the value to `typeof type`.
 *
 * @param {any} value The value to check.
 * @param {string} type The expected `typeof` string (e.g., `'string'`, `'number'`, `'object'`).
 * @returns {boolean} `true` if `typeof value === type`.
 * @category Utility
 */
export const is = (value: unknown, type: string): value is typeof type =>
    typeof value === type;

/**
 * Generic `instanceof` wrapper.
 *
 * Checks whether a value is an instance of the given constructor or class.
 *
 * @param {any} value The value to check.
 * @param {T} obj The constructor or class to test against.
 * @returns {boolean} `true` if `value instanceof obj`.
 * @example
 * instanceOf(new Date(), Date); // true
 * instanceOf('hello', String);  // false
 * @category Utility
 */
export const instanceOf = <T>(value: unknown, obj: T): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value instanceof (obj as any);

/**
 * Type guard that checks whether a value is an array.
 *
 * Delegates to `Array.isArray` and narrows the type to `Array<T>`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an array.
 * @category Utility
 */
export const isArray = <T>(value: unknown): value is Array<T> =>
    Array.isArray(value);

/**
 * Type guard that checks whether a value is a function.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'function'`.
 * @category Utility
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const isFunction = (value: unknown): value is Function =>
    is(value, 'function');

/**
 * Type guard that checks whether a value is a string.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'string'`.
 * @category Utility
 */
export const isString = (value: unknown): value is string =>
    is(value, 'string');

/**
 * Type guard that checks whether a value can be safely cast to a finite number.
 *
 * Returns `true` for numeric strings and numbers that represent finite values.
 * Excludes empty strings, `null`, values starting with `'0'` (except `'0'` itself)
 * or `'+'`, `Infinity`, and `NaN`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value represents a valid finite number.
 * @example
 * isNumber(42);      // true
 * isNumber('3.14');   // true
 * isNumber('');       // false
 * isNumber('007');    // false (leading zero)
 * isNumber(Infinity); // false
 * @category Utility
 */
export const isNumber = (value: unknown): value is number =>
    value !== null &&
    value !== '' &&
    !isNaN(value as number) &&
    (!['0', '+'].includes((value as string)?.[0] ?? '') ||
        value === '0') &&
    Number(value).toString() !== 'NaN' &&
    Number(value).toString() !== 'Infinity';

/**
 * Type guard that checks whether a value is a floating-point number.
 *
 * Returns `true` when `parseFloat(value)` produces the same value,
 * indicating the value is already a parsed float.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `parseFloat(value) === value`.
 * @category Utility
 */
export const isFloat = (value: unknown): value is number =>
    parseFloat(value as string) === value;

/**
 * Type guard that checks whether a value is an integer.
 *
 * Returns `true` when `parseInt(value, 10)` produces the same value,
 * indicating the value is already a parsed integer.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `parseInt(value, 10) === value`.
 * @category Utility
 */
export const isInteger = (value: unknown): value is number =>
    parseInt(value as string, 10) === value;

/**
 * Type guard that checks whether a value has `typeof 'object'`.
 *
 * Note: this returns `true` for arrays, `Date` instances, and `null`.
 * Use {@link isPureObject} to check for plain objects only.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'object'`.
 * @category Utility
 */
export const isObject = (value: unknown): value is object =>
    is(value, 'object');

/**
 * Type guard that checks whether a value is a plain JavaScript object.
 *
 * Unlike {@link isObject}, this excludes `null`, `Date` instances, and arrays,
 * returning `true` only for plain object literals and `Object.create` results.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is a plain object.
 * @example
 * isPureObject({ a: 1 }); // true
 * isPureObject([1, 2]);   // false
 * isPureObject(null);     // false
 * isPureObject(new Date); // false
 * @category Utility
 */
export const isPureObject = (value: unknown): value is object =>
    !isNull(value) && !isDate(value) && !isArray(value) && isObject(value);

/**
 * Type guard that checks whether a value is a `Date` instance.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an instance of `Date`.
 * @category Utility
 */
export const isDate = (value: unknown): value is Date =>
    instanceOf(value, Date);

/**
 * Type guard that checks whether a value is `null`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is strictly `null`.
 * @category Utility
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Type guard that checks whether a value is `Infinity`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is `Infinity`.
 * @category Utility
 */
export const isInfinity = (value: unknown): value is typeof Infinity =>
    value === Infinity;

/**
 * Type guard that checks whether a value is `undefined`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'undefined'`.
 * @category Utility
 */
export const isUndefined = (value: unknown): value is undefined =>
    is(value, 'undefined');

/**
 * Casts string representations to their native JavaScript types.
 *
 * Converts common string literals such as `'true'`, `'false'`, `'null'`,
 * `'undefined'`, `'infinity'`, and numeric strings into their corresponding
 * native types. Non-string values and multi-word strings (containing spaces)
 * pass through unchanged.
 *
 * @param {any} value The value to cast. Only single-word strings are processed.
 * @returns {any} The cast native value, or the original value if no conversion applies.
 * @example
 * typeCast('true');       // true
 * typeCast('null');       // null
 * typeCast('123');        // 123
 * typeCast('hello world'); // 'hello world' (unchanged, contains space)
 * typeCast(42);           // 42 (unchanged, not a string)
 * @category Utility
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const typeCast = (value: any): any => {
    let result = value;
    if (isString(value) && !value.includes(' ')) {
        const lowerCaseValue = value.toLowerCase();
        if (eq(lowerCaseValue, '')) {
            result = '';
        } else if (eq(lowerCaseValue, 'undefined')) {
            result = undefined;
        } else if (eq(lowerCaseValue, 'null')) {
            result = null;
        } else if (eq(lowerCaseValue, 'true')) {
            result = true;
        } else if (eq(lowerCaseValue, 'false')) {
            result = false;
        } else if (eq(lowerCaseValue, 'infinity')) {
            result = Infinity;
        } else if (isNumber(lowerCaseValue)) {
            result = Number(lowerCaseValue);
        }
    }
    return result;
};
