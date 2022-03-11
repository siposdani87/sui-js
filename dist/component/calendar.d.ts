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
    constructor(node: Item, options: object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: object): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStructure(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHeaderNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initContentNode(): void;
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    _changeMode(direction: number): void;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    _getMode(direction: number): string;
    /**
     * @private
     * @param {!Function} dayFun
     * @param {!Function} monthFun
     * @param {!Function} yearFun
     * @return {!Object}
     */
    _switchMode(dayFun: Function, monthFun: Function, yearFun: Function): object;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _initMode(mode: string): void;
    /**
     * @private
     * @return {undefined}
     */
    _initYearsMode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initMonthsMode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initDaysMode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _previous(): void;
    /**
     * @private
     * @return {undefined}
     */
    _next(): void;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    _setDate(date: object): void;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    _setVariables(date: object): void;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawDaysStructure(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawMonthsStructure(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawYearsStructure(): void;
    /**
     * @private
     * @param {string|null} format
     * @return {undefined}
     */
    _drawHeader(format: string | null): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawMonths(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawYears(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawWeekDays(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawDays(): void;
    /**
     * @private
     * @param {number} year
     * @param {number} month
     * @param {number} day
     * @return {string}
     */
    _getDate(year: number, month: number, day: number): string;
    /**
     * @private
     * @return {undefined}
     */
    _setPreviousMonth(): void;
    /**
     * @private
     * @return {undefined}
     */
    _setCurrentMonth(): void;
    /**
     * @private
     * @return {undefined}
     */
    _setNextMonth(): void;
    /**
     * @private
     * @param {!Object} selectedDate
     * @return {undefined}
     */
    _setModeDate(selectedDate: object): void;
    /**
     * @private
     * @param {!Object} selectedDate
     * @return {undefined}
     */
    _onClick(selectedDate: object): void;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    _setSelectedDate(date: object): void;
    /**
     * @param {!Object} date
     * @return {undefined}
     */
    eventClick(date: object): void;
}
