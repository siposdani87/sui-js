/**
 * Formats a number as a human-readable currency string with configurable
 * thousands delimiter, decimal separator, and decimal precision.
 *
 * Splits the integer portion into groups of three digits separated by the
 * delimiter, and appends the decimal portion (if any) after the separator.
 * Falsy price values are treated as zero.
 *
 * @param {number} price - The numeric value to format.
 * @param {string | undefined} opt_delimiter - Character inserted between
 *     every three digits of the integer part. Defaults to a space `' '`.
 * @param {string | undefined} opt_separator - Character placed between the
 *     integer and decimal parts. Defaults to `','`.
 * @param {number | undefined} opt_precision - Number of decimal places to
 *     include in the output. Defaults to `0` (no decimals).
 * @returns {string} The formatted currency string.
 * @category Utility
 *
 * @example
 * readableCurrency(1234567, ' ', ',', 2);
 * // '1 234 567,00'
 *
 * @example
 * readableCurrency(9999.995, '.', ',', 2);
 * // '10.000,00'
 */
export declare const readableCurrency: (price: number, opt_delimiter?: string | undefined, opt_separator?: string | undefined, opt_precision?: number | undefined) => string;
/**
 * Converts a large number into a compact, human-readable string using
 * SI suffixes (K, M, G, T, P, E, Z, Y).
 *
 * Iterates through SI magnitude thresholds to find the best fit and
 * divides the number accordingly. Trailing zeros after the decimal point
 * are stripped. When `opt_around` is true, rounding is applied at the
 * magnitude level, and a `'+'` is appended if the rounded value is less
 * than the original.
 *
 * @param {number} num - The number to convert.
 * @param {boolean | undefined} opt_around - When `true`, rounds the number
 *     to its order of magnitude and appends `'+'` if truncated.
 *     Defaults to `false`.
 * @returns {string} The SI-suffixed string representation (e.g., `'1.5K'`,
 *     `'3M+'`).
 * @category Utility
 *
 * @example
 * readableNumber(1500);
 * // '1.5K'
 *
 * @example
 * readableNumber(1500000, true);
 * // '1M+'
 */
export declare const readableNumber: (num: number, opt_around?: boolean | undefined) => string;
/**
 * Precision-safe rounding to a given decimal place using the
 * shift-round-shift-back technique via {@link decimalAdjust}.
 *
 * @param {number} value - The number to round.
 * @param {number} exp - The exponent (power of 10) for the decimal place.
 *     Use negative values for decimal places (e.g., `-2` rounds to
 *     hundredths).
 * @returns {number} The rounded number.
 * @category Utility
 *
 * @example
 * round(1.005, -2);
 * // 1.01
 *
 * @example
 * round(1234, 2);
 * // 1200
 */
export declare const round: (value: number, exp: number) => number;
/**
 * Precision-safe floor operation to a given decimal place using the
 * shift-round-shift-back technique via {@link decimalAdjust}.
 *
 * @param {number} value - The number to floor.
 * @param {number} exp - The exponent (power of 10) for the decimal place.
 *     Use negative values for decimal places (e.g., `-1` floors to tenths).
 * @returns {number} The floored number.
 * @category Utility
 *
 * @example
 * floor(1.89, -1);
 * // 1.8
 *
 * @example
 * floor(1567, 2);
 * // 1500
 */
export declare const floor: (value: number, exp: number) => number;
/**
 * Precision-safe ceil operation to a given decimal place using the
 * shift-round-shift-back technique via {@link decimalAdjust}.
 *
 * @param {number} value - The number to ceil.
 * @param {number} exp - The exponent (power of 10) for the decimal place.
 *     Use negative values for decimal places (e.g., `-1` ceils to tenths).
 * @returns {number} The ceiled number.
 * @category Utility
 *
 * @example
 * ceil(1.21, -1);
 * // 1.3
 *
 * @example
 * ceil(1234, 2);
 * // 1300
 */
export declare const ceil: (value: number, exp: number) => number;
/**
 * Generates a random number between `min` and `max`.
 *
 * When `opt_onlyFloat` is `false` (default), produces a random integer in
 * the inclusive range `[min, max]`. When `true`, produces a continuous
 * floating-point value in the range `[min, max)`.
 *
 * @param {number} min - The lower bound of the range (inclusive).
 * @param {number} max - The upper bound of the range (inclusive for integers,
 *     exclusive for floats).
 * @param {boolean | undefined} opt_onlyFloat - When `true`, returns a
 *     floating-point number instead of an integer. Defaults to `false`.
 * @returns {number} A random number within the specified range.
 * @category Utility
 *
 * @example
 * random(1, 10);
 * // An integer between 1 and 10 (inclusive)
 *
 * @example
 * random(0, 1, true);
 * // A float between 0 (inclusive) and 1 (exclusive)
 */
export declare const random: (min: number, max: number, opt_onlyFloat?: boolean | undefined) => number;
