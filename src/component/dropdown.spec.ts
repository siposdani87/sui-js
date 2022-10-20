import { Query } from '../core';
import { Dropdown } from './dropdown';

describe('dropdown', () => {
    it('should be instance of Dropdown', () => {
        const knot = new Query('.template-view').getKnot();
        const dropdown = new Dropdown(knot);

        expect(dropdown).toBeInstanceOf(Dropdown);
    });
});
