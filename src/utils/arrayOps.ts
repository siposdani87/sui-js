import type { Objekt } from '../core';
import { neq } from './comparison';
import { isArray, isPureObject } from './typeGuards';
import { eachArray } from './iteration';

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
    items.includes(item);

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
export const inContainArray = (items: Array<string>, item: string): boolean =>
    items.some((element) => element.includes(item));

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
    if (isArray(items)) {
        return items.length === 0;
    } else if (isPureObject(items)) {
        return Object.keys(items).length === 0;
    }
    return false;
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
