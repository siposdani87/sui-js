import { parseInputBlock } from '../component';
import { Query } from '../core';
import { TextField } from './textField';

describe('textField', () => {
    it('should be instance of TextField', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-text',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);

        expect(textField).toBeInstanceOf(TextField);
    });

    it('should be instance of TextField, when type tel', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-tel',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);

        expect(textField).toBeInstanceOf(TextField);
    });

    it('should be instance of TextField, when type email', () => {
        const inputBlock = new Query<HTMLElement>(
            '.input-block.field-email',
        ).getKnot();
        const { input, label, error } = parseInputBlock(inputBlock);
        const textField = new TextField(input, label, error, inputBlock);

        expect(textField).toBeInstanceOf(TextField);
    });
});
