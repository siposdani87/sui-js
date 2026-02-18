import { Query } from '../core';
import { ResetButton } from './resetButton';

describe('ResetButton', () => {
    it('should be instance of ResetButton', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="btn-reset"]',
        ).getKnot();
        const resetButton = new ResetButton(buttonInput);
        expect(resetButton).toBeInstanceOf(ResetButton);
    });

    it('should set name attribute to reset', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="reset"]',
        ).getKnot();
        expect(buttonInput.getAttribute('name')).toBe('reset');
    });

    it('should render without error', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="reset"]',
        ).getKnot();
        const resetButton = new ResetButton(buttonInput);
        expect(() => resetButton.render()).not.toThrow();
    });
});
