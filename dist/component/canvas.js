import { each, isString, isUndefined, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
export class Canvas {
    constructor(opt_selector) {
        this._init(opt_selector);
        this._initEvents();
    }
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
    _initEvents() {
        this.canvasKnot.addEventListener('mousemove', (canvasKnot, event) => {
            const rect = canvasKnot.getNode().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.eventMouseMove(x, y);
        });
    }
    setWidth(width) {
        this.canvasRaw.width = width;
    }
    getWidth() {
        return this.canvasRaw.width;
    }
    setHeight(height) {
        this.canvasRaw.height = height;
    }
    getHeight() {
        return this.canvasRaw.height;
    }
    setSize(width, height) {
        this.setWidth(width);
        this.setHeight(height);
    }
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
    drawImage(imageKnot, opt_width, opt_height) {
        const width = opt_width || typeCast(imageKnot.getAttribute('width'));
        const height = opt_height || typeCast(imageKnot.getAttribute('height'));
        this.context.save();
        this.context.drawImage(imageKnot.getNode(), 0, 0, width, height);
        this.context.restore();
    }
    getImageDataXY(x, y) {
        return this.context.getImageData(x, y, 1, 1).data;
    }
    eventMouseMove(x, y) {
        consoleDebug('Canvas.eventMouseMove()', x, y);
    }
    clear() {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
