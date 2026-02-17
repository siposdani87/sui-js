import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Calendar } from './calendar';
import { Clock } from './clock';

type DateTimeConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};

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

    constructor(knot: Knot, options: object) {
        this.datetimeKnot = knot;
        this._setOptions(options);
        this._init();
    }

    private _setOptions(options: object): void {
        this.options = new Objekt(options);
    }

    private _init(): void {
        this._initVariables();
        this._initStructure();
        this._setValue(this.options.value);
    }

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

    private _initStructure(): void {
        this._initDateTimeKnot();
        this._initCalendarKnot();
        this._initClockKnot();
    }

    private _initDateTimeKnot(): void {
        this.datetimeKnot.addClass('datetime');
        this.datetimeKnot.removeChildren();
    }

    private _initCalendarKnot(): void {
        if (this.config.calendar_type) {
            this.calendarKnot = new Knot('div');
            this.calendarKnot.addClass('calendar');
            this.datetimeKnot.appendChild(this.calendarKnot);
        }
    }

    private _initClockKnot(): void {
        if (this.config.clock_type) {
            this.clockKnot = new Knot('div');
            this.clockKnot.addClass('clock');
            this.datetimeKnot.appendChild(this.clockKnot);
        }
    }

    getConfig(): DateTimeConfig {
        return this.config;
    }

    private _setValue(value: string): void {
        value = value || DateIO.format(new Date(), this.config.format);
        this.value = DateIO.parse(value, this.config.format);
    }

    setValue(value: string): void {
        this._initStructure();
        this._setValue(value);
        this.draw();
    }

    getFormattedValue(): string {
        return DateIO.format(this.value, this.config.format);
    }

    draw(): void {
        this._drawCalendar();
        this._drawClock();
    }

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

    private _onClick(): void {
        const formattedValue = this.getFormattedValue();
        this.eventClick(formattedValue);
    }

    eventClick(value: string): void {
        consoleDebug('Date.eventClick()', value);
    }
}
