import { Query } from '../core';
import { SubmitButton } from './submitButton';

describe('SubmitButton', () => {
    it('should be instance of SubmitButton', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="btn-submit"]',
        ).getKnot();
        const submitButton = new SubmitButton(buttonInput);
        expect(submitButton).toBeInstanceOf(SubmitButton);
    });

    it('should set name attribute to submit', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="submit"]',
        ).getKnot();
        expect(buttonInput.getAttribute('name')).toBe('submit');
    });

    it('should render without error', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="submit"]',
        ).getKnot();
        const submitButton = new SubmitButton(buttonInput);
        expect(() => submitButton.render()).not.toThrow();
    });
});
