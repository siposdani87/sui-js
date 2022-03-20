import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Month {
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
    private _setOptions(options: Object): void {
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        const current =
            this.date['format']('YYYY-MM') ===
            this.currentDate['format']('YYYY-MM')
                ? 'current'
                : null;
        const now =
            this.date['format']('YYYY-MM') ===
            window['moment']()['format']('YYYY-MM')
                ? 'now'
                : null;
        this.cssClasses = ['month', this.options.css_class, now, current];
    }
    /**
     * @return {!Item}
     */
    getNode(): Item {
        const node = new Item('span');
        node.addClass(this.cssClasses);
        const i = this.date['month']();
        const text = window['moment']['monthsShort'](i);
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
        consoleWarn('Month.eventClick()', date);
    }
}
