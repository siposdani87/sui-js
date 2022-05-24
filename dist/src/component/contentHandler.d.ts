import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ContentHandler {
    containerNode: Item;
    options: Objekt;
    contentNode: Item;
    /**
     * @param {!Item} containerNode
     * @param {!Object=} opt_options
     */
    constructor(containerNode: Item, opt_options?: Object | undefined);
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
