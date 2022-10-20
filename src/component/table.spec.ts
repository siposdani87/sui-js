import { Query } from '../core';
import { Table } from './table';

describe('table', () => {
    it('should be instance of Table', () => {
        const node = new Query('.template-view').getKnot();
        const table = new Table(node);

        expect(table).toBeInstanceOf(Table);
    });
});
