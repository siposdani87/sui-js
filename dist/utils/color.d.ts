export declare const convertRGBToHSV: (red: number, green: number, blue: number) => [number, number, number];
export declare const convertRGBToHEX: (red: number, green: number, blue: number) => string;
export declare const convertHEXToHSV: (hexColor: string) => [h: number, s: number, v: number];
export declare const convertHEXToRGB: (hexColor: string) => [r: number, g: number, b: number];
export declare const convertHSVToRGB: (h: number, s: number, v: number) => [r: number, g: number, b: number];
export declare const convertHSVToHEX: (h: number, s: number, v: number) => string;
export declare const colorContrastYIQ: (hexColor: string, opt_lightColor?: string | undefined, opt_darkColor?: string | undefined) => string;
export declare const colorContrast: (hexColor: string, opt_diff?: number | undefined) => string;
