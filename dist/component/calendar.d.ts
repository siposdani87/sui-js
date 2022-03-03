/**
 * @class
 */
export declare class Calendar {
    calendarNode: any;
    options: any;
    maxDays: number;
    maxMonths: number;
    maxYears: number;
    modes: string[];
    activeMode: string;
    types: {
        date: any;
        month: any;
        year: any;
        week: any;
        range: any;
    };
    headerNode: any;
    currentModeNode: any;
    contentNode: any;
    yearsNode: any;
    monthsNode: any;
    weekDaysNode: any;
    daysNode: any;
    previous: any;
    current: any;
    next: any;
    days: any[];
    selectedDate: any;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node: any, options: any);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: any): void;
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
    _changeMode(direction: any): void;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    _getMode(direction: any): any;
    /**
     * @private
     * @param {!Function} dayFun
     * @param {!Function} monthFun
     * @param {!Function} yearFun
     * @return {!Object}
     */
    _switchMode(dayFun: any, monthFun: any, yearFun: any): any;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _initMode(mode: any): void;
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
    _setDate(date: any): void;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    _setVariables(date: any): void;
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
    _drawHeader(format: any): void;
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
    _getDate(year: any, month: any, day: any): string;
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
    _setModeDate(selectedDate: any): void;
    /**
     * @private
     * @param {!Object} selectedDate
     * @return {undefined}
     */
    _onClick(selectedDate: any): void;
    /**
     * @private
     * @param {!Object} date
     * @return {undefined}
     */
    _setSelectedDate(date: any): void;
    /**
     * @param {!Object} date
     * @return {undefined}
     */
    eventClick(date: any): void;
}
