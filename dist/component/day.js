import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
/**
 * @description Represents a single day cell in the {@link Calendar} grid, with CSS classes for current, now, and month context.
 * @example
 * const day = new Day(new Date(), selectedDate, { css_class: 'current-month' });
 * const knot = day.getKnot();
 * @see {@link Calendar}
 * @see {@link DateIO}
 * @category Component
 */
export class Day {
    /**
     * @description Creates a new Day instance.
     * @param {Date} date - The date this cell represents.
     * @param {Date} currentDate - The currently selected date, used for highlight comparison.
     * @param {object} options - Configuration options including `css_class`.
     * @example
     * const day = new Day(new Date(2024, 0, 15), selectedDate, { css_class: 'current-month' });
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
     * @description Computes CSS classes for 'current' and 'now' states based on date comparisons.
     */
    _init() {
        const current = DateIO.format(this.date, 'YYYY-MM-DD') ===
            DateIO.format(this.currentDate, 'YYYY-MM-DD')
            ? 'current'
            : null;
        const now = DateIO.format(this.date, 'YYYY-MM-DD') ===
            DateIO.format(new Date(), 'YYYY-MM-DD')
            ? 'now'
            : null;
        this.cssClasses = ['day', this.options.css_class, now, current];
    }
    /**
     * @description Creates and returns a styled {@link Knot} element representing this day cell with a click handler.
     * @returns {Knot} The day cell DOM element wrapper.
     * @example
     * const dayKnot = day.getKnot();
     * container.appendChild(dayKnot);
     */
    getKnot() {
        const knot = new Knot('span');
        knot.addClass(this.cssClasses);
        const text = DateIO.format(this.date, 'DD');
        knot.setHtml(text);
        knot.addEventListener('click', () => {
            this.eventClick(this.date);
        });
        return knot;
    }
    /**
     * @description Overridable callback fired when this day cell is clicked. Defaults to a debug log.
     * @param {Date} date - The date of the clicked day.
     * @example
     * day.eventClick = (date) => { console.log('Clicked:', date); };
     */
    eventClick(date) {
        consoleDebug('Day.eventClick()', date);
    }
}
