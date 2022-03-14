import { Objekt } from '../core';
import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Year {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: string[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date: string, currentDate: Object, options: Object) {
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
    _setOptions(options: Object): void {
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        const current =
            this.date['format']('YYYY') === this.currentDate['format']('YYYY')
                ? 'current'
                : null;
        const now =
            this.date['format']('YYYY') === window['moment']()['format']('YYYY')
                ? 'now'
                : null;
        this.cssClasses = ['year', this.options.css_class, now, current];
    }
    /**
     * @return {!Item}
     */
    getNode(): Item {
        const node = new Item('span');
        node.addClass(this.cssClasses);
        const text = this.date['format']('YYYY');
        node.setHtml(text);
        node.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return node;
    }
    /**
     * @param {!Object} date
     */
    eventClick(date: Object) {
        consoleWarn('Year.eventClick()', date);
    }
}
