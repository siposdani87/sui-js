import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class Carousel {
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.carousel', opt_options = {}) {
        this.carouselKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({});
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        // this._initStructure();
    }
}
