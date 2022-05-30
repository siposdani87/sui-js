import { Query } from '../core';
import { DateTime } from './dateTime';

describe('dateTime', () => {
    it('should be instance of DateTime', () => {
        const node = new Query('.template-view').getItem();
        const dateTime = new DateTime(node, {
            type: 'datetime',
            value: new Date(),
        });

        expect(dateTime).toBeInstanceOf(DateTime);
    });
});
