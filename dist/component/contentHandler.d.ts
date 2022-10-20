import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ContentHandler {
    containerNode: Knot;
    options: Objekt;
    contentNode: Knot;
    /**
     * @param {!Knot} containerNode
     * @param {!Object=} opt_options
     */
    constructor(containerNode: Knot, opt_options?: Object | undefined);
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
