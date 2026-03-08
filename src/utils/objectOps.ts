import { eq } from './comparison';
import { isArray, isPureObject, isNull, isUndefined } from './typeGuards';
import { eachArray, eachObject } from './iteration';
import { clearArray, isEmpty } from './arrayOps';
import { contain, format } from './stringOps';

/**
 * Deletes all own properties from an object in-place.
 *
 * The original object reference is preserved; only its properties are removed.
 *
 * @param {Record<string, any>} items The object to clear.
 * @category Utility
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const clearObject = (items: Record<string, any>): void => {
    for (const key in items) {
        if (Object.hasOwn(items, key)) {
            delete items[key];
        }
    }
};

/**
 * Clears all elements from an array or all own properties from an object.
 *
 * Delegates to {@link clearArray} for arrays or {@link clearObject} for
 * plain objects. The original reference is mutated in-place.
 *
 * @param {Array<T> | object} items The array or object to clear.
 * @category Utility
 */
export const clear = <T>(items: Array<T> | object): void => {
    if (isArray(items)) {
        clearArray(items);
    } else if (isPureObject(items)) {
        clearObject(items);
    }
};

/**
 * Creates a deep copy of an array.
 *
 * Recursively copies nested arrays (via {@link copyArray}) and plain objects
 * (via {@link copyObject}). Primitive values are copied by value.
 *
 * @param {Array<T>} items The array to deep copy.
 * @returns {Array<T>} A new array containing deep copies of all elements.
 * @category Utility
 */
export const copyArray = <T>(items: Array<T>): Array<T> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: any[] = [];
    eachArray(items, (item, index) => {
        if (isArray(item)) {
            results[index] = copyArray(item);
        } else if (isPureObject(item)) {
            results[index] = copyObject(item);
        } else {
            results[index] = item;
        }
    });
    return results;
};

/**
 * Creates a deep copy of a plain object.
 *
 * Recursively copies nested arrays (via {@link copyArray}) and plain objects
 * (via {@link copyObject}). Primitive values are copied by value.
 *
 * @param {object} item The object to deep copy.
 * @returns {object} A new object containing deep copies of all properties.
 * @category Utility
 */
export const copyObject = (item: object): object => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results: Record<string, any> = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eachObject(item as Record<string, any>, (value, key) => {
        if (isArray(value)) {
            results[key] = copyArray(value);
        } else if (isPureObject(value)) {
            results[key] = copyObject(value);
        } else {
            results[key] = value;
        }
    });
    return results;
};

/**
 * Creates a deep copy of an array or plain object.
 *
 * Delegates to {@link copyArray} for arrays or {@link copyObject} for plain
 * objects. Nested arrays and objects are recursively deep-copied.
 *
 * @param {Array<T> | object} items The array or object to copy.
 * @returns {Array<T> | object | undefined} A deep copy of the input, or
 *     `undefined` if the input is neither an array nor a plain object.
 * @category Utility
 */
export const copy = <T>(
    items: Array<T> | object,
): Array<T> | object | undefined => {
    let results;
    if (isArray(items)) {
        results = copyArray(items);
    } else if (isPureObject(items)) {
        results = copyObject(items);
    }
    return results;
};

/**
 * Recursively merges two plain objects, returning a new deep-copied object.
 *
 * Properties from `objB` are merged into a deep copy of `objA`. When both
 * sides have a plain object for the same key, the merge recurses. Otherwise,
 * the value from `objB` overwrites the one from `objA`.
 *
 * @param {Record<string, any>} objA The base object to merge into.
 * @param {Record<string, any>} objB The object whose properties take precedence.
 * @returns {object | undefined} A new merged object combining both inputs.
 * @example
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 }, e: 4 });
 * // { a: 1, b: { c: 2, d: 3 }, e: 4 }
 * @category Utility
 */
