import { Query } from '../core';
import { TabPanel } from './tabPanel';

describe('TabPanel', () => {
    let tabPanel: TabPanel;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        tabPanel = new TabPanel(knot);
    });

    it('should be instance of TabPanel', () => {
        expect(tabPanel).toBeInstanceOf(TabPanel);
    });

    describe('getActive', () => {
        it('should return active tab id', () => {
            const active = tabPanel.getActive();
            expect(typeof active).toBe('string');
        });
    });

    describe('setActive', () => {
        it('should set active panel', () => {
            tabPanel.setActive('panel-1');
            expect(tabPanel.getActive()).toBe('panel-1');
        });

        it('should switch active panel', () => {
            tabPanel.setActive('panel-1');
            tabPanel.setActive('panel-2');
            expect(tabPanel.getActive()).toBe('panel-2');
        });

        it('should handle null panelId', () => {
            const onReject = jest.fn();
            tabPanel.setActive(null).then(jest.fn(), onReject);
            expect(onReject).toHaveBeenCalled();
        });
    });

    describe('eventChange', () => {
        it('should call eventChange when panel changes', () => {
            const spy = jest.spyOn(tabPanel, 'eventChange');
            tabPanel.setActive('panel-1');
            expect(spy).toHaveBeenCalledWith('panel-1');
        });
    });
});
