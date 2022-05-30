import { Query } from '../core';
import { TabPanel } from './tabPanel';

describe('tabPanel', () => {
    it('should be instance of TabPanel', () => {
        const node = new Query('.template-view').getItem();
        const tabPanel = new TabPanel(node);

        expect(tabPanel).toBeInstanceOf(TabPanel);
    });
});
