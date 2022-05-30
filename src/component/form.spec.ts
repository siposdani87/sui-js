import { Query } from '../core';
import { Form } from './form';

describe('form', () => {
    it('should be instance of Form', () => {
        const node = new Query('.template-view').getItem();
        const form = new Form(node);

        expect(form).toBeInstanceOf(Form);
    });
});
