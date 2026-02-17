import { parseInputBlock } from '../component';
import { Query } from '../core';
import { SearchField } from './searchField';

describe('SearchField', () => {
    let searchField: SearchField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-search',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        searchField = new SearchField(input, label, error, inputBlock);
    });

    it('should be instance of SearchField', () => {
        expect(searchField).toBeInstanceOf(SearchField);
    });

    it('should return field name', () => {
        expect(searchField.getName()).toBe('field.search');
    });

    it('should set and get value', () => {
        searchField.setValue('query text');
        expect(searchField.getValue()).toBe('query text');
    });

    it('should render without error', () => {
        expect(() => searchField.render()).not.toThrow();
    });

    it('should check disabled state', () => {
        expect(searchField.isDisabled()).toBe(false);
    });
});
