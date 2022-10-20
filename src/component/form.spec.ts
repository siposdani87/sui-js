import { Query } from '../core';
import { Form } from './form';

describe('form', () => {
    it('should be instance of Form', () => {
        const knot = new Query('.template-view').getKnot();
        const form = new Form(knot);

        expect(form).toBeInstanceOf(Form);
    });
});
