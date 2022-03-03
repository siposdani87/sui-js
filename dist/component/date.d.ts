import { Item } from '../core/item';
/**
 * @class
 */
export declare class Date {
    datetimeNode: any;
    options: any;
    types: {
        'datetime-local': {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        datetime: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        date: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        time: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        month: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        week: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
        year: {
            format: string;
            calendar_type: string;
            clock_type: string;
        };
    };
    config: any;
    calendarNode: Item;
    clockNode: Item;
    value: any;
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
    _initVariables(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStructure(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initDateTimeNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initCalendarNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initClockNode(): void;
    /**
     * @return {!Object}
     */
    getConfig(): any;
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setValue(value: any): void;
    /**
     * @param {string} value
     * @return {undefined}
     */
    setValue(value: any): void;
    /**
     * @return {string}
     */
    getValue(): any;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawCalendar(): void;
    /**
     * @private
     * @return {undefined}
     */
    _drawClock(): void;
    /**
     * @private
     * @return {undefined}
     */
    _onClick(): void;
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventClick(value: any): void;
}
