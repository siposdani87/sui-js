import { each, isString, isUndefined, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { consoleInfo } from '../utils/log';

/**
 * @class
 */
export class Canvas {
    canvasKnot: Knot<HTMLCanvasElement>;
    canvasRaw: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    /**
     * @param {!Knot|string=} opt_selector
     */
    constructor(opt_selector?: Knot | string) {
        this._init(opt_selector);
        this._initEvents();
    }
    /**
     * @private
     * @param {!Knot|string=} opt_selector
     * @return {undefined}
     */
    private _init(opt_selector?: Knot | string): void {
        this.canvasKnot = opt_selector as Knot<HTMLCanvasElement>;
        if (isString(opt_selector)) {
            this.canvasKnot = new Query<HTMLCanvasElement>(
                opt_selector as string,
            ).getKnot();
        } else if (isUndefined(opt_selector)) {
            this.canvasKnot = new Knot<HTMLCanvasElement>('canvas');
        }
        this.canvasRaw = this.canvasKnot.getNode();
        this.context = this.canvasRaw.getContext('2d');
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initEvents(): void {
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
    setWidth(width: number): void {
        this.canvasRaw.width = width;
    }
    /**
     * @return {number}
     */
    getWidth(): number {
        return this.canvasRaw.width;
    }
    /**
     * @param {number} height
     * @return {undefined}
     */
    setHeight(height: number): void {
        this.canvasRaw.height = height;
    }
    /**
     * @return {number}
     */
    getHeight(): number {
        return this.canvasRaw.height;
    }
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: number, height: number): void {
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
    drawPolygon(
        x: number,
        y: number,
        radius: number,
        sides: number,
        rotateAngle: number,
        options: Object,
    ): void {
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
            this.context.lineTo(
                radius * Math.cos(a * i),
                radius * Math.sin(a * i),
            );
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
    drawRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        rotateAngle: number,
        options: Object,
    ): void {
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
    drawImage(
        imageKnot: Knot<HTMLImageElement>,
        opt_width?: number,
        opt_height?: number,
    ) {
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
    getImageDataXY(x: number, y: number): Uint8ClampedArray {
        return this.context.getImageData(x, y, 1, 1).data;
    }
    /**
     * @param {number} x
     * @param {number} y
     * @return {undefined}
     */
    eventMouseMove(x: number, y: number): void {
        consoleInfo('Canvas.eventMouseMove()', x, y);
    }
    /**
     * @return {undefined}
     */
    clear(): void {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
