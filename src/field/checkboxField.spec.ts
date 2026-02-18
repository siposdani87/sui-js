import { parseInputBlock } from '../component';
import { Query } from '../core';
import { CheckboxField } from './checkboxField';

describe('CheckboxField', () => {
    it('should be instance of CheckboxField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-checkbox',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const checkboxField = new CheckboxField(
            input,
            label,
            error,
            inputBlock,
        );
        expect(checkboxField).toBeInstanceOf(CheckboxField);
    });

    it('should return field name', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-checkbox',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const checkboxField = new CheckboxField(
            input,
            label,
            error,
            inputBlock,
        );
        expect(checkboxField.getName()).toBe('field.checkbox');
    });

    it('should get value', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-checkbox',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const checkboxField = new CheckboxField(
            input,
            label,
            error,
            inputBlock,
        );
        const value = checkboxField.getValue();
        expect(value).toBeDefined();
    });

    it('should check disabled state', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-checkbox',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const checkboxField = new CheckboxField(
            input,
            label,
            error,
            inputBlock,
        );
        expect(checkboxField.isDisabled()).toBe(false);
    });
});
