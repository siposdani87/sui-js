import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @class
 */
export declare class Time {
    timeNode: Knot;
    options: Objekt;
    pointerNode: Knot;
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
     * @return {undefined}
     */
    private _initCircleNode;
    /**
     * @private
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    private _initSize;
    /**
     * @private
     * @return {undefined}
     */
    private _initPointerNode;
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
    private _drawCircles;
    /**
     * @private
     * @param {!Knot} circle
     * @param {number} i
     * @return {undefined}
     */
    private _setCircleEvent;
    /**
     * @private
     * @param {!Knot} circle
     * @param {number} start
     * @param {number} n
     * @param {number} i
     * @param {number=} opt_j
     * @param {boolean=} opt_isClockWise
     * @return {undefined}
     */
    private _setCircleStyle;
    /**
     * @param {number} index
     */
    eventClick(index: number): void;
}
