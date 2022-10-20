import { Knot } from '../core/knot';
/**
 * @class
 */
export declare class Canvas {
    canvasNode: Knot<HTMLCanvasElement>;
    canvasRaw: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    /**
     * @param {!Knot|string=} opt_selector
     */
    constructor(opt_selector?: Knot | string);
    /**
     * @private
     * @param {!Knot|string=} opt_selector
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initEvents;
    /**
     * @param {number} width
     * @return {undefined}
     */
    setWidth(width: number): void;
    /**
     * @return {number}
     */
    getWidth(): number;
    /**
     * @param {number} height
     * @return {undefined}
     */
    setHeight(height: number): void;
    /**
     * @return {number}
     */
    getHeight(): number;
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: number, height: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} sides
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawPolygon(x: number, y: number, radius: number, sides: number, rotateAngle: number, options: Object): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawRectangle(x: number, y: number, width: number, height: number, rotateAngle: number, options: Object): void;
    /**
     * @param {!Knot<HTMLImageElement>} image
     * @param {number=} opt_width
     * @param {number=} opt_height
     */
    drawImage(image: Knot<HTMLImageElement>, opt_width?: number, opt_height?: number): void;
    /**
     * @param {number} x
     * @param {number} y
     * @return {!Uint8ClampedArray}
     */
    getImageDataXY(x: number, y: number): Uint8ClampedArray;
    /**
     * @param {number} x
     * @param {number} y
     * @return {undefined}
     */
    eventMouseMove(x: number, y: number): void;
    /**
     * @return {undefined}
     */
    clear(): void;
}
