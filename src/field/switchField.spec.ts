import { parseInputBlock } from '../component';
import { Query } from '../core';
import { SwitchField } from './switchField';

describe('switchField', () => {
    it('should be instance of SwitchField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-switch',
        ).getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const switchField = new SwitchField(input, label, error, inputBlock);

        expect(switchField).toBeInstanceOf(SwitchField);
    });
});
