import { Objekt } from '../core';
import { Item } from '../core/item';
/**
 * @class
 */
export declare class Clock {
    clockNode: Item;
    options: Objekt;
    modes: string[];
    types: {
        hour: string;
        minute: string;
    };
    activeMode: string;
    headerNode: Item;
    periodHeaderNode: Item;
    period: string;
    time: Date;
    minutesHeaderNode: Item;
    hoursHeaderNode: Item;
    contentNode: Item;
    hours: number;
    minutes: number;
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
     * @param {!Function} hourCallback
     * @param {!Function} minuteCallback
     * @return {?Date}
     */
    private _switchMode;
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
    private _initPeriodHeaderNode;
    /**
     * @private
     * @return {undefined}
     */
    private _togglePeriod;
    /**
     * @private
     * @return {undefined}
     */
    private _initMinutesHeaderNode;
    /**
     * @private
     * @return {undefined}
     */
    private _initHoursHeaderNode;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    private _setMode;
    /**
     * @private
     * @return {undefined}
     */
    private _initSeparatorHeaderNode;
    /**
     * @private
     * @return {undefined}
     */
    private _initContentNode;
    /**
     * @private
     * @return {!Item}
     */
    private _getTimeNode;
    /**
     * @private
     * @param {number} hours
     * @return {undefined}
     */
    private _setHours;
    /**
     * @private
     * @param {number} minutes
     * @return {undefined}
     */
    private _setMinutes;
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    private _setPeriod;
    /**
     * @param {!Date} time
     * @return {undefined}
     */
    setTime(time: Date): void;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    private _initMode;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    private _getMode;
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    private _changeMode;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    private _drawMinutes;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    private _drawHours;
    /**
     * @private
     * @param {!Date} selectedTime
     * @return {undefined}
     */
    private _onClick;
    /**
     * @param {!Date} time
     * @return {undefined}
     */
    eventClick(time: Date): void;
}
