import { convertToISOFormat, setDateIOLocale } from './dateio';

describe('math', () => {
    it('should be readable currency', () => {
        const newLocale = 'hu-HU';

        setDateIOLocale(newLocale);
    });

    it('should convert to ISO format', () => {
        const isoFormat = convertToISOFormat('YYYY-MM-DD');

        expect(isoFormat).toEqual('yyyy-MM-dd');
    });
});
