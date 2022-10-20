import { Query } from '../core';
import { Tooltip } from './tooltip';

describe('tooltip', () => {
    it('should be instance of Tooltip', () => {
        const knot = new Query('.template-view').getKnot();
        const tooltip = new Tooltip(knot);

        expect(tooltip).toBeInstanceOf(Tooltip);
    });
});
