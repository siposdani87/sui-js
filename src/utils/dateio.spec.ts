import { DateIO, convertToISOFormat, setDateIOLocale } from './dateio';

describe('dateio', () => {
    it('should be readable currency', () => {
        const newLocale = 'hu-HU';

        setDateIOLocale(newLocale);
    });

    it('should convert to ISO format', () => {
        const isoFormat = convertToISOFormat('YYYY-MM-DD');

        expect(isoFormat).toEqual('yyyy-MM-dd');
    });

    it('should parse number format of year', () => {
        const date = DateIO.parse(2024, 'YYYY');

        expect(date.getFullYear()).toEqual(2024);
    });

    it('should parse string format of year', () => {
        const date = DateIO.parse('2024', 'YYYY');

        expect(date.getFullYear()).toEqual(2024);
    });
});
