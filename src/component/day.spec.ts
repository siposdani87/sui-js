import { Day } from './day';

describe('day', () => {
    it('should be instance of Day', () => {
        const date = new Date(Date.parse('04 Dec 1995 00:12:00 GMT'));
        const now = new Date();
        const day = new Day(date, now, {
            css_class: null,
        });

        expect(day).toBeInstanceOf(Day);
    });
});
