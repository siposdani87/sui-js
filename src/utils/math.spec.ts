import {
    ceil,
    floor,
    random,
    readableCurrency,
    readableNumber,
    round,
} from './math';

describe('Math utilities', () => {
    describe('readableCurrency', () => {
        it('should format 100', () => {
            expect(readableCurrency(100)).toBe('100');
        });

        it('should format 0', () => {
            expect(readableCurrency(0)).toBe('0');
        });

        it('should format large number with delimiter', () => {
            expect(readableCurrency(1000000)).toBe('1 000 000');
        });

        it('should use custom delimiter and separator', () => {
            expect(readableCurrency(1234.56, '.', ',', 2)).toBe('1.234,56');
        });

        it('should handle null/NaN gracefully', () => {
            expect(readableCurrency(null)).toBe('0');
        });

        it('should format with precision', () => {
            expect(readableCurrency(99.99, ' ', ',', 2)).toBe('99,99');
        });
    });

    describe('readableNumber', () => {
        it.each([
            [0, false, '0'],
            [5, true, '5'],
            [14, false, '14'],
            [14, true, '10+'],
            [112, false, '112'],
            [112, true, '100+'],
            [1534, false, '1.534K'],
            [1534, true, '1K+'],
        ])('should format %i (around=%s) as %s', (num, around, expected) => {
            expect(readableNumber(num, around)).toBe(expected);
        });
    });

    describe('round', () => {
        it('should round 5 with exp 1 to 10', () => {
            expect(round(5, 1)).toBe(10);
        });

        it('should round 5 with exp 0 to 5', () => {
            expect(round(5, 0)).toBe(5);
        });

        it('should round with negative exp for decimals', () => {
            expect(round(1.555, -2)).toBe(1.56);
        });

        it('should return NaN for NaN input', () => {
            expect(round(NaN, 0)).toBeNaN();
        });
    });

    describe('floor', () => {
        it('should floor 5 with exp 1 to 0', () => {
            expect(floor(5, 1)).toBe(0);
        });

        it('should floor with exp 0', () => {
            expect(floor(5.9, 0)).toBe(5);
        });

        it('should floor with negative exp for decimals', () => {
            expect(floor(1.559, -2)).toBe(1.55);
        });
    });

    describe('ceil', () => {
        it('should ceil 5 with exp 1 to 10', () => {
            expect(ceil(5, 1)).toBe(10);
        });

        it('should ceil with exp 0', () => {
            expect(ceil(5.1, 0)).toBe(6);
        });

        it('should ceil with negative exp for decimals', () => {
            expect(ceil(1.551, -2)).toBe(1.56);
        });
    });

    describe('random', () => {
        it('should return integer in range by default', () => {
            jest.spyOn(Math, 'random').mockReturnValue(0.123456789);
            const result = random(1, 2);
            expect(result).toBe(1);
            jest.restoreAllMocks();
        });

        it('should return float when opt_onlyFloat is true', () => {
            jest.spyOn(Math, 'random').mockReturnValue(0.5);
            const result = random(1, 10, true);
            expect(result).toBe(5.5);
            jest.restoreAllMocks();
        });

        it('should return min when random is 0', () => {
            jest.spyOn(Math, 'random').mockReturnValue(0);
            expect(random(5, 10)).toBe(5);
            jest.restoreAllMocks();
        });
    });
});
