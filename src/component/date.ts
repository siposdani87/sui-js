import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';
import { Calendar } from './calendar';
import { Clock } from './clock';

/**
 * @typedef {{format: string; calendar_type: string; clock_type: string;}} DateConfig
 */
type DateConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
}

/**
 * @class
 */
export class Date {
    datetimeNode: Item;
    options: any;
    types: {
        [key: string]: DateConfig;
    };
    config: DateConfig;
    calendarNode: Item;
    clockNode: Item;
    value: string | Object;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node: Item, options: Object) {
        this.datetimeNode = node;
        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: Object): void {
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _init(): void {
        this._initVariables();
        this._initStructure();
        this._setValue(this.options.value);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initVariables(): void {
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
    _initStructure(): void {
        this._initDateTimeNode();
        this._initCalendarNode();
        this._initClockNode();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDateTimeNode(): void {
        this.datetimeNode.addClass('datetime');
        this.datetimeNode.removeChildren();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCalendarNode(): void {
        if (this.config.calendar_type) {
            this.calendarNode = new Item('div');
            this.calendarNode.addClass('calendar');
            this.datetimeNode.appendChild(this.calendarNode);
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _initClockNode(): void {
        if (this.config.clock_type) {
            this.clockNode = new Item('div');
            this.clockNode.addClass('clock');
            this.datetimeNode.appendChild(this.clockNode);
        }
    }
    /**
     * @return {!DateConfig}
     */
    getConfig(): DateConfig {
        return this.config;
    }
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setValue(value: string): void {
        value = value || window['moment']()['format'](this.config.format);
        this.value = window['moment'](value, this.config.format);
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
    getValue(): string {
        return this.value['format'](this.config.format);
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
    _drawCalendar(): void {
        if (this.config.calendar_type) {
            const calendar = new Calendar(this.calendarNode, {
                date: this.value,
                type: this.config.calendar_type,
                start_day: 1,
            });
            calendar.eventClick = (date) => {
                this.value['year'](date['year']());
                this.value['month'](date['month']());
                this.value['date'](date['date']());
                this._onClick();
            };
            calendar.draw();
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawClock(): void {
        if (this.config.clock_type) {
            const clock = new Clock(this.clockNode, {
                time: this.value,
                type: this.config.clock_type,
            });
            clock.eventClick = (date) => {
                this.value['hour'](date['hour']());
                this.value['minute'](date['minute']());
                this._onClick();
            };
            clock.draw();
        }
    }
    /**
     * @private
     * @return {undefined}
     */
    _onClick(): void {
        const value = this.getValue();
        this.eventClick(value);
    }
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventClick(value: string): void {
        consoleWarn('Date.eventClick()', value);
    }
}
