import { parseInputBlock } from '../component';
import { Query } from '../core';
import { SelectField } from './selectField';

describe('SelectField', () => {
    it('should be instance of SelectField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);
        expect(selectField).toBeInstanceOf(SelectField);
    });

    it('should not be multiple by default', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);
        expect(selectField.isMultiple()).toBe(false);
    });

    it('should return null value when empty selected', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);
        const value = selectField.getValue();
        expect(value).toBeNull();
    });

    it('should have options collection', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);
        expect(selectField.options).toBeDefined();
    });

    it('should check disabled state', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);
        expect(selectField.isDisabled()).toBe(false);
    });
});
