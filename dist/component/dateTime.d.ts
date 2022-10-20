import { Objekt } from '../core';
import { Knot } from '../core/knot';
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
    datetimeKnot: Knot;
    options: Objekt;
    types: {
        [key: string]: DateTimeConfig;
    };
    config: DateTimeConfig;
    calendarKnot: Knot;
    clockKnot: Knot;
    value: Date;
    /**
     * @param {!Knot} knot
     * @param {!Object} options
     */
    constructor(knot: Knot, options: Object);
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
    private _initDateTimeKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _initCalendarKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _initClockKnot;
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
