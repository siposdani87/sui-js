import { each, isString, isUndefined, typeCast } from '../utils/operation';
import { Knot } from '../core/knot';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';

export class Canvas {
    canvasKnot: Knot<HTMLCanvasElement>;
    canvasElement: HTMLCanvasElement;
    context!: CanvasRenderingContext2D;

    constructor(opt_selector?: Knot | string) {
        this._init(opt_selector);
        this._initEvents();
    }

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

    private _initEvents(): void {
        this.canvasKnot.addEventListener('mousemove', (canvasKnot, event) => {
            const rect = canvasKnot.getNode().getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.eventMouseMove(x, y);
        });
    }

    setWidth(width: number): void {
        this.canvasElement.width = width;
    }

    getWidth(): number {
        return this.canvasElement.width;
    }

    setHeight(height: number): void {
        this.canvasElement.height = height;
    }

    getHeight(): number {
        return this.canvasElement.height;
    }

    setSize(width: number, height: number): void {
        this.setWidth(width);
        this.setHeight(height);
    }

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
        each(options, (value, key) => {
            this.context[key] = value;
        });
        this.context.fill();
        this.context.stroke();
        this.context.restore();
    }

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

    getImageDataXY(x: number, y: number): Uint8ClampedArray {
        return this.context.getImageData(x, y, 1, 1).data;
    }

    eventMouseMove(x: number, y: number): void {
        consoleDebug('Canvas.eventMouseMove()', x, y);
    }

    clear(): void {
        this.context.clearRect(0, 0, this.getWidth(), this.getHeight());
    }
}
