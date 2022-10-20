import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleWarn } from '../utils/log';
import { Time } from './time';

/**
 * @class
 */
export class Clock {
    clockNode: Knot;
    options: Objekt;
    modes: string[];
    types: { hour: string; minute: string };
    activeMode: string;
    headerNode: Knot;
    periodHeaderNode: Knot;
    period: string;
    time: Date;
    minutesHeaderNode: Knot;
    hoursHeaderNode: Knot;
    contentNode: Knot;
    hours: number;
    minutes: number;
    /**
     * @param {!Knot} node
     * @param {!Object} options
     */
    constructor(node: Knot, options: Object) {
        this.clockNode = node;
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
        this._initHeaderNode();
        this._initContentNode();
        this._initMode(this.types[this.options.type]);

        this.setTime(this.options.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHeaderNode(): void {
        this.headerNode = new Knot('div');
        this.headerNode.addClass('header');
        this.clockNode.appendChild(this.headerNode);

        this._initHoursHeaderNode();
        this._initSeparatorHeaderNode();
        this._initMinutesHeaderNode();
        this._initPeriodHeaderNode();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initPeriodHeaderNode(): void {
        this.periodHeaderNode = new Knot('div');
        this.periodHeaderNode.addClass('period');
        this.periodHeaderNode.addEventListener(
            'click',
            this._togglePeriod.bind(this),
        );
        this.headerNode.appendChild(this.periodHeaderNode);
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
    private _initMinutesHeaderNode(): void {
        this.minutesHeaderNode = new Knot('div');
        this.minutesHeaderNode.addClass('minutes');
        this.minutesHeaderNode.addEventListener('click', () => {
            this._setMode(this.types.minute);
        });
        this.headerNode.appendChild(this.minutesHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHoursHeaderNode(): void {
        this.hoursHeaderNode = new Knot('div');
        this.hoursHeaderNode.addClass('hours');
        this.hoursHeaderNode.addEventListener('click', () => {
            this._setMode(this.types.hour);
        });
        this.headerNode.appendChild(this.hoursHeaderNode);
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
    private _initSeparatorHeaderNode(): void {
        const separatorHeaderNode = new Knot('div');
        separatorHeaderNode.addClass('separator');
        separatorHeaderNode.setHtml(':');
        this.headerNode.appendChild(separatorHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initContentNode(): void {
        this.contentNode = new Knot('div');
        this.contentNode.addClass('content');
        this.clockNode.appendChild(this.contentNode);
    }
    /**
     * @private
     * @return {!Knot}
     */
    private _getTimeNode(): Knot {
        this.contentNode.removeChildren();
        const hoursNode = new Knot('div');
        hoursNode.addClass('time');
        this.contentNode.appendChild(hoursNode);
        return hoursNode;
    }
    /**
     * @private
     * @param {number} hours
     * @return {undefined}
     */
    private _setHours(hours: number): void {
        this.hours = hours;
        const cssClass = this.activeMode === this.types.hour ? 'active' : null;
        this.hoursHeaderNode.removeClass('active');
        this.hoursHeaderNode.addClass(['hours', cssClass]);
        const text = hours < 10 ? '0' + hours : hours.toString();
        this.hoursHeaderNode.setHtml(text);
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
        this.minutesHeaderNode.removeClass('active');
        this.minutesHeaderNode.addClass(['minutes', cssClass]);
        const text = minutes < 10 ? '0' + minutes : minutes.toString();
        this.minutesHeaderNode.setHtml(text);
    }
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    private _setPeriod(period: string): void {
        this.period = period;
        this.periodHeaderNode.removeClass(['am', 'pm']);
        this.periodHeaderNode.addClass(['period', this.period]);
        const text = DateIO.format(this.time, 'aa');
        this.periodHeaderNode.setHtml(text);
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
        this.contentNode.removeChildren();
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
        const timeNode = this._getTimeNode();

        this._switchMode(
            () => {
                this._drawHours(timeNode);
            },
            () => {
                this._drawMinutes(timeNode);
            },
        );
    }
    /**
     * @private
     * @param {!Knot} timeNode
     * @return {undefined}
     */
    private _drawMinutes(timeNode: Knot): void {
        const timeMinutes = new Time(timeNode, {
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
     * @param {!Knot} timeNode
     * @return {undefined}
     */
    private _drawHours(timeNode: Knot): void {
        const timeHours = new Time(timeNode, {
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
        consoleWarn('Clock.eventClick()', time);
    }
}
