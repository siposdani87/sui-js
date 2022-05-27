import { Query } from '../core';
import { SubmitButton } from './submitButton';

describe('submitButton', () => {
    it('should be instance of SubmitButton', () => {
        const buttonInput = new Query<HTMLInputElement>('button[name="btn-submit"]').getItem();
        const submitButton = new SubmitButton(buttonInput);
        
        expect(submitButton).toBeInstanceOf(SubmitButton);
    });
});
