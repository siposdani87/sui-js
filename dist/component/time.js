import { Objekt } from '../core';
import { Knot } from '../core/knot';
import { consoleDebug } from '../utils/log';
export class Time {
    constructor(knot, options) {
        this.timeKnot = knot;
        this._setOptions(options);
        this._init();
    }
    _setOptions(options) {
        this.options = new Objekt(options);
    }
    _init() {
        this._initCircleKnot();
        this._initPointerKnot();
    }
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
    _initSize(width, height) {
        const timeKnotStyle = window.getComputedStyle(this.timeKnot.getNode());
        this.options.width =
            parseInt(timeKnotStyle.width.slice(0, -2), 10) - width;
        this.options.height =
            parseInt(timeKnotStyle.height.slice(0, -2), 10) - height;
        this.options.radius_x = this.options.width / 2;
        this.options.radius_y = this.options.height / 2;
    }
    _initPointerKnot() {
        const centerPointKnot = new Knot('div');
        centerPointKnot.addClass('center-point');
        this.timeKnot.appendChild(centerPointKnot);
        this.pointerKnot = new Knot('div');
        this.pointerKnot.addClass('pointer');
        this.timeKnot.appendChild(this.pointerKnot);
    }
    draw(start, n, opt_j = 1, opt_isClockWise = true) {
        this._drawCircles(start, n, opt_j, opt_isClockWise);
    }
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
    _setCircleEvent(circle, i) {
        circle.setData('index', i);
        circle.addEventListener('click', (circle) => {
            const index = circle.getData('index');
            this.eventClick(index);
        });
    }
    _setCircleStyle(circle, start, n, i, opt_j = 1, opt_isClockWise = true) {
        const index = opt_j / 2 > i % opt_j ? i % opt_j : opt_j - (i % opt_j);
        const selected = this.options.selected === i ? 'selected' : null;
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
    eventClick(index) {
        consoleDebug('Time.eventClick()', index);
    }
}
