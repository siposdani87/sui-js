import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Action } from '../utils';
/**
 * @class
 */
export declare class Dropdown {
    dropdown: Item;
    options: Objekt;
    collection: Collection<Objekt>;
    actions: Action[];
    item: Object;
    buttonNode: Item;
    menuNode: Item;
    /**
     * @param {!Item} element
     * @param {!Object=} opt_options
     */
    constructor(element: Item, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: Object | undefined): void;
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
    setActions(actions: Array<any>, item: Object): void;
    /**
     * @private
     * @return {undefined}
     */
    _renderMenu(): void;
}
