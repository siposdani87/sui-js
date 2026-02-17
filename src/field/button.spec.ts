import { Query } from '../core';
import { Button } from './button';

describe('Button', () => {
    it('should be instance of Button', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="btn-button"]',
        ).getKnot();
        const button = new Button(buttonInput);
        expect(button).toBeInstanceOf(Button);
    });

    it('should set name attribute to button', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="button"]',
        ).getKnot();
        expect(buttonInput.getAttribute('name')).toBe('button');
    });

    it('should render without error', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="button"]',
        ).getKnot();
        const button = new Button(buttonInput);
        expect(() => button.render()).not.toThrow();
    });

    it('should add MDL classes on render', () => {
        const buttonInput = new Query<HTMLInputElement>(
            'button[name="button"]',
        ).getKnot();
        const button = new Button(buttonInput);
        button.render();
        expect(buttonInput.hasClass('mdl-button')).toBe(true);
    });
});
