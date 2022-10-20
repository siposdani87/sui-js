import { Query } from '../core';
import { Dropdown } from './dropdown';

describe('dropdown', () => {
    it('should be instance of Dropdown', () => {
        const node = new Query('.template-view').getKnot();
        const dropdown = new Dropdown(node);

        expect(dropdown).toBeInstanceOf(Dropdown);
    });
});
