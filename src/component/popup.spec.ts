import { Knot, Query } from '../core';
import { Popup } from './popup';

describe('popup', () => {
    it('should be instance of Popup', () => {
        const contentKnot = new Knot('<span>content message</span>');
        const knot = new Query('.template-view').getKnot();

        const popup = new Popup(contentKnot, knot);

        expect(popup).toBeInstanceOf(Popup);
    });
});
