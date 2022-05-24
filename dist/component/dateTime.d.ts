import { Objekt } from '../core';
import { Item } from '../core/item';
/**
 * @typedef {{format: string; calendar_type: string; clock_type: string;}} DateTimeConfig
 */
declare type DateTimeConfig = {
    format: string;
    calendar_type: string;
    clock_type: string;
};
/**
 * @class
 */
export declare class DateTime {
    datetimeNode: Item;
    options: Objekt;
    types: {
        [key: string]: DateTimeConfig;
    };
    config: DateTimeConfig;
    calendarNode: Item;
    clockNode: Item;
    value: Date;
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
     * @return {!DateTimeConfig}
     */
    getConfig(): DateTimeConfig;
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
    getFormattedValue(): string;
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
