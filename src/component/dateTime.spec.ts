import { Query } from '../core';
import { DateTime } from './dateTime';

describe('dateTime', () => {
    it('should be instance of DateTime', () => {
        const knot = new Query('.template-view').getKnot();
        const dateTime = new DateTime(knot, {
            type: 'datetime',
            value: new Date(),
        });

        expect(dateTime).toBeInstanceOf(DateTime);
    });
});
