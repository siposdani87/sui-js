import { Query } from '../core';
import { Carousel } from './carousel';

describe('carousel', () => {
    it('should be instance of Carousel', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot);

        expect(carousel).toBeInstanceOf(Carousel);
    });
});
