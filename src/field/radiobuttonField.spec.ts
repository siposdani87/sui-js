import { Form, parseInputBlock } from '../component';
import { Query } from '../core';
import { RadiobuttonField } from './radiobuttonField';

describe('radiobuttonField', () => {
    it('should be instance of RadiobuttonField', () => {
        const node = new Query('.template-view').getKnot();
        const form = new Form(node);
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-radio',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const radiobuttonField = new RadiobuttonField(
            input,
            label,
            error,
            inputBlock,
            form,
        );

        expect(radiobuttonField).toBeInstanceOf(RadiobuttonField);
    });
});
