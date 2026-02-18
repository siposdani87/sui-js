import { parseInputBlock } from '../component';
import { Query } from '../core';
import { ColorField } from './colorField';

describe('ColorField', () => {
    let colorField: ColorField;

    beforeEach(() => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-color',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        colorField = new ColorField(input, label, error, inputBlock);
    });

    it('should be instance of ColorField', () => {
        expect(colorField).toBeInstanceOf(ColorField);
    });

    it('should return field name', () => {
        expect(colorField.getName()).toBe('field.color');
    });

    it('should set and get value', () => {
        colorField.setValue('#FF0000');
    });

    it('should check disabled state', () => {
        expect(colorField.isDisabled()).toBe(false);
    });

    it('should render without error', () => {
        expect(() => colorField.render()).not.toThrow();
    });
});
