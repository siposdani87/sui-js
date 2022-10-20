import { Query } from '../core';
import { Table } from './table';

describe('table', () => {
    it('should be instance of Table', () => {
        const knot = new Query('.template-view').getKnot();
        const table = new Table(knot);

        expect(table).toBeInstanceOf(Table);
    });
});
