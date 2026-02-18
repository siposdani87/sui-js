import { format, each } from '../utils/operation';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { mdl } from '../utils/render';

/**
 * @description Internal page descriptor representing a single pager button.
 */
type Page = {
    text: string;
    page: number;
};

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
export class Pager {
    pager: Knot;
    pagerStatistics: Knot;
    options!: Objekt;
    count!: number;
    pageNum!: number;
    page!: number;
    offset!: number;

    /**
     * @description Creates a new Pager instance bound to pager and statistics elements within the given DOM.
     * @param {Knot} dom - The parent DOM element containing pager selectors.
     * @param {string[]} [opt_selectors] - CSS selectors for the pager and statistics elements.
     * @param {object} [opt_options] - Configuration options (row_count, pager_num).
     */
    constructor(
        dom: Knot,
        opt_selectors: string[] | undefined = ['.pager', '.pager-statistics'],
        opt_options: object | undefined = {},
    ) {
        this.pager = new Query(opt_selectors[0], dom).getKnot();
        this.pagerStatistics = new Query(opt_selectors[1], dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * @description Merges user options with defaults (row_count, pager_num).
     * @param {object} [opt_options] - Configuration overrides.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            row_count: 10,
            pager_num: 4,
        });
        this.options.merge(opt_options);
    }

    /**
     * @description Initializes count and sets the page to 1.
     */
    private _init(): void {
        this.count = this.options.row_count;
        this.setPage(1);
    }

    /**
     * @description Rebuilds the pager DOM: clears existing buttons, calculates page count, and renders navigation.
     */
    private _drawPager(): void {
        this.pager.removeChildren();
        this.pageNum = Math.ceil(this.count / this.options.row_count);
        this._drawPreviousButton();
        this._drawPageNumbers();
        this._drawNextButton();
    }

    /**
     * @description Renders the "from-to / total" statistics text.
     */
    private _drawStatistics(): void {
        const page = this.page - 1;
        const from = page * this.options.row_count + 1;
        let to = page * this.options.row_count + this.options.row_count;
        to = to > this.count ? this.count : to;
        if (to > 0) {
            this.pagerStatistics.setHtml(
                format('{0}‒{1} / {2}', [from, to, this.count]),
            );
        } else {
            this.pagerStatistics.setHtml('');
        }
    }

    /**
     * @description Renders the previous-page chevron button when there are multiple pages.
     */
    private _drawPreviousButton(): void {
        if (this.pageNum > 1) {
            const previousButton = new Knot<HTMLButtonElement>('button');
            previousButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            previousButton.addEventListener('click', () => {
                this._previous();
            });
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('chevron_left');
            previousButton.appendChild(iconKnot);
            mdl(previousButton);
            this.pager.appendChild(previousButton);
        }
    }

    /**
     * @description Renders the next-page chevron button when there are multiple pages.
     */
    private _drawNextButton(): void {
        if (this.pageNum > 1) {
            const nextButton = new Knot<HTMLButtonElement>('button');
            nextButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            nextButton.addEventListener('click', () => {
                this._next();
            });
            const iconKnot = new Knot('em');
            iconKnot.addClass('material-icons');
            iconKnot.setHtml('chevron_right');
            nextButton.appendChild(iconKnot);
            mdl(nextButton);
            this.pager.appendChild(nextButton);
        }
    }

    /**
     * @description Renders numbered page buttons with ellipsis for overflow ranges.
     */
    private _drawPageNumbers(): void {
        const pagers = this._getPagers();
        if (pagers.length > 1) {
            each(pagers, (pager) => {
                const pageKnot = new Knot<HTMLButtonElement>('button');
                pageKnot.setData('page', pager.page);
                pageKnot.setHtml(pager.text);
                pageKnot.addClass([
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                ]);
                if (this.page === pager.page) {
                    pageKnot.addClass('mdl-button--accent');
                }
                pageKnot.addEventListener('click', (knot) => {
                    const page = knot.getData('page');
                    this._go(page);
                });
                mdl(pageKnot);
                this.pager.appendChild(pageKnot);
            });
        }
    }

    /**
     * @description Computes the visible page descriptors for the current page window.
     * @returns {Page[]} Array of page descriptors with text and page number.
     */
    private _getPagers(): Page[] {
        const part = Math.floor((this.page - 1) / this.options.pager_num);
        const pagers = [];
        if (part > 0) {
            pagers.push({
                text: '...',
                page: part * this.options.pager_num,
            });
        }
        for (let i = 1; i <= this.options.pager_num; i++) {
            const page = part * this.options.pager_num + i;
            if (page <= this.pageNum) {
                pagers.push({
                    text: page.toString(),
                    page: page,
                });
            }
        }
        if (
            this.pageNum > this.options.pager_num &&
            part !== Math.floor((this.pageNum - 1) / this.options.pager_num)
        ) {
            pagers.push({
                text: '...',
                page:
                    part * this.options.pager_num + this.options.pager_num + 1,
            });
        }
        return pagers;
    }

    /**
     * @description Advances to the next page, wrapping to page 1 after the last page.
     */
    private _next(): void {
        let page = this.page + 1;
        if (page > this.pageNum) {
            page = 1;
        }
        this._go(page);
    }

    /**
     * @description Goes to the previous page, wrapping to the last page from page 1.
     */
    private _previous(): void {
        let page = this.page - 1;
        if (page < 1) {
            page = this.pageNum;
        }
        this._go(page);
    }

    /**
     * @description Sets the total number of items for pagination calculation.
     * @param {number} count - Total item count.
     *
     * @example
     * pager.setCount(200);
     * pager.draw();
     */
    setCount(count: number): void {
        this.count = count;
    }

    /**
     * @description Navigates to the given page and fires the eventAction callback.
     * @param {number} page - Target page number.
     */
    private _go(page: number): void {
        this.setPage(page);
        this.eventAction(this.page);
    }

    /**
     * @description Sets the current page number and recalculates the row offset.
     * @param {number} page - The page number to set.
     *
     * @example
     * pager.setPage(3);
     */
    setPage(page: number): void {
        this.page = page;
        this.offset = (this.page - 1) * this.options.row_count;
    }

    /**
     * @description Renders the pager statistics and page navigation buttons.
     *
     * @example
     * pager.setCount(totalItems);
     * pager.draw();
     */
    draw(): void {
        this._drawStatistics();
        this._drawPager();
    }

    /**
     * @description Called when a page navigation action occurs. Override to handle page changes.
     * @param {number} page - The newly selected page number.
     *
     * @example
     * pager.eventAction = (page) => {
     *     fetchData({ offset: (page - 1) * rowCount });
     * };
     */
    eventAction(page: number): void {
        consoleDebug('Pager.eventAction()', page);
    }
}
