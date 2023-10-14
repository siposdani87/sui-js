import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { DateIO } from '../utils';
import { consoleDebug } from '../utils/log';
import { Day } from './day';
import { Month } from './month';
import { Year } from './year';
export class Calendar {
    constructor(knot, options) {
        this.calendarKnot = knot;
        this._setOptions(options);
        this._init();
    }
    _setOptions(options) {
        this.options = new Objekt(options);
    }
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
    _initStructure() {
        this._initHeaderKnot();
        this._initContentKnot();
        this._initMode(this.types[this.options.type]);
        const date = this.options.date;
        this._setSelectedDate(date);
        this._setDate(date);
    }
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
    _initContentKnot() {
        this.contentKnot = new Knot('div');
        this.contentKnot.addClass('content');
        this.calendarKnot.appendChild(this.contentKnot);
    }
    _changeMode(direction) {
        const mode = this._getMode(direction);
        this._initMode(mode);
    }
    _getMode(direction) {
        let position = this.modes.indexOf(this.activeMode);
        if (position !== -1) {
            position += direction;
        }
        const mode = this.modes[position];
        return mode ? mode : this.types[this.options.type];
    }
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
    _initMode(mode) {
        this.contentKnot.removeChildren();
        this.activeMode = mode;
        this._switchMode(this._initDaysMode.bind(this), this._initMonthsMode.bind(this), this._initYearsMode.bind(this));
    }
    _initYearsMode() {
        this.yearsKnot = new Knot('div');
        this.yearsKnot.addClass('years');
        this.contentKnot.appendChild(this.yearsKnot);
    }
    _initMonthsMode() {
        this.monthsKnot = new Knot('div');
        this.monthsKnot.addClass('months');
        this.contentKnot.appendChild(this.monthsKnot);
    }
    _initDaysMode() {
        this.weekDaysKnot = new Knot('div');
        this.weekDaysKnot.addClass('week-days');
        this.contentKnot.appendChild(this.weekDaysKnot);
        this.daysKnot = new Knot('div');
        this.daysKnot.addClass('days');
        this.contentKnot.appendChild(this.daysKnot);
    }
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
    _setDate(date) {
        this._setVariables(date);
        this._setPreviousMonth();
        this._setCurrentMonth();
        this._setNextMonth();
    }
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
    draw() {
        this._switchMode(this._drawDaysStructure.bind(this), this._drawMonthsStructure.bind(this), this._drawYearsStructure.bind(this));
    }
    _drawDaysStructure() {
        this._drawHeader('YYYY MMMM');
        this._drawWeekDays();
        this._drawDays();
    }
    _drawMonthsStructure() {
        this._drawHeader('YYYY');
        this._drawMonths();
    }
    _drawYearsStructure() {
        this._drawHeader(null);
        this._drawYears();
    }
    _drawHeader(format) {
        this.currentModeKnot.removeChildren();
        const text = format ? DateIO.format(this.current.day, format) : '';
        this.currentModeKnot.setHtml(text);
    }
    _drawMonths() {
        this.monthsKnot.removeChildren();
        for (let i = 0; i < this.maxMonths; i++) {
            const month = new Month(DateIO.setMonth(this.current.day, i), this.selectedDate, {});
            month.eventClick = this._onClick.bind(this);
            const monthKnot = month.getKnot();
            this.monthsKnot.appendChild(monthKnot);
        }
    }
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
    _drawDays() {
        this.daysKnot.removeChildren();
        for (let i = 0; i < this.days.length; i++) {
            const day = this.days[i];
            const dayKnot = day.getKnot();
            this.daysKnot.appendChild(dayKnot);
        }
    }
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
    _onClick(selectedDate) {
        this._setModeDate(selectedDate);
        const mode = this.types[this.options.type];
        if (this.activeMode !== mode) {
            this._changeMode(1);
        }
        this.draw();
        this.eventClick(selectedDate);
    }
    _setSelectedDate(date) {
        this.selectedDate = date;
    }
    eventClick(date) {
        consoleDebug('Calendar.eventClick()', date);
    }
}
