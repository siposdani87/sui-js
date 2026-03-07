import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { Emitter } from '../core/emitter';
/**
 * @description Represents a single day cell in the {@link Calendar} grid, with CSS classes for current, now, and month context.
 * @example
 * const day = new Day(new Date(), selectedDate, { css_class: 'current-month' });
 * day.on('click', (date) => { console.log('Clicked:', date); });
 * const knot = day.getKnot();
 * @see {@link Calendar}
 * @see {@link DateIO}
 * @category Component
 */
export declare class Day extends Emitter {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    /**
     * @description Creates a new Day instance.
     * @param {Date} date - The date this cell represents.
     * @param {Date} currentDate - The currently selected date, used for highlight comparison.
     * @param {object} options - Configuration options including `css_class`.
     * @example
     * const day = new Day(new Date(2024, 0, 15), selectedDate, { css_class: 'current-month' });
     */
    constructor(date: Date, currentDate: Date, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Computes CSS classes for 'current' and 'now' states based on date comparisons.
     */
    private _init;
    /**
     * @description Creates and returns a styled {@link Knot} element representing this day cell with a click handler.
     * @returns {Knot} The day cell DOM element wrapper.
     * @example
     * const dayKnot = day.getKnot();
     * container.appendChild(dayKnot);
     */
    getKnot(): Knot;
}
