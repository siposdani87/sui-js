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
export const readableCurrency = (price, opt_delimiter = ' ', opt_separator = ',', opt_precision = 0) => {
    if (!price) {
        price = 0;
    }
    price = round(price, opt_precision * -1);
    const parts = price.toFixed(opt_precision).toString().split('.');
    const decimal = parts[1];
    let currency = parts[0]
        .split('')
        .reverse()
        .map((char, index) => {
        return !(index % 3) && index ? char + opt_delimiter : char;
    })
        .reverse()
        .join('');
    if (decimal) {
        currency += opt_separator + decimal;
    }
    return currency;
};
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
export const readableNumber = (num, opt_around = false) => {
    const siValues = [
        { value: 1e24, symbol: 'Y' },
        { value: 1e21, symbol: 'Z' },
        { value: 1e18, symbol: 'E' },
        { value: 1e15, symbol: 'P' },
        { value: 1e12, symbol: 'T' },
        { value: 1e9, symbol: 'G' },
        { value: 1e6, symbol: 'M' },
        { value: 1e3, symbol: 'K' },
        { value: 1, symbol: '' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let result = '';
    let i = 0;
    while (i < siValues.length - 1 && num < siValues[i].value) {
        const siValue = siValues[i + 1];
        const exp = num.toString().length - 1;
        const roundedValue = floor(num, opt_around ? exp : 0);
        const plus = roundedValue < num ? '+' : '';
        result =
            (roundedValue / siValue.value).toString().replace(rx, '$1') +
                siValue.symbol +
                plus;
        i++;
    }
    return result;
};
/**
 * Performs precision-safe decimal adjustment using the shift-round-shift-back
 * technique. Converts the value to exponential notation, applies the
 * specified {@link Math} method, then shifts back to avoid floating-point
 * rounding errors.
 *
 * @param {string} type - The {@link Math} method name to use: `'round'`,
 *     `'floor'`, or `'ceil'`.
 * @param {number} value - The number to adjust.
 * @param {number} exp - The exponent (power of 10) indicating the decimal
 *     place to adjust to. Use negative values for decimal places
 *     (e.g., `-2` for hundredths).
 * @returns {number} The adjusted number, or `NaN` if the inputs are invalid.
 */
const decimalAdjust = (type, value, exp) => {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }
    // Shift
    let parts = value.toString().split('e');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value = Math[type](+(parts[0] + 'e' + (parts[1] ? +parts[1] - exp : -exp)));
    // Shift back
    parts = value.toString().split('e');
    return +(parts[0] + 'e' + (parts[1] ? +parts[1] + exp : exp));
};
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
export const round = (value, exp) => decimalAdjust('round', value, exp);
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
export const floor = (value, exp) => decimalAdjust('floor', value, exp);
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
export const ceil = (value, exp) => decimalAdjust('ceil', value, exp);
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
export const random = (min, max, opt_onlyFloat = false) => {
    let result;
    if (opt_onlyFloat) {
        result = Math.random() * (max - min) + min;
    }
    else {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return result;
};
