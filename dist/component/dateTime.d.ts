import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @description Format configuration for a specific input type, defining the date format string and which calendar/clock modes to display.
 * @category Component
 */
type DateTimeConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};
/**
 * @description Combined date and time picker that composes a {@link Calendar} and {@link Clock} based on the input type.
 * @example
 * const knot = new Knot('div');
 * const dt = new DateTime(knot, { type: 'datetime-local', value: '2024-01-15T10:30:00' });
 * dt.eventClick = (formattedValue) => { console.log(formattedValue); };
 * dt.draw();
 * @see {@link Calendar}
 * @see {@link Clock}
 * @see {@link DateIO}
 * @category Component
 */
export declare class DateTime {
    datetimeKnot: Knot;
    options: Objekt;
    types: {
        [key: string]: DateTimeConfig;
    };
    config: DateTimeConfig;
    calendarKnot: Knot;
    clockKnot: Knot;
    value: Date;
    /**
     * @description Creates a new DateTime instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `type` and `value`.
     * @example
     * const dt = new DateTime(new Knot('div'), { type: 'date', value: '2024-01-15' });
     */
    constructor(knot: Knot, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes type configurations, DOM structure, and sets the initial value.
     */
    private _init;
    /**
     * @description Defines the format and component type mappings for each supported input type.
     */
    private _initVariables;
    /**
     * @description Builds the datetime DOM structure with optional calendar and clock containers.
     */
    private _initStructure;
    /**
     * @description Adds the datetime CSS class and clears any existing children from the container.
     */
    private _initDateTimeKnot;
    /**
     * @description Creates the calendar container knot if the config requires a calendar component.
     */
    private _initCalendarKnot;
    /**
     * @description Creates the clock container knot if the config requires a clock component.
     */
    private _initClockKnot;
    /**
     * @description Returns the active DateTimeConfig for the current input type.
     * @returns {DateTimeConfig} The format configuration.
     * @example
     * const config = dt.getConfig();
     * console.log(config.format); // 'YYYY-MM-DD'
     */
    getConfig(): DateTimeConfig;
    /**
     * @description Parses and stores the date value string, defaulting to the current date if empty.
     * @param {string} value - The date/time string to parse.
     */
    private _setValue;
    /**
     * @description Sets a new value, rebuilds the DOM structure, and redraws both calendar and clock.
     * @param {string} value - The date/time string to set.
     * @example
     * dt.setValue('2024-06-20T14:30:00');
     */
    setValue(value: string): void;
    /**
     * @description Returns the current value formatted according to the active config's format string.
     * @returns {string} The formatted date/time string.
     * @example
     * const formatted = dt.getFormattedValue(); // '2024-01-15'
     */
    getFormattedValue(): string;
    /**
     * @description Renders both the calendar and clock components based on the active configuration.
     * @example
     * dt.draw();
     */
    draw(): void;
    /**
     * @description Creates and draws the {@link Calendar} component if the config includes a calendar type.
     */
    private _drawCalendar;
    /**
     * @description Creates and draws the {@link Clock} component if the config includes a clock type.
     */
    private _drawClock;
    /**
     * @description Handles internal click by formatting the current value and firing the event callback.
     */
    private _onClick;
    /**
     * @description Overridable callback fired when the date/time value changes. Defaults to a debug log.
     * @param {string} value - The formatted date/time string.
     * @example
     * dt.eventClick = (value) => { console.log('Changed:', value); };
     */
    eventClick(value: string): void;
}
export {};
