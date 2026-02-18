import { parseInputBlock } from '../component';
import { Query } from '../core';
import { NumberField } from './numberField';

describe('NumberField', () => {
    let numberField: NumberField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-number',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        numberField = new NumberField(input, label, error, inputBlock);
    });

    it('should be instance of NumberField', () => {
        expect(numberField).toBeInstanceOf(NumberField);
    });

    it('should return field name', () => {
        expect(numberField.getName()).toBe('field.number');
    });

    it('should set and get numeric value', () => {
        numberField.setValue(42);
        expect(numberField.getValue()).toBe(42);
    });

    it('should render without error', () => {
        expect(() => numberField.render()).not.toThrow();
    });

    it('should check disabled state', () => {
        expect(numberField.isDisabled()).toBe(false);
    });

    it('should set disabled', () => {
        numberField.setDisabled(true);
        expect(numberField.isDisabled()).toBe(true);
        numberField.setDisabled(false);
    });
});
