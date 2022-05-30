import { parseInputBlock } from '../component';
import { Query } from '../core';
import { LocationField } from './locationField';

describe('locationField', () => {
    it('should be instance of LocationField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-number',
        ).getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const locationField = new LocationField(
            input,
            label,
            error,
            inputBlock,
        );

        expect(locationField).toBeInstanceOf(LocationField);
    });
});
