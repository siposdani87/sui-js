import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
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
export class Time {
    /**
     * @description Creates a new Time instance.
     * @param {Knot} knot - The container DOM element wrapper.
     * @param {object} options - Configuration options including `selected` (index) and optional `captions` array.
     * @example
     * const time = new Time(new Knot('div'), { selected: 10, captions: ['00', '05'] });
     */
    constructor(knot, options) {
        this.timeKnot = knot;
        this._setOptions(options);
        this._init();
    }
    /**
     * @description Merges user options into an {@link Objekt} instance.
     * @param {object} options - Raw configuration options.
     */
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    /**
     * @description Initializes the circle sizing reference and the center pointer elements.
     */
    _init() {
        this._initCircleKnot();
        this._initPointerKnot();
    }
    /**
     * @description Creates a temporary circle element to measure its computed dimensions for layout calculations.
     */
    _initCircleKnot() {
        const circleKnot = new Knot('div');
        circleKnot.addClass('circle');
        this.timeKnot.appendChild(circleKnot);
        const circleKnotStyle = window.getComputedStyle(circleKnot.getNode());
        const width = parseInt(circleKnotStyle.width.slice(0, -2), 10);
        const height = parseInt(circleKnotStyle.height.slice(0, -2), 10);
        this.timeKnot.removeChild(circleKnot);
        this._initSize(width, height);
    }
    /**
     * @description Computes the available width/height and radius values for circle positioning.
     * @param {number} width - The measured width of a single circle element.
     * @param {number} height - The measured height of a single circle element.
     */
    _initSize(width, height) {
        const timeKnotStyle = window.getComputedStyle(this.timeKnot.getNode());
        this.options.width =
            parseInt(timeKnotStyle.width.slice(0, -2), 10) - width;
        this.options.height =
            parseInt(timeKnotStyle.height.slice(0, -2), 10) - height;
        this.options.radius_x = this.options.width / 2;
        this.options.radius_y = this.options.height / 2;
    }
    /**
     * @description Creates the center point and rotating pointer elements for the clock face.
     */
    _initPointerKnot() {
        const centerPointKnot = new Knot('div');
        centerPointKnot.addClass('center-point');
        this.timeKnot.appendChild(centerPointKnot);
        this.pointerKnot = new Knot('div');
        this.pointerKnot.addClass('pointer');
        this.timeKnot.appendChild(this.pointerKnot);
    }
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
    draw(start, n, opt_j = 1, opt_isClockWise = true) {
        this._drawCircles(start, n, opt_j, opt_isClockWise);
    }
    /**
     * @description Creates circle elements for each index value, positions them in a ring, and attaches click handlers.
     * @param {number} start - The starting index value.
     * @param {number} n - The ending index value (inclusive).
     * @param {number} [opt_j=1] - The step interval for displaying captions.
     * @param {boolean} [opt_isClockWise=true] - Whether circles are arranged clockwise.
     */
    _drawCircles(start, n, opt_j = 1, opt_isClockWise = true) {
        let k = 0;
        for (let i = start; i <= n; i++) {
            const circle = new Knot('div');
            this.timeKnot.appendChild(circle);
            if (i % opt_j === 0) {
                const text = this.options.captions && this.options.captions[k]
                    ? this.options.captions[k]
                    : i;
                circle.setHtml(text);
                k++;
            }
            this._setCircleStyle(circle, start, n, i, opt_j, opt_isClockWise);
            this._setCircleEvent(circle, i);
        }
    }
    /**
     * @description Attaches the index data attribute and click event handler to a circle element.
     * @param {Knot} circle - The circle knot element.
     * @param {number} i - The index value to associate with this circle.
     */
    _setCircleEvent(circle, i) {
        circle.setData('index', i);
        circle.addEventListener('click', (circle) => {
            const index = circle.getData('index');
            this.eventClick(index);
        });
    }
    /**
     * @description Positions a circle element using trigonometric calculations and applies selection/highlight styles.
     * @param {Knot} circle - The circle knot element to style.
     * @param {number} start - The starting index of the range.
     * @param {number} n - The ending index of the range.
     * @param {number} i - The current index value.
     * @param {number} [opt_j=1] - The step interval for highlight grouping.
     * @param {boolean} [opt_isClockWise=true] - Whether the layout direction is clockwise.
     */
    _setCircleStyle(circle, start, n, i, opt_j = 1, opt_isClockWise = true) {
        const index = opt_j / 2 > i % opt_j ? i % opt_j : opt_j - (i % opt_j);
        const selected = this.options.selected === i ? 'selected' : '';
        const top = this.options.radius_y +
            this.options.radius_y *
                Math.cos((360 / (n + 1 - start) / 180) * i * Math.PI) *
                -1;
        const left = this.options.radius_x +
            this.options.radius_x *
                Math.sin((360 / (n + 1 - start) / 180) * i * Math.PI) *
                (opt_isClockWise ? 1 : -1);
        circle.addClass(['circle', 'highlight' + index, selected]);
        circle.setStyle({
            position: 'absolute',
            'z-index': 100 - index,
            top: top + 'px',
            left: left + 'px',
        });
        if (selected) {
            const radian = (360 / (n + 1 - start) / 180) * i * Math.PI;
            const degrees = radian * (180 / Math.PI) - 90;
            this.pointerKnot.setStyle({
                transform: 'rotate(' + degrees + 'deg)',
            });
        }
    }
    /**
     * @description Overridable callback fired when a circle is clicked. Defaults to a debug log.
     * @param {number} index - The index value of the clicked circle.
     * @example
     * time.eventClick = (index) => { console.log('Selected:', index); };
     */
    eventClick(index) {
        consoleDebug('Time.eventClick()', index);
    }
}
