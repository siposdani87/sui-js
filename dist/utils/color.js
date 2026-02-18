import { round } from './math';
/**
 * Converts an RGB color to HSV (Hue, Saturation, Value) representation.
 *
 * Normalizes the RGB channels to the 0-1 range, computes the chroma
 * (difference between max and min channels), then derives hue, saturation,
 * and value. The returned hue is in degrees (0-360), while saturation and
 * value are in the 0-1 range rounded to two decimal places via
 * {@link round}.
 *
 * @param {number} red - The red channel value (0-255).
 * @param {number} green - The green channel value (0-255).
 * @param {number} blue - The blue channel value (0-255).
 * @returns {[number, number, number]} A tuple of `[h, s, v]` where `h` is
 *     0-360, and `s` and `v` are 0-1.
 * @category Utility
 *
 * @example
 * convertRGBToHSV(255, 0, 0);
 * // [0, 1, 1]
 *
 * @example
 * convertRGBToHSV(0, 128, 255);
 * // [210, 1, 1]
 */
export const convertRGBToHSV = (red, green, blue) => {
    const rabs = red / 255;
    const gabs = green / 255;
    const babs = blue / 255;
    const v = Math.max(rabs, gabs, babs);
    const diff = v - Math.min(rabs, gabs, babs);
    const diffc = (c) => (v - c) / 6 / diff + 1 / 2;
    let h = 0;
    let s = 0;
    if (diff !== 0) {
        s = diff / v;
        const rr = diffc(rabs);
        const gg = diffc(gabs);
        const bb = diffc(babs);
        if (rabs === v) {
            h = bb - gg;
        }
        else if (gabs === v) {
            h = 1 / 3 + rr - bb;
        }
        else if (babs === v) {
            h = 2 / 3 + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return [Math.round(h * 360), round(s, -2), round(v, -2)];
};
/**
 * Converts an RGB color to an uppercase hexadecimal color string.
 *
 * Each channel is converted to a two-character hex value, zero-padded
 * for values at or below 16, and joined with a leading `'#'`.
 *
 * @param {number} red - The red channel value (0-255).
 * @param {number} green - The green channel value (0-255).
 * @param {number} blue - The blue channel value (0-255).
 * @returns {string} The uppercase hex color string (e.g., `'#FF0000'`).
 * @category Utility
 *
 * @example
 * convertRGBToHEX(255, 0, 0);
 * // '#FF0000'
 *
 * @example
 * convertRGBToHEX(0, 128, 255);
 * // '#0080FF'
 */
export const convertRGBToHEX = (red, green, blue) => {
    const colors = [red, green, blue];
    const results = [];
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] <= 16) {
            results[i] = '0' + colors[i].toString(16).toUpperCase();
        }
        else {
            results[i] = '' + colors[i].toString(16).toUpperCase();
        }
    }
    return '#' + results.join('');
};
/**
 * Converts a hexadecimal color string to HSV representation.
 *
 * This is a convenience function that chains {@link convertHEXToRGB} and
 * {@link convertRGBToHSV}.
 *
 * @param {string} hexColor - The hex color string (e.g., `'#FF0000'`).
 * @returns {[h: number, s: number, v: number]} A tuple of `[h, s, v]` where
 *     `h` is 0-360, and `s` and `v` are 0-1.
 * @category Utility
 *
 * @example
 * convertHEXToHSV('#00FF00');
 * // [120, 1, 1]
 */
export const convertHEXToHSV = (hexColor) => {
    const [red, green, blue] = convertHEXToRGB(hexColor);
    return convertRGBToHSV(red, green, blue);
};
/**
 * Converts a hexadecimal color string to an RGB tuple.
 *
 * Parses the hex string by extracting two-character substrings for each
 * channel (positions 1-2, 3-4, 5-6) and converting them from base-16.
 * An empty or falsy input is treated as an empty string, which will
 * produce `NaN` values.
 *
 * @param {string} hexColor - The hex color string (e.g., `'#FF0000'`).
 * @returns {[r: number, g: number, b: number]} A tuple of `[r, g, b]`
 *     with each channel in the range 0-255.
 * @category Utility
 *
 * @example
 * convertHEXToRGB('#FF8000');
 * // [255, 128, 0]
 */
export const convertHEXToRGB = (hexColor) => {
    const hex = hexColor || '';
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return [red, green, blue];
};
/**
 * Converts an HSV color to an RGB tuple.
 *
 * Uses the standard HSV-to-RGB sector-based algorithm. The hue is divided
 * into six 60-degree sectors, and intermediate values are computed to
 * determine the final red, green, and blue channels, each rounded to the
 * nearest integer in the range 0-255.
 *
 * @param {number} h - The hue in degrees (0-360).
 * @param {number} s - The saturation (0-1).
 * @param {number} v - The value/brightness (0-1).
 * @returns {[r: number, g: number, b: number]} A tuple of `[r, g, b]`
 *     with each channel in the range 0-255.
 * @category Utility
 *
 * @example
 * convertHSVToRGB(0, 1, 1);
 * // [255, 0, 0]
 *
 * @example
 * convertHSVToRGB(120, 1, 0.5);
 * // [0, 128, 0]
 */
