import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
declare type Page = {
    text: string;
    page: number;
};
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
    constructor(dom: Item, opt_selectors?: Array<any> | undefined, opt_options?: Object | undefined);
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
    _drawPager(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawStatistics(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawPreviousButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawNextButton(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawPageNumbers(): void;
    /**
     * @private
     * @return {!Array<Page>}
     */
    _getPagers(): Page[];
    /**
     * @private
     * @return {undefined}
     */
    _next(): void;
    /**
     * @private
     * @return {undefined}
     */
    _previous(): void;
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
    _go(page: number): void;
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
export {};
