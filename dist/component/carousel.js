import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @description Placeholder carousel component (stub). Reserved for future image/content
 * carousel implementation.
 *
 * @category Component
 */
export class Carousel {
    /**
     * @description Creates a new Carousel bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the carousel element.
     * @param {object} [opt_options] - Configuration options.
     */
    constructor(dom, opt_selector = '.carousel', opt_options = {}) {
        this.carouselKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @description Merges user options with defaults.
     * @param {object} [opt_options] - Configuration overrides.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({});
        this.options.merge(opt_options);
    }
    /**
     * @description Placeholder initialization (no-op in stub).
     */
    _init() {
        // this._initStructure();
    }
}
