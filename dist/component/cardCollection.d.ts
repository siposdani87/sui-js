import { Collection } from '../core/collection';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { ContentHandler } from './contentHandler';
import { Pager } from './pager';
/**
 * @class
 */
export declare class CardCollection {
    cardCollectionKnot: Knot;
    ctrl: any;
    options: Objekt;
    collection: Collection<Objekt>;
    query: string;
    pager: Pager;
    contentHandler: ContentHandler;
    body: Knot;
    cardFooterKnot: Knot;
    pagerKnot: Knot;
    cardTemplate: Knot<HTMLTemplateElement>;
    template: string;
    /**
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {?Object=} opt_ctrl
     * @param {!Object=} opt_options
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_ctrl?: (object | null) | undefined, opt_options?: Object | undefined);
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
     * @private
     * @return {undefined}
     */
    private _initContentHandler;
    /**
     * @private
     * @return {undefined}
     */
    private _initStructure;
    /**
     * @private
     * @return {undefined}
     */
    private _initTemplate;
    /**
     * @private
     * @param {!Objekt} item
     * @return {!Knot}
     */
    private _getCardKnot;
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
     * @param {!Knot} cardKnot
     * @param {!Objekt} item
     * @return {undefined}
     */
    eventCardKnot(cardKnot: Knot, item: Objekt): void;
    /**
     * @private
     * @param {!Objekt} item
     * @return {undefined}
     */
    private _addCard;
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
    private _getItems;
    /**
     * @private
     * @return {undefined}
     */
    private _draw;
    /**
     * @return {undefined}
     */
    render(): void;
}
