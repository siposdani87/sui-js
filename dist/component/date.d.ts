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
    _setOptions(options: Object): void;
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
     * @return {!DateConfig}
     */
    getConfig(): DateConfig;
    /**
     * @private
     * @param {string} value
     * @return {undefined}
     */
    _setValue(value: string): void;
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
    eventClick(value: string): void;
}
export {};