export const convertHSVToRGB = (h, s, v) => {
    const i = Math.floor((h / 60) % 6);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let blue;
    let green;
    let red;
    switch (i) {
        case 0:
            red = v;
            green = t;
            blue = p;
            break;
        case 1:
            red = q;
            green = v;
            blue = p;
            break;
        case 2:
            red = p;
            green = v;
            blue = t;
            break;
        case 3:
            red = p;
            green = q;
            blue = v;
            break;
        case 4:
            red = t;
            green = p;
            blue = v;
            break;
        default:
            red = v;
            green = p;
            blue = q;
            break;
    }
    return [
        Math.round(red * 255),
        Math.round(green * 255),
        Math.round(blue * 255),
    ];
};
/**
 * Converts an HSV color to an uppercase hexadecimal color string.
 *
 * This is a convenience function that chains {@link convertHSVToRGB} and
 * {@link convertRGBToHEX}.
 *
 * @param {number} h - The hue in degrees (0-360).
 * @param {number} s - The saturation (0-1).
 * @param {number} v - The value/brightness (0-1).
 * @returns {string} The uppercase hex color string (e.g., `'#FF0000'`).
 * @category Utility
 *
 * @example
 * convertHSVToHEX(0, 1, 1);
 * // '#FF0000'
 */
export const convertHSVToHEX = (h, s, v) => {
    const [red, green, blue] = convertHSVToRGB(h, s, v);
    return convertRGBToHEX(red, green, blue);
};
/**
 * Returns a contrasting text color (light or dark) for a given background
 * color, determined by the YIQ luminance formula.
 *
 * Computes the YIQ brightness value from the RGB channels of the input
 * hex color. If the brightness is at or above 128 (a relatively light
 * background), the dark color is returned; otherwise the light color is
 * returned. This ensures readable text contrast on any background.
 *
 * @param {string} hexColor - The background hex color string
 *     (e.g., `'#FF0000'`).
 * @param {string | undefined} opt_lightColor - The color to use on dark
 *     backgrounds. Defaults to `'#FEFEFE'`.
 * @param {string | undefined} opt_darkColor - The color to use on light
 *     backgrounds. Defaults to `'#252525'`.
 * @returns {string} Either `opt_lightColor` or `opt_darkColor`, whichever
 *     provides better contrast against the given background.
 * @category Utility
 *
 * @example
 * colorContrastYIQ('#000000');
 * // '#FEFEFE'
 *
 * @example
 * colorContrastYIQ('#FFFFFF');
 * // '#252525'
 *
 * @example
 * colorContrastYIQ('#336699', '#FFFFFF', '#000000');
 * // '#FFFFFF'
 */
export const colorContrastYIQ = (hexColor, opt_lightColor = '#FEFEFE', opt_darkColor = '#252525') => {
    const colors = convertHEXToRGB(hexColor);
    const yiq = (colors[0] * 299 + colors[1] * 587 + colors[2] * 114) / 1000;
    return yiq >= 128 ? opt_darkColor : opt_lightColor;
};
/**
 * Adjusts the brightness of a hex color by a relative difference factor.
 *
 * Converts the hex color to RGB via {@link convertHEXToRGB}, multiplies
 * each channel by `opt_diff`, adds the result back to the channel, and
 * clamps the values to the 0-255 range. Positive `opt_diff` values
 * lighten the color; negative values darken it.
 *
 * @param {string} hexColor - The hex color string to adjust
 *     (e.g., `'#FF0000'`).
 * @param {number | undefined} opt_diff - The brightness adjustment factor,
 *     typically between `-1` (fully darken) and `1` (fully lighten).
 *     Defaults to `0.5`.
 * @returns {string} The adjusted uppercase hex color string.
 * @category Utility
 *
 * @example
 * colorContrast('#808080', 0.5);
 * // A lighter shade of gray
 *
 * @example
 * colorContrast('#808080', -0.5);
 * // A darker shade of gray
 */
export const colorContrast = (hexColor, opt_diff = 0.5) => {
    const colors = convertHEXToRGB(hexColor);
    for (let i = 0; i < colors.length; i++) {
        colors[i] += Math.round(colors[i] * opt_diff);
        if (colors[i] < 0) {
            colors[i] = 0;
        }
        else if (colors[i] > 255) {
            colors[i] = 255;
        }
    }
    return convertRGBToHEX(...colors);
};
