import { Objekt } from '../core';
import { Item } from '../core/item';
import { DateIO } from '../utils';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Day {
    /**
     * @param {!Date} date
     * @param {!Date} currentDate
     * @param {!Object} options
     */
    constructor(date, currentDate, options) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        const current = DateIO.format(this.date, 'YYYY-MM-DD') ===
            DateIO.format(this.currentDate, 'YYYY-MM-DD')
            ? 'current'
            : null;
        const now = DateIO.format(this.date, 'YYYY-MM-DD') ===
            DateIO.format(new Date(), 'YYYY-MM-DD')
            ? 'now'
            : null;
        this.cssClasses = ['day', this.options.css_class, now, current];
    }
    /**
     * @return {!Item}
     */
    getNode() {
        const node = new Item('span');
        node.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'DD');
        node.setHtml(text);
        node.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return node;
    }
    /**
     * @param {!Date} date
     */
    eventClick(date) {
        consoleWarn('Day.eventClick()', date);
    }
}
