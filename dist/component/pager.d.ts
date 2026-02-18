import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
/**
 * @description Pagination control that renders page numbers, previous/next navigation buttons,
 * and statistics (e.g. "1-10 / 100").
 *
 * @example
 * const pager = new Pager(containerKnot, ['.pager', '.pager-statistics'], { row_count: 25 });
 * pager.eventAction = (page) => fetchData(page);
 * pager.setCount(100);
 * pager.draw();
 *
 * @see {@link Table} for table-based data display with built-in pagination
 * @see {@link CardCollection} for card-based data display with built-in pagination
 *
 * @category Component
 */
export declare class Pager {
    pager: Knot;
    pagerStatistics: Knot;
    options: Objekt;
    count: number;
    pageNum: number;
    page: number;
    offset: number;
    /**
     * @description Creates a new Pager instance bound to pager and statistics elements within the given DOM.
     * @param {Knot} dom - The parent DOM element containing pager selectors.
     * @param {string[]} [opt_selectors] - CSS selectors for the pager and statistics elements.
     * @param {object} [opt_options] - Configuration options (row_count, pager_num).
     */
    constructor(dom: Knot, opt_selectors?: string[] | undefined, opt_options?: object | undefined);
    /**
     * @description Merges user options with defaults (row_count, pager_num).
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions;
    /**
     * @description Initializes count and sets the page to 1.
     */
    private _init;
    /**
     * @description Rebuilds the pager DOM: clears existing buttons, calculates page count, and renders navigation.
     */
    private _drawPager;
    /**
     * @description Renders the "from-to / total" statistics text.
     */
    private _drawStatistics;
    /**
     * @description Renders the previous-page chevron button when there are multiple pages.
     */
    private _drawPreviousButton;
    /**
     * @description Renders the next-page chevron button when there are multiple pages.
     */
    private _drawNextButton;
    /**
     * @description Renders numbered page buttons with ellipsis for overflow ranges.
     */
    private _drawPageNumbers;
    /**
     * @description Computes the visible page descriptors for the current page window.
     * @returns {Page[]} Array of page descriptors with text and page number.
     */
    private _getPagers;
    /**
     * @description Advances to the next page, wrapping to page 1 after the last page.
     */
    private _next;
    /**
     * @description Goes to the previous page, wrapping to the last page from page 1.
     */
    private _previous;
    /**
     * @description Sets the total number of items for pagination calculation.
     * @param {number} count - Total item count.
     *
     * @example
     * pager.setCount(200);
     * pager.draw();
     */
    setCount(count: number): void;
    /**
     * @description Navigates to the given page and fires the eventAction callback.
     * @param {number} page - Target page number.
     */
    private _go;
    /**
     * @description Sets the current page number and recalculates the row offset.
     * @param {number} page - The page number to set.
     *
     * @example
     * pager.setPage(3);
     */
    setPage(page: number): void;
    /**
     * @description Renders the pager statistics and page navigation buttons.
     *
     * @example
     * pager.setCount(totalItems);
     * pager.draw();
     */
    draw(): void;
    /**
     * @description Called when a page navigation action occurs. Override to handle page changes.
     * @param {number} page - The newly selected page number.
     *
     * @example
     * pager.eventAction = (page) => {
     *     fetchData({ offset: (page - 1) * rowCount });
     * };
     */
    eventAction(page: number): void;
}
