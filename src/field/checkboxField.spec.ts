import { parseInputBlock } from '../component';
import { Query } from '../core';
import { CheckboxField } from './checkboxField';

describe('checkboxField', () => {
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
});
