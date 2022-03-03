import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class ContentHandler {
    containerNode: any;
    options: Objekt;
    contentNode: Item;
    /**
     * @param {!Item} containerNode
     * @param {!Object=} opt_options
     */
    constructor(containerNode: any, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @return {undefined}
     */
    show(): void;
    /**
     * @return {undefined}
     */
    hide(): void;
}
