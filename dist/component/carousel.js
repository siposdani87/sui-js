import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Carousel {
    constructor(dom, opt_selector = '.carousel', opt_options = {}) {
        this.carouselKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({});
        this.options.merge(opt_options);
    }
    _init() {
        // this._initStructure();
    }
}
