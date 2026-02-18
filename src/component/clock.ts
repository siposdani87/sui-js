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
    clockKnot: Knot;
    options!: Objekt;
    modes!: string[];
    types!: { hour: string; minute: string };
    activeMode!: string;
    headerKnot!: Knot;
    periodHeaderKnot!: Knot;
    period!: string;
    time!: Date;
    minutesHeaderKnot!: Knot;
    hoursHeaderKnot!: Knot;
    contentKnot!: Knot;
    hours!: number;
    minutes!: number;

    /**
     * @description Creates a new Clock instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `time` (Date) and `type` ('hour' or 'minute').
     * @example
     * const clock = new Clock(new Knot('div'), { time: new Date(), type: 'hour' });
     */
    constructor(knot: Knot, options: object) {
        this.clockKnot = knot;
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
     * @description Initializes mode definitions and builds the DOM structure.
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
     * @description Dispatches to the appropriate callback based on the active mode (HOUR or MINUTE).
     * @param {() => Date | void} hourCallback - Callback for HOUR mode.
     * @param {() => Date | void} minuteCallback - Callback for MINUTE mode.
     * @returns {Date | null} The result of the invoked callback, or null if no mode matches.
     */
    private _switchMode(
        hourCallback: () => Date | void,
        minuteCallback: () => Date | void,
    ): Date | null {
        let result: Date | void | null = null;
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
        return result || null;
    }

    /**
     * @description Builds the full clock DOM structure including header, content, and initial mode.
     */
    private _initStructure(): void {
        this._initHeaderKnot();
        this._initContentKnot();
        this._initMode(
            this.types[this.options.type as keyof typeof this.types],
        );

        this.setTime(this.options.time);
    }

    /**
     * @description Creates the header knot containing hours, separator, minutes, and period displays.
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
     * @description Creates the AM/PM period toggle knot in the header.
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
     * @description Toggles between AM and PM by adding or subtracting 12 hours.
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
     * @description Creates the minutes display knot in the header, switching to MINUTE mode on click.
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
     * @description Creates the hours display knot in the header, switching to HOUR mode on click.
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
     * @description Activates the given mode, updates the time display, and redraws.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    private _setMode(mode: string): void {
        this._initMode(mode);
        this.setTime(this.time);
        this.draw();
    }

    /**
     * @description Creates the colon separator knot between hours and minutes in the header.
     */
    private _initSeparatorHeaderKnot(): void {
        const separatorHeaderKnot = new Knot('div');
        separatorHeaderKnot.addClass('separator');
        separatorHeaderKnot.setHtml(':');
        this.headerKnot.appendChild(separatorHeaderKnot);
    }

    /**
     * @description Creates the main content container knot for the clock face.
     */
    private _initContentKnot(): void {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.clockKnot.appendChild(this.contentKnot);
    }

    /**
     * @description Clears and returns a fresh time container knot inside the content area.
     * @returns {Knot} The newly created time container knot.
     */
    private _getTimeKnot(): Knot {
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
    private _setHours(hours: number): void {
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
    private _setMinutes(minutes: number): void {
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
    private _setPeriod(period: string): void {
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
     * @description Clears the content area and sets the active mode.
     * @param {string} mode - The mode to activate ('HOUR' or 'MINUTE').
     */
    private _initMode(mode: string): void {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
    }

    /**
     * @description Resolves the target mode name by applying the direction offset to the current mode index.
     * @param {number} direction - Offset to move in the modes array.
     * @returns {string} The resolved mode name, falling back to the option type's default mode.
     */
    private _getMode(direction: number): string {
        let position = this.modes.indexOf(this.activeMode);
        if (position !== -1) {
            position += direction;
        }
        const mode = this.modes[position];
        return mode
            ? mode
            : this.types[this.options.type as keyof typeof this.types];
    }

    /**
     * @description Changes the active mode by the given direction offset.
     * @param {number} direction - Offset to move in the modes array (-1 or +1).
     */
    private _changeMode(direction: number): void {
        const mode = this._getMode(direction);
        this._initMode(mode);
    }

    /**
     * @description Renders the clock face for the current active mode (hours or minutes).
     * @example
     * clock.draw();
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
     * @description Draws the minute selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
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
     * @description Draws the hour selection circle using the {@link Time} component.
     * @param {Knot} timeKnot - The container knot for the time circle.
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
     * @description Handles a time selection; updates the display, redraws, and fires the event callback.
     * @param {Date} selectedTime - The newly selected time.
     */
    private _onClick(selectedTime: Date): void {
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
    eventClick(time: Date): void {
        consoleDebug('Clock.eventClick()', time);
    }
}
