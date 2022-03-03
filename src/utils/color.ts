/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {!Array}
 */
export const convertRGBToHSV = (
    red: number,
    green: number,
    blue: number,
): Array<any> => {
    const rabs = red / 255;
    const gabs = green / 255;
    const babs = blue / 255;
    const v = Math.max(rabs, gabs, babs);
    const diff = v - Math.min(rabs, gabs, babs);
    const diffc = (c) => (v - c) / 6 / diff + 1 / 2;
    const percentRoundFn = (num) => Math.round(num * 100) / 100;
    let h = 0;
    let s = 0;
    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        const rr = diffc(rabs);
        const gg = diffc(gabs);
        const bb = diffc(babs);

        if (rabs === v) {
            h = bb - gg;
        } else if (gabs === v) {
            h = 1 / 3 + rr - bb;
        } else if (babs === v) {
            h = 2 / 3 + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return [
        Math.round(h * 360),
        percentRoundFn(s * 100),
        percentRoundFn(v * 100),
    ];
};

/**
 * @export
 * @param {number} red
 * @param {number} green
 * @param {number} blue
 * @return {string}
 */
export const convertRGBToHEX = (
    red: number,
    green: number,
    blue: number,
): string => {
    const colors: number[] = [red, green, blue];
    let results: string[] = [];
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] <= 16) {
            results[i] = '0' + colors[i].toString(16);
        } else {
            results[i] = '' + colors[i].toString(16);
        }
    }
    return '#' + results.join('');
};

/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
export const convertHEXToHSV = (hexColor: string): Array<any> => {
    const [red, green, blue] = convertHEXToRGB(hexColor);
    return convertRGBToHSV(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @return {!Array}
 */
export const convertHEXToRGB = (hexColor: string): Array<any> => {
    const hex = hexColor || '';
    const red = parseInt(hex.substr(1, 2), 16);
    const green = parseInt(hex.substr(3, 2), 16);
    const blue = parseInt(hex.substr(5, 2), 16);
    return [red, green, blue];
};

/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {!Array}
 */
export const convertHSVToRGB = (
    h: number,
    s: number,
    v: number,
): Array<any> => {
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    let r = 0;
    let g = 0;
    let b = 0;
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

/**
 * @export
 * @param {number} h
 * @param {number} s
 * @param {number} v
 * @return {string}
 */
export const convertHSVToHEX = (h: number, s: number, v: number): string => {
    const [red, green, blue] = convertHSVToRGB(h, s, v);
    return convertRGBToHEX(red, green, blue);
};

/**
 * @export
 * @param {string} hexColor
 * @param {string=} opt_lightColor
 * @param {string=} opt_darkColor
 * @return {string}
 */
export const colorContrastYIQ = (
    hexColor: string,
    opt_lightColor: string | undefined = '#FEFEFE',
    opt_darkColor: string | undefined = '#252525',
): string => {
    const colors = convertHEXToRGB(hexColor);
    const yiq = (colors[0] * 299 + colors[1] * 587 + colors[2] * 114) / 1000;
    return yiq >= 128 ? opt_darkColor : opt_lightColor;
};

/**
 * @export
 * @param {string} hexColor
 * @param {number=} opt_diff
 * @return {string}
 */
export const colorContrast = (
    hexColor: string,
    opt_diff: number | undefined = 0.5,
): string => {
    const colors = convertHEXToRGB(hexColor);
    for (let i = 0; i < colors.length; i++) {
        colors[i] += Math.round(colors[i] * opt_diff);
        if (colors[i] < 0) {
            colors[i] = 0;
        } else if (colors[i] > 255) {
            colors[i] = 255;
        }
    }
    return convertRGBToHEX.apply(null, colors);
};
