import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @description Time picker clock with hour and minute selection modes and AM/PM toggle.
 * @example
 * const clockKnot = new Knot('div');
 * const clock = new Clock(clockKnot, { time: new Date(), type: 'hour' });
 * clock.eventClick = (time) => { console.log(time); };
 * clock.draw();
 * @see {@link Time}
 * @see {@link DateIO}
 * @category Component
 */
export declare class Clock {
    clockKnot: Knot;
    options: Objekt;
    modes: string[];
    types: {
        hour: string;
        minute: string;
    };
    activeMode: string;
    headerKnot: Knot;
    periodHeaderKnot: Knot;
    period: string;
    time: Date;
    minutesHeaderKnot: Knot;
    hoursHeaderKnot: Knot;
    contentKnot: Knot;
    hours: number;
    minutes: number;
    /**
     * @description Creates a new Clock instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `time` (Date) and `type` ('hour' or 'minute').
     * @example
     * const clock = new Clock(new Knot('div'), { time: new Date(), type: 'hour' });
     */
    constructor(knot: Knot, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes mode definitions and builds the DOM structure.
     */
    private _init;
    /**
     * @description Dispatches to the appropriate callback based on the active mode (HOUR or MINUTE).
     * @param {Function} hourCallback - Callback for HOUR mode.
     * @param {Function} minuteCallback - Callback for MINUTE mode.
     * @returns {Date | null} The result of the invoked callback, or null if no mode matches.
     */
    private _switchMode;
    /**
     * @description Builds the full clock DOM structure including header, content, and initial mode.
     */
    private _initStructure;
    /**
     * @description Creates the header knot containing hours, separator, minutes, and period displays.
     */
    private _initHeaderKnot;
    /**
     * @description Creates the AM/PM period toggle knot in the header.
     */
    private _initPeriodHeaderKnot;
    /**
     * @description Toggles between AM and PM by adding or subtracting 12 hours.
     */
    private _togglePeriod;
    /**
     * @description Creates the minutes display knot in the header, switching to MINUTE mode on click.
     */
    private _initMinutesHeaderKnot;
    /**
     * @description Creates the hours display knot in the header, switching to HOUR mode on click.
     */
    private _initHoursHeaderKnot;
    /**
     * @description Activates the given mode, updates the time display, and redraws.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    private _setMode;
    /**
     * @description Creates the colon separator knot between hours and minutes in the header.
     */
    private _initSeparatorHeaderKnot;
    /**
     * @description Creates the main content container knot for the clock face.
     */
    private _initContentKnot;
    /**
     * @description Clears and returns a fresh time container knot inside the content area.
     * @returns {Knot} The newly created time container knot.
     */
    private _getTimeKnot;
    /**
     * @description Updates the hours display in the header with zero-padded text and active styling.
     * @param {number} hours - The hour value (1-12).
     */
    private _setHours;
    /**
     * @description Updates the minutes display in the header with zero-padded text and active styling.
     * @param {number} minutes - The minute value (0-59).
     */
    private _setMinutes;
    /**
     * @description Updates the AM/PM period display in the header.
     * @param {string} period - The period string ('am' or 'pm').
     */
    private _setPeriod;
    /**
     * @description Sets the clock to the given time and updates the hours, minutes, and period displays.
     * @param {Date} time - The time to display on the clock.
     * @example
     * clock.setTime(new Date());
     */
    setTime(time: Date): void;
    /**
     * @description Clears the content area and sets the active mode.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    private _initMode;
    /**
     * @description Resolves the target mode name by applying the direction offset to the current mode index.
     * @param {number} direction - Offset to move in the modes array.
     * @returns {string} The resolved mode name, falling back to the option type's default mode.
     */
    private _getMode;
    /**
     * @description Changes the active mode by the given direction offset.
     * @param {number} direction - Offset to move in the modes array (-1 or +1).
     */
    private _changeMode;
    /**
     * @description Renders the clock face for the current active mode (hours or minutes).
     * @example
     * clock.draw();
     */
    draw(): void;
    /**
     * @description Draws the minute selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
     */
    private _drawMinutes;
    /**
     * @description Draws the hour selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
     */
    private _drawHours;
    /**
     * @description Handles a time selection; updates the display, redraws, and fires the event callback.
     * @param {Date} selectedTime - The newly selected time.
     */
    private _onClick;
    /**
     * @description Overridable callback fired when a time is selected. Defaults to a debug log.
     * @param {Date} time - The selected time.
     * @example
     * clock.eventClick = (time) => { console.log('Selected:', time); };
     */
    eventClick(time: Date): void;
}
