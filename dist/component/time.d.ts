import { Objekt } from '../core';
import { Item } from '../core/item';
/**
 * @class
 */
export declare class Time {
    timeNode: Item;
    options: Objekt;
    pointerNode: Item;
    /**
     * @param {!Item} node
     * @param {!Object} options
     */
    constructor(node: Item, options: object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: object): void;
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
    _initSize(width: number, height: number): void;
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
    draw(start: number, n: number, opt_j?: number | undefined, opt_isClockWise?: boolean | undefined): void;
    /**
     * @private
     * @param {number} start
     * @param {number} n
     * @param {number=} opt_j
     * @param {boolean=} opt_isClockWise
     * @return {undefined}
     */
    _drawCircles(start: number, n: number, opt_j?: number | undefined, opt_isClockWise?: boolean | undefined): void;
    /**
     * @private
     * @param {!Item} circle
     * @param {number} i
     * @return {undefined}
     */
    _setCircleEvent(circle: Item, i: number): void;
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
    _setCircleStyle(circle: Item, start: number, n: number, i: number, opt_j?: number | undefined, opt_isClockWise?: boolean | undefined): void;
    /**
     * @param {number} index
     */
    eventClick(index: number): void;
}
