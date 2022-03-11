import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
/**
 * @class
 */
export declare class CardCollection {
    cardCollectionNode: Item;
    ctrl: any;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    pager: Pager;
    contentHandler: ContentHandler;
    body: Item;
    cardFooterNode: Item;
    pagerNode: Item;
    cardTemplate: Item<HTMLTemplateElement>;
    template: string;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {?Object=} opt_ctrl
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selector?: string | undefined, opt_ctrl?: (object | null) | undefined, opt_options?: object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: object | undefined): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initContentHandler(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStructure(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initTemplate(): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {!Item}
     */
    _getCardNode(item: Objekt): Item;
    /**
     * @param {number=} opt_page
     * @return {undefined}
     */
    refresh(opt_page?: number | undefined): void;
    /**
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params: Objekt): void;
    /**
     * @param {!Item} cardNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    eventCardNode(cardNode: Item, item: Objekt): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _addCard(item: Objekt): void;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    setData(items: Array<any>): void;
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: number): void;
    /**
     * @private
     * @return {!Array}
     */
    _getItems(): Array<any>;
    /**
     * @private
     * @return {undefined}
     */
    _draw(): void;
    /**
     * @return {undefined}
     */
    render(): void;
}
