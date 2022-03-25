/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {!Array<number>}
 */
export declare const convertRGBToHSV: (red: number, green: number, blue: number) => [number, number, number];
/**
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
export declare const convertRGBToHEX: (red: number, green: number, blue: number) => string;
/**
 * @param {string} hexColor
 * @return {!Array<number>}
 */
export declare const convertHEXToHSV: (hexColor: string) => [number, number, number];
/**
 * @param {string} hexColor
 * @return {!Array<number, number, number>}
 */
export declare const convertHEXToRGB: (hexColor: string) => [number, number, number];
/**
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {!Array<number>}
 */
export declare const convertHSVToRGB: (h: number, s: number, v: number) => [number, number, number];
/**
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {string}
 */
export declare const convertHSVToHEX: (h: number, s: number, v: number) => string;
/**
 * @param {string} hexColor
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
export declare const colorContrastYIQ: (hexColor: string, opt_lightColor?: string | undefined, opt_darkColor?: string | undefined) => string;
/**
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
export declare const colorContrast: (hexColor: string, opt_diff?: number | undefined) => string;
