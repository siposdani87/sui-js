import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
/**
 * @description Represents a single year cell in the {@link Calendar}'s year-selection mode, with CSS classes for current and now states.
 * @example
 * const year = new Year(new Date(), selectedDate, {});
 * const knot = year.getKnot();
 * @see {@link Calendar}
 * @see {@link DateIO}
 * @category Component
 */
export class Year {
    /**
     * @description Creates a new Year instance.
     * @param {Date} date - The date representing this year.
     * @param {Date} currentDate - The currently selected date, used for highlight comparison.
     * @param {object} options - Configuration options including optional `css_class`.
     * @example
     * const year = new Year(new Date(2024, 0, 1), selectedDate, {});
     */
    constructor(date, currentDate, options) {
        this.date = date;
        this.currentDate = currentDate;
        this._setOptions(options);
        this._init();
    }
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    /**
     * @description Computes CSS classes for 'current' and 'now' states based on year comparison.
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
     * @description Creates and returns a styled {@link Knot} element representing this year cell with a click handler.
     * @returns {Knot} The year cell DOM element wrapper.
     * @example
     * const yearKnot = year.getKnot();
     * container.appendChild(yearKnot);
     */
    getKnot() {
        const knot = new Knot('span');
        knot.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'YYYY');
        knot.setHtml(text);
        knot.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return knot;
    }
    /**
     * @description Overridable callback fired when this year cell is clicked. Defaults to a debug log.
     * @param {Date} date - The date of the clicked year.
     * @example
     * year.eventClick = (date) => { console.log('Clicked:', date); };
     */
    eventClick(date) {
        consoleDebug('Year.eventClick()', date);
    }
}
