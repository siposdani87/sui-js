/**
 * @export
 * @param {number} price
 * @param {string=} opt_delimiter
 * @param {string=} opt_separator
 * @param {number=} opt_precision
 * @return {string}
 */
export declare const readableCurrency: (price: number, opt_delimiter?: string | undefined, opt_separator?: string | undefined, opt_precision?: number | undefined) => string;
/**
 * @export
 * @param {number} num
 * @param {number} exp
 * @return {string}
 */
export declare const readableNumber: (num: number, exp: number) => string;
/**
 * Decimal round
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export declare const round: (value: number, exp: number) => number;
/**
 * Decimal floor
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export declare const floor: (value: number, exp: number) => number;
/**
 * Decimal ceil
 *
 * @param {number} value
 * @param {number} exp
 * @return {number}
 */
export declare const ceil: (value: number, exp: number) => number;
/**
 * @export
 * @param {number} min
 * @param {number} max
 * @param {boolean=} opt_onlyFloat
 * @return {number}
 */
export declare const random: (min: number, max: number, opt_onlyFloat?: boolean | undefined) => number;
