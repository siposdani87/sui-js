import { parseInputBlock } from '../component';
import { Query } from '../core';
import { SearchField } from './searchField';

describe('searchField', () => {
    it('should be instance of SearchField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-search',
        ).getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const searchField = new SearchField(input, label, error, inputBlock);

        expect(searchField).toBeInstanceOf(SearchField);
    });
});
