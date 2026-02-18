import { Knot, Query } from '../core';
import { Tooltip } from './tooltip';

describe('Tooltip', () => {
    let tooltip: Tooltip;
    let element: Knot;

    beforeEach(() => {
        element = new Query('.template-view').getKnot();
        tooltip = new Tooltip(element);
    });

    it('should be instance of Tooltip', () => {
        expect(tooltip).toBeInstanceOf(Tooltip);
    });

    describe('positions', () => {
        it('should default to top position', () => {
            const t = new Tooltip(element);
            expect(t.positionCssClass).toBe('mdl-tooltip--top');
        });

        it('should set bottom position', () => {
            const t = new Tooltip(element, 'BOTTOM');
            expect(t.positionCssClass).toBe('mdl-tooltip--bottom');
        });

        it('should set left position', () => {
            const t = new Tooltip(element, 'LEFT');
            expect(t.positionCssClass).toBe('mdl-tooltip--left');
        });

        it('should set right position', () => {
            const t = new Tooltip(element, 'RIGHT');
            expect(t.positionCssClass).toBe('mdl-tooltip--right');
        });
    });

    describe('open/close', () => {
        it('should not be open by default', () => {
            expect(tooltip.isOpen()).toBe(false);
        });

        it('should open tooltip', () => {
            tooltip.open();
            expect(tooltip.isOpen()).toBe(true);
        });

        it('should close tooltip', () => {
            tooltip.open();
            tooltip.close();
            expect(tooltip.isOpen()).toBe(false);
        });

        it('should toggle tooltip', () => {
            tooltip.toggle();
            expect(tooltip.isOpen()).toBe(true);
            tooltip.toggle();
            expect(tooltip.isOpen()).toBe(false);
        });
    });

    describe('setMessage', () => {
        it('should set message content', () => {
            tooltip.setMessage('Hello');
            expect(tooltip.tooltip.getHtml()).toContain('Hello');
        });

        it('should hide tooltip when message is empty', () => {
            tooltip.setMessage('');
        });
    });

    describe('render', () => {
        it('should render with message', () => {
            tooltip.render('Test message');
        });

        it('should render without message', () => {
            tooltip.render();
        });
    });
});
