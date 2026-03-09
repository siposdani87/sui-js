import { Query } from '../core';
import { Carousel } from './carousel';

describe('carousel', () => {
    it('should be instance of Carousel', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot);

        expect(carousel).toBeInstanceOf(Carousel);
    });

    it('should use default options when opt_options is undefined', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot, '.carousel', undefined);

        expect(carousel).toBeInstanceOf(Carousel);
        expect(carousel.options).toBeDefined();
    });

    it('should accept custom options', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot, '.carousel', {
            autoPlay: true,
        });

        expect(carousel.options.get('autoPlay')).toBe(true);
    });

    it('should use default selector when opt_selector is undefined', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot, undefined);

        expect(carousel).toBeInstanceOf(Carousel);
        expect(carousel.carouselKnot).toBeDefined();
    });

    it('should handle _setOptions default parameter branch', () => {
        const knot = new Query('.template-view').getKnot();
        const carousel = new Carousel(knot);
        // Invoke private _setOptions without arguments to trigger default parameter
        (carousel as any)['_setOptions']();

        expect(carousel.options).toBeDefined();
    });
});
