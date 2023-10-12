import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Day } from './day';
import { Month } from './month';
import { Year } from './year';
/**
 * @class
 */
export class Calendar {
    /**
     * @param {!Knot} knot
     * @param {!Object} options
     */
    constructor(knot, options) {
        this.calendarKnot = knot;
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    _initContentKnot() {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.calendarKnot.appendChild(this.contentKnot);
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
     * @param {!Function} dayFun
     * @param {!Function} monthFun
     * @param {!Function} yearFun
     * @return {!Object}
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
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _initMode(mode) {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
        this._switchMode(this._initDaysMode.bind(this), this._initMonthsMode.bind(this), this._initYearsMode.bind(this));
    }
    /**
     * @private
     * @return {undefined}
     */
    _initYearsMode() {
        this.yearsKnot = new Knot('div');
        this.yearsKnot.addClass('years');
        this.contentKnot.appendChild(this.yearsKnot);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initMonthsMode() {
        this.monthsKnot = new Knot('div');
        this.monthsKnot.addClass('months');
        this.contentKnot.appendChild(this.monthsKnot);
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {!Date} date
     * @return {undefined}
     */
    _setDate(date) {
        this._setVariables(date);
        this._setPreviousMonth();
        this._setCurrentMonth();
        this._setNextMonth();
    }
    /**
     * @private
     * @param {!Date} date
     * @return {undefined}
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
     * @return {undefined}
     */
    draw() {
        this._switchMode(this._drawDaysStructure.bind(this), this._drawMonthsStructure.bind(this), this._drawYearsStructure.bind(this));
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawDaysStructure() {
        this._drawHeader('YYYY MMMM');
        this._drawWeekDays();
        this._drawDays();
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawMonthsStructure() {
        this._drawHeader('YYYY');
        this._drawMonths();
    }
    /**
     * @private
     * @return {undefined}
     */
    _drawYearsStructure() {
        this._drawHeader(null);
        this._drawYears();
    }
    /**
     * @private
     * @param {string|null} format
     * @return {undefined}
     */
    _drawHeader(format) {
        this.currentModeKnot.removeChildren();
        const text = format ? DateIO.format(this.current.day, format) : '';
        this.currentModeKnot.setHtml(text);
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @param {!Date} selectedDate
     * @return {undefined}
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
     * @private
     * @param {!Date} selectedDate
     * @return {undefined}
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
     * @private
     * @param {!Date} date
     * @return {undefined}
     */
    _setSelectedDate(date) {
        this.selectedDate = date;
    }
    /**
     * @param {!Date} date
     * @return {undefined}
     */
    eventClick(date) {
        consoleDebug('Calendar.eventClick()', date);
    }
}
