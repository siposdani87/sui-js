import { Collection } from '../core/collection';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
/**
 * @class
 */
export declare class CardCollection {
    cardCollectionNode: any;
    ctrl: any;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    pager: Pager;
    contentHandler: ContentHandler;
    body: Item;
    cardFooterNode: Item;
    pagerNode: Item;
    cardTemplate: any;
    template: any;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {?Object=} opt_ctrl
     * @param {!Object=} opt_options
     */
    constructor(dom: any, opt_selector?: string, opt_ctrl?: any, opt_options?: {});
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
    _getCardNode(item: any): Item<any>;
    /**
     * @param {number=} opt_page
     * @return {undefined}
     */
    refresh(opt_page?: number): void;
    /**
     * @param {!Objekt} params
     * @return {undefined}
     */
    eventAction(params: any): void;
    /**
     * @param {!Item} cardNode
     * @param {!Objekt} item
     * @return {undefined}
     */
    eventCardNode(cardNode: any, item: any): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    _addCard(item: any): void;
    /**
     * @param {!Array} items
     * @return {undefined}
     */
    setData(items: any): void;
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: any): void;
    /**
     * @private
     * @return {!Array}
     */
    _getItems(): Objekt[];
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
