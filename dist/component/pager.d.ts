import { Objekt } from '../core/objekt';
declare type Page = {
    text: string;
    page: number;
};
/**
 * @class
 */
export declare class Pager {
    pager: any;
    pagerStatistics: any;
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
    constructor(dom: any, opt_selectors?: string[], opt_options?: {});
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
    setCount(count: any): void;
    /**
     * @private
     * @param {number} page
     * @return {undefined}
     */
    _go(page: any): void;
    /**
     * @param {number} page
     * @return {undefined}
     */
    setPage(page: any): void;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @param {number} page
     * @return {undefined}
     */
    eventAction(page: any): void;
}
export {};
