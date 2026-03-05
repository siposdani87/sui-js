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
    });
});
