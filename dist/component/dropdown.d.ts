import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Dropdown {
    dropdown: any;
    options: Objekt;
    collection: Collection;
    actions: any[];
    item: any;
    buttonNode: Item;
    menuNode: Item;
    /**
     * @param {!Item} element
     * @param {!Object=} opt_options
     */
    constructor(element: any, opt_options?: {});
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
     * @private
     * @return {undefined}
     */
    _appendButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _appendMenu(): void;
    /**
     * @param {!Array} actions
     * @param {!Object} item
     * @return {undefined}
     */
    setActions(actions: any, item: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _renderMenu(): void;
}
