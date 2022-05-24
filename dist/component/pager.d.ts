import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class Pager {
    pager: Item;
    pagerStatistics: Item;
    options: Objekt;
    count: number;
    pageNum: number;
    page: number;
    offset: number;
    /**
     * @param {!Item} dom
     * @param {!Array=} opt_selectors
     * @param {!Object=} opt_options
     */
    constructor(dom: Item, opt_selectors?: string[] | undefined, opt_options?: Object | undefined);
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
    private _drawPager;
    /**
     * @private
     * @return {undefined}
     */
    private _drawStatistics;
    /**
     * @private
     * @return {undefined}
     */
    private _drawPreviousButton;
    /**
     * @private
     * @return {undefined}
     */
    private _drawNextButton;
    /**
     * @private
     * @return {undefined}
     */
    private _drawPageNumbers;
    /**
     * @private
     * @return {!Array<Page>}
     */
    private _getPagers;
    /**
     * @private
     * @return {undefined}
     */
    private _next;
    /**
     * @private
     * @return {undefined}
     */
    private _previous;
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: number): void;
    /**
     * @private
     * @param {number} page
     * @return {undefined}
     */
    private _go;
    /**
     * @param {number} page
     * @return {undefined}
     */
    setPage(page: number): void;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @param {number} page
     * @return {undefined}
     */
    eventAction(page: number): void;
}
