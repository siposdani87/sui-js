import { Item } from '../core';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Carousel {
    carouselNode: Item;
    options: Objekt;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector?: string | undefined, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: Object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
}
