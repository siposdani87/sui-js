import { Item } from '../core/item';
/**
 * @typedef {{format: string; calendar_type: string; clock_type: string;}} DateConfig
 */
declare type DateConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};
/**
 * @class
 */
export declare class Date {
    datetimeNode: Item;
    options: any;
    types: {
        [key: string]: DateConfig;
    };
    config: DateConfig;
    calendarNode: Item;
    clockNode: Item;
    value: string | Object;
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
    private _initVariables;
    /**
     * @private
     * @return {undefined}
     */
    private _initStructure;
    /**
     * @private
     * @return {undefined}
     */
    private _initDateTimeNode;
    /**
     * @private
     * @return {undefined}
     */
    private _initCalendarNode;
    /**
     * @private
     * @return {undefined}
     */
    private _initClockNode;
    /**
     * @return {!DateConfig}
     */
    getConfig(): DateConfig;
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    private _setValue;
    /**
     * @param {string} value
     * @return {undefined}
     */
    setValue(value: string): void;
    /**
     * @return {string}
     */
    getValue(): string;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @return {undefined}
     */
    private _drawCalendar;
    /**
     * @private
     * @return {undefined}
     */
    private _drawClock;
    /**
     * @private
     * @return {undefined}
     */
    private _onClick;
    /**
     * @param {string} value
     * @return {undefined}
     */
    eventClick(value: string): void;
}
export {};
