import { parseInputBlock } from '../component';
import { Query } from '../core';
import { ColorField } from './colorField';

describe('colorField', () => {
    it('should be instance of ColorField', () => {
        const inputBlock = new Query<HTMLElement>('.input-block.field-color').getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const colorField = new ColorField(input, label, error, inputBlock);
        
        expect(colorField).toBeInstanceOf(ColorField);
    });
});
