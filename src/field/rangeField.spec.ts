import { parseInputBlock } from '../component';
import { Query } from '../core';
import { RangeField } from './rangeField';

describe('rangeField', () => {
    it('should be instance of RangeField', () => {
        const inputBlock = new Query<HTMLElement>('.input-block.field-range').getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const rangeField = new RangeField(input, label, error, inputBlock);
        
        expect(rangeField).toBeInstanceOf(RangeField);
    });
});
