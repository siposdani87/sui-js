import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
/**
 * @class
 */
export class Loader {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
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
        _self.options = new Objekt({
            counter: 0,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.loader = new Query('#loader').getKnot();
        this.spinner = this.loader.createElement('div');
        this.spinner.addClass([
            'mdl-spinner',
            'mdl-spinner--single-color',
            'mdl-js-spinner',
        ]);
        this.loader.appendChild(this.spinner);
    }
    /**
     * @return {undefined}
     */
    show() {
        this.options.counter++;
        this.loader.removeClass('hidden');
        this.spinner.addClass('is-active');
    }
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force) {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.loader.addClass('hidden');
            this.spinner.removeClass('is-active');
        }
    }
}
