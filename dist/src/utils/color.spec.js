import { colorContrast, colorContrastYIQ, convertHEXToHSV, convertHEXToRGB, convertHSVToHEX, convertHSVToRGB, convertRGBToHEX, convertRGBToHSV, } from './color';
describe('color', () => {
    it('should be valid HSV from RGB', () => {
        const colors = convertRGBToHSV(200, 10, 50);
        expect(colors).toEqual([347, 0.95, 0.78]);
    });
    it('should be valid HEX from RGB', () => {
        const color = convertRGBToHEX(200, 10, 50);
        expect(color).toEqual('#C80A32');
    });
    it('should be valid HSV from HEX', () => {
        const colors = convertHEXToHSV('#FF0000');
        expect(colors).toEqual([0, 1, 1]);
    });
    it('should be valid RGB from HEX', () => {
        const colors = convertHEXToRGB('#FF0000');
        expect(colors).toEqual([255, 0, 0]);
    });
    it('should be valid RGB from HSV', () => {
        const colors = convertHSVToRGB(347, 0.95, 0.78);
        expect(colors).toEqual([199, 10, 51]);
    });
    it('should be valid HEX from HSV', () => {
        const color = convertHSVToHEX(347, 0.95, 0.78);
        expect(color).toEqual('#C70A33');
    });
    it('should be valid YIQ contrast', () => {
        const color = colorContrastYIQ('#000000');
        expect(color).toEqual('#FEFEFE');
    });
    it('should be valid color contrast', () => {
        const color = colorContrast('#8447FF');
        expect(color).toEqual('#C66BFF');
    });
});
