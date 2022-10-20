import { Query } from '../core';
import { Time } from './time';

describe('time', () => {
    it('should be instance of Time', () => {
        const node = new Query('.template-view').getKnot();
        const time = new Time(node, {
            selected: [],
        });

        expect(time).toBeInstanceOf(Time);
    });
});