export const merge = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objA: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    objB: Record<string, any>,
): object | undefined => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = copyObject(objA) as Record<string, any>;
    for (const key in objB) {
        if (Object.hasOwn(objB, key)) {
            if (isPureObject(objB[key])) {
                obj[key] = merge(obj[key], objB[key]);
            } else {
                obj[key] = objB[key];
            }
        }
    }
    return obj;
};

/**
 * Returns the keys of an object for which a condition function returns `true`.
 *
 * Iterates over the object's own properties and collects keys where the
 * condition callback evaluates to `true`.
 *
 * @param {object} obj The object whose keys to filter.
 * @param {(value: any, key: string) => boolean} condition A predicate function
 *     invoked with each property value and key.
 * @returns {Array<string>} An array of keys where the condition was satisfied.
 * @example
 * pluckKeys({ a: 1, b: 2, c: 3 }, (value) => value > 1);
 * // ['b', 'c']
 * @category Utility
 */
export const pluckKeys = (
    obj: object,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    condition: (value: any, key: string) => boolean,
): Array<string> => {
    const results: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eachObject(obj as Record<string, any>, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};

/**
 * Performs a deep equality comparison between two values.
 *
 * For plain objects with equal JSON string lengths, recursively compares
 * each property using `isSame`. For all other types, compares their
 * JSON serialized representations via strict equality.
 *
 * @param {any} a The first value to compare.
 * @param {any} b The second value to compare.
 * @returns {boolean} `true` if the two values are deeply equal.
 * @example
 * isSame({ a: 1, b: [2, 3] }, { a: 1, b: [2, 3] }); // true
 * isSame([1, 2], [1, 3]);                              // false
 * @category Utility
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isSame = (a: any, b: any): boolean => {
    if (isPureObject(a) && isPureObject(b)) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        if (keysA.length !== keysB.length) {
            return false;
        }
        return keysA.every((key) =>
            isSame(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (a as Record<string, any>)[key],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (b as Record<string, any>)[key],
            ),
        );
    }
    return eq(JSON.stringify(a), JSON.stringify(b));
};

/**
 * Builds a query string from an object of key-value pairs.
 *
 * Array values are encoded with bracket notation (`key[]=value`). Properties
 * with `undefined` or `null` values are skipped.
 *
 * @param {object} [opt_params] An object of key-value pairs to encode.
 * @returns {string} The encoded query string without a leading `?`, or an
 *     empty string if no valid parameters are provided.
 * @example
 * getQueryString({ name: 'test', tags: ['a', 'b'] });
 * // 'name=test&tags[]=a&tags[]=b'
 *
 * getQueryString({ a: 1, b: null, c: undefined });
 * // 'a=1'
 * @category Utility
 */
export const getQueryString = (opt_params?: object): string => {
    const queries: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eachObject(opt_params as Record<string, any>, (param, key) => {
        if (isArray(param)) {
            eachArray(param, (value) => {
                queries.push(format('{0}[]={1}', [key, value]));
            });
        } else if (!isUndefined(param) && !isNull(param)) {
            queries.push(format('{0}={1}', [key, param]));
        }
    });
    return isEmpty(queries) ? '' : queries.join('&');
};

/**
 * Appends query string parameters to a URL.
 *
 * Builds a query string from the params object (via {@link getQueryString})
 * and appends it to the URL. Uses `?` if the URL has no existing query string,
 * or `&` if one already exists.
 *
 * @param {string} url The base URL to append parameters to.
 * @param {object} [opt_params] An object of key-value pairs to encode as query parameters.
 * @returns {string} The URL with appended query string, or the original URL if
 *     no parameters are provided.
 * @example
 * urlWithQueryString('/api/items', { page: 1, limit: 10 });
 * // '/api/items?page=1&limit=10'
 *
 * urlWithQueryString('/api/items?sort=name', { page: 2 });
 * // '/api/items?sort=name&page=2'
 * @category Utility
 */
export const urlWithQueryString = (
    url: string,
    opt_params?: object | undefined,
): string => {
    const queryString = getQueryString(opt_params);
    const separator = contain(url, '?') ? '&' : '?';
    return url + (queryString ? separator + queryString : '');
};

