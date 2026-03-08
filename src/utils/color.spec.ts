import {
    colorContrast,
    colorContrastYIQ,
    convertHEXToHSV,
    convertHEXToRGB,
    convertHSVToHEX,
    convertHSVToRGB,
    convertRGBToHEX,
    convertRGBToHSV,
} from './color';

describe('Color', () => {
    describe('convertRGBToHSV', () => {
        it('should convert RGB to HSV', () => {
            expect(convertRGBToHSV(200, 10, 50)).toEqual([347, 0.95, 0.78]);
        });

        it('should handle pure red', () => {
            expect(convertRGBToHSV(255, 0, 0)).toEqual([0, 1, 1]);
        });

        it('should handle black (0,0,0)', () => {
            expect(convertRGBToHSV(0, 0, 0)).toEqual([0, 0, 0]);
        });

        it('should handle white (255,255,255)', () => {
            expect(convertRGBToHSV(255, 255, 255)).toEqual([0, 0, 1]);
        });

        it('should handle green-dominant color (gabs === v)', () => {
            expect(convertRGBToHSV(0, 255, 0)).toEqual([120, 1, 1]);
        });

        it('should handle blue-dominant color (babs === v)', () => {
            expect(convertRGBToHSV(0, 0, 255)).toEqual([240, 1, 1]);
        });

        it('should handle hue wrapping below 0 (h < 0)', () => {
            // Magenta-ish: red dominant, bb - gg < 0
            const result = convertRGBToHSV(255, 0, 128);
            expect(result[0]).toBeGreaterThanOrEqual(0);
            expect(result[0]).toBeLessThanOrEqual(360);
        });

        it('should handle hue wrapping above 1 (h > 1)', () => {
            // Red dominant with green > blue, bb - gg > 1
            // e.g. convertRGBToHSV(255, 1, 0) gives h slightly below 0 after bb-gg
            // We need rabs===v and bb > gg such that bb-gg > 1
            // Actually h>1 happens when gabs===v or babs===v scenarios
            // Let's use a near-red with slight blue: red dominant, green=0, blue=253
            const result = convertRGBToHSV(255, 253, 0);
            expect(result[0]).toBeGreaterThanOrEqual(0);
            expect(result[0]).toBeLessThanOrEqual(360);
        });
    });

    describe('convertRGBToHEX', () => {
        it('should convert RGB to HEX', () => {
            expect(convertRGBToHEX(200, 10, 50)).toBe('#C80A32');
        });

        it('should handle black', () => {
            expect(convertRGBToHEX(0, 0, 0)).toBe('#000000');
        });

        it('should handle white', () => {
            expect(convertRGBToHEX(255, 255, 255)).toBe('#FFFFFF');
        });

        it('should pad single digit hex values', () => {
            expect(convertRGBToHEX(0, 15, 0)).toBe('#000F00');
        });
    });

    describe('convertHEXToHSV', () => {
        it('should convert HEX to HSV', () => {
            expect(convertHEXToHSV('#FF0000')).toEqual([0, 1, 1]);
        });
    });

    describe('convertHEXToRGB', () => {
        it('should convert HEX to RGB', () => {
            expect(convertHEXToRGB('#FF0000')).toEqual([255, 0, 0]);
        });

        it('should convert HEX green', () => {
            expect(convertHEXToRGB('#00FF00')).toEqual([0, 255, 0]);
        });

        it('should convert HEX blue', () => {
            expect(convertHEXToRGB('#0000FF')).toEqual([0, 0, 255]);
        });
    });

    describe('convertHSVToRGB', () => {
        it('should convert HSV to RGB', () => {
            expect(convertHSVToRGB(347, 0.95, 0.78)).toEqual([199, 10, 51]);
        });

        it.each([
            [0, 1, 1, [255, 0, 0]], // red, case 0
            [120, 1, 1, [0, 255, 0]], // green, case 2
            [240, 1, 1, [0, 0, 255]], // blue, case 4
            [180, 1, 1, [0, 255, 255]], // cyan, case 3
            [60, 1, 1, [255, 255, 0]], // yellow, case 1
            [300, 1, 1, [255, 0, 255]], // magenta, case 5
        ])('should convert HSV(%i, %f, %f) to RGB %j', (h, s, v, expected) => {
            expect(convertHSVToRGB(h, s, v)).toEqual(expected);
        });

        it('should handle case 3 (hue 180-239)', () => {
            const result = convertHSVToRGB(200, 0.8, 0.9);
            expect(result).toEqual([46, 168, 230]);
        });

        it('should handle case 4 (hue 240-299)', () => {
            const result = convertHSVToRGB(270, 0.8, 0.9);
            expect(result).toEqual([138, 46, 230]);
        });
    });

    describe('convertHSVToHEX', () => {
        it('should convert HSV to HEX', () => {
            expect(convertHSVToHEX(347, 0.95, 0.78)).toBe('#C70A33');
        });
    });

    describe('colorContrastYIQ', () => {
        it('should return light color for dark input', () => {
            expect(colorContrastYIQ('#000000')).toBe('#FEFEFE');
        });

        it('should return dark color for light input', () => {
            expect(colorContrastYIQ('#FFFFFF')).toBe('#252525');
        });

        it('should accept custom light/dark colors', () => {
            expect(colorContrastYIQ('#000000', '#FFF', '#000')).toBe('#FFF');
        });
    });

    describe('colorContrast', () => {
        it('should return contrasted color', () => {
            expect(colorContrast('#8447FF')).toBe('#C66BFF');
        });

        it('should handle black input', () => {
            const result = colorContrast('#000000');
            expect(result).toBe('#000000');
        });

        it('should clamp values at 255', () => {
            const result = colorContrast('#FFFFFF', 0.5);
            expect(result).toBe('#FFFFFF');
        });

        it('should clamp values at 0 when darkening beyond zero', () => {
            // channels=0x10=16, diff=-2: 16 + round(16*-2) = 16 + (-32) = -16 → clamped to 0
            const result = colorContrast('#101010', -2);
            expect(result).toBe('#000000');
        });

        it('should darken a color with negative diff', () => {
            const result = colorContrast('#808080', -0.5);
            expect(result).toBe('#404040');
        });
    });
});
