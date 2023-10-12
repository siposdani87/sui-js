import { each, isString, isUndefined, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
/**
 * @class
 */
export class Canvas {
    /**
     * @param {!Knot|string=} opt_selector
     */
    constructor(opt_selector) {
        this._init(opt_selector);
        this._initEvents();
    }
    /**
     * @private
     * @param {!Knot|string=} opt_selector
     * @return {undefined}
     */
    _init(opt_selector) {
        this.canvasKnot = opt_selector;
        if (isString(opt_selector)) {
            this.canvasKnot = new Query(opt_selector).getKnot();
        }
        else if (isUndefined(opt_selector)) {
            this.canvasKnot = new Knot('canvas');
        }
        this.canvasRaw = this.canvasKnot.getNode();
        this.context = this.canvasRaw.getContext('2d');
    }
    /**
     * @private
     * @return {undefined}
     */
    _initEvents() {
        this.canvasKnot.addEventListener('mousemove', (canvasKnot, event) => {
            const rect = canvasKnot.getNode().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.eventMouseMove(x, y);
        });
    }
    /**
     * @param {number} width
     * @return {undefined}
     */
    setWidth(width) {
        this.canvasRaw.width = width;
    }
    /**
     * @return {number}
     */
    getWidth() {
        return this.canvasRaw.width;
    }
    /**
     * @param {number} height
     * @return {undefined}
     */
    setHeight(height) {
        this.canvasRaw.height = height;
    }
    /**
     * @return {number}
     */
    getHeight() {
        return this.canvasRaw.height;
    }
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} sides
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawPolygon(x, y, radius, sides, rotateAngle, options) {
        if (sides < 3) {
            return;
        }
        const a = (Math.PI * 2) / sides;
        this.context.save();
        this.context.translate(x, y);
        this.context.beginPath();
        this.context.rotate(rotateAngle);
        this.context.moveTo(radius, 0);
        for (let i = 1; i < sides; i++) {
            this.context.lineTo(radius * Math.cos(a * i), radius * Math.sin(a * i));
        }
        this.context.closePath();
        each(options, (value, key) => {
            this.context[key] = value;
        });
        this.context.fill();
        this.context.stroke();
        this.context.restore();
    }
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawRectangle(x, y, width, height, rotateAngle, options) {
        this.context.save();
        this.context.translate(x, y);
        this.context.beginPath();
        this.context.rotate(rotateAngle);
        this.context.rect(0, 0, width, height);
        each(options, (value, key) => {
            this.context[key] = value;
        });
        if (options['fillStyle']) {
            this.context.fill();
        }
        if (options['strokeStyle']) {
            this.context.stroke();
        }
        this.context.restore();
    }
    /**
     * @param {!Knot<HTMLImageElement>} image
     * @param {number=} opt_width
     * @param {number=} opt_height
     */
    drawImage(imageKnot, opt_width, opt_height) {
        const width = opt_width || typeCast(imageKnot.getAttribute('width'));
        const height = opt_height || typeCast(imageKnot.getAttribute('height'));
        this.context.save();
        this.context.drawImage(imageKnot.getNode(), 0, 0, width, height);
        this.context.restore();
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {!Uint8ClampedArray}
     */
    getImageDataXY(x, y) {
        return this.context.getImageData(x, y, 1, 1).data;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {undefined}
     */
    eventMouseMove(x, y) {
        consoleDebug('Canvas.eventMouseMove()', x, y);
    }
    /**
     * @return {undefined}
     */
    clear() {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
