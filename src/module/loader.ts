import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Item } from '../core';

/**
 * @class
 */
export class Loader {
    options: Objekt;
    loader: Item;
    spinner: Item;
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options: Object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
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
    private _init(): void {
        this.loader = new Query('#loader').getItem();

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
    show(): void {
        this.options.counter++;
        this.loader.removeClass('hidden');
        this.spinner.addClass('is-active');
    }
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    hide(opt_force: boolean | undefined): void {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.loader.addClass('hidden');
            this.spinner.removeClass('is-active');
        }
    }
}
