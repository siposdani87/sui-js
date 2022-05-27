import { Query } from '../core';
import { Clock } from './clock';

describe('clock', () => {
    it('should be instance of Clock', () => {
        const node = new Query('.template-view').getItem();
        const clock = new Clock(node, {
            type: 'HOUR',
            time: new Date(),
        });
        
        expect(clock).toBeInstanceOf(Clock);
    });
});
