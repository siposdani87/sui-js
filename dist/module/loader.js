import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
export class Loader {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            counter: 0,
        });
        this.options.merge(opt_options);
    }
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
    show() {
        this.options.counter++;
        this.loader.removeClass('hidden');
        this.spinner.addClass('is-active');
    }
    hide(opt_force) {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.loader.addClass('hidden');
            this.spinner.removeClass('is-active');
        }
    }
}
