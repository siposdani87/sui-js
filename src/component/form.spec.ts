import { Query } from '../core';
import { Form } from './form';

describe('form', () => {
    it('should be instance of Form', () => {
        const node = new Query('.template-view').getKnot();
        const form = new Form(node);

        expect(form).toBeInstanceOf(Form);
    });
});
