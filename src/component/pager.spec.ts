import { Query } from '../core';
import { Pager } from './pager';

describe('pager', () => {
    it('should be instance of Pager', () => {
        const node = new Query('.template-view').getItem();
        const pager = new Pager(node);

        expect(pager).toBeInstanceOf(Pager);
    });
});
