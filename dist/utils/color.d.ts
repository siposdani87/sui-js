/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {!Array}
 */
export declare const convertRGBToHSV: (red: number, green: number, blue: number) => Array<any>;
/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
export declare const convertRGBToHEX: (red: number, green: number, blue: number) => string;
/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
export declare const convertHEXToHSV: (hexColor: string) => Array<any>;
/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
export declare const convertHEXToRGB: (hexColor: string) => Array<any>;
/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {!Array}
 */
export declare const convertHSVToRGB: (h: number, s: number, v: number) => Array<any>;
/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {string}
 */
export declare const convertHSVToHEX: (h: number, s: number, v: number) => string;
/**
 * @export
 * @param {string} hexColor
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
export declare const colorContrastYIQ: (hexColor: string, opt_lightColor?: string | undefined, opt_darkColor?: string | undefined) => string;
/**
 * @export
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
export declare const colorContrast: (hexColor: string, opt_diff?: number | undefined) => string;
