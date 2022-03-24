import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';
import { Time } from './time';

/**
 * @class
 */
export class Clock {
    clockNode: Item;
    options: any;
    modes: string[];
    types: { hour: string; minute: string };
    activeMode: string;
    headerNode: Item;
    periodHeaderNode: Item;
    period: string;
    time: any;
    minutesHeaderNode: Item;
    hoursHeaderNode: Item;
    contentNode: Item;
    hours: number;
    minutes: number;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node: Item, options: Object) {
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
        this.options = options;
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
     * @return {undefined}
     */
    private _switchMode(
        hourCallback: Function,
        minuteCallback: Function,
    ): void {
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
        this.headerNode = new Item('div');
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
        this.periodHeaderNode = new Item('div');
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
            this.time['subtract'](12, 'hours');
        } else {
            this.time['add'](12, 'hours');
        }
        this._onClick(this.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initMinutesHeaderNode(): void {
        this.minutesHeaderNode = new Item('div');
        this.minutesHeaderNode.addClass('minutes');
        this.minutesHeaderNode.addEventListener('click', () => {
            this._setMode(this.types['minute']);
        });
        this.headerNode.appendChild(this.minutesHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHoursHeaderNode(): void {
        this.hoursHeaderNode = new Item('div');
        this.hoursHeaderNode.addClass('hours');
        this.hoursHeaderNode.addEventListener('click', () => {
            this._setMode(this.types['hour']);
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
        const separatorHeaderNode = new Item('div');
        separatorHeaderNode.addClass('separator');
        separatorHeaderNode.setHtml(':');
        this.headerNode.appendChild(separatorHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initContentNode(): void {
        this.contentNode = new Item('div');
        this.contentNode.addClass('content');
        this.clockNode.appendChild(this.contentNode);
    }
    /**
     * @private
     * @return {!Item}
     */
    private _getTimeNode(): Item {
        this.contentNode.removeChildren();
        const hoursNode = new Item('div');
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
        const cssClass =
            this.activeMode === this.types['hour'] ? 'active' : null;
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
            this.activeMode === this.types['minute'] ? 'active' : null;
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
        const text = window['moment']
            ['localeData']()
            ['meridiem'](this.time['hour'](), this.time['minute'](), true);
        this.periodHeaderNode.setHtml(text);
    }
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    setTime(time: Object): void {
        this.time = window['moment'](time);

        const hours = this.time['hour']() % 12 || 12;
        this._setHours(hours);

        const minutes = this.time['minute']();
        this._setMinutes(minutes);

        const period = this.time['hour']() > 12 ? 'pm' : 'am';
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
     * @param {!Item} timeNode
     * @return {undefined}
     */
    private _drawMinutes(timeNode: Item): void {
        const timeMinutes = new Time(timeNode, {
            selected: this.minutes,
            captions: ['00', '05'],
        });
        timeMinutes.eventClick = (index) => {
            this._changeMode(-1);
            const time = this.time['minute'](index);
            this._onClick(time);
        };
        timeMinutes.draw(0, 59, 5, true);
    }
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    private _drawHours(timeNode: Item): void {
        const timeHours = new Time(timeNode, {
            selected: this.hours,
        });
        timeHours.eventClick = (index) => {
            this._changeMode(1);
            let hour = this.period === 'pm' ? index + 12 : index;
            hour = hour === 24 ? 0 : hour;
            const time = this.time['hour'](hour);
            this._onClick(time);
        };
        timeHours.draw(1, 12, 1, true);
    }
    /**
     * @private
     * @param {!Object} selectedTime
     * @return {undefined}
     */
    private _onClick(selectedTime: Object): void {
        this.setTime(selectedTime);
        this.draw();
        this.eventClick(selectedTime);
    }
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    eventClick(time: Object): void {
        consoleWarn('Clock.eventClick()', time);
    }
}
