import { Item } from '../core/item';
import { consoleWarn } from '../utils/log';
import { Time } from './time';
/**
 * @class
 */
export class Clock {
    clockNode;
    options;
    modes;
    types;
    activeMode;
    headerNode;
    periodHeaderNode;
    period;
    time;
    minutesHeaderNode;
    hoursHeaderNode;
    contentNode;
    hours;
    minutes;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node, options) {
        this.clockNode = node;
        this._setOptions(options);
        this._init();
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options) {
        this.options = options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
    _switchMode(hourCallback, minuteCallback) {
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
    _initStructure() {
        this._initHeaderNode();
        this._initContentNode();
        this._initMode(this.types[this.options.type]);
        this.setTime(this.options.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHeaderNode() {
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
    _initPeriodHeaderNode() {
        this.periodHeaderNode = new Item('div');
        this.periodHeaderNode.addClass('period');
        this.periodHeaderNode.addEventListener('click', this._togglePeriod.bind(this));
        this.headerNode.appendChild(this.periodHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    _togglePeriod() {
        if (this.period === 'pm') {
            this.time['subtract'](12, 'hours');
        }
        else {
            this.time['add'](12, 'hours');
        }
        this._onClick(this.time);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initMinutesHeaderNode() {
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
    _initHoursHeaderNode() {
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
    _setMode(mode) {
        this._initMode(mode);
        this.setTime(this.time);
        this.draw();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initSeparatorHeaderNode() {
        const separatorHeaderNode = new Item('div');
        separatorHeaderNode.addClass('separator');
        separatorHeaderNode.setHtml(':');
        this.headerNode.appendChild(separatorHeaderNode);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initContentNode() {
        this.contentNode = new Item('div');
        this.contentNode.addClass('content');
        this.clockNode.appendChild(this.contentNode);
    }
    /**
     * @private
     * @return {!Item}
     */
    _getTimeNode() {
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
    _setHours(hours) {
        this.hours = hours;
        const cssClass = this.activeMode === this.types['hour'] ? 'active' : null;
        this.hoursHeaderNode.removeClass('active');
        this.hoursHeaderNode.addClass(['hours', cssClass]);
        const text = hours < 10 ? '0' + hours : hours;
        this.hoursHeaderNode.setHtml(text);
    }
    /**
     * @private
     * @param {number} minutes
     * @return {undefined}
     */
    _setMinutes(minutes) {
        this.minutes = minutes;
        const cssClass = this.activeMode === this.types['minute'] ? 'active' : null;
        this.minutesHeaderNode.removeClass('active');
        this.minutesHeaderNode.addClass(['minutes', cssClass]);
        const text = minutes < 10 ? '0' + minutes : minutes;
        this.minutesHeaderNode.setHtml(text);
    }
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    _setPeriod(period) {
        this.period = period;
        this.periodHeaderNode.removeClass(['am', 'pm']);
        this.periodHeaderNode.addClass(['period', this.period]);
        const text = window['moment']['localeData']()['meridiem'](this.time['hour'](), this.time['minute'](), true);
        this.periodHeaderNode.setHtml(text);
    }
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    setTime(time) {
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
    _initMode(mode) {
        this.contentNode.removeChildren();
        this.activeMode = mode;
    }
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    _getMode(direction) {
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
    _changeMode(direction) {
        const mode = this._getMode(direction);
        this._initMode(mode);
    }
    /**
     * @return {undefined}
     */
    draw() {
        const timeNode = this._getTimeNode();
        this._switchMode(() => {
            this._drawHours(timeNode);
        }, () => {
            this._drawMinutes(timeNode);
        });
    }
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    _drawMinutes(timeNode) {
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
    _drawHours(timeNode) {
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
    _onClick(selectedTime) {
        this.setTime(selectedTime);
        this.draw();
        this.eventClick(selectedTime);
    }
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    eventClick(time) {
        consoleWarn('Clock.eventClick()', time);
    }
}
