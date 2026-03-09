import { Canvas } from './canvas';
import { Knot } from '../core/knot';
import {
    createKnot,
    cleanupDOM,
    installCanvasMock,
    uninstallCanvasMock,
} from '../test-helpers';

describe('Canvas', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
    });

    afterEach(() => {
        uninstallCanvasMock();
        cleanupDOM();
    });

    describe('constructor', () => {
        it('should be instance of Canvas', () => {
            const canvas = new Canvas();
            expect(canvas).toBeInstanceOf(Canvas);
        });

        it('should create a new canvas element when no selector is provided', () => {
            const canvas = new Canvas();
            expect(canvas.canvasKnot).toBeInstanceOf(Knot);
            expect(canvas.canvasElement.tagName).toBe('CANVAS');
        });

        it('should accept a Knot wrapping a canvas element', () => {
            const knot = createKnot<HTMLCanvasElement>('canvas');
            const canvas = new Canvas(knot);
            expect(canvas.canvasKnot).toBe(knot);
            expect(canvas.canvasElement).toBe(knot.getNode());
        });

        it('should accept a CSS selector string', () => {
            const el = document.createElement('canvas');
            el.id = 'test-canvas';
            document.body.appendChild(el);
            const canvas = new Canvas('#test-canvas');
            expect(canvas.canvasElement).toBe(el);
        });

        it('should initialize the 2D rendering context', () => {
            const canvas = new Canvas();
            expect(canvas.context).toBe(ctx);
        });
    });

    describe('setWidth / getWidth', () => {
        it('should set and get canvas width', () => {
            const canvas = new Canvas();
            canvas.setWidth(800);
            expect(canvas.getWidth()).toBe(800);
        });
    });

    describe('setHeight / getHeight', () => {
        it('should set and get canvas height', () => {
            const canvas = new Canvas();
            canvas.setHeight(600);
            expect(canvas.getHeight()).toBe(600);
        });
    });

    describe('setSize', () => {
        it('should set both width and height', () => {
            const canvas = new Canvas();
            canvas.setSize(1024, 768);
            expect(canvas.getWidth()).toBe(1024);
            expect(canvas.getHeight()).toBe(768);
        });
    });

    describe('clear', () => {
        it('should clear the entire canvas', () => {
            const canvas = new Canvas();
            canvas.setSize(400, 300);
            canvas.clear();
            expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 400, 300);
        });
    });

    describe('drawPolygon', () => {
        it('should draw a polygon with save/restore and context properties', () => {
            const canvas = new Canvas();
            const options = { fillStyle: '#FF0000', strokeStyle: '#000000' };
            canvas.drawPolygon(100, 100, 50, 6, 0, options);

            expect(ctx.save).toHaveBeenCalled();
            expect(ctx.translate).toHaveBeenCalledWith(100, 100);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.rotate).toHaveBeenCalledWith(0);
            expect(ctx.moveTo).toHaveBeenCalledWith(50, 0);
            expect(ctx.lineTo).toHaveBeenCalledTimes(5);
            expect(ctx.closePath).toHaveBeenCalled();
            expect(ctx.fill).toHaveBeenCalled();
            expect(ctx.stroke).toHaveBeenCalled();
            expect(ctx.restore).toHaveBeenCalled();
        });

        it('should apply options to the context', () => {
            const canvas = new Canvas();
            canvas.drawPolygon(0, 0, 10, 4, 0, {
                fillStyle: '#00FF00',
            });
            expect(ctx.fillStyle).toBe('#00FF00');
        });

        it('should not draw if sides < 3', () => {
            const canvas = new Canvas();
            canvas.drawPolygon(0, 0, 10, 2, 0, {});
            expect(ctx.save).not.toHaveBeenCalled();
        });

        it('should draw a triangle (3 sides) with correct lineTo count', () => {
            const canvas = new Canvas();
            canvas.drawPolygon(0, 0, 10, 3, 0, {});
            expect(ctx.moveTo).toHaveBeenCalledWith(10, 0);
            expect(ctx.lineTo).toHaveBeenCalledTimes(2);
        });

        it('should apply rotation angle', () => {
            const canvas = new Canvas();
            const angle = Math.PI / 4;
            canvas.drawPolygon(0, 0, 10, 4, angle, {});
            expect(ctx.rotate).toHaveBeenCalledWith(angle);
        });
    });

    describe('drawRectangle', () => {
        it('should draw a rectangle with save/restore', () => {
            const canvas = new Canvas();
            canvas.drawRectangle(10, 20, 100, 50, 0, {
                fillStyle: '#0000FF',
                strokeStyle: '#000',
            });

            expect(ctx.save).toHaveBeenCalled();
            expect(ctx.translate).toHaveBeenCalledWith(10, 20);
            expect(ctx.beginPath).toHaveBeenCalled();
            expect(ctx.rotate).toHaveBeenCalledWith(0);
            expect(ctx.rect).toHaveBeenCalledWith(0, 0, 100, 50);
            expect(ctx.fill).toHaveBeenCalled();
            expect(ctx.stroke).toHaveBeenCalled();
            expect(ctx.restore).toHaveBeenCalled();
        });

        it('should only fill when fillStyle is set without strokeStyle', () => {
            const canvas = new Canvas();
            canvas.drawRectangle(0, 0, 10, 10, 0, { fillStyle: '#FF0000' });
            expect(ctx.fill).toHaveBeenCalled();
            expect(ctx.stroke).not.toHaveBeenCalled();
        });

        it('should only stroke when strokeStyle is set without fillStyle', () => {
            const canvas = new Canvas();
            canvas.drawRectangle(0, 0, 10, 10, 0, {
                strokeStyle: '#000000',
            });
            expect(ctx.fill).not.toHaveBeenCalled();
            expect(ctx.stroke).toHaveBeenCalled();
        });

        it('should not fill or stroke when no style options are set', () => {
            const canvas = new Canvas();
            canvas.drawRectangle(0, 0, 10, 10, 0, {});
            expect(ctx.fill).not.toHaveBeenCalled();
            expect(ctx.stroke).not.toHaveBeenCalled();
        });

        it('should apply rotation angle', () => {
            const canvas = new Canvas();
            const angle = Math.PI / 2;
            canvas.drawRectangle(0, 0, 10, 10, angle, {});
            expect(ctx.rotate).toHaveBeenCalledWith(angle);
        });
    });

    describe('drawImage', () => {
        it('should draw an image with explicit dimensions', () => {
            const canvas = new Canvas();
            const imgKnot = createKnot<HTMLImageElement>('img', {
                width: '100',
                height: '80',
            });
            canvas.drawImage(imgKnot, 200, 150);

            expect(ctx.save).toHaveBeenCalled();
            expect(ctx.drawImage).toHaveBeenCalledWith(
                imgKnot.getNode(),
                0,
                0,
                200,
                150,
            );
            expect(ctx.restore).toHaveBeenCalled();
        });

        it('should fall back to element attribute dimensions when no explicit sizes given', () => {
            const canvas = new Canvas();
            const imgKnot = createKnot<HTMLImageElement>('img', {
                width: '320',
                height: '240',
            });
            canvas.drawImage(imgKnot);

            expect(ctx.drawImage).toHaveBeenCalledWith(
                imgKnot.getNode(),
                0,
                0,
                320,
                240,
            );
        });
    });

    describe('getImageDataXY', () => {
        it('should return pixel data at given coordinates', () => {
            const canvas = new Canvas();
            const data = canvas.getImageDataXY(50, 75);

            expect(ctx.getImageData).toHaveBeenCalledWith(50, 75, 1, 1);
            expect(data).toBeInstanceOf(Uint8ClampedArray);
            expect(data).toHaveLength(4);
        });
    });

    describe('mouseMove event', () => {
        it('should emit mouseMove event without error', () => {
            const canvas = new Canvas();
            expect(() => canvas.emit('mouseMove', 10, 20)).not.toThrow();
        });

        it('should emit mouseMove on mousemove', () => {
            const canvas = new Canvas();
            const spy = jest.fn();
            canvas.on('mouseMove', spy);
            const canvasEl = canvas.canvasElement;

            canvasEl.getBoundingClientRect = jest.fn(() => ({
                left: 0,
                top: 0,
                right: 300,
                bottom: 150,
                width: 300,
                height: 150,
                x: 0,
                y: 0,
                toJSON: jest.fn(),
            }));

            const event = new MouseEvent('mousemove', {
                clientX: 42,
                clientY: 99,
            });
            canvasEl.dispatchEvent(event);

            expect(spy).toHaveBeenCalledWith(42, 99);
        });
    });
});
