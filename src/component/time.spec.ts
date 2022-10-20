import { Query } from '../core';
import { Time } from './time';

describe('time', () => {
    it('should be instance of Time', () => {
        const knot = new Query('.template-view').getKnot();
        const time = new Time(knot, {
            selected: [],
        });

        expect(time).toBeInstanceOf(Time);
    });
});
