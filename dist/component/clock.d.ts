import { Item } from '../core/item';
/**
 * @class
 */
export declare class Clock {
    clockNode: any;
    options: any;
    modes: string[];
    types: {
        hour: any;
        minute: any;
    };
    activeMode: any;
    headerNode: Item;
    periodHeaderNode: Item;
    period: string;
    time: any;
    minutesHeaderNode: Item;
    hoursHeaderNode: Item;
    contentNode: Item;
    hours: any;
    minutes: any;
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
     * @param {!Function} hourCallback
     * @param {!Function} minuteCallback
     * @return {undefined}
     */
    _switchMode(hourCallback: any, minuteCallback: any): any;
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
    _initPeriodHeaderNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _togglePeriod(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initMinutesHeaderNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHoursHeaderNode(): void;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _setMode(mode: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _initSeparatorHeaderNode(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initContentNode(): void;
    /**
     * @private
     * @return {!Item}
     */
    _getTimeNode(): Item<HTMLElement>;
    /**
     * @private
     * @param {number} hours
     * @return {undefined}
     */
    _setHours(hours: any): void;
    /**
     * @private
     * @param {number} minutes
     * @return {undefined}
     */
    _setMinutes(minutes: any): void;
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    _setPeriod(period: any): void;
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    setTime(time: any): void;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _initMode(mode: any): void;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    _getMode(direction: any): any;
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    _changeMode(direction: any): void;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    _drawMinutes(timeNode: any): void;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    _drawHours(timeNode: any): void;
    /**
     * @private
     * @param {!Object} selectedTime
     * @return {undefined}
     */
    _onClick(selectedTime: any): void;
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    eventClick(time: any): void;
}
