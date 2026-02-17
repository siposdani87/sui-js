import { Knot } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @description Placeholder carousel component (stub). Reserved for future image/content
 * carousel implementation.
 *
 * @category Component
 */
export declare class Carousel {
    carouselKnot: Knot;
    options: Objekt;
    /**
     * @description Creates a new Carousel bound to a DOM container.
     * @param {Knot} dom - The parent DOM element.
     * @param {string} [opt_selector] - CSS selector for the carousel element.
     * @param {object} [opt_options] - Configuration options.
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: object | undefined);
    /**
     * @description Merges user options with defaults.
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions;
    /**
     * @description Placeholder initialization (no-op in stub).
     */
    private _init;
}
