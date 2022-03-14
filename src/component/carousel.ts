import { Item } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class Carousel {
    carouselNode: Item;
    options: Objekt;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector: string | undefined = '.carousel', opt_options: Object | undefined = {}) {
        this.carouselNode = new Query(opt_selector, dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({});
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        // this._initStructure();
    }
}
