import { Query } from '../core';
import { CardCollection } from './cardCollection';

describe('cardCollection', () => {
    it('should be instance of CardCollection', () => {
        const node = new Query('.template-view').getKnot();
        const cardCollection = new CardCollection(node);

        expect(cardCollection).toBeInstanceOf(CardCollection);
    });
});
