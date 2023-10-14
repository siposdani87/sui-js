import { Knot } from '../core';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';

export class Carousel {
    carouselKnot: Knot;
    options: Objekt;

    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.carousel',
        opt_options: Object | undefined = {},
    ) {
        this.carouselKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    private _setOptions(opt_options: Object | undefined = {}): void {
        this.options = new Objekt({});
        this.options.merge(opt_options);
    }

    private _init(): void {
        // this._initStructure();
    }
}
