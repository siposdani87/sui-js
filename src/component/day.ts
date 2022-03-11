import { Objekt } from '../core';
import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Day {
    date: any;
    currentDate: any;
    options: any;
    cssClasses: string[];
    /**
     * @param {string} date
     * @param {!Object} currentDate
     * @param {!Object} options
     */
    constructor(date: string, currentDate: object, options: object) {
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
    _setOptions(options: object): void {
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
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
    getNode(): Item {
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
    eventClick(date: object) {
        consoleWarn('Day.eventClick()', date);
    }
}
