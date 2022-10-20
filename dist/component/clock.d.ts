import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @class
 */
export declare class Clock {
    clockNode: Knot;
    options: Objekt;
    modes: string[];
    types: {
        hour: string;
        minute: string;
    };
    activeMode: string;
    headerNode: Knot;
    periodHeaderNode: Knot;
    period: string;
    time: Date;
    minutesHeaderNode: Knot;
    hoursHeaderNode: Knot;
    contentNode: Knot;
    hours: number;
    minutes: number;
    /**
     * @param {!Knot} node
     * @param {!Object} options
     */
    constructor(node: Knot, options: Object);
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
     * @return {!Knot}
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
     * @param {!Knot} timeNode
     * @return {undefined}
     */
    private _drawMinutes;
    /**
     * @private
     * @param {!Knot} timeNode
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
