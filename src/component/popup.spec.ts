import { Knot, Query } from '../core';
import { Popup } from './popup';

describe('popup', () => {
    it('should be instance of Popup', () => {
        const content = new Knot('<span>content message</span>');
        const node = new Query('.template-view').getKnot();

        const popup = new Popup(content, node);

        expect(popup).toBeInstanceOf(Popup);
    });
});
