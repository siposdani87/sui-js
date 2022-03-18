import { Item } from '../core/item';
/**
 * @class
 */
export declare class Clock {
    clockNode: Item;
    options: any;
    modes: string[];
    types: {
        hour: string;
        minute: string;
    };
    activeMode: string;
    headerNode: Item;
    periodHeaderNode: Item;
    period: string;
    time: any;
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
    _setOptions(options: Object): void;
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
    _switchMode(hourCallback: Function, minuteCallback: Function): void;
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
    _setMode(mode: string): void;
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
    _getTimeNode(): Item;
    /**
     * @private
     * @param {number} hours
     * @return {undefined}
     */
    _setHours(hours: number): void;
    /**
     * @private
     * @param {number} minutes
     * @return {undefined}
     */
    _setMinutes(minutes: number): void;
    /**
     * @private
     * @param {string} period
     * @return {undefined}
     */
    _setPeriod(period: string): void;
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    setTime(time: Object): void;
    /**
     * @private
     * @param {string} mode
     * @return {undefined}
     */
    _initMode(mode: string): void;
    /**
     * @private
     * @param {number} direction
     * @return {string}
     */
    _getMode(direction: number): string;
    /**
     * @private
     * @param {number} direction
     * @return {undefined}
     */
    _changeMode(direction: number): void;
    /**
     * @return {undefined}
     */
    draw(): void;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    _drawMinutes(timeNode: Item): void;
    /**
     * @private
     * @param {!Item} timeNode
     * @return {undefined}
     */
    _drawHours(timeNode: Item): void;
    /**
     * @private
     * @param {!Object} selectedTime
     * @return {undefined}
     */
    _onClick(selectedTime: Object): void;
    /**
     * @param {!Object} time
     * @return {undefined}
     */
    eventClick(time: Object): void;
}
