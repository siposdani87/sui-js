import { Query } from '../core';
import { Calendar } from './calendar';

describe('calendar', () => {
    it('should be instance of Calendar', () => {
        const node = new Query('.template-view').getItem();
        const calendar = new Calendar(node, {
            type: 'DATE',
            date: new Date(),
        });
        
        expect(calendar).toBeInstanceOf(Calendar);
    });
});
