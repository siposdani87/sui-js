import { Item } from '../core/item';
/**
 * @class
 */
export declare class Time {
    timeNode: any;
    options: any;
    pointerNode: Item;
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
    _initCircleNode(): void;
    /**
     * @private
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    _initSize(width: any, height: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _initPointerNode(): void;
    /**
     * @param {number} start
     * @param {number} n
     * @param {number=} opt_j
     * @param {boolean=} opt_isClockWise
     * @return {undefined}
     */
    draw(start: any, n: any, opt_j?: number, opt_isClockWise?: boolean): void;
    /**
     * @private
     * @param {number} start
     * @param {number} n
     * @param {number=} opt_j
     * @param {boolean=} opt_isClockWise
     * @return {undefined}
     */
    _drawCircles(start: any, n: any, opt_j?: number, opt_isClockWise?: boolean): void;
    /**
     * @private
     * @param {!Item} circle
     * @param {number} i
     * @return {undefined}
     */
    _setCircleEvent(circle: any, i: any): void;
    /**
     * @private
     * @param {!Item} circle
     * @param {number} start
     * @param {number} n
     * @param {number} i
     * @param {number=} opt_j
     * @param {boolean=} opt_isClockWise
     * @return {undefined}
     */
    _setCircleStyle(circle: any, start: any, n: any, i: any, opt_j?: number, opt_isClockWise?: boolean): void;
    /**
     * @param {number} index
     */
    eventClick(index: any): void;
}
