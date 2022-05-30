import { parseInputBlock } from '../component';
import { Query } from '../core';
import { TextareaField } from './textareaField';

describe('textareaField', () => {
    it('should be instance of TextareaField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-textarea',
        ).getItem();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textareaField = new TextareaField(
            input,
            label,
            error,
            inputBlock,
        );

        expect(textareaField).toBeInstanceOf(TextareaField);
    });
});
