import { Objekt } from '../core';
import { Knot } from '../core/knot';
/**
 * @description Circular time selector that renders numbered circles arranged in a ring for hour or minute selection.
 * @example
 * const timeKnot = new Knot('div');
 * const time = new Time(timeKnot, { selected: 5 });
 * time.eventClick = (index) => { console.log(index); };
 * time.draw(1, 12, 1, true);
 * @see {@link Clock}
 * @category Component
 */
export declare class Time {
    timeKnot: Knot;
    options: Objekt;
    pointerKnot: Knot;
    /**
     * @description Creates a new Time instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `selected` (index) and optional `captions` array.
     * @example
     * const time = new Time(new Knot('div'), { selected: 10, captions: ['00', '05'] });
     */
    constructor(knot: Knot, options: object);
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes the circle sizing reference and the center pointer elements.
     */
    private _init;
    /**
     * @description Creates a temporary circle element to measure its computed dimensions for layout calculations.
     */
    private _initCircleKnot;
    /**
     * @description Computes the available width/height and radius values for circle positioning.
     * @param {number} width - The measured width of a single circle element.
     * @param {number} height - The measured height of a single circle element.
     */
    private _initSize;
    /**
     * @description Creates the center point and rotating pointer elements for the clock face.
     */
    private _initPointerKnot;
    /**
     * @description Renders numbered circles arranged in a ring from start to n.
     * @param {number} start - The starting index value.
     * @param {number} n - The ending index value (inclusive).
     * @param {number} [opt_j=1] - The step interval for displaying captions.
     * @param {boolean} [opt_isClockWise=true] - Whether circles are arranged clockwise.
     * @example
     * time.draw(1, 12, 1, true);   // Hours: 1-12
     * time.draw(0, 59, 5, true);   // Minutes: 0-59 with labels every 5
     */
    draw(start: number, n: number, opt_j?: number | undefined, opt_isClockWise?: boolean | undefined): void;
    /**
     * @description Creates circle elements for each index value, positions them in a ring, and attaches click handlers.
     * @param {number} start - The starting index value.
     * @param {number} n - The ending index value (inclusive).
     * @param {number} [opt_j=1] - The step interval for displaying captions.
     * @param {boolean} [opt_isClockWise=true] - Whether circles are arranged clockwise.
     */
    private _drawCircles;
    /**
     * @description Attaches the index data attribute and click event handler to a circle element.
     * @param {Knot} circle - The circle knot element.
     * @param {number} i - The index value to associate with this circle.
     */
    private _setCircleEvent;
    /**
     * @description Positions a circle element using trigonometric calculations and applies selection/highlight styles.
     * @param {Knot} circle - The circle knot element to style.
     * @param {number} start - The starting index of the range.
     * @param {number} n - The ending index of the range.
     * @param {number} i - The current index value.
     * @param {number} [opt_j=1] - The step interval for highlight grouping.
     * @param {boolean} [opt_isClockWise=true] - Whether the layout direction is clockwise.
     */
    private _setCircleStyle;
    /**
     * @description Overridable callback fired when a circle is clicked. Defaults to a debug log.
     * @param {number} index - The index value of the clicked circle.
     * @example
     * time.eventClick = (index) => { console.log('Selected:', index); };
     */
    eventClick(index: number): void;
}
