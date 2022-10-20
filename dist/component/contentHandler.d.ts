import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ContentHandler {
    containerKnot: Knot;
    options: Objekt;
    contentKnot: Knot;
    /**
     * @param {!Knot} containerKnot
     * @param {!Object=} opt_options
     */
    constructor(containerKnot: Knot, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
}
