import { parseInputBlock } from '../component';
import { Query } from '../core';
import { AutoCompleteField } from './autoCompleteField';

describe('autoCompleteField', () => {
    it('should be instance of AutoCompleteField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-autocomplete',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const autoCompleteField = new AutoCompleteField(
            input,
            label,
            error,
            inputBlock,
        );

        expect(autoCompleteField).toBeInstanceOf(AutoCompleteField);
    });
});
