import { Item } from '../core/item';
/**
 * @class
 */
export declare class Calendar {
    calendarNode: Item;
    options: any;
    maxDays: number;
    maxMonths: number;
    maxYears: number;
    modes: string[];
    activeMode: string;
    types: {
        date: string;
        month: string;
        year: string;
        week: string;
        range: string;
    };
    headerNode: Item;
    currentModeNode: Item;
    contentNode: Item;
    yearsNode: Item;
    monthsNode: Item;
    weekDaysNode: Item;
    daysNode: Item;
    previous: {
        day: string;
        month: string;
        year: string;
    };
    current: {
        day: string;
    };
    next: {
        day: string;
        month: string;
        year: string;
    };
    days: any[];
    selectedDate: any;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node: Item, options: Object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initStructure;
    /**
     * @private
     * @return {undefined}
     */
    private _initHeaderNode;
    /**
     * @private
     * @return {undefined}
     */
    private _initContentNode;
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    private _changeMode;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    private _getMode;
    /**
     * @private
     * @param {!Function} dayFun
     * @param {!Function} monthFun
     * @param {!Function} yearFun
     * @return {!Object}
     */
    private _switchMode;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    private _initMode;
    /**
     * @private
     * @return {undefined}
     */
    private _initYearsMode;
    /**
     * @private
     * @return {undefined}
     */
    private _initMonthsMode;
    /**
     * @private
     * @return {undefined}
     */
    private _initDaysMode;
    /**
     * @private
     * @return {undefined}
     */
    private _previous;
    /**
     * @private
     * @return {undefined}
     */
    private _next;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    private _setDate;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    private _setVariables;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _drawDaysStructure;
    /**
     * @private
     * @return {undefined}
     */
    private _drawMonthsStructure;
    /**
     * @private
     * @return {undefined}
     */
    private _drawYearsStructure;
    /**
     * @private
     * @param {string|null} format
     * @return {undefined}
     */
    private _drawHeader;
    /**
     * @private
     * @return {undefined}
     */
    private _drawMonths;
    /**
     * @private
     * @return {undefined}
     */
    private _drawYears;
    /**
     * @private
     * @return {undefined}
     */
    private _drawWeekDays;
    /**
     * @private
     * @return {undefined}
     */
    private _drawDays;
    /**
     * @private
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @return {string}
     */
    private _getDate;
    /**
     * @private
     * @return {undefined}
     */
    private _setPreviousMonth;
    /**
     * @private
     * @return {undefined}
     */
    private _setCurrentMonth;
    /**
     * @private
     * @return {undefined}
     */
    private _setNextMonth;
    /**
     * @private
     * @param {!Object} selectedDate
     * @return {undefined}
     */
    private _setModeDate;
    /**
     * @private
     * @param {!Object} selectedDate
     * @return {undefined}
     */
    private _onClick;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    private _setSelectedDate;
    /**
     * @param {!Object} date
     * @return {undefined}
     */
    eventClick(date: Object): void;
}
