import { format, each } from '../utils/operation';
import { Knot } from '../core/knot';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';
import { mdl } from '../utils/render';

type Page = {
    text: string;
    page: number;
};

/**
 * @class
 */
export class Pager {
    pager: Knot;
    pagerStatistics: Knot;
    options: Objekt;
    count: number;
    pageNum: number;
    page: number;
    offset: number;
    /**
     * @param {!Knot} dom
     * @param {!Array=} opt_selectors
     * @param {!Object=} opt_options
     */
    constructor(
        dom: Knot,
        opt_selectors: string[] | undefined = ['.pager', '.pager-statistics'],
        opt_options: Object | undefined = {},
    ) {
        this.pager = new Query(opt_selectors[0], dom).getKnot();
        this.pagerStatistics = new Query(opt_selectors[1], dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
            row_count: 10,
            pager_num: 4,
        });
        _self.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.count = this.options.row_count;
        this.setPage(1);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _drawPager(): void {
        this.pager.removeChildren();
        this.pageNum = Math.ceil(this.count / this.options.row_count);
        this._drawPreviousButton();
        this._drawPageNumbers();
        this._drawNextButton();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _drawPreviousButton(): void {
        if (this.pageNum > 1) {
            const previousButton = new Knot('button');
            previousButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            previousButton.addEventListener('click', () => {
                this._previous();
            });
            const iconNode = new Knot('em');
            iconNode.addClass('material-icons');
            iconNode.setHtml('chevron_left');
            previousButton.appendChild(iconNode);
            mdl(previousButton);
            this.pager.appendChild(previousButton);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _drawNextButton(): void {
        if (this.pageNum > 1) {
            const nextButton = new Knot('button');
            nextButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            nextButton.addEventListener('click', () => {
                this._next();
            });
            const iconNode = new Knot('em');
            iconNode.addClass('material-icons');
            iconNode.setHtml('chevron_right');
            nextButton.appendChild(iconNode);
            mdl(nextButton);
            this.pager.appendChild(nextButton);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _drawPageNumbers(): void {
        const pagers = this._getPagers();
        if (pagers.length > 1) {
            each(pagers, (pager) => {
                const pageNode = new Knot('button');
                pageNode.setData('page', pager.page);
                pageNode.setHtml(pager.text);
                pageNode.addClass([
                    'mdl-button',
                    'mdl-js-button',
                    'mdl-js-ripple-effect',
                ]);
                if (this.page === pager.page) {
                    pageNode.addClass('mdl-button--accent');
                }
                pageNode.addEventListener('click', (node) => {
                    const page = node.getData('page');
                    this._go(page);
                });
                mdl(pageNode);
                this.pager.appendChild(pageNode);
            });
        }
    }
    /**
     * @private
     * @return {!Array<Page>}
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
                    text: page,
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
     * @private
     * @return {undefined}
     */
    private _next(): void {
        let page = this.page + 1;
        if (page > this.pageNum) {
            page = 1;
        }
        this._go(page);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _previous(): void {
        let page = this.page - 1;
        if (page < 1) {
            page = this.pageNum;
        }
        this._go(page);
    }
    /**
     * @param {number} count
     * @return {undefined}
     */
    setCount(count: number): void {
        this.count = count;
    }
    /**
     * @private
     * @param {number} page
     * @return {undefined}
     */
    private _go(page: number): void {
        this.setPage(page);
        this.eventAction(this.page);
    }
    /**
     * @param {number} page
     * @return {undefined}
     */
    setPage(page: number): void {
        this.page = page;
        this.offset = (this.page - 1) * this.options.row_count;
    }
    /**
     * @return {undefined}
     */
    draw(): void {
        this._drawStatistics();
        this._drawPager();
    }
    /**
     * @param {number} page
     * @return {undefined}
     */
    eventAction(page: number): void {
        consoleWarn('Pager.eventAction()', page);
    }
}
