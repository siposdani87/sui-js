import { Query } from '../core';
import { Tooltip } from './tooltip';

describe('tooltip', () => {
    it('should be instance of Tooltip', () => {
        const node = new Query('.template-view').getItem();
        const tooltip = new Tooltip(node);

        expect(tooltip).toBeInstanceOf(Tooltip);
    });
});