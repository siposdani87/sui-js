/**
 * @param {number} price
 * @param {string=} opt_delimiter
 * @param {string=} opt_separator
 * @param {number=} opt_precision
 * @return {string}
 */
export const readableCurrency = (
    price: number,
    opt_delimiter: string | undefined = ' ',
    opt_separator: string | undefined = ',',
    opt_precision: number | undefined = 0,
): string => {
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
 * @param {number} num
 * @param {boolean=} opt_around
 * @return {string}
 */
export const readableNumber = (
    num: number,
    opt_around: boolean | undefined = false,
): string => {
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
    while (i < siValues.length && num < siValues[i].value) {
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
 * Decimal adjustment of a number.
 *
 * @param {string} type The type of adjustment.
 * @param {number} value The number.
 * @param {number} exp The exponent (the 10 logarithm of the adjustment base).
 * @return {number} The adjusted value.
 */
const decimalAdjust = (type: string, value: number, exp: number): number => {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
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
    value = Math[type](+(parts[0] + 'e' + (parts[1] ? +parts[1] - exp : -exp)));
    // Shift back
    parts = value.toString().split('e');
    return +(parts[0] + 'e' + (parts[1] ? +parts[1] + exp : exp));
};

/**
 * Decimal round
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export const round = (value: number, exp: number): number =>
    decimalAdjust('round', value, exp);

/**
 * Decimal floor
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export const floor = (value: number, exp: number): number =>
    decimalAdjust('floor', value, exp);

/**
 * Decimal ceil
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export const ceil = (value: number, exp: number): number =>
    decimalAdjust('ceil', value, exp);

/**
 * @param {number} min
 * @param {number} max
 * @param {boolean=} opt_onlyFloat
 * @return {number}
 */
export const random = (
    min: number,
    max: number,
    opt_onlyFloat: boolean | undefined = false,
): number => {
    let result;
    if (opt_onlyFloat) {
        result = Math.random() * (max - min) + min;
    } else {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return result;
};
