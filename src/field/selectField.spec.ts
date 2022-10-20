import { parseInputBlock } from '../component';
import { Query } from '../core';
import { SelectField } from './selectField';

describe('selectField', () => {
    it('should be instance of SelectField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-select',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const selectField = new SelectField(input, label, error, inputBlock);

        expect(selectField).toBeInstanceOf(SelectField);
    });
});
