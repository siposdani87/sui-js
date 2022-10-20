import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleWarn } from '../utils/log';
import { Calendar } from './calendar';
import { Clock } from './clock';

/**
 * @typedef {{format: string; calendar_type: string; clock_type: string;}} DateTimeConfig
 */
type DateTimeConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};

/**
 * @class
 */
export class DateTime {
    datetimeNode: Knot;
    options: Objekt;
    types: {
        [key: string]: DateTimeConfig;
    };
    config: DateTimeConfig;
    calendarNode: Knot;
    clockNode: Knot;
    value: Date;
    /**
     * @param {!Knot} node
     * @param {!Object} options
     */
    constructor(node: Knot, options: Object) {
        this.datetimeNode = node;
        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions(options: Object): void {
        this.options = new Objekt(options);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this._initVariables();
        this._initStructure();
        this._setValue(this.options.value);
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _initStructure(): void {
        this._initDateTimeNode();
        this._initCalendarNode();
        this._initClockNode();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initDateTimeNode(): void {
        this.datetimeNode.addClass('datetime');
        this.datetimeNode.removeChildren();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initCalendarNode(): void {
        if (this.config.calendar_type) {
            this.calendarNode = new Knot('div');
            this.calendarNode.addClass('calendar');
            this.datetimeNode.appendChild(this.calendarNode);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initClockNode(): void {
        if (this.config.clock_type) {
            this.clockNode = new Knot('div');
            this.clockNode.addClass('clock');
            this.datetimeNode.appendChild(this.clockNode);
        }
    }
    /**
     * @return {!DateTimeConfig}
     */
    getConfig(): DateTimeConfig {
        return this.config;
    }
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    private _setValue(value: string): void {
        value = value || DateIO.format(new Date(), this.config.format);
        this.value = DateIO.parse(value, this.config.format);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    setValue(value: string): void {
        this._initStructure();
        this._setValue(value);
        this.draw();
    }
    /**
     * @return {string}
     */
    getFormattedValue(): string {
        return DateIO.format(this.value, this.config.format);
    }
    /**
     * @return {undefined}
     */
    draw(): void {
        this._drawCalendar();
        this._drawClock();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _drawCalendar(): void {
        if (this.config.calendar_type) {
            const calendar = new Calendar(this.calendarNode, {
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
     * @private
     * @return {undefined}
     */
    private _drawClock(): void {
        if (this.config.clock_type) {
            const clock = new Clock(this.clockNode, {
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
     * @private
     * @return {undefined}
     */
    private _onClick(): void {
        const formattedValue = this.getFormattedValue();
        this.eventClick(formattedValue);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventClick(value: string): void {
        consoleWarn('Date.eventClick()', value);
    }
}
