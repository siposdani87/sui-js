import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';

export class Year {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];

    constructor(date: Date, currentDate: Date, options: Object) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }

    private _setOptions(options: Object): void {
        this.options = new Objekt(options);
    }

    private _init(): void {
        const current =
            DateIO.format(this.date, 'YYYY') ===
            DateIO.format(this.currentDate, 'YYYY')
                ? 'current'
                : null;
        const now =
            DateIO.format(this.date, 'YYYY') ===
            DateIO.format(new Date(), 'YYYY')
                ? 'now'
                : null;
        this.cssClasses = ['year', this.options.css_class, now, current];
    }

    getKnot(): Knot {
        const knot = new Knot('span');
        knot.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'YYYY');
        knot.setHtml(text);
        knot.addEventListener('click', () => {
            this.eventClick(this.date);
        });

        return knot;
    }

    eventClick(date: Date) {
        consoleDebug('Year.eventClick()', date);
    }
}
