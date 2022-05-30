import { Query } from '../core';
import { Button } from './button';

describe('button', () => {
    it('should be instance of Button', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="btn-button"]',
        ).getItem();
        const button = new Button(buttonInput);

        expect(button).toBeInstanceOf(Button);
    });
});
