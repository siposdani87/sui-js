import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
export class Month {
    constructor(date, currentDate, options) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    _init() {
        const current = DateIO.format(this.date, 'YYYY-MM') ===
            DateIO.format(this.currentDate, 'YYYY-MM')
            ? 'current'
            : null;
        const now = DateIO.format(this.date, 'YYYY-MM') ===
            DateIO.format(new Date(), 'YYYY-MM')
            ? 'now'
            : null;
        this.cssClasses = ['month', this.options.css_class, now, current];
    }
    getKnot() {
        const knot = new Knot('span');
        knot.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'MMM');
        knot.setHtml(text);
        knot.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return knot;
    }
    eventClick(date) {
        consoleDebug('Month.eventClick()', date);
    }
}
