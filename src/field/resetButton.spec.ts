import { Query } from '../core';
import { ResetButton } from './resetButton';

describe('resetButton', () => {
    it('should be instance of ResetButton', () => {
        const buttonInput = new Query<HTMLInputElement>('button[name="btn-reset"]').getItem();
        const resetButton = new ResetButton(buttonInput);
        
        expect(resetButton).toBeInstanceOf(ResetButton);
    });
});
