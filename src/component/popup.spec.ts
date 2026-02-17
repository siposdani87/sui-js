import { Knot, Query } from '../core';
import { Popup } from './popup';

describe('Popup', () => {
    let popup: Popup;

    beforeEach(() => {
        const contentKnot = new Knot('div');
        contentKnot.setHtml('popup content');
        const knot = new Query('.template-view').getKnot();
        popup = new Popup(contentKnot, knot);
    });

    it('should be instance of Popup', () => {
        expect(popup).toBeInstanceOf(Popup);
    });

    describe('open/close', () => {
        it('should not be opened by default', () => {
            expect(popup.isOpened()).toBe(false);
        });

        it('should open popup', () => {
            popup.open();
            expect(popup.isOpened()).toBe(true);
        });

        it('should close popup', () => {
            popup.open();
            popup.close();
            expect(popup.isOpened()).toBe(false);
        });

        it('should toggle popup', () => {
            popup.toggle();
            expect(popup.isOpened()).toBe(true);
            popup.toggle();
            expect(popup.isOpened()).toBe(false);
        });
    });
});
