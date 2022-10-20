import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @class
 */
export declare class Clock {
    clockKnot: Knot;
    options: Objekt;
    modes: string[];
    types: {
        hour: string;
        minute: string;
    };
    activeMode: string;
    headerKnot: Knot;
    periodHeaderKnot: Knot;
    period: string;
    time: Date;
    minutesHeaderKnot: Knot;
    hoursHeaderKnot: Knot;
    contentKnot: Knot;
    hours: number;
    minutes: number;
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
    private _initHeaderKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _initPeriodHeaderKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _togglePeriod;
    /**
     * @private
     * @return {undefined}
     */
    private _initMinutesHeaderKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _initHoursHeaderKnot;
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
    private _initSeparatorHeaderKnot;
    /**
     * @private
     * @return {undefined}
     */
    private _initContentKnot;
    /**
     * @private
     * @return {!Knot}
     */
    private _getTimeKnot;
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
     * @param {!Knot} timeKnot
     * @return {undefined}
     */
    private _drawMinutes;
    /**
     * @private
     * @param {!Knot} timeKnot
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
