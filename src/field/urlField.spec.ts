import { parseInputBlock } from '../component';
import { Query } from '../core';
import { UrlField } from './urlField';

describe('urlField', () => {
    it('should be instance of UrlField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-url',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const urlField = new UrlField(input, label, error, inputBlock);

        expect(urlField).toBeInstanceOf(UrlField);
    });
});
