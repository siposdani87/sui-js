import { Query } from '../core';
import { TabPanel } from './tabPanel';

describe('tabPanel', () => {
    it('should be instance of TabPanel', () => {
        const knot = new Query('.template-view').getKnot();
        const tabPanel = new TabPanel(knot);

        expect(tabPanel).toBeInstanceOf(TabPanel);
    });
});
