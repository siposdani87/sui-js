import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Time } from './time';
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
export class Clock {
    /**
     * @description Creates a new Clock instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `time` (Date) and `type` ('hour' or 'minute').
     * @example
     * const clock = new Clock(new Knot('div'), { time: new Date(), type: 'hour' });
     */
    constructor(knot, options) {
        this.clockKnot = knot;
        this._setOptions(options);
        this._init();
    }
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    /**
     * @description Initializes mode definitions and builds the DOM structure.
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
     * @description Dispatches to the appropriate callback based on the active mode (HOUR or MINUTE).
     * @param {Function} hourCallback - Callback for HOUR mode.
     * @param {Function} minuteCallback - Callback for MINUTE mode.
     * @returns {Date | null} The result of the invoked callback, or null if no mode matches.
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
     * @description Builds the full clock DOM structure including header, content, and initial mode.
     */
    _initStructure() {
        this._initHeaderKnot();
        this._initContentKnot();
        this._initMode(this.types[this.options.type]);
        this.setTime(this.options.time);
    }
    /**
     * @description Creates the header knot containing hours, separator, minutes, and period displays.
     */
    _initHeaderKnot() {
        this.headerKnot = new Knot('div');
        this.headerKnot.addClass('header');
        this.clockKnot.appendChild(this.headerKnot);
        this._initHoursHeaderKnot();
        this._initSeparatorHeaderKnot();
        this._initMinutesHeaderKnot();
        this._initPeriodHeaderKnot();
    }
    /**
     * @description Creates the AM/PM period toggle knot in the header.
     */
    _initPeriodHeaderKnot() {
        this.periodHeaderKnot = new Knot('div');
        this.periodHeaderKnot.addClass('period');
        this.periodHeaderKnot.addEventListener('click', this._togglePeriod.bind(this));
        this.headerKnot.appendChild(this.periodHeaderKnot);
    }
    /**
     * @description Toggles between AM and PM by adding or subtracting 12 hours.
     */
    _togglePeriod() {
        if (this.period === 'pm') {
            this.time = DateIO.subHours(this.time, 12);
        }
        else {
            this.time = DateIO.addHours(this.time, 12);
        }
        this._onClick(this.time);
    }
    /**
     * @description Creates the minutes display knot in the header, switching to MINUTE mode on click.
     */
    _initMinutesHeaderKnot() {
        this.minutesHeaderKnot = new Knot('div');
        this.minutesHeaderKnot.addClass('minutes');
        this.minutesHeaderKnot.addEventListener('click', () => {
            this._setMode(this.types.minute);
        });
        this.headerKnot.appendChild(this.minutesHeaderKnot);
    }
    /**
     * @description Creates the hours display knot in the header, switching to HOUR mode on click.
     */
    _initHoursHeaderKnot() {
        this.hoursHeaderKnot = new Knot('div');
        this.hoursHeaderKnot.addClass('hours');
        this.hoursHeaderKnot.addEventListener('click', () => {
            this._setMode(this.types.hour);
        });
        this.headerKnot.appendChild(this.hoursHeaderKnot);
    }
    /**
     * @description Activates the given mode, updates the time display, and redraws.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    _setMode(mode) {
        this._initMode(mode);
        this.setTime(this.time);
        this.draw();
    }
    /**
     * @description Creates the colon separator knot between hours and minutes in the header.
     */
    _initSeparatorHeaderKnot() {
        const separatorHeaderKnot = new Knot('div');
        separatorHeaderKnot.addClass('separator');
        separatorHeaderKnot.setHtml(':');
        this.headerKnot.appendChild(separatorHeaderKnot);
    }
    /**
     * @description Creates the main content container knot for the clock face.
     */
    _initContentKnot() {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.clockKnot.appendChild(this.contentKnot);
    }
    /**
     * @description Clears and returns a fresh time container knot inside the content area.
     * @returns {Knot} The newly created time container knot.
     */
    _getTimeKnot() {
        this.contentKnot.removeChildren();
        const hoursKnot = new Knot('div');
        hoursKnot.addClass('time');
        this.contentKnot.appendChild(hoursKnot);
        return hoursKnot;
    }
    /**
     * @description Updates the hours display in the header with zero-padded text and active styling.
     * @param {number} hours - The hour value (1-12).
     */
    _setHours(hours) {
        this.hours = hours;
        const cssClass = this.activeMode === this.types.hour ? 'active' : '';
        this.hoursHeaderKnot.removeClass('active');
        this.hoursHeaderKnot.addClass(['hours', cssClass]);
        const text = hours < 10 ? '0' + hours : hours.toString();
        this.hoursHeaderKnot.setHtml(text);
    }
    /**
     * @description Updates the minutes display in the header with zero-padded text and active styling.
     * @param {number} minutes - The minute value (0-59).
     */
    _setMinutes(minutes) {
        this.minutes = minutes;
        const cssClass = this.activeMode === this.types.minute ? 'active' : '';
        this.minutesHeaderKnot.removeClass('active');
        this.minutesHeaderKnot.addClass(['minutes', cssClass]);
        const text = minutes < 10 ? '0' + minutes : minutes.toString();
        this.minutesHeaderKnot.setHtml(text);
    }
    /**
     * @description Updates the AM/PM period display in the header.
     * @param {string} period - The period string ('am' or 'pm').
     */
    _setPeriod(period) {
        this.period = period;
        this.periodHeaderKnot.removeClass(['am', 'pm']);
        this.periodHeaderKnot.addClass(['period', this.period]);
        const text = DateIO.format(this.time, 'aa');
        this.periodHeaderKnot.setHtml(text);
    }
    /**
     * @description Sets the clock to the given time and updates the hours, minutes, and period displays.
     * @param {Date} time - The time to display on the clock.
     * @example
     * clock.setTime(new Date());
     */
    setTime(time) {
        this.time = time;
        const hours = DateIO.getHours(time) % 12 || 12;
        this._setHours(hours);
        const minutes = DateIO.getMinutes(time);
        this._setMinutes(minutes);
        const period = DateIO.getHours(time) / 12 >= 1 ? 'pm' : 'am';
        this._setPeriod(period);
    }
    /**
     * @description Clears the content area and sets the active mode.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    _initMode(mode) {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
    }
    /**
     * @description Resolves the target mode name by applying the direction offset to the current mode index.
     * @param {number} direction - Offset to move in the modes array.
     * @returns {string} The resolved mode name, falling back to the option type's default mode.
     */
    _getMode(direction) {
        let position = this.modes.indexOf(this.activeMode);
        if (position !== -1) {
            position += direction;
        }
        const mode = this.modes[position];
        return mode
            ? mode
            : this.types[this.options.type];
    }
    /**
     * @description Changes the active mode by the given direction offset.
     * @param {number} direction - Offset to move in the modes array (-1 or +1).
     */
    _changeMode(direction) {
        const mode = this._getMode(direction);
        this._initMode(mode);
    }
    /**
     * @description Renders the clock face for the current active mode (hours or minutes).
     * @example
     * clock.draw();
     */
    draw() {
        const timeKnot = this._getTimeKnot();
        this._switchMode(() => {
            this._drawHours(timeKnot);
        }, () => {
            this._drawMinutes(timeKnot);
        });
    }
    /**
     * @description Draws the minute selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
     */
    _drawMinutes(timeKnot) {
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
     * @description Draws the hour selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
     */
    _drawHours(timeKnot) {
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
     * @description Handles a time selection; updates the display, redraws, and fires the event callback.
     * @param {Date} selectedTime - The newly selected time.
     */
    _onClick(selectedTime) {
        this.setTime(selectedTime);
        this.draw();
        this.eventClick(selectedTime);
    }
    /**
     * @description Overridable callback fired when a time is selected. Defaults to a debug log.
     * @param {Date} time - The selected time.
     * @example
     * clock.eventClick = (time) => { console.log('Selected:', time); };
     */
    eventClick(time) {
        consoleDebug('Clock.eventClick()', time);
    }
}
