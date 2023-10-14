import { round } from './math';

export const convertRGBToHSV = (
    red: number,
    green: number,
    blue: number,
): [number, number, number] => {
    const rabs = red / 255;
    const gabs = green / 255;
    const babs = blue / 255;
    const v = Math.max(rabs, gabs, babs);
    const diff = v - Math.min(rabs, gabs, babs);
    const diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
    let h = 0;
    let s = 0;
    if (diff !== 0) {
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
    return [Math.round(h * 360), round(s, -2), round(v, -2)];
};

export const convertRGBToHEX = (
    red: number,
    green: number,
    blue: number,
): string => {
    const colors: number[] = [red, green, blue];
    const results: string[] = [];
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] <= 16) {
            results[i] = '0' + colors[i].toString(16).toUpperCase();
        } else {
            results[i] = '' + colors[i].toString(16).toUpperCase();
        }
    }
    return '#' + results.join('');
};

export const convertHEXToHSV = (
    hexColor: string,
): [h: number, s: number, v: number] => {
    const [red, green, blue] = convertHEXToRGB(hexColor);
    return convertRGBToHSV(red, green, blue);
};

export const convertHEXToRGB = (
    hexColor: string,
): [r: number, g: number, b: number] => {
    const hex = hexColor || '';
    const red = parseInt(hex.substring(1, 3), 16);
    const green = parseInt(hex.substring(3, 5), 16);
    const blue = parseInt(hex.substring(5, 7), 16);
    return [red, green, blue];
};

export const convertHSVToRGB = (
    h: number,
    s: number,
    v: number,
): [r: number, g: number, b: number] => {
    const i = Math.floor((h / 60) % 6);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let blue: number;
    let green: number;
    let red: number;

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

export const convertHSVToHEX = (h: number, s: number, v: number): string => {
    const [red, green, blue] = convertHSVToRGB(h, s, v);
    return convertRGBToHEX(red, green, blue);
};

export const colorContrastYIQ = (
    hexColor: string,
    opt_lightColor: string | undefined = '#FEFEFE',
    opt_darkColor: string | undefined = '#252525',
): string => {
    const colors = convertHEXToRGB(hexColor);
    const yiq = (colors[0] * 299 + colors[1] * 587 + colors[2] * 114) / 1000;
    return yiq >= 128 ? opt_darkColor : opt_lightColor;
};

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
    return convertRGBToHEX(...colors);
};
