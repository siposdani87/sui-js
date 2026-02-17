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
export declare const typeCast: (value: any) => any;
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
export declare const merge: (objA: Record<string, any>, objB: Record<string, any>) => object | undefined;
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
export declare const format: <T>(str: string, opt_params?: object | Array<T> | null | undefined, opt_prefix?: string | undefined, opt_postfix?: string | undefined) => string;
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
export declare const noop: <T>(opt_result?: T) => (() => T | undefined);
/**
 * Checks strict equality between two values.
 *
 * @param {unknown} a The first value.
 * @param {unknown} b The second value.
 * @returns {boolean} `true` if `a === b`.
 * @category Utility
 */
export declare const eq: (a: unknown, b: unknown) => boolean;
/**
 * Checks strict inequality between two values.
 *
 * @param {unknown} a The first value.
 * @param {unknown} b The second value.
 * @returns {boolean} `true` if `a !== b`.
 * @category Utility
 */
export declare const neq: (a: unknown, b: unknown) => boolean;
/**
 * Checks if the first value is numerically greater than the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a > b`.
 * @category Utility
 */
export declare const gt: (a: unknown, b: unknown) => boolean;
/**
 * Checks if the first value is numerically greater than or equal to the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a >= b`.
 * @category Utility
 */
export declare const gte: (a: unknown, b: unknown) => boolean;
/**
 * Checks if the first value is numerically less than the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a < b`.
 * @category Utility
 */
export declare const lt: (a: unknown, b: unknown) => boolean;
/**
 * Checks if the first value is numerically less than or equal to the second.
 *
 * @param {unknown} a The first value (treated as a number).
 * @param {unknown} b The second value (treated as a number).
 * @returns {boolean} `true` if `a <= b`.
 * @category Utility
 */
export declare const lte: (a: unknown, b: unknown) => boolean;
/**
 * Type guard that checks whether a value is an array.
 *
 * Delegates to `Array.isArray` and narrows the type to `Array<T>`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an array.
 * @category Utility
 */
export declare const isArray: <T>(value: any) => value is Array<T>;
/**
 * Type guard that checks whether a value is a function.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'function'`.
 * @category Utility
 */
export declare const isFunction: (value: any) => value is Function;
/**
 * Type guard that checks whether a value is a string.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'string'`.
 * @category Utility
 */
export declare const isString: (value: any) => value is string;
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
export declare const isNumber: (value: any) => value is number;
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
export declare const isFloat: (value: any) => value is number;
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
export declare const isInteger: (value: any) => value is number;
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
export declare const isObject: (value: any) => value is object;
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
export declare const isPureObject: (value: any) => value is object;
/**
 * Type guard that checks whether a value is a `Date` instance.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is an instance of `Date`.
 * @category Utility
 */
export declare const isDate: (value: any) => value is Date;
/**
 * Type guard that checks whether a value is `null`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is strictly `null`.
 * @category Utility
 */
export declare const isNull: (value: any) => value is null;
/**
 * Type guard that checks whether a value is `Infinity`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if the value is `Infinity`.
 * @category Utility
 */
export declare const isInfinity: (value: any) => value is typeof Infinity;
/**
 * Type guard that checks whether a value is `undefined`.
 *
 * @param {any} value The value to check.
 * @returns {boolean} `true` if `typeof value === 'undefined'`.
 * @category Utility
 */
export declare const isUndefined: (value: any) => value is undefined;
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
export declare const is: (value: any, type: string) => value is typeof type;
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
export declare const instanceOf: <T>(value: any, obj: T) => boolean;
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
export declare const each: <T>(items: Array<T> | object, next: (item: any, key: string | number) => void, opt_start?: number, opt_end?: number) => void;
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
export declare const eachArray: <T>(items: Array<T>, next: (item: T, index: number) => void, opt_start?: number | undefined, opt_end?: number | undefined) => void;
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
export declare const eachObject: (object: Record<string, any>, next: (value: any, key: string) => void) => void;
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
export declare const sleepEach: (next: (_index: number) => void, i: number, length: number, duration: number) => void;
/**
 * Clears all elements from an array or all own properties from an object.
 *
 * Delegates to {@link clearArray} for arrays or {@link clearObject} for
 * plain objects. The original reference is mutated in-place.
 *
 * @param {Array<T> | object} items The array or object to clear.
 * @category Utility
 */
export declare const clear: <T>(items: Array<T> | object) => void;
/**
 * Empties an array in-place by removing all elements via `splice`.
 *
 * The original array reference is preserved; only its contents are removed.
 *
 * @param {Array<T>} items The array to empty.
 * @category Utility
 */
export declare const clearArray: <T>(items: Array<T>) => void;
/**
 * Deletes all own properties from an object in-place.
 *
 * The original object reference is preserved; only its properties are removed.
 *
 * @param {Record<string, any>} items The object to clear.
 * @category Utility
 */
export declare const clearObject: (items: Record<string, any>) => void;
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
export declare const inArray: <T>(items: Array<T>, item: T) => boolean;
/**
 * Checks whether a string contains a given substring.
 *
 * @param {string} str The string to search within.
 * @param {string} subStr The substring to look for.
 * @returns {boolean} `true` if the substring is found.
 * @category Utility
 */
export declare const contain: (str: string, subStr: string) => boolean;
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
export declare const inContainArray: (items: Array<string>, item: string) => boolean;
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
export declare const isSame: (a: any, b: any) => boolean;
/**
 * Removes the first occurrence of an item from an array in-place.
 *
 * If the item is not found, the array is left unchanged.
 *
 * @param {Array<T>} items The array to remove from.
 * @param {T} item The item to remove.
 * @category Utility
 */
export declare const remove: <T>(items: Array<T>, item: T) => void;
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
export declare const copy: <T>(items: Array<T> | object) => Array<T> | object | undefined;
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
export declare const copyArray: <T>(items: Array<T>) => Array<T>;
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
export declare const copyObject: (item: object) => object;
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
export declare const isEmpty: <T>(items: Array<T> | object) => boolean;
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
export declare const list: <T>(args: Array<T>, callback: (...rest: T[]) => void) => void;
/**
 * Capitalizes the first character of a string.
 *
 * @param {string} str The string to capitalize.
 * @returns {string} The string with its first character converted to uppercase.
 * @example
 * capitalize('hello'); // 'Hello'
 * @category Utility
 */
export declare const capitalize: (str: string) => string;
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
export declare const pluck: <T, K extends Objekt = Objekt>(items: Array<K>, attribute: string) => Array<T>;
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
export declare const pluckKeys: (obj: object, condition: (value: any, key: string) => boolean) => Array<string>;
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
export declare const scrollTo: (x: number, y: number, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
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
export declare const scrollToElement: (selector: string, opt_duration?: number | undefined, opt_step?: number | undefined) => void;
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
export declare const scrollIntoView: (selector: string, opt_behavior?: ScrollBehavior | undefined) => void;
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
export declare const debounce: (func: (ev: Event) => void, opt_wait?: number | undefined, opt_immediate?: boolean | undefined) => ((this: Window, ev: Event) => void);
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
export declare const urlWithQueryString: (url: string, opt_params?: object | undefined) => string;
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
export declare const getQueryString: (opt_params?: object) => string;
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
export declare const getExtensionName: (url: string) => string;
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
export declare const normalize: (str: string) => string;
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
export declare const copyToClipboard: (str: string) => void;
