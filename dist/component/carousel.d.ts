import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Carousel {
    carouselNode: any;
    options: Objekt;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: any, opt_selector?: string, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
}
