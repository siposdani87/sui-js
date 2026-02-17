import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';

/**
 * @description Represents a single month cell in the {@link Calendar}'s month-selection mode, with CSS classes for current and now states.
 * @example
 * const month = new Month(new Date(), selectedDate, {});
 * const knot = month.getKnot();
 * @see {@link Calendar}
 * @see {@link DateIO}
 * @category Component
 */
export class Month {
    date: Date;
    currentDate: Date;
    options!: Objekt;
    cssClasses!: string[];

    /**
     * @description Creates a new Month instance.
     * @param {Date} date - The date representing this month.
     * @param {Date} currentDate - The currently selected date, used for highlight comparison.
     * @param {object} options - Configuration options including optional `css_class`.
     * @example
     * const month = new Month(new Date(2024, 5, 1), selectedDate, {});
     */
    constructor(date: Date, currentDate: Date, options: object) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }

    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions(options: object): void {
        this.options = new Objekt(options);
    }

    /**
     * @description Computes CSS classes for 'current' and 'now' states based on year-month comparison.
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
     * @description Creates and returns a styled {@link Knot} element representing this month cell with a click handler.
     * @returns {Knot} The month cell DOM element wrapper.
     * @example
     * const monthKnot = month.getKnot();
     * container.appendChild(monthKnot);
     */
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

    /**
     * @description Overridable callback fired when this month cell is clicked. Defaults to a debug log.
     * @param {Date} date - The date of the clicked month.
     * @example
     * month.eventClick = (date) => { console.log('Clicked:', date); };
     */
    eventClick(date: Date) {
        consoleDebug('Month.eventClick()', date);
    }
}
