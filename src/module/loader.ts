import { eq } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Knot } from '../core';

export class Loader {
    options!: Objekt;
    loader!: Knot;
    spinner!: Knot;

    constructor(opt_options: object | undefined = {}) {
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            counter: 0,
        });
        this.options.merge(opt_options);
    }

    private _init(): void {
        this.loader = new Query('#loader').getKnot();

        this.spinner = this.loader.createElement('div');
        this.spinner.addClass([
            'mdl-spinner',
            'mdl-spinner--single-color',
            'mdl-js-spinner',
        ]);

        this.loader.appendChild(this.spinner);
    }

    show(): void {
        this.options.counter++;
        this.loader.removeClass('hidden');
        this.spinner.addClass('is-active');
    }

    hide(opt_force?: boolean | undefined): void {
        this.options.counter--;
        if (opt_force || eq(this.options.counter, 0)) {
            this.options.counter = 0;
            this.loader.addClass('hidden');
            this.spinner.removeClass('is-active');
        }
    }
}
