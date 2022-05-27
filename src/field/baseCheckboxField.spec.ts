import { parseInputBlock } from '../component';
import { Query } from '../core';
import { BaseCheckboxField } from './baseCheckboxField';

describe('baseCheckboxField', () => {
    it('should be instance of BaseCheckboxField', () => {
        const inputBlock = new Query<HTMLElement>('.input-block.field-checkbox').getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const baseCheckboxField = new BaseCheckboxField(input, label, error, inputBlock);
        
        expect(baseCheckboxField).toBeInstanceOf(BaseCheckboxField);
    });
});
