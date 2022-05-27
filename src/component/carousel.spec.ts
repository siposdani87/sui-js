import { Query } from '../core';
import { Carousel } from './carousel';

describe('carousel', () => {
    it('should be instance of Carousel', () => {
        const node = new Query('.template-view').getItem();
        const carousel = new Carousel(node);
        
        expect(carousel).toBeInstanceOf(Carousel);
    });
});
