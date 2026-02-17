import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Day } from './day';
import { Month } from './month';
import { Year } from './year';
/**
 * @description Date picker calendar with day, month, and year selection modes, navigation, and date selection.
 * @example
 * const calendarKnot = new Knot('div');
 * const calendar = new Calendar(calendarKnot, { date: new Date(), type: 'date' });
 * calendar.eventClick = (date) => { console.log(date); };
 * calendar.draw();
 * @see {@link Day}
 * @see {@link Month}
 * @see {@link Year}
 * @see {@link DateIO}
 * @category Component
 */
export class Calendar {
    /**
     * @description Creates a new Calendar instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `date` and `type` ('date', 'month', 'year', 'week', 'range').
     * @example
     * const calendar = new Calendar(new Knot('div'), { date: new Date(), type: 'date' });
     */
    constructor(knot, options) {
        this.calendarKnot = knot;
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
     * @description Initializes calendar constants, mode definitions, and DOM structure.
     */
    _init() {
        this.maxDays = 7 * 6;
        this.maxMonths = 12;
        this.maxYears = 16;
        this.modes = ['YEAR', 'MONTH', 'DAY'];
        this.types = {
            date: this.modes[2],
            month: this.modes[1],
            year: this.modes[0],
            week: this.modes[2],
            range: this.modes[2],
        };
        this._initStructure();
    }
    /**
     * @description Builds the full calendar DOM structure including header, content, and initial mode.
     */
    _initStructure() {
        this._initHeaderKnot();
        this._initContentKnot();
        this._initMode(this.types[this.options.type]);
        const date = this.options.date;
        this._setSelectedDate(date);
        this._setDate(date);
    }
    /**
     * @description Creates the header knot with previous/next navigation buttons and the current mode label.
     */
    _initHeaderKnot() {
        this.headerKnot = new Knot('div');
        this.headerKnot.addClass('header');
        this.calendarKnot.appendChild(this.headerKnot);
        const previousButton = new Knot('a');
        previousButton.setAttribute('href', 'javascript:void(0)');
        previousButton.addClass([
            'previous',
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);
        const prevIconKnot = new Knot('em');
        prevIconKnot.addClass('material-icons');
        prevIconKnot.setHtml('chevron_left');
        previousButton.appendChild(prevIconKnot);
        previousButton.addEventListener('click', this._previous.bind(this));
        this.headerKnot.appendChild(previousButton);
        this.currentModeKnot = new Knot('span');
        this.currentModeKnot.addClass('current-mode');
        this.currentModeKnot.addEventListener('click', () => {
            this._changeMode(-1);
            this.draw();
        });
        this.headerKnot.appendChild(this.currentModeKnot);
        const nextButton = new Knot('a');
        nextButton.setAttribute('href', 'javascript:void(0)');
        nextButton.addClass([
            'previous',
            'mdl-button',
            'mdl-js-button',
            'mdl-button--icon',
        ]);
        const nextIconKnot = new Knot('em');
        nextIconKnot.addClass('material-icons');
        nextIconKnot.setHtml('chevron_right');
        nextButton.appendChild(nextIconKnot);
        nextButton.addEventListener('click', this._next.bind(this));
        this.headerKnot.appendChild(nextButton);
    }
    /**
     * @description Creates the main content container knot for calendar cells.
     */
    _initContentKnot() {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.calendarKnot.appendChild(this.contentKnot);
    }
    /**
     * @description Changes the active mode by the given direction offset.
     * @param {number} direction - Offset to move in the modes array (-1 for broader, +1 for narrower).
     */
    _changeMode(direction) {
        const mode = this._getMode(direction);
        this._initMode(mode);
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
     * @description Dispatches to the appropriate callback based on the active mode (DAY, MONTH, or YEAR).
     * @param {Function} dayFun - Callback for DAY mode.
     * @param {Function} monthFun - Callback for MONTH mode.
     * @param {Function} yearFun - Callback for YEAR mode.
     * @returns {Date} The result of the invoked callback.
     */
    _switchMode(dayFun, monthFun, yearFun) {
        let result = null;
        switch (this.activeMode) {
            case 'DAY':
                result = dayFun();
                break;
            case 'MONTH':
                result = monthFun();
                break;
            case 'YEAR':
                result = yearFun();
                break;
            default:
                break;
        }
        return result;
    }
    /**
     * @description Clears the content area and initializes the DOM structure for the given mode.
     * @param {string} mode - The mode to activate ('DAY', 'MONTH', or 'YEAR').
     */
    _initMode(mode) {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
        this._switchMode(this._initDaysMode.bind(this), this._initMonthsMode.bind(this), this._initYearsMode.bind(this));
    }
    /**
     * @description Creates the years container knot for YEAR mode.
     */
    _initYearsMode() {
        this.yearsKnot = new Knot('div');
        this.yearsKnot.addClass('years');
        this.contentKnot.appendChild(this.yearsKnot);
    }
    /**
     * @description Creates the months container knot for MONTH mode.
     */
    _initMonthsMode() {
        this.monthsKnot = new Knot('div');
        this.monthsKnot.addClass('months');
        this.contentKnot.appendChild(this.monthsKnot);
    }
    /**
     * @description Creates the week-days header and days container knots for DAY mode.
     */
    _initDaysMode() {
        this.weekDaysKnot = new Knot('div');
        this.weekDaysKnot.addClass('week-days');
        this.contentKnot.appendChild(this.weekDaysKnot);
        this.daysKnot = new Knot('div');
        this.daysKnot.addClass('days');
        this.contentKnot.appendChild(this.daysKnot);
    }
    /**
     * @description Navigates the calendar to the previous period based on the active mode.
     */
    _previous() {
        const date = this._switchMode(() => {
            return this.previous.month;
        }, () => {
            return this.previous.year;
        }, () => {
            let date = DateIO.subYears(this.current.day, this.maxYears);
            if (DateIO.getYear(date) < 0) {
                date = this.current.day;
            }
            return date;
        });
        this._setDate(date);
        this.draw();
    }
    /**
     * @description Navigates the calendar to the next period based on the active mode.
     */
    _next() {
        const date = this._switchMode(() => {
            return this.next.month;
        }, () => {
            return this.next.year;
        }, () => {
            return DateIO.addYears(this.current.day, this.maxYears);
        });
        this._setDate(date);
        this.draw();
    }
    /**
     * @description Sets the current date, recalculates variables, and populates day cells for all three months.
     * @param {Date} date - The date to center the calendar on.
     */
    _setDate(date) {
        this._setVariables(date);
        this._setPreviousMonth();
        this._setCurrentMonth();
        this._setNextMonth();
    }
    /**
     * @description Resets the days array and computes previous, current, and next date references.
     * @param {Date} date - The reference date for calculations.
     */
    _setVariables(date) {
        this.days = [];
        this.previous = {
            day: DateIO.subDays(date, 1),
            month: DateIO.subMonths(date, 1),
            year: DateIO.subYears(date, 1),
        };
        this.current = {
            day: date,
        };
        this.next = {
            day: DateIO.addDays(date, 1),
            month: DateIO.addMonths(date, 1),
            year: DateIO.addYears(date, 1),
        };
    }
    /**
     * @description Renders the calendar content for the current active mode.
     * @example
     * calendar.draw();
     */
    draw() {
        this._switchMode(this._drawDaysStructure.bind(this), this._drawMonthsStructure.bind(this), this._drawYearsStructure.bind(this));
    }
    /**
     * @description Draws the header, week-day labels, and day cells for DAY mode.
     */
    _drawDaysStructure() {
        this._drawHeader('YYYY MMMM');
        this._drawWeekDays();
        this._drawDays();
    }
    /**
     * @description Draws the header and month cells for MONTH mode.
     */
    _drawMonthsStructure() {
        this._drawHeader('YYYY');
        this._drawMonths();
    }
    /**
     * @description Draws the header and year cells for YEAR mode.
     */
    _drawYearsStructure() {
        this._drawHeader(null);
        this._drawYears();
    }
    /**
     * @description Renders the header text using the given date format string.
     * @param {string | null} format - The {@link DateIO} format string, or null for empty header.
     */
    _drawHeader(format) {
        this.currentModeKnot.removeChildren();
        const text = format ? DateIO.format(this.current.day, format) : '';
        this.currentModeKnot.setHtml(text);
    }
    /**
     * @description Creates and renders {@link Month} cells for all 12 months of the current year.
     */
    _drawMonths() {
        this.monthsKnot.removeChildren();
        for (let i = 0; i < this.maxMonths; i++) {
            const month = new Month(DateIO.setMonth(this.current.day, i), this.selectedDate, {});
            month.eventClick = this._onClick.bind(this);
            const monthKnot = month.getKnot();
            this.monthsKnot.appendChild(monthKnot);
        }
    }
    /**
     * @description Creates and renders {@link Year} cells for a block of years aligned to maxYears.
     */
    _drawYears() {
        this.yearsKnot.removeChildren();
        const startYear = DateIO.getYear(this.current.day) -
            (DateIO.getYear(this.current.day) % this.maxYears);
        for (let i = startYear; i < startYear + this.maxYears; i++) {
            const year = new Year(DateIO.setYear(this.current.day, i), this.selectedDate, {});
            year.eventClick = this._onClick.bind(this);
            const yearKnot = year.getKnot();
            this.yearsKnot.appendChild(yearKnot);
        }
    }
    /**
     * @description Renders the abbreviated week-day labels (e.g., Mo, Tu) in the header row.
     */
    _drawWeekDays() {
        this.weekDaysKnot.removeChildren();
        const firstDOW = DateIO.startOfWeek(new Date());
        for (let i = 0; i < 7; i++) {
            const text = DateIO.format(DateIO.addDays(firstDOW, i), 'EEEEEE');
            const knot = new Knot('span');
            knot.addClass('day');
            knot.setHtml(text);
            this.weekDaysKnot.appendChild(knot);
        }
    }
    /**
     * @description Appends all pre-built {@link Day} knots into the days container.
     */
    _drawDays() {
        this.daysKnot.removeChildren();
        for (let i = 0; i < this.days.length; i++) {
            const day = this.days[i];
            const dayKnot = day.getKnot();
            this.daysKnot.appendChild(dayKnot);
        }
    }
    /**
     * @description Populates trailing {@link Day} cells from the previous month to fill the first week row.
     */
    _setPreviousMonth() {
        const diffDays = DateIO.getDay(DateIO.endOfMonth(this.previous.month));
        const daysInMonth = DateIO.getDaysInMonth(this.previous.month);
        for (let i = daysInMonth - diffDays; i <= daysInMonth; i++) {
            const date = DateIO.setDate(this.previous.month, i);
            const day = new Day(date, this.selectedDate, {
                css_class: 'previous-month',
            });
            day.eventClick = this._onClick.bind(this);
            this.days.push(day);
        }
    }
    /**
     * @description Populates {@link Day} cells for each day in the current month.
     */
    _setCurrentMonth() {
        const daysInMonth = DateIO.getDaysInMonth(this.current.day);
        for (let i = 1; i <= daysInMonth; i++) {
            const date = DateIO.setDate(this.current.day, i);
            const day = new Day(date, this.selectedDate, {
                css_class: 'current-month',
            });
            day.eventClick = this._onClick.bind(this);
            this.days.push(day);
        }
    }
    /**
     * @description Populates leading {@link Day} cells from the next month to fill the remaining grid slots.
     */
    _setNextMonth() {
        const diffDays = this.maxDays - this.days.length;
        for (let i = 1; i <= diffDays; i++) {
            const date = DateIO.setDate(this.next.month, i);
            const day = new Day(date, this.selectedDate, {
                css_class: 'next-month',
            });
            day.eventClick = this._onClick.bind(this);
            this.days.push(day);
        }
    }
    /**
     * @description Updates the selected and current date based on the active mode's granularity.
     * @param {Date} selectedDate - The date selected by the user.
     */
    _setModeDate(selectedDate) {
        let date = this.current.day;
        this._switchMode(() => {
            date = DateIO.setMonth(date, DateIO.getMonth(selectedDate));
            date = DateIO.setDate(date, DateIO.getDate(selectedDate));
        }, () => {
            date = DateIO.setMonth(date, DateIO.getMonth(selectedDate));
        }, () => {
            date = DateIO.setYear(date, DateIO.getYear(selectedDate));
        });
        this._setSelectedDate(date);
        this._setDate(date);
    }
    /**
     * @description Handles click on a day, month, or year cell; updates state, advances mode, and redraws.
     * @param {Date} selectedDate - The date associated with the clicked cell.
     */
    _onClick(selectedDate) {
        this._setModeDate(selectedDate);
        const mode = this.types[this.options.type];
        if (this.activeMode !== mode) {
            this._changeMode(1);
        }
        this.draw();
        this.eventClick(selectedDate);
    }
    /**
     * @description Stores the given date as the currently selected date.
     * @param {Date} date - The date to mark as selected.
     */
    _setSelectedDate(date) {
        this.selectedDate = date;
    }
    /**
     * @description Overridable callback fired when a date is selected. Defaults to a debug log.
     * @param {Date} date - The selected date.
     * @example
     * calendar.eventClick = (date) => { console.log('Selected:', date); };
     */
    eventClick(date) {
        consoleDebug('Calendar.eventClick()', date);
    }
}
