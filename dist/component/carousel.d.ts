import { Knot } from '../core';
import { Objekt } from '../core/objekt';
export declare class Carousel {
    carouselKnot: Knot;
    options: Objekt;
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
}
