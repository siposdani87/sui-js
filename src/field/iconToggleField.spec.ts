import { parseInputBlock } from '../component';
import { Query } from '../core';
import { IconToggleField } from './iconToggleField';

describe('iconToggleField', () => {
    it('should be instance of IconToggleField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-icon-toggle',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const iconToggleField = new IconToggleField(
            input,
            label,
            error,
            inputBlock,
        );

        expect(iconToggleField).toBeInstanceOf(IconToggleField);
    });
});
