import { Objekt } from '../core';

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
export const typeCast = (value: any): any => {
    let result = value;
    if (isString(value) && !contain(value, ' ')) {
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
export const merge = (objA: Record<string, any>, objB: Record<string, any>): object | undefined => {
    const obj = copyObject(objA) as Record<string, any>;
    for (const key in objB) {
        if (objB.hasOwnProperty(key)) {
            if (isPureObject(objB[key].constructor)) {
                obj[key] = merge(obj[key], objB[key]);
            } else {
                obj[key] = objB[key];
            }
        }
    }
    return obj;
};

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

/**
 * Checks strict equality between two values.
 *
 * @param {unknown} a The first value.
 * @param {unknown} b The second value.
 * @returns {boolean} `true` if `a === b`.
 * @category Utility
 */
export const eq = (a: unknown, b: unknown): boolean => a === b;

/**
 * Checks strict inequality between two values.
 *
 * @param {unknown} a The first value.
 * @param {unknown} b The second value.
 * @returns {boolean} `true` if `a !== b`.
 * @category Utility
 */
export const neq = (a: unknown, b: unknown): boolean => a !== b;

/**
 * Checks if the first value is numerically greater than the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a > b`.
 * @category Utility
 */
export const gt = (a: unknown, b: unknown): boolean =>
    (a as number) > (b as number);

/**
 * Checks if the first value is numerically greater than or equal to the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a >= b`.
 * @category Utility
 */
export const gte = (a: unknown, b: unknown): boolean =>
    (a as number) >= (b as number);

/**
 * Checks if the first value is numerically less than the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a < b`.
 * @category Utility
 */
export const lt = (a: unknown, b: unknown): boolean =>
    (a as number) < (b as number);

/**
 * Checks if the first value is numerically less than or equal to the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a <= b`.
 * @category Utility
 */
export const lte = (a: unknown, b: unknown): boolean =>
    (a as number) <= (b as number);

/**
 * Type guard that checks whether a value is an array.
 *
 * Delegates to `Array.isArray` and narrows the type to `Array<T>`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an array.
 * @category Utility
 */
export const isArray = <T>(value: any): value is Array<T> =>
    Array.isArray(value);

/**
 * Type guard that checks whether a value is a function.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'function'`.
 * @category Utility
 */
export const isFunction = (value: any): value is Function =>
    is(value, 'function');

/**
 * Type guard that checks whether a value is a string.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'string'`.
 * @category Utility
 */
export const isString = (value: any): value is string => is(value, 'string');

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
export const isNumber = (value: any): value is number =>
    value !== null &&
    value !== '' &&
    !isNaN(value) &&
    (!inArray(['0', '+'], value?.[0]) || value === '0') &&
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
export const isFloat = (value: any): value is number =>
    parseFloat(value) === value;

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
export const isInteger = (value: any): value is number =>
    parseInt(value, 10) === value;

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
export const isObject = (value: any): value is object => is(value, 'object');

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
export const isPureObject = (value: any): value is object =>
    !isNull(value) && !isDate(value) && !isArray(value) && isObject(value);

/**
 * Type guard that checks whether a value is a `Date` instance.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an instance of `Date`.
 * @category Utility
 */
export const isDate = (value: any): value is Date => instanceOf(value, Date);

/**
 * Type guard that checks whether a value is `null`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is strictly `null`.
 * @category Utility
 */
export const isNull = (value: any): value is null => value === null;

/**
 * Type guard that checks whether a value is `Infinity`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is `Infinity`.
 * @category Utility
 */
export const isInfinity = (value: any): value is typeof Infinity =>
    value === Infinity;

/**
 * Type guard that checks whether a value is `undefined`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'undefined'`.
 * @category Utility
 */
export const isUndefined = (value: any): value is undefined =>
    is(value, 'undefined');

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
export const is = (value: any, type: string): value is typeof type =>
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
export const instanceOf = <T>(value: any, obj: T): boolean =>
    value instanceof (obj as any);

/**
 * Universal iterator that delegates to {@link eachArray} for arrays or
 * {@link eachObject} for plain objects.
 *
 * Provides a single entry point for iterating over both arrays and objects.
 * For arrays, optional `opt_start` and `opt_end` bounds are forwarded to
 * {@link eachArray}.
 *
 * @param {Array<T> | object} items The array or object to iterate over.
 * @param {(item: any, key: string | number) => void} next Callback invoked
 *     for each element with the value and its key (index for arrays, property
 *     name for objects).
 * @param {number} [opt_start] Start index for array iteration (inclusive).
 * @param {number} [opt_end] End index for array iteration (exclusive).
 * @example
 * each([10, 20, 30], (value, index) => {
 *     console.log(index, value);
 * });
 *
 * each({ a: 1, b: 2 }, (value, key) => {
 *     console.log(key, value);
 * });
 * @category Utility
 */
export const each = <T>(
    items: Array<T> | object,
    next: (item: any, key: string | number) => void,
    opt_start?: number,
    opt_end?: number,
): void => {
    if (isArray(items)) {
        eachArray(items, next, opt_start, opt_end);
    } else if (isPureObject(items)) {
        eachObject(items, next);
    }
};

/**
 * Iterates over an array, invoking a callback for each element.
 *
 * Supports optional start and end bounds to iterate over a sub-range of the
 * array. Defaults to iterating over the entire array.
 *
 * @param {Array<T>} items The array to iterate over.
 * @param {(item: T, index: number) => void} next Callback invoked with each
 *     element and its index.
 * @param {number} [opt_start] Start index (inclusive). Defaults to `0`.
 * @param {number} [opt_end] End index (exclusive). Defaults to `items.length`.
 * @example
 * eachArray(['a', 'b', 'c', 'd'], (item, i) => {
 *     console.log(i, item);
 * }, 1, 3);
 * // 1 'b'
 * // 2 'c'
 * @category Utility
 */
export const eachArray = <T>(
    items: Array<T>,
    next: (item: T, index: number) => void,
    opt_start?: number | undefined,
    opt_end?: number | undefined,
): void => {
    opt_start = opt_start || 0;
    opt_end = opt_end || items.length;
    for (let i = opt_start; i < opt_end; i++) {
        next(items[i], i);
    }
};

/**
 * Iterates over an object's own enumerable properties, invoking a callback
 * for each property.
 *
 * Only processes properties that belong directly to the object (via
 * `hasOwnProperty`), skipping inherited properties from the prototype chain.
 *
 * @param {Record<string, any>} object The object to iterate over.
 * @param {(value: any, key: string) => void} next Callback invoked with
 *     each property value and its key.
 * @example
 * eachObject({ x: 10, y: 20 }, (value, key) => {
 *     console.log(key, value);
 * });
 * // 'x' 10
 * // 'y' 20
 * @category Utility
 */
export const eachObject = (
    object: Record<string, any>,
    next: (value: any, key: string) => void,
): void => {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            next(object[key], key);
        }
    }
};

