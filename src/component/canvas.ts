import { each, isString, isUndefined, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';

/**
 * HTML5 Canvas wrapper for 2D drawing operations.
 *
 * @description Wraps an HTML5 canvas element providing methods for drawing polygons,
 * rectangles, and images, as well as reading pixel data. Accepts a {@link Knot}, a CSS
 * selector string, or creates a new canvas element when no argument is provided.
 *
 * @example
 * const canvas = new Canvas('.my-canvas');
 * canvas.setSize(800, 600);
 * canvas.drawRectangle(10, 10, 100, 50, 0, { fillStyle: '#FF0000' });
 *
 * @see {@link Knot}
 * @category Component
 */
export class Canvas {
    canvasKnot!: Knot<HTMLCanvasElement>;
    canvasElement!: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    /**
     * @param opt_selector - A {@link Knot} wrapping a canvas element, a CSS selector
     *     string, or undefined to create a new canvas element.
     */
    constructor(opt_selector?: Knot | string) {
        this._init(opt_selector);
        this._initEvents();
    }

    /**
     * Resolves the canvas element from the selector and initializes the 2D context.
     * @param opt_selector - A Knot, CSS selector string, or undefined.
     */
    private _init(opt_selector?: Knot | string): void {
        this.canvasKnot = opt_selector as Knot<HTMLCanvasElement>;
        if (isString(opt_selector)) {
            this.canvasKnot = new Query<HTMLCanvasElement>(
                opt_selector,
            ).getKnot();
        } else if (isUndefined(opt_selector)) {
            this.canvasKnot = new Knot<HTMLCanvasElement>('canvas');
        }
        this.canvasElement = this.canvasKnot.getNode();
        this.context = this.canvasElement.getContext('2d')!;
    }

    /**
     * Binds the mousemove event to the canvas element.
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
     * Sets the canvas width in pixels.
     *
     * @param width - The width in pixels.
     *
     * @example
     * canvas.setWidth(800);
     */
    setWidth(width: number): void {
        this.canvasElement.width = width;
    }

    /**
     * Returns the current canvas width in pixels.
     *
     * @returns The canvas width.
     *
     * @example
     * const w = canvas.getWidth();
     */
    getWidth(): number {
        return this.canvasElement.width;
    }

    /**
     * Sets the canvas height in pixels.
     *
     * @param height - The height in pixels.
     *
     * @example
     * canvas.setHeight(600);
     */
    setHeight(height: number): void {
        this.canvasElement.height = height;
    }

    /**
     * Returns the current canvas height in pixels.
     *
     * @returns The canvas height.
     *
     * @example
     * const h = canvas.getHeight();
     */
    getHeight(): number {
        return this.canvasElement.height;
    }

    /**
     * Sets both the canvas width and height in pixels.
     *
     * @param width - The width in pixels.
     * @param height - The height in pixels.
     *
     * @example
     * canvas.setSize(800, 600);
     */
    setSize(width: number, height: number): void {
        this.setWidth(width);
        this.setHeight(height);
    }

    /**
     * Draws a regular polygon on the canvas.
     *
     * @param x - The x-coordinate of the polygon center.
     * @param y - The y-coordinate of the polygon center.
     * @param radius - The radius from center to each vertex.
     * @param sides - The number of sides (must be at least 3).
     * @param rotateAngle - Rotation angle in radians.
     * @param options - Canvas context properties to apply (e.g. fillStyle, strokeStyle).
     *
     * @example
     * canvas.drawPolygon(100, 100, 50, 6, 0, {
     *     fillStyle: '#00FF00',
     *     strokeStyle: '#000000',
     * });
     */
    drawPolygon(
        x: number,
        y: number,
        radius: number,
        sides: number,
        rotateAngle: number,
        options: object,
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
        each(options, (value: any, key: string | number) => {
            (this.context as any)[key] = value;
        });
        this.context.fill();
        this.context.stroke();
        this.context.restore();
    }

    /**
     * Draws a rectangle on the canvas with optional rotation.
     *
     * @param x - The x-coordinate of the top-left corner.
     * @param y - The y-coordinate of the top-left corner.
     * @param width - The rectangle width.
     * @param height - The rectangle height.
     * @param rotateAngle - Rotation angle in radians.
     * @param options - Canvas context properties to apply. Fill is applied if fillStyle is set;
     *     stroke is applied if strokeStyle is set.
     *
     * @example
     * canvas.drawRectangle(10, 10, 200, 100, 0, {
     *     fillStyle: '#0000FF',
     *     strokeStyle: '#000000',
     * });
     */
    drawRectangle(
        x: number,
        y: number,
        width: number,
        height: number,
        rotateAngle: number,
        options: object,
    ): void {
        this.context.save();
        this.context.translate(x, y);
        this.context.beginPath();
        this.context.rotate(rotateAngle);
        this.context.rect(0, 0, width, height);
        each(options, (value: any, key: string | number) => {
            (this.context as any)[key] = value;
        });
        if ((options as Record<string, any>)['fillStyle']) {
            this.context.fill();
        }
        if ((options as Record<string, any>)['strokeStyle']) {
            this.context.stroke();
        }
        this.context.restore();
    }

    /**
     * Draws an image onto the canvas from an image {@link Knot}.
     *
     * @param imageKnot - A {@link Knot} wrapping an HTMLImageElement.
     * @param opt_width - Optional width override (defaults to the element's width attribute).
     * @param opt_height - Optional height override (defaults to the element's height attribute).
     *
     * @example
     * const img = new Knot('img');
     * img.setAttribute('src', '/photo.png');
     * canvas.drawImage(img, 200, 150);
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
     * Returns the RGBA pixel data at a specific canvas coordinate.
     *
     * @param x - The x-coordinate to sample.
     * @param y - The y-coordinate to sample.
     * @returns A Uint8ClampedArray containing [R, G, B, A] values.
     *
     * @example
     * const [r, g, b, a] = canvas.getImageDataXY(50, 50);
     */
    getImageDataXY(x: number, y: number): Uint8ClampedArray {
        return this.context.getImageData(x, y, 1, 1).data;
    }

    /**
     * Called when the mouse moves over the canvas. Override to handle mouse tracking.
     * @param x - The x-coordinate relative to the canvas.
     * @param y - The y-coordinate relative to the canvas.
     */
    eventMouseMove(x: number, y: number): void {
        consoleDebug('Canvas.eventMouseMove()', x, y);
    }

    /**
     * Clears the entire canvas.
     *
     * @example
     * canvas.clear();
     */
    clear(): void {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
