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
            [0, 1, 1, [255, 0, 0]], // red
            [120, 1, 1, [0, 255, 0]], // green
            [240, 1, 1, [0, 0, 255]], // blue
        ])(
            'should convert HSV(%i, %f, %f) to RGB %j',
            (h, s, v, expected) => {
                expect(convertHSVToRGB(h, s, v)).toEqual(expected);
            },
        );
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
    });
});
