import { parseInputBlock } from '../component';
import { Query } from '../core';
import { NumberField } from './numberField';

describe('numberField', () => {
    it('should be instance of NumberField', () => {
        const inputBlock = new Query<HTMLElement>('.input-block.field-number').getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const numberField = new NumberField(input, label, error, inputBlock);
        
        expect(numberField).toBeInstanceOf(NumberField);
    });
});
