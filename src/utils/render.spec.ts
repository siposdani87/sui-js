import { sui } from './render';
import { Knot } from '../core';

describe('render', () => {
    describe('sui', () => {
        it('should accept a Knot element without error', () => {
            const element = document.createElement('div');
            const knot = new Knot(element);

            expect(() => sui(knot)).not.toThrow();
        });

        it('should accept a raw HTMLElement without error', () => {
            const element = document.createElement('div');

            expect(() => sui(element)).not.toThrow();
        });

        it('should initialize sui-textfield with focus/blur/input listeners', () => {
            const container = document.createElement('div');
            container.classList.add('sui-textfield');
            const input = document.createElement('input');
            input.classList.add('sui-textfield__input');
            container.appendChild(input);

            sui(container);

            input.dispatchEvent(new Event('focus'));
            expect(container.classList.contains('is-focused')).toBe(true);

            input.dispatchEvent(new Event('blur'));
            expect(container.classList.contains('is-focused')).toBe(false);
        });

        it('should add is-dirty class when input has value', () => {
            const container = document.createElement('div');
            container.classList.add('sui-textfield');
            const input = document.createElement('input');
            input.classList.add('sui-textfield__input');
            input.value = 'initial';
            container.appendChild(input);

            sui(container);

            expect(container.classList.contains('is-dirty')).toBe(true);
        });

        it('should toggle is-dirty on input event', () => {
            const container = document.createElement('div');
            container.classList.add('sui-textfield');
            const input = document.createElement('input');
            input.classList.add('sui-textfield__input');
            container.appendChild(input);

            sui(container);

            input.value = 'typed';
            input.dispatchEvent(new Event('input'));
            expect(container.classList.contains('is-dirty')).toBe(true);

            input.value = '';
            input.dispatchEvent(new Event('input'));
            expect(container.classList.contains('is-dirty')).toBe(false);
        });

        it('should not re-initialize already initialized elements', () => {
            const container = document.createElement('div');
            container.classList.add('sui-textfield');
            const input = document.createElement('input');
            input.classList.add('sui-textfield__input');
            container.appendChild(input);

            sui(container);
            sui(container);

            expect(container.dataset['suiInit']).toBe('1');
        });

        it('should find nested sui-textfield elements', () => {
            const wrapper = document.createElement('div');
            const container = document.createElement('div');
            container.classList.add('sui-textfield');
            const input = document.createElement('input');
            input.classList.add('sui-textfield__input');
            container.appendChild(input);
            wrapper.appendChild(container);

            sui(wrapper);

            input.dispatchEvent(new Event('focus'));
            expect(container.classList.contains('is-focused')).toBe(true);
        });
    });
});
