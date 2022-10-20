import { parseInputBlock } from '../component';
import { Query } from '../core';
import { FileField } from './fileField';

describe('fileField', () => {
    it('should be instance of FileField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-number',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const fileField = new FileField(input, label, error, inputBlock);

        expect(fileField).toBeInstanceOf(FileField);
    });
});
