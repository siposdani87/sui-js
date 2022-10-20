import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Year {
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
        const current = DateIO.format(this.date, 'YYYY') ===
            DateIO.format(this.currentDate, 'YYYY')
            ? 'current'
            : null;
        const now = DateIO.format(this.date, 'YYYY') ===
            DateIO.format(new Date(), 'YYYY')
            ? 'now'
            : null;
        this.cssClasses = ['year', this.options.css_class, now, current];
    }
    /**
     * @return {!Knot}
     */
    getNode() {
        const node = new Knot('span');
        node.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'YYYY');
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
        consoleWarn('Year.eventClick()', date);
    }
}
