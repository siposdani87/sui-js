import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

/**
 * @class
 */
export class Carousel {
    carouselNode: any;
    options: Objekt;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.carousel', opt_options = {}) {
        this.carouselNode = new Query(opt_selector, dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        const _self = this;
        _self.options = new Objekt({});
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        // this._initStructure();
    }
}
