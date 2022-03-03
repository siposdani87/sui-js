import { format, mdl, each } from '../utils/operation';
import { Item } from '../core/item';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Pager {
    pager;
    pagerStatistics;
    options;
    count;
    pageNum;
    page;
    offset;
    /**
     * @param {!Item} dom
     * @param {!Array=} opt_selectors
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selectors = ['.pager', '.pager-statistics'], opt_options = {}) {
        this.pager = new Query(opt_selectors[0], dom).getItem();
        this.pagerStatistics = new Query(opt_selectors[1], dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
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
    _init() {
        this.count = this.options.row_count;
        this.setPage(1);
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawPager() {
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
    _drawStatistics() {
        const page = this.page - 1;
        const from = page * this.options.row_count + 1;
        let to = page * this.options.row_count + this.options.row_count;
        to = to > this.count ? this.count : to;
        if (to > 0) {
            this.pagerStatistics.setHtml(format('{0}‒{1} / {2}', [from, to, this.count]));
        }
        else {
            this.pagerStatistics.setHtml('');
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawPreviousButton() {
        if (this.pageNum > 1) {
            const previousButton = new Item('button');
            previousButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            previousButton.addEventListener('click', () => {
                this._previous();
            });
            const iconNode = new Item('em');
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
    _drawNextButton() {
        if (this.pageNum > 1) {
            const nextButton = new Item('button');
            nextButton.addClass([
                'mdl-button',
                'mdl-js-button',
                'mdl-js-ripple-effect',
            ]);
            nextButton.addEventListener('click', () => {
                this._next();
            });
            const iconNode = new Item('em');
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
    _drawPageNumbers() {
        const pagers = this._getPagers();
        if (pagers.length > 1) {
            each(pagers, (pager) => {
                const pageNode = new Item('button');
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
     * @return {!Array}
     */
    _getPagers() {
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
        if (this.pageNum > this.options.pager_num &&
            part !== Math.floor((this.pageNum - 1) / this.options.pager_num)) {
            pagers.push({
                text: '...',
                page: part * this.options.pager_num + this.options.pager_num + 1,
            });
        }
        return pagers;
    }
    /**
     * @private
     * @return {undefined}
     */
    _next() {
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
    _previous() {
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
    setCount(count) {
        this.count = count;
    }
    /**
     * @private
     * @param {number} page
     * @return {undefined}
     */
    _go(page) {
        this.setPage(page);
        this.eventAction(this.page);
    }
    /**
     * @param {number} page
     * @return {undefined}
     */
    setPage(page) {
        this.page = page;
        this.offset = (this.page - 1) * this.options.row_count;
    }
    /**
     * @return {undefined}
     */
    draw() {
        this._drawStatistics();
        this._drawPager();
    }
    /**
     * @param {number} page
     * @return {undefined}
     */
    eventAction(page) {
        consoleWarn('Pager.eventAction()', page);
    }
}
