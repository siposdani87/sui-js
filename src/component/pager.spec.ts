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
    });

    describe('eventAction', () => {
        it('should call eventAction without error', () => {
            expect(() => pager.eventAction(1)).not.toThrow();
        });
    });
});
