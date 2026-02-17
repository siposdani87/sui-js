import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @description Placeholder carousel component (stub). Reserved for future image/content
 * carousel implementation.
 *
 * @category Component
 */
export class Carousel {
    carouselKnot: Knot;
    options!: Objekt;

    /**
     * @description Creates a new Carousel bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the carousel element.
     * @param {object} [opt_options] - Configuration options.
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.carousel',
        opt_options: object | undefined = {},
    ) {
        this.carouselKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * @description Merges user options with defaults.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({});
        this.options.merge(opt_options);
    }

    /**
     * @description Placeholder initialization (no-op in stub).
     */
    private _init(): void {
        // this._initStructure();
    }
}
