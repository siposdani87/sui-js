import { Month } from './month';

describe('month', () => {
    it('should be instance of Month', () => {
        const date = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'));
        const now = new Date();
        const month = new Month(date, now, {
            css_class: null,
        });

        expect(month).toBeInstanceOf(Month);
    });
});
