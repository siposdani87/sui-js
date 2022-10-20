import { Query } from '../core';
import { Pager } from './pager';

describe('pager', () => {
    it('should be instance of Pager', () => {
        const knot = new Query('.template-view').getKnot();
        const pager = new Pager(knot);

        expect(pager).toBeInstanceOf(Pager);
    });
});
