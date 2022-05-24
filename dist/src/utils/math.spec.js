import { ceil, floor, random, readableCurrency, readableNumber, round, } from './math';
describe('math', () => {
    it('should be readable currency', () => {
        const price = 100;
        const result = readableCurrency(100);
        expect(result).toEqual(price.toString());
    });
    it('should be readable number', () => {
        const result = readableNumber(110, 2);
        expect(result).toEqual('100');
    });
    it('should round', () => {
        const result = round(5, 1);
        expect(result).toEqual(10);
    });
    it('should floor', () => {
        const result = floor(5, 1);
        expect(result).toEqual(0);
    });
    it('should ceil', () => {
        const result = ceil(5, 1);
        expect(result).toEqual(10);
    });
    it('should be a random number', () => {
        const randomSpy = jest
            .spyOn(Math, 'random')
            .mockReturnValue(0.123456789);
        const result = random(1, 2);
        expect(result).toEqual(1);
        randomSpy.mockRestore();
    });
});
