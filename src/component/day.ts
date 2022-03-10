import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Day {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: any[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date, currentDate, options) {
        this.date = window['moment'](date, 'YYYY-MM-DD');
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
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        const current = window['moment'](this.date)['isSame'](
            this.currentDate['format']('YYYY-MM-DD'),
        )
            ? 'current'
            : null;
        const now = window['moment'](this.date)['isSame'](
            window['moment']()['format']('YYYY-MM-DD'),
        )
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
        const text = this.date['format']('DD');
        node.setHtml(text);
        node.addEventListener('click', () => {
            this.eventClick(this.date);
        });

        return node;
    }
    /**
     * @param {!Object} date
     */
    eventClick(date) {
        consoleWarn('Day.eventClick()', date);
    }
}
