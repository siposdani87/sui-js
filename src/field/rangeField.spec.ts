import { parseInputBlock } from '../component';
import { Query } from '../core';
import { RangeField } from './rangeField';

describe('RangeField', () => {
    it('should be instance of RangeField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-range',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const rangeField = new RangeField(input, label, error, inputBlock);
        expect(rangeField).toBeInstanceOf(RangeField);
    });

    it('should return field name', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-range',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const rangeField = new RangeField(input, label, error, inputBlock);
        expect(rangeField.getName()).toBe('field.range');
    });

    it('should check disabled state', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-range',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const rangeField = new RangeField(input, label, error, inputBlock);
        expect(rangeField.isDisabled()).toBe(false);
    });

    it('should render without error', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-range',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const rangeField = new RangeField(input, label, error, inputBlock);
        expect(() => rangeField.render()).not.toThrow();
    });
});
