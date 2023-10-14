import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
export declare class ContentHandler {
    containerKnot: Knot;
    options: Objekt;
    contentKnot: Knot;
    constructor(containerKnot: Knot, opt_options?: Object | undefined);
    private _setOptions;
    private _init;
    show(): void;
    hide(): void;
}
