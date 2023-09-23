import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Time } from './time';

/**
 * @class
 */
export class Clock {
    clockKnot: Knot;
    options: Objekt;
    modes: string[];
    types: { hour: string; minute: string };
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
     * @param {!Knot} knot
     * @param {!Object} options
     */
    constructor(knot: Knot, options: Object) {
        this.clockKnot = knot;
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
        this.modes = ['HOUR', 'MINUTE'];
        this.types = {
            hour: this.modes[0],
            minute: this.modes[1],
        };

        this._initStructure();
    }
    /**
     * @private
     * @param {!Function} hourCallback
     * @param {!Function} minuteCallback
     * @return {?Date}
     */
    private _switchMode(
        hourCallback: Function,
        minuteCallback: Function,
    ): Date | null {
        let result = null;
        switch (this.activeMode) {
            case 'HOUR':
                result = hourCallback();
                break;
            case 'MINUTE':
                result = minuteCallback();
                break;
            default:
                break;
        }
        return result;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initStructure(): void {
        this._initHeaderKnot();
        this._initContentKnot();
        this._initMode(this.types[this.options.type]);

        this.setTime(this.options.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHeaderKnot(): void {
        this.headerKnot = new Knot('div');
        this.headerKnot.addClass('header');
        this.clockKnot.appendChild(this.headerKnot);

        this._initHoursHeaderKnot();
        this._initSeparatorHeaderKnot();
        this._initMinutesHeaderKnot();
        this._initPeriodHeaderKnot();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initPeriodHeaderKnot(): void {
        this.periodHeaderKnot = new Knot('div');
        this.periodHeaderKnot.addClass('period');
        this.periodHeaderKnot.addEventListener(
            'click',
            this._togglePeriod.bind(this),
        );
        this.headerKnot.appendChild(this.periodHeaderKnot);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _togglePeriod(): void {
        if (this.period === 'pm') {
            this.time = DateIO.subHours(this.time, 12);
        } else {
            this.time = DateIO.addHours(this.time, 12);
        }
        this._onClick(this.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initMinutesHeaderKnot(): void {
        this.minutesHeaderKnot = new Knot('div');
        this.minutesHeaderKnot.addClass('minutes');
        this.minutesHeaderKnot.addEventListener('click', () => {
            this._setMode(this.types.minute);
        });
        this.headerKnot.appendChild(this.minutesHeaderKnot);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHoursHeaderKnot(): void {
        this.hoursHeaderKnot = new Knot('div');
        this.hoursHeaderKnot.addClass('hours');
        this.hoursHeaderKnot.addEventListener('click', () => {
            this._setMode(this.types.hour);
        });
        this.headerKnot.appendChild(this.hoursHeaderKnot);
    }
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    private _setMode(mode: string): void {
        this._initMode(mode);
        this.setTime(this.time);
        this.draw();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initSeparatorHeaderKnot(): void {
        const separatorHeaderKnot = new Knot('div');
        separatorHeaderKnot.addClass('separator');
        separatorHeaderKnot.setHtml(':');
        this.headerKnot.appendChild(separatorHeaderKnot);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initContentKnot(): void {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.clockKnot.appendChild(this.contentKnot);
    }
    /**
     * @private
     * @return {!Knot}
     */
    private _getTimeKnot(): Knot {
        this.contentKnot.removeChildren();
        const hoursKnot = new Knot('div');
        hoursKnot.addClass('time');
        this.contentKnot.appendChild(hoursKnot);
        return hoursKnot;
    }
    /**
     * @private
     * @param {number} hours
     * @return {undefined}
     */
    private _setHours(hours: number): void {
        this.hours = hours;
        const cssClass = this.activeMode === this.types.hour ? 'active' : null;
        this.hoursHeaderKnot.removeClass('active');
        this.hoursHeaderKnot.addClass(['hours', cssClass]);
        const text = hours < 10 ? '0' + hours : hours.toString();
        this.hoursHeaderKnot.setHtml(text);
    }
    /**
     * @private
     * @param {number} minutes
     * @return {undefined}
     */
    private _setMinutes(minutes: number): void {
        this.minutes = minutes;
        const cssClass =
            this.activeMode === this.types.minute ? 'active' : null;
        this.minutesHeaderKnot.removeClass('active');
        this.minutesHeaderKnot.addClass(['minutes', cssClass]);
        const text = minutes < 10 ? '0' + minutes : minutes.toString();
        this.minutesHeaderKnot.setHtml(text);
    }
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    private _setPeriod(period: string): void {
        this.period = period;
        this.periodHeaderKnot.removeClass(['am', 'pm']);
        this.periodHeaderKnot.addClass(['period', this.period]);
        const text = DateIO.format(this.time, 'aa');
        this.periodHeaderKnot.setHtml(text);
    }
    /**
     * @param {!Date} time
     * @return {undefined}
     */
    setTime(time: Date): void {
        this.time = time;

        const hours = DateIO.getHours(time) % 12 || 12;
        this._setHours(hours);

        const minutes = DateIO.getMinutes(time);
        this._setMinutes(minutes);

        const period = DateIO.getHours(time) / 12 >= 1 ? 'pm' : 'am';
        this._setPeriod(period);
    }
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    private _initMode(mode: string): void {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
    }
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    private _getMode(direction: number): string {
        let position = this.modes.indexOf(this.activeMode);
        if (position !== -1) {
            position += direction;
        }
        const mode = this.modes[position];
        return mode ? mode : this.types[this.options.type];
    }
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    private _changeMode(direction: number): void {
        const mode = this._getMode(direction);
        this._initMode(mode);
    }
    /**
     * @return {undefined}
     */
    draw(): void {
        const timeKnot = this._getTimeKnot();

        this._switchMode(
            () => {
                this._drawHours(timeKnot);
            },
            () => {
                this._drawMinutes(timeKnot);
            },
        );
    }
    /**
     * @private
     * @param {!Knot} timeKnot
     * @return {undefined}
     */
    private _drawMinutes(timeKnot: Knot): void {
        const timeMinutes = new Time(timeKnot, {
            selected: this.minutes,
            captions: ['00', '05'],
        });
        timeMinutes.eventClick = (index) => {
            this._changeMode(-1);
            const time = DateIO.setMinutes(this.time, index);
            this._onClick(time);
        };
        timeMinutes.draw(0, 59, 5, true);
    }
    /**
     * @private
     * @param {!Knot} timeKnot
     * @return {undefined}
     */
    private _drawHours(timeKnot: Knot): void {
        const timeHours = new Time(timeKnot, {
            selected: this.hours,
        });
        timeHours.eventClick = (index) => {
            this._changeMode(1);
            let hour = this.period === 'pm' ? index + 12 : index;
            hour = hour === 24 ? 0 : hour;
            const time = DateIO.setHours(this.time, hour);
            this._onClick(time);
        };
        timeHours.draw(1, 12, 1, true);
    }
    /**
     * @private
     * @param {!Date} selectedTime
     * @return {undefined}
     */
    private _onClick(selectedTime: Date): void {
        this.setTime(selectedTime);
        this.draw();
        this.eventClick(selectedTime);
    }
    /**
     * @param {!Date} time
     * @return {undefined}
     */
    eventClick(time: Date): void {
        consoleDebug('Clock.eventClick()', time);
    }
}
