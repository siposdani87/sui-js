import { parseInputBlock } from '../component';
import { Query } from '../core';
import { DateTimeField } from './dateTimeField';

describe('dateTimeField', () => {
    it('should be instance of DateTimeField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-datetime',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const dateTimeField = new DateTimeField(
            input,
            label,
            error,
            inputBlock,
        );

        expect(dateTimeField).toBeInstanceOf(DateTimeField);
    });
});
