import { Form, parseInputBlock } from '../component';
import { Query } from '../core';
import { RadiobuttonField } from './radiobuttonField';

describe('RadiobuttonField', () => {
    let radiobuttonField: RadiobuttonField;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        const form = new Form(knot);
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-radio',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        radiobuttonField = new RadiobuttonField(
            input,
            label,
            error,
            inputBlock,
            form,
        );
    });

    it('should be instance of RadiobuttonField', () => {
        expect(radiobuttonField).toBeInstanceOf(RadiobuttonField);
    });

    it('should return field name', () => {
        expect(radiobuttonField.getName()).toBe('field.radio');
    });

    it('should get value', () => {
        const value = radiobuttonField.getValue();
        expect(value).toBeDefined();
    });

    it('should check disabled state', () => {
        expect(radiobuttonField.isDisabled()).toBe(false);
    });
});
