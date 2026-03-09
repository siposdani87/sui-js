import { Query } from '../core';
import { Pager } from './pager';

describe('Pager', () => {
    let pager: Pager;

    beforeEach(() => {
        const knot = new Query('.template-view').getKnot();
        pager = new Pager(knot);
    });

    it('should be instance of Pager', () => {
        expect(pager).toBeInstanceOf(Pager);
    });

    describe('setPage', () => {
        it('should set page number', () => {
            pager.setPage(3);
            expect(pager.page).toBe(3);
        });

        it('should calculate offset', () => {
            pager.setPage(2);
            expect(pager.offset).toBe(10); // (2-1) * 10
        });
    });

    describe('setCount', () => {
        it('should set total count', () => {
            pager.setCount(100);
            expect(pager.count).toBe(100);
        });
    });

    describe('draw', () => {
        it('should draw pager without error', () => {
            pager.setCount(50);
            pager.setPage(1);
            expect(() => pager.draw()).not.toThrow();
        });

        it('should draw for single page', () => {
            pager.setCount(5);
            pager.setPage(1);
            expect(() => pager.draw()).not.toThrow();
        });

        it('should draw for many pages', () => {
            pager.setCount(200);
            pager.setPage(3);
            expect(() => pager.draw()).not.toThrow();
        });

        it('should show empty statistics when count is zero', () => {
            pager.setCount(0);
            pager.setPage(1);
            pager.draw();
            expect(pager.pagerStatistics.getHtml(true)).toBe('');
        });

        it('should show statistics text when count is positive', () => {
            pager.setCount(50);
            pager.setPage(1);
            pager.draw();
            expect(pager.pagerStatistics.getHtml(true)).toContain('1');
            expect(pager.pagerStatistics.getHtml(true)).toContain('50');
        });

        it('should render previous and next buttons for multiple pages', () => {
            pager.setCount(50);
            pager.setPage(1);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            expect(buttons.length).toBeGreaterThanOrEqual(2);
        });

        it('should not render navigation buttons for single page', () => {
            pager.setCount(5);
            pager.setPage(1);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            expect(buttons.length).toBe(0);
        });
    });

    describe('navigation', () => {
        it('should go to next page when next button is clicked', () => {
            const actionFn = jest.fn();
            pager.on('action', actionFn);
            pager.setCount(50);
            pager.setPage(1);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            const nextButton = buttons[buttons.length - 1];
            nextButton!.click();
            expect(pager.page).toBe(2);
            expect(actionFn).toHaveBeenCalledWith(2);
        });

        it('should wrap to page 1 when next is clicked on last page', () => {
            const actionFn = jest.fn();
            pager.on('action', actionFn);
            pager.setCount(50);
            pager.setPage(5);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            const nextButton = buttons[buttons.length - 1];
            nextButton!.click();
            expect(pager.page).toBe(1);
            expect(actionFn).toHaveBeenCalledWith(1);
        });

        it('should go to previous page when previous button is clicked', () => {
            const actionFn = jest.fn();
            pager.on('action', actionFn);
            pager.setCount(50);
            pager.setPage(3);
            pager.draw();
            const firstButton = pager.pager.getNode().querySelector('button');
            firstButton!.click();
            expect(pager.page).toBe(2);
            expect(actionFn).toHaveBeenCalledWith(2);
        });

        it('should wrap to last page when previous is clicked on first page', () => {
            const actionFn = jest.fn();
            pager.on('action', actionFn);
            pager.setCount(50);
            pager.setPage(1);
            pager.draw();
            const firstButton = pager.pager.getNode().querySelector('button');
            firstButton!.click();
            expect(pager.page).toBe(5);
            expect(actionFn).toHaveBeenCalledWith(5);
        });

        it('should navigate to a specific page when page number button is clicked', () => {
            const actionFn = jest.fn();
            pager.on('action', actionFn);
            pager.setCount(50);
            pager.setPage(1);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            // Page number buttons are between prev and next
            const pageButton = buttons[2]; // page 2 button
            pageButton!.click();
            expect(actionFn).toHaveBeenCalled();
        });
    });

    describe('page numbers with ellipsis', () => {
        it('should show ellipsis for earlier pages when on a later page group', () => {
            const knot = new Query('.template-view').getKnot();
            const p = new Pager(knot, ['.pager', '.pager-statistics'], {
                row_count: 10,
                pager_num: 4,
            });
            p.setCount(100); // 10 pages
            p.setPage(5); // part = floor((5-1)/4) = 1, so part > 0
            p.draw();
            const buttons = p.pager.getNode().querySelectorAll('button');
            const texts = Array.from(buttons).map(
                (b: Element) => b.textContent,
            );
            expect(texts).toContain('...');
        });

        it('should show forward ellipsis when not on the last page group', () => {
            const knot = new Query('.template-view').getKnot();
            const p = new Pager(knot, ['.pager', '.pager-statistics'], {
                row_count: 10,
                pager_num: 4,
            });
            p.setCount(100); // 10 pages
            p.setPage(1); // first group, should have forward ellipsis
            p.draw();
            const buttons = p.pager.getNode().querySelectorAll('button');
            const texts = Array.from(buttons).map(
                (b: Element) => b.textContent,
            );
            expect(texts).toContain('...');
        });

        it('should highlight current page button', () => {
            pager.setCount(50);
            pager.setPage(2);
            pager.draw();
            const buttons = pager.pager.getNode().querySelectorAll('button');
            const accentButtons = Array.from(buttons).filter((b: Element) =>
                b.classList.contains('sui-button--accent'),
            );
            expect(accentButtons.length).toBe(1);
        });
    });

    describe('action event', () => {
        it('should emit action event without error', () => {
            expect(() => pager.emit('action', 1)).not.toThrow();
        });
    });
});
