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
