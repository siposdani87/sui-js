import { Query } from '../core';
import { TextField } from '../field';
import { Form } from './form';
import { FormField } from './formField';

describe('formField', () => {
    it('should be instance of FormField', () => {
        const inputBlock = new Query<HTMLInputElement>(
            '.input-block',
        ).getKnot();
        const node = new Query('.template-view').getKnot();
        const form = new Form(node);
        const formField = FormField(inputBlock, form);

        expect(formField).toBeInstanceOf(TextField);
    });
});
