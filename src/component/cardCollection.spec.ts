import { Query } from '../core';
import { CardCollection } from './cardCollection';

describe('cardCollection', () => {
    it('should be instance of CardCollection', () => {
        const knot = new Query('.template-view').getKnot();
        const cardCollection = new CardCollection(knot);

        expect(cardCollection).toBeInstanceOf(CardCollection);
    });
});
