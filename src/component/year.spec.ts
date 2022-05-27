import { Year } from './year';

describe('year', () => {
    it('should be instance of Year', () => {
        const date = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'));
        const now = new Date();
        const year = new Year(date, now, {
            css_class: null,
        });

        expect(year).toBeInstanceOf(Year);
    });
});
