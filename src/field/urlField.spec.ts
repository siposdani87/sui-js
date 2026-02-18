import { parseInputBlock } from '../component';
import { Query } from '../core';
import { UrlField } from './urlField';

describe('UrlField', () => {
    let urlField: UrlField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-url',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        urlField = new UrlField(input, label, error, inputBlock);
    });

    it('should be instance of UrlField', () => {
        expect(urlField).toBeInstanceOf(UrlField);
    });

    it('should return field name', () => {
        expect(urlField.getName()).toBe('field.url');
    });

    it('should set and get value', () => {
        urlField.setValue('https://example.com');
        expect(urlField.getValue()).toBe('https://example.com');
    });

    it('should check disabled state', () => {
        expect(urlField.isDisabled()).toBe(false);
    });

    it('should render without error', () => {
        expect(() => urlField.render()).not.toThrow();
    });
});
