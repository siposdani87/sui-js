import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Calendar } from './calendar';
import { Clock } from './clock';

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
export class DateTime {
    datetimeKnot: Knot;
    options!: Objekt;
    types!: {
        [key: string]: DateTimeConfig;
    };
    config!: DateTimeConfig;
    calendarKnot!: Knot;
    clockKnot!: Knot;
    value!: Date;

    /**
     * @description Creates a new DateTime instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `type` and `value`.
     * @example
     * const dt = new DateTime(new Knot('div'), { type: 'date', value: '2024-01-15' });
     */
    constructor(knot: Knot, options: object) {
        this.datetimeKnot = knot;
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
     * @description Initializes type configurations, DOM structure, and sets the initial value.
     */
    private _init(): void {
        this._initVariables();
        this._initStructure();
        this._setValue(this.options.value);
    }

    /**
     * @description Defines the format and component type mappings for each supported input type.
     */
    private _initVariables(): void {
        this.types = {
            'datetime-local': {
                format: 'YYYY-MM-DDTHH:mm:ss',
                calendar_type: 'date',
                clock_type: 'hour',
            },
            datetime: {
                format: '',
                calendar_type: 'date',
                clock_type: 'hour',
            },
            date: {
                format: 'YYYY-MM-DD',
                calendar_type: 'date',
                clock_type: '',
            },
            time: {
                format: 'HH:mm:ss',
                calendar_type: '',
                clock_type: 'hour',
            },
            month: {
                format: 'YYYY-MM',
                calendar_type: 'month',
                clock_type: '',
            },
            week: {
                format: 'YYYY-\\Www',
                calendar_type: 'week',
                clock_type: '',
            },
            year: {
                format: 'YYYY',
                calendar_type: 'year',
                clock_type: '',
            },
        };
        this.config = this.types[this.options.type];
    }

    /**
     * @description Builds the datetime DOM structure with optional calendar and clock containers.
     */
    private _initStructure(): void {
        this._initDateTimeKnot();
        this._initCalendarKnot();
        this._initClockKnot();
    }

    /**
     * @description Adds the datetime CSS class and clears any existing children from the container.
     */
    private _initDateTimeKnot(): void {
        this.datetimeKnot.addClass('datetime');
        this.datetimeKnot.removeChildren();
    }

    /**
     * @description Creates the calendar container knot if the config requires a calendar component.
     */
    private _initCalendarKnot(): void {
        if (this.config.calendar_type) {
            this.calendarKnot = new Knot('div');
            this.calendarKnot.addClass('calendar');
            this.datetimeKnot.appendChild(this.calendarKnot);
        }
    }

    /**
     * @description Creates the clock container knot if the config requires a clock component.
     */
    private _initClockKnot(): void {
        if (this.config.clock_type) {
            this.clockKnot = new Knot('div');
            this.clockKnot.addClass('clock');
            this.datetimeKnot.appendChild(this.clockKnot);
        }
    }

    /**
     * @description Returns the active DateTimeConfig for the current input type.
     * @returns {DateTimeConfig} The format configuration.
     * @example
     * const config = dt.getConfig();
     * console.log(config.format); // 'YYYY-MM-DD'
     */
    getConfig(): DateTimeConfig {
        return this.config;
    }

    /**
     * @description Parses and stores the date value string, defaulting to the current date if empty.
     * @param {string} value - The date/time string to parse.
     */
    private _setValue(value: string): void {
        value = value || DateIO.format(new Date(), this.config.format);
        this.value = DateIO.parse(value, this.config.format);
    }

    /**
     * @description Sets a new value, rebuilds the DOM structure, and redraws both calendar and clock.
     * @param {string} value - The date/time string to set.
     * @example
     * dt.setValue('2024-06-20T14:30:00');
     */
    setValue(value: string): void {
        this._initStructure();
        this._setValue(value);
        this.draw();
    }

    /**
     * @description Returns the current value formatted according to the active config's format string.
     * @returns {string} The formatted date/time string.
     * @example
     * const formatted = dt.getFormattedValue(); // '2024-01-15'
     */
    getFormattedValue(): string {
        return DateIO.format(this.value, this.config.format);
    }

    /**
     * @description Renders both the calendar and clock components based on the active configuration.
     * @example
     * dt.draw();
     */
    draw(): void {
        this._drawCalendar();
        this._drawClock();
    }

    /**
     * @description Creates and draws the {@link Calendar} component if the config includes a calendar type.
     */
    private _drawCalendar(): void {
        if (this.config.calendar_type) {
            const calendar = new Calendar(this.calendarKnot, {
                date: this.value,
                type: this.config.calendar_type,
            });
            calendar.eventClick = (newDate) => {
                this.value = DateIO.setYear(
                    this.value,
                    DateIO.getYear(newDate),
                );
                this.value = DateIO.setMonth(
                    this.value,
                    DateIO.getMonth(newDate),
                );
                this.value = DateIO.setDate(
                    this.value,
                    DateIO.getDate(newDate),
                );
                this._onClick();
            };
            calendar.draw();
        }
    }

    /**
     * @description Creates and draws the {@link Clock} component if the config includes a clock type.
     */
    private _drawClock(): void {
        if (this.config.clock_type) {
            const clock = new Clock(this.clockKnot, {
                time: this.value,
                type: this.config.clock_type,
            });
            clock.eventClick = (newDate) => {
                this.value = DateIO.setHours(
                    this.value,
                    DateIO.getHours(newDate),
                );
                this.value = DateIO.setMinutes(
                    this.value,
                    DateIO.getMinutes(newDate),
                );
                this._onClick();
            };
            clock.draw();
        }
    }

    /**
     * @description Handles internal click by formatting the current value and firing the event callback.
     */
    private _onClick(): void {
        const formattedValue = this.getFormattedValue();
        this.eventClick(formattedValue);
    }

    /**
     * @description Overridable callback fired when the date/time value changes. Defaults to a debug log.
     * @param {string} value - The formatted date/time string.
     * @example
     * dt.eventClick = (value) => { console.log('Changed:', value); };
     */
    eventClick(value: string): void {
        consoleDebug('Date.eventClick()', value);
    }
}
