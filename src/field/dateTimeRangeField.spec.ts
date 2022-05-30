import { parseInputBlock } from '../component';
import { Query } from '../core';
import { DateTimeRangeField } from './dateTimeRangeField';

describe('dateTimeRangeField', () => {
    it('should be instance of DateTimeRangeField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-datetime',
        ).getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const dateTimeRangeField = new DateTimeRangeField(
            input,
            label,
            error,
            inputBlock,
            true,
        );

        expect(dateTimeRangeField).toBeInstanceOf(DateTimeRangeField);
    });
});
