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

    it('should update value on keyup event', () => {
        searchField.render();
        const inputNode = searchField.input.getNode();
        inputNode.value = 'test query';
        inputNode.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
        expect(searchField.getValue()).toBe('test query');
    });

    it('should call eventEnter on Enter key', () => {
        searchField.render();
        const enterSpy = jest.fn();
        searchField.eventEnter = enterSpy;
        const inputNode = searchField.input.getNode();
        inputNode.value = 'search term';
        inputNode.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        expect(enterSpy).toHaveBeenCalledWith('search term');
    });

    it('should update value on change event', () => {
        searchField.render();
        const inputNode = searchField.input.getNode();
        inputNode.value = 'changed query';
        inputNode.dispatchEvent(new Event('change'));
        expect(searchField.getValue()).toBe('changed query');
    });

    it('should clear value on clear button click when enabled', () => {
        searchField.render();
        searchField.setValue('some value');
        const clearButton = searchField.inputBlock
            .getNode()
            .querySelector('button.clear-button') as HTMLButtonElement;
        expect(clearButton).not.toBeNull();
        clearButton.click();
        expect(searchField.getValue()).toBe('');
    });
});