/**
 * Iterates with a configurable delay between each invocation.
 *
 * Calls the `next` callback starting at index `i`, incrementing on each
 * iteration. Each subsequent call is delayed by `duration` milliseconds
 * using `setTimeout`. Stops when `i` reaches `length`.
 *
 * @param {(index: number) => void} next Callback invoked with the current index.
 * @param {number} i The starting index.
 * @param {number} length The total number of iterations (exclusive upper bound).
 * @param {number} duration Delay in milliseconds between each iteration.
 * @example
 * sleepEach((index) => {
 *     console.log('Processing item', index);
 * }, 0, 5, 1000);
 * // Logs items 0-4 with 1 second between each
 * @category Utility
 */
export const sleepEach = (
    next: (_index: number) => void,
    i: number,
    length: number,
    duration: number,
): void => {
    const loop = () => {
        next(i);
        i++;
        if (i < length) {
            setTimeout(loop, duration);
        }
    };
    loop();
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
 * Empties an array in-place by removing all elements via `splice`.
 *
 * The original array reference is preserved; only its contents are removed.
 *
 * @param {Array<T>} items The array to empty.
 * @category Utility
 */
export const clearArray = <T>(items: Array<T>): void => {
    items.splice(0, items.length);
};

/**
 * Deletes all own properties from an object in-place.
 *
 * The original object reference is preserved; only its properties are removed.
 *
 * @param {Record<string, any>} items The object to clear.
 * @category Utility
 */
export const clearObject = (items: Record<string, any>): void => {
    for (const key in items) {
        if (items.hasOwnProperty(key)) {
            delete items[key];
        }
    }
};

/**
 * Checks whether an item exists in an array.
 *
 * Uses `indexOf` for the lookup, so comparison is by strict equality.
 *
 * @param {Array<T>} items The array to search.
 * @param {T} item The item to look for.
 * @returns {boolean} `true` if the item is found in the array.
 * @category Utility
 */
export const inArray = <T>(items: Array<T>, item: T): boolean =>
    items.indexOf(item) !== -1;

/**
 * Checks whether a string contains a given substring.
 *
 * @param {string} str The string to search within.
 * @param {string} subStr The substring to look for.
 * @returns {boolean} `true` if the substring is found.
 * @category Utility
 */
export const contain = (str: string, subStr: string): boolean =>
    str.indexOf(subStr) !== -1;

/**
 * Checks whether any element in a string array contains the given substring.
 *
 * Iterates through the array and returns `true` as soon as an element is
 * found that contains the given substring (via {@link contain}).
 *
 * @param {Array<string>} items The array of strings to search through.
 * @param {string} item The substring to look for within each element.
 * @returns {boolean} `true` if at least one element contains the substring.
 * @example
 * inContainArray(['application/json', 'text/html'], 'json'); // true
 * inContainArray(['text/html', 'text/plain'], 'json');       // false
 * @category Utility
 */
export const inContainArray = (items: Array<string>, item: string): boolean => {
    let i = 0;
    while (i < items.length && !contain(items[i], item)) {
        i++;
    }
    return i < items.length;
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
export const isSame = (a: any, b: any): boolean => {
    const strA = JSON.stringify(a);
    const strB = JSON.stringify(b);
    if (isPureObject(a) && isPureObject(b) && eq(strA.length, strB.length)) {
        let result = true;
        each(a, (value: any, key: string | number) => {
            if (!isSame((b as Record<string, any>)[key], value)) {
                result = false;
            }
        });
        return result;
    }
    return eq(strA, strB);
};

/**
 * Removes the first occurrence of an item from an array in-place.
 *
 * If the item is not found, the array is left unchanged.
 *
 * @param {Array<T>} items The array to remove from.
 * @param {T} item The item to remove.
 * @category Utility
 */
export const remove = <T>(items: Array<T>, item: T): void => {
    const position = items.indexOf(item);
    if (neq(position, -1)) {
        items.splice(position, 1);
    }
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
    const results: Record<string, any> = {};
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
 * Checks whether an array or object is empty.
 *
 * For arrays, checks if `length === 0`. For plain objects, counts own
 * properties and returns `true` if there are none.
 *
 * @param {Array<T> | object} items The array or object to check.
 * @returns {boolean} `true` if the collection has no elements or properties.
 * @example
 * isEmpty([]);        // true
 * isEmpty([1]);       // false
 * isEmpty({});        // true
 * isEmpty({ a: 1 }); // false
 * @category Utility
 */
export const isEmpty = <T>(items: Array<T> | object): boolean => {
    let result = false;
    if (isArray(items)) {
        result = items.length === 0;
    } else if (isPureObject(items)) {
        let counter = 0;
        each(items, () => {
            counter++;
        });
        result = counter === 0;
    }
    return result;
};

/**
 * Spreads an array as individual arguments to a callback function.
 *
 * Equivalent to `callback(...args)`, providing a functional way to apply
 * array elements as positional arguments.
 *
 * @param {Array<T>} args The array of arguments to spread.
 * @param {(...rest: T[]) => void} callback The function to invoke with the spread arguments.
 * @example
 * list([1, 2, 3], (a, b, c) => {
 *     console.log(a, b, c); // 1 2 3
 * });
 * @category Utility
 */
export const list = <T>(
    args: Array<T>,
    callback: (...rest: T[]) => void,
): void => {
    callback(...args);
};

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
 * Extracts values of a given attribute from an array of {@link Objekt} instances.
 *
 * Calls `get()` on each {@link Objekt} with the specified attribute name,
 * collecting results into a new array.
 *
 * @param {Array<K>} items The array of {@link Objekt} instances to pluck from.
 * @param {string} attribute The dot-notation attribute path to extract
 *     (passed to {@link Objekt.get}).
 * @returns {Array<T>} An array of extracted attribute values.
 * @example
 * const items = [new Objekt({ name: 'Alice' }), new Objekt({ name: 'Bob' })];
 * pluck(items, 'name'); // ['Alice', 'Bob']
 * @category Utility
 */
export const pluck = <T, K extends Objekt = Objekt>(
    items: Array<K>,
    attribute: string,
): Array<T> => {
    const results: T[] = [];
    eachArray(items, (item) => {
        const result = item.get<T>(attribute);
        results.push(result);
    });

    return results;
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
    condition: (value: any, key: string) => boolean,
): Array<string> => {
    const results: string[] = [];
    eachObject(obj as Record<string, any>, (value, key) => {
        if (condition(value, key)) {
            results.push(key);
        }
    });
    return results;
};

let _scrollInterval: number | null = null;

/**
 * Performs an animated smooth scroll to the specified coordinates.
 *
 * Uses `setInterval` to incrementally scroll the window toward the target
 * position over the given duration. Any previously active scroll animation
 * is cancelled before starting a new one.
 *
 * @param {number} x The target horizontal scroll position in pixels.
 * @param {number} y The target vertical scroll position in pixels.
 * @param {number} [opt_duration=500] Total animation duration in milliseconds.
 * @param {number} [opt_step=20] Interval between scroll increments in milliseconds.
 * @example
 * scrollTo(0, 500);        // Scroll to y=500 over 500ms
 * scrollTo(0, 0, 1000, 10); // Scroll to top over 1 second with 10ms steps
 * @category Utility
 */
export const scrollTo = (
    x: number,
    y: number,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    clearInterval(_scrollInterval!);
    let scrollStepX = -(window.scrollX - x) / (opt_duration / opt_step);
    let scrollStepY = -(window.scrollY - y) / (opt_duration / opt_step);
    _scrollInterval = setInterval(() => {
        if (
            (scrollStepX > 0 && window.scrollX + scrollStepX > x) ||
            (scrollStepX < 0 && window.scrollX + scrollStepX < x)
        ) {
            scrollStepX = x - window.scrollX;
        }
        if (
            (scrollStepY > 0 && window.scrollY + scrollStepY > y) ||
            (scrollStepY < 0 && window.scrollY + scrollStepY < y)
        ) {
            scrollStepY = y - window.scrollY;
        }
        if (window.scrollX !== x || window.scrollY !== y) {
            window.scrollBy(scrollStepX, scrollStepY);
        } else {
            clearInterval(_scrollInterval!);
        }
    }, opt_step);
};

/**
 * Performs an animated smooth scroll to a DOM element's position.
 *
 * Queries the DOM for the first element matching the given CSS selector,
 * then delegates to {@link scrollTo} using the element's offset position.
 *
 * @param {string} selector A CSS selector identifying the target element.
 * @param {number} [opt_duration=500] Total animation duration in milliseconds.
 * @param {number} [opt_step=20] Interval between scroll increments in milliseconds.
 * @example
 * scrollToElement('#section-2');
 * scrollToElement('.target', 1000);
 * @category Utility
 */
export const scrollToElement = (
    selector: string,
    opt_duration: number | undefined = 500,
    opt_step: number | undefined = 20,
): void => {
    const nodeList = document.querySelectorAll<HTMLElement>(selector);
    const element = nodeList[0];
    const x = element.offsetLeft;
    const y = element.offsetTop;
    scrollTo(x, y, opt_duration, opt_step);
};

/**
 * Scrolls a DOM element into view using the native `scrollIntoView` API.
 *
 * Queries the DOM for the first element matching the given CSS selector
 * and calls `scrollIntoView` with the specified scroll behavior.
 *
 * @param {string} selector A CSS selector identifying the target element.
 * @param {ScrollBehavior} [opt_behavior='smooth'] The scroll behavior
 *     (`'smooth'`, `'instant'`, or `'auto'`).
 * @example
 * scrollIntoView('#footer');
 * scrollIntoView('.section', 'instant');
 * @category Utility
 */
export const scrollIntoView = (
    selector: string,
    opt_behavior: ScrollBehavior | undefined = 'smooth',
): void => {
    document.querySelector(selector)!.scrollIntoView({
        behavior: opt_behavior,
    });
};

/**
 * Creates a debounced version of a function that delays invocation.
 *
 * The returned function postpones calling `func` until `opt_wait` milliseconds
 * have elapsed since the last invocation. If `opt_immediate` is `true`, the
 * function fires on the leading edge instead of the trailing edge.
 *
 * @param {(ev: Event) => void} func The function to debounce.
 * @param {number} [opt_wait=250] Delay in milliseconds before the function is invoked.
 * @param {boolean} [opt_immediate=false] If `true`, trigger the function on the
 *     leading edge instead of the trailing edge.
 * @returns {(this: Window, ev: Event) => void} The debounced function.
 * @example
 * const debouncedSearch = debounce((ev) => {
 *     performSearch(ev.target.value);
 * }, 300);
 * inputElement.addEventListener('input', debouncedSearch);
 * @category Utility
 */
export const debounce = (
    func: (ev: Event) => void,
    opt_wait: number | undefined = 250,
    opt_immediate: boolean | undefined = false,
): ((this: Window, ev: Event) => void) => {
    let timeout: number;
    return (...args) => {
        const later = () => {
            timeout = null as unknown as number;
            if (!opt_immediate) func(...args);
        };
        const callNow = opt_immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, opt_wait);
        if (callNow) func(...args);
    };
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
    const realUrl = url.split('?', 2)[0];
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
 * Copies text to the system clipboard.
 *
 * Creates a hidden `<textarea>` element, sets its value to the given string,
 * selects it, and executes the `copy` command. The temporary element is
 * removed after the operation.
 *
 * @param {string} str The text to copy to the clipboard.
 * @category Utility
 */
export const copyToClipboard = (str: string): void => {
    const textareaElement = document.createElement('textarea');
    textareaElement.value = str;
    textareaElement.setAttribute('readonly', '');
    textareaElement.style.position = 'absolute';
    textareaElement.style.left = '-9999px';
    document.body.appendChild(textareaElement);
    textareaElement.select();
    document.execCommand('copy');
    document.body.removeChild(textareaElement);
    // navigator.clipboard.writeText(str);
};
