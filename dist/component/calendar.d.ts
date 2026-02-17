import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { Day } from './day';
/**
 * @description Date picker calendar with day, month, and year selection modes, navigation, and date selection.
 * @example
 * const calendarKnot = new Knot('div');
 * const calendar = new Calendar(calendarKnot, { date: new Date(), type: 'date' });
 * calendar.eventClick = (date) => { console.log(date); };
 * calendar.draw();
 * @see {@link Day}
 * @see {@link Month}
 * @see {@link Year}
 * @see {@link DateIO}
 * @category Component
 */
export declare class Calendar {
    calendarKnot: Knot;
    options: Objekt;
    maxDays: number;
    maxMonths: number;
    maxYears: number;
    modes: string[];
    activeMode: string;
    types: {
        date: string;
        month: string;
        year: string;
        week: string;
        range: string;
    };
    headerKnot: Knot;
    currentModeKnot: Knot;
    contentKnot: Knot;
    yearsKnot: Knot;
    monthsKnot: Knot;
    weekDaysKnot: Knot;
    daysKnot: Knot;
    previous: {
        day: Date;
        month: Date;
        year: Date;
    };
    current: {
        day: Date;
    };
    next: {
        day: Date;
        month: Date;
        year: Date;
    };
    days: Day[];
    selectedDate: Date;
    /**
     * @description Creates a new Calendar instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `date` and `type` ('date', 'month', 'year', 'week', 'range').
     * @example
     * const calendar = new Calendar(new Knot('div'), { date: new Date(), type: 'date' });
     */
    constructor(knot: Knot, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes calendar constants, mode definitions, and DOM structure.
     */
    private _init;
    /**
     * @description Builds the full calendar DOM structure including header, content, and initial mode.
     */
    private _initStructure;
    /**
     * @description Creates the header knot with previous/next navigation buttons and the current mode label.
     */
    private _initHeaderKnot;
    /**
     * @description Creates the main content container knot for calendar cells.
     */
    private _initContentKnot;
    /**
     * @description Changes the active mode by the given direction offset.
     * @param {number} direction - Offset to move in the modes array (-1 for broader, +1 for narrower).
     */
    private _changeMode;
    /**
     * @description Resolves the target mode name by applying the direction offset to the current mode index.
     * @param {number} direction - Offset to move in the modes array.
     * @returns {string} The resolved mode name, falling back to the option type's default mode.
     */
    private _getMode;
    /**
     * @description Dispatches to the appropriate callback based on the active mode (DAY, MONTH, or YEAR).
     * @param {Function} dayFun - Callback for DAY mode.
     * @param {Function} monthFun - Callback for MONTH mode.
     * @param {Function} yearFun - Callback for YEAR mode.
     * @returns {Date} The result of the invoked callback.
     */
    private _switchMode;
    /**
     * @description Clears the content area and initializes the DOM structure for the given mode.
     * @param {string} mode - The mode to activate ('DAY', 'MONTH', or 'YEAR').
     */
    private _initMode;
    /**
     * @description Creates the years container knot for YEAR mode.
     */
    private _initYearsMode;
    /**
     * @description Creates the months container knot for MONTH mode.
     */
    private _initMonthsMode;
    /**
     * @description Creates the week-days header and days container knots for DAY mode.
     */
    private _initDaysMode;
    /**
     * @description Navigates the calendar to the previous period based on the active mode.
     */
    private _previous;
    /**
     * @description Navigates the calendar to the next period based on the active mode.
     */
    private _next;
    /**
     * @description Sets the current date, recalculates variables, and populates day cells for all three months.
     * @param {Date} date - The date to center the calendar on.
     */
    private _setDate;
    /**
     * @description Resets the days array and computes previous, current, and next date references.
     * @param {Date} date - The reference date for calculations.
     */
    private _setVariables;
    /**
     * @description Renders the calendar content for the current active mode.
     * @example
     * calendar.draw();
     */
    draw(): void;
    /**
     * @description Draws the header, week-day labels, and day cells for DAY mode.
     */
    private _drawDaysStructure;
    /**
     * @description Draws the header and month cells for MONTH mode.
     */
    private _drawMonthsStructure;
    /**
     * @description Draws the header and year cells for YEAR mode.
     */
    private _drawYearsStructure;
    /**
     * @description Renders the header text using the given date format string.
     * @param {string | null} format - The {@link DateIO} format string, or null for empty header.
     */
    private _drawHeader;
    /**
     * @description Creates and renders {@link Month} cells for all 12 months of the current year.
     */
    private _drawMonths;
    /**
     * @description Creates and renders {@link Year} cells for a block of years aligned to maxYears.
     */
    private _drawYears;
    /**
     * @description Renders the abbreviated week-day labels (e.g., Mo, Tu) in the header row.
     */
    private _drawWeekDays;
    /**
     * @description Appends all pre-built {@link Day} knots into the days container.
     */
    private _drawDays;
    /**
     * @description Populates trailing {@link Day} cells from the previous month to fill the first week row.
     */
    private _setPreviousMonth;
    /**
     * @description Populates {@link Day} cells for each day in the current month.
     */
    private _setCurrentMonth;
    /**
     * @description Populates leading {@link Day} cells from the next month to fill the remaining grid slots.
     */
    private _setNextMonth;
    /**
     * @description Updates the selected and current date based on the active mode's granularity.
     * @param {Date} selectedDate - The date selected by the user.
     */
    private _setModeDate;
    /**
     * @description Handles click on a day, month, or year cell; updates state, advances mode, and redraws.
     * @param {Date} selectedDate - The date associated with the clicked cell.
     */
    private _onClick;
    /**
     * @description Stores the given date as the currently selected date.
     * @param {Date} date - The date to mark as selected.
     */
    private _setSelectedDate;
    /**
     * @description Overridable callback fired when a date is selected. Defaults to a debug log.
     * @param {Date} date - The selected date.
     * @example
     * calendar.eventClick = (date) => { console.log('Selected:', date); };
     */
    eventClick(date: Date): void;
}
