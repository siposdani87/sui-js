import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';

export class Month {
    date: Date;
    currentDate: Date;
    options!: Objekt;
    cssClasses!: string[];

    constructor(date: Date, currentDate: Date, options: object) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }

    private _setOptions(options: object): void {
        this.options = new Objekt(options);
    }

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

    getKnot(): Knot {
        const knot = new Knot('span');
        knot.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'MMM');
        knot.setHtml(text);
        knot.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return knot;
    }

    eventClick(date: Date) {
        consoleDebug('Month.eventClick()', date);
    }
}
