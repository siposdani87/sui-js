import { parseInputBlock } from '../component';
import { Query } from '../core';
import { TextareaField } from './textareaField';

describe('TextareaField', () => {
    let textareaField: TextareaField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-textarea',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        textareaField = new TextareaField(input, label, error, inputBlock);
    });

    it('should be instance of TextareaField', () => {
        expect(textareaField).toBeInstanceOf(TextareaField);
    });

    it('should return field name', () => {
        expect(textareaField.getName()).toBe('field.textarea');
    });

    it('should set and get value', () => {
        textareaField.setValue('some text');
        expect(textareaField.getValue()).toBe('some text');
    });

    it('should render without error', () => {
        expect(() => textareaField.render()).not.toThrow();
    });

    it('should check disabled state', () => {
        expect(textareaField.isDisabled()).toBe(false);
    });
});
