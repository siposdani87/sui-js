import { isArray, isPureObject } from './typeGuards';

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
        next(items[i]!, i);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    object: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: (value: any, key: string) => void,
): void => {
    for (const key in object) {
        if (Object.hasOwn(object, key)) {
            next(object[key], key);
        }
    }
};

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
