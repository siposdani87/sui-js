import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Calendar } from './calendar';
import { Clock } from './clock';
/**
 * @class
 */
export class DateTime {
    /**
     * @param {!Knot} knot
     * @param {!Object} options
     */
    constructor(knot, options) {
        this.datetimeKnot = knot;
        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this._initVariables();
        this._initStructure();
        this._setValue(this.options.value);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initVariables() {
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
    _initStructure() {
        this._initDateTimeKnot();
        this._initCalendarKnot();
        this._initClockKnot();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDateTimeKnot() {
        this.datetimeKnot.addClass('datetime');
        this.datetimeKnot.removeChildren();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCalendarKnot() {
        if (this.config.calendar_type) {
            this.calendarKnot = new Knot('div');
            this.calendarKnot.addClass('calendar');
            this.datetimeKnot.appendChild(this.calendarKnot);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _initClockKnot() {
        if (this.config.clock_type) {
            this.clockKnot = new Knot('div');
            this.clockKnot.addClass('clock');
            this.datetimeKnot.appendChild(this.clockKnot);
        }
    }
    /**
     * @return {!DateTimeConfig}
     */
    getConfig() {
        return this.config;
    }
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setValue(value) {
        value = value || DateIO.format(new Date(), this.config.format);
        this.value = DateIO.parse(value, this.config.format);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    setValue(value) {
        this._initStructure();
        this._setValue(value);
        this.draw();
    }
    /**
     * @return {string}
     */
    getFormattedValue() {
        return DateIO.format(this.value, this.config.format);
    }
    /**
     * @return {undefined}
     */
    draw() {
        this._drawCalendar();
        this._drawClock();
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawCalendar() {
        if (this.config.calendar_type) {
            const calendar = new Calendar(this.calendarKnot, {
                date: this.value,
                type: this.config.calendar_type,
            });
            calendar.eventClick = (newDate) => {
                this.value = DateIO.setYear(this.value, DateIO.getYear(newDate));
                this.value = DateIO.setMonth(this.value, DateIO.getMonth(newDate));
                this.value = DateIO.setDate(this.value, DateIO.getDate(newDate));
                this._onClick();
            };
            calendar.draw();
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawClock() {
        if (this.config.clock_type) {
            const clock = new Clock(this.clockKnot, {
                time: this.value,
                type: this.config.clock_type,
            });
            clock.eventClick = (newDate) => {
                this.value = DateIO.setHours(this.value, DateIO.getHours(newDate));
                this.value = DateIO.setMinutes(this.value, DateIO.getMinutes(newDate));
                this._onClick();
            };
            clock.draw();
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _onClick() {
        const formattedValue = this.getFormattedValue();
        this.eventClick(formattedValue);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventClick(value) {
        consoleDebug('Date.eventClick()', value);
    }
}
