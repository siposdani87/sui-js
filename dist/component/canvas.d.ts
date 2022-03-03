/**
 * @class
 */
export declare class Canvas {
    canvasNode: any;
    canvasRaw: any;
    context: any;
    /**
     * @param {!Item|string=} opt_selector
     */
    constructor(opt_selector?: any);
    /**
     * @private
     * @param {!Item|string=} opt_selector
     * @return {undefined}
     */
    _init(opt_selector: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _initEvents(): void;
    /**
     * @param {number} width
     * @return {undefined}
     */
    setWidth(width: any): void;
    /**
     * @return {number}
     */
    getWidth(): any;
    /**
     * @param {number} height
     * @return {undefined}
     */
    setHeight(height: any): void;
    /**
     * @return {number}
     */
    getHeight(): any;
    /**
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    setSize(width: any, height: any): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} sides
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawPolygon(x: any, y: any, radius: any, sides: any, rotateAngle: any, options: any): void;
    /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {number} rotateAngle
     * @param {!Object} options
     * @return {undefined}
     */
    drawRectangle(x: any, y: any, width: any, height: any, rotateAngle: any, options: any): void;
    /**
     * @param {!Item} image
     * @param {number=} opt_width
     * @param {number=} opt_height
     */
    drawImage(image: any, opt_width: any, opt_height: any): void;
    /**
     * @param {number} x
     * @param {number} y
     * @return {!CanvasPixelArray}
     */
    getImageDataXY(x: any, y: any): any;
    /**
     * @param {number} x
     * @param {number} y
     * @return {undefined}
     */
    eventMouseMove(x: any, y: any): void;
    /**
     * @return {undefined}
     */
    clear(): void;
}
