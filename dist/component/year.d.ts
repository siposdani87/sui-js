import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @description Represents a single year cell in the {@link Calendar}'s year-selection mode, with CSS classes for current and now states.
 * @example
 * const year = new Year(new Date(), selectedDate, {});
 * const knot = year.getKnot();
 * @see {@link Calendar}
 * @see {@link DateIO}
 * @category Component
 */
export declare class Year {
    date: Date;
    currentDate: Date;
    options: Objekt;
    cssClasses: string[];
    /**
     * @description Creates a new Year instance.
     * @param {Date} date - The date representing this year.
     * @param {Date} currentDate - The currently selected date, used for highlight comparison.
     * @param {object} options - Configuration options including optional `css_class`.
     * @example
     * const year = new Year(new Date(2024, 0, 1), selectedDate, {});
     */
    constructor(date: Date, currentDate: Date, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Computes CSS classes for 'current' and 'now' states based on year comparison.
     */
    private _init;
    /**
     * @description Creates and returns a styled {@link Knot} element representing this year cell with a click handler.
     * @returns {Knot} The year cell DOM element wrapper.
     * @example
     * const yearKnot = year.getKnot();
     * container.appendChild(yearKnot);
     */
    getKnot(): Knot;
    /**
     * @description Overridable callback fired when this year cell is clicked. Defaults to a debug log.
     * @param {Date} date - The date of the clicked year.
     * @example
     * year.eventClick = (date) => { console.log('Clicked:', date); };
     */
    eventClick(date: Date): void;
}
