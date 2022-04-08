import { Objekt } from '../core';
import { Item } from '../core/item';
import { DateIO } from '../utils';
import { consoleWarn } from '../utils/log';

/**
 * @class
 */
export class Month {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    /**
     * @param {!Date} date
     * @param {!Date} currentDate
     * @param {!Object} options
     */
    constructor(date: Date, currentDate: Date, options: Object) {
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
    private _setOptions(options: Object): void {
        this.options = new Objekt(options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        const current =
            DateIO.format(this.date, 'YYYY-MM') ===
            DateIO.format(this.currentDate, 'YYYY-MM')
                ? 'current'
                : null;
        const now =
            DateIO.format(this.date, 'YYYY-MM') ===
            DateIO.format(new Date(), 'YYYY-MM')
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
        const text = DateIO.format(this.date, 'MMM');
        node.setHtml(text);
        node.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return node;
    }
    /**
     * @param {!Date} date
     */
    eventClick(date: Date) {
        consoleWarn('Month.eventClick()', date);
    }
}
