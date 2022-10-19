import {
    ceil,
    floor,
    random,
    readableCurrency,
    readableNumber,
    round,
} from './math';

describe('math', () => {
    it('should be readable currency 100', () => {
        const price = 100;
        const result = readableCurrency(100);

        expect(result).toEqual(price.toString());
    });

    it('should be readable number 0 from 0', () => {
        const result = readableNumber(0);

        expect(result).toEqual('0');
    });

    it('should be readable number 5 from 5 with around', () => {
        const result = readableNumber(5, true);

        expect(result).toEqual('5');
    });

    it('should be readable number 14 from 14', () => {
        const result = readableNumber(14);

        expect(result).toEqual('14');
    });

    it('should be readable number 10+ from 14 with around', () => {
        const result = readableNumber(14, true);

        expect(result).toEqual('10+');
    });

    it('should be readable number 112 from 112', () => {
        const result = readableNumber(112);

        expect(result).toEqual('112');
    });

    it('should be readable number 100+ from 112 with around', () => {
        const result = readableNumber(112, true);

        expect(result).toEqual('100+');
    });

    it('should be readable number 1.534K from 1534', () => {
        const result = readableNumber(1534);

        expect(result).toEqual('1.534K');
    });

    it('should be readable number 1K+ from 1534 with around', () => {
        const result = readableNumber(1534, true);

        expect(result).toEqual('1K+');
    });

    it('should round 10 from 5 with exp 1', () => {
        const result = round(5, 1);

        expect(result).toEqual(10);
    });

    it('should round 5 from 5 with exp 0', () => {
        const result = round(5, 0);

        expect(result).toEqual(5);
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
