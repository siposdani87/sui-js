import { Knot } from '../core/knot';
export declare class Canvas {
    canvasKnot: Knot<HTMLCanvasElement>;
    canvasRaw: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(opt_selector?: Knot | string);
    private _init;
    private _initEvents;
    setWidth(width: number): void;
    getWidth(): number;
    setHeight(height: number): void;
    getHeight(): number;
    setSize(width: number, height: number): void;
    drawPolygon(x: number, y: number, radius: number, sides: number, rotateAngle: number, options: Object): void;
    drawRectangle(x: number, y: number, width: number, height: number, rotateAngle: number, options: Object): void;
    drawImage(imageKnot: Knot<HTMLImageElement>, opt_width?: number, opt_height?: number): void;
    getImageDataXY(x: number, y: number): Uint8ClampedArray;
    eventMouseMove(x: number, y: number): void;
    clear(): void;
}
