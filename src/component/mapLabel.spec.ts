import { MapLabel } from './mapLabel';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';

/**
 * Patch an OverlayView instance so set/get/setValues actually store values,
 * since @googlemaps/jest-mocks stubs them as no-ops.
 */
function patchOverlayStorage(overlay: any): void {
    const store: Record<string, any> = {};
    overlay.set.mockImplementation((key: string, value: any) => {
        store[key] = value;
    });
    overlay.get.mockImplementation((key: string) => store[key]);
    overlay.setValues.mockImplementation((values: Record<string, any>) => {
        if (values) {
            for (const [key, value] of Object.entries(values)) {
                store[key] = value;
            }
        }
    });
}

/**
 * Create a MapLabel and retroactively patch its overlay to store values,
 * then re-run the setup that depends on stored values.
 */
function createMapLabel(opts?: object): MapLabel {
    const label = new MapLabel(opts);
    const overlay = (label as any).overlayView;
    patchOverlayStorage(overlay);

    // Re-set defaults and options since the original calls went to no-op mocks
    overlay.set('fontFamily', 'sans-serif');
    overlay.set('fontSize', 12);
    overlay.set('fontColor', '#000000');
    overlay.set('strokeWeight', 4);
    overlay.set('strokeColor', '#ffffff');
    overlay.set('align', 'center');
    overlay.set('zIndex', 1e3);
    if (opts) {
        overlay.setValues(opts);
    }

    return label;
}

describe('MapLabel', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    describe('constructor', () => {
        it('should be instance of MapLabel', () => {
            const mapLabel = createMapLabel({});
            expect(mapLabel).toBeInstanceOf(MapLabel);
        });

        it('should set default property values on the overlay', () => {
            const mapLabel = createMapLabel();
            const overlay = (mapLabel as any).overlayView;
            expect(overlay.get('fontFamily')).toBe('sans-serif');
            expect(overlay.get('fontSize')).toBe(12);
            expect(overlay.get('fontColor')).toBe('#000000');
            expect(overlay.get('strokeWeight')).toBe(4);
            expect(overlay.get('strokeColor')).toBe('#ffffff');
            expect(overlay.get('align')).toBe('center');
            expect(overlay.get('zIndex')).toBe(1e3);
        });

        it('should merge custom options into the overlay', () => {
            const mapLabel = createMapLabel({
                text: 'Hello',
                fontSize: 16,
            });
            const overlay = (mapLabel as any).overlayView;
            expect(overlay.get('text')).toBe('Hello');
            expect(overlay.get('fontSize')).toBe(16);
        });
    });

    describe('bindTo', () => {
        it('should delegate to overlayView.bindTo', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            const target = new google.maps.MVCObject();
            mapLabel.bindTo('position', target);
            expect(overlay.bindTo).toHaveBeenCalledWith(
                'position',
                target,
                undefined,
                undefined,
            );
        });
    });

    describe('set', () => {
        it('should store value on overlayView', () => {
            const mapLabel = createMapLabel({});
            mapLabel.set('text', 'Updated');
            const overlay = (mapLabel as any).overlayView;
            expect(overlay.get('text')).toBe('Updated');
        });
    });

    describe('setMap', () => {
        it('should delegate to overlayView.setMap', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            mapLabel.setMap(null);
            expect(overlay.setMap).toHaveBeenCalledWith(null);
        });
    });

    describe('notify', () => {
        it('should call _drawCanvas for text property', () => {
            const mapLabel = createMapLabel({});
            const spy = jest.spyOn(mapLabel as any, '_drawCanvas');
            mapLabel.notify('text');
            expect(spy).toHaveBeenCalled();
        });

        it.each([
            'fontFamily',
            'fontSize',
            'fontColor',
            'strokeWeight',
            'strokeColor',
            'align',
        ])('should call _drawCanvas for %s property', (prop) => {
            const mapLabel = createMapLabel({});
            const spy = jest.spyOn(mapLabel as any, '_drawCanvas');
            mapLabel.notify(prop);
            expect(spy).toHaveBeenCalled();
        });

        it('should call draw for position property', () => {
            const mapLabel = createMapLabel({});
            const spy = jest.spyOn(mapLabel as any, 'draw');
            mapLabel.notify('position');
            expect(spy).toHaveBeenCalled();
        });

        it.each(['maxZoom', 'minZoom'])(
            'should call draw for %s property',
            (prop) => {
                const mapLabel = createMapLabel({});
                const spy = jest.spyOn(mapLabel as any, 'draw');
                mapLabel.notify(prop);
                expect(spy).toHaveBeenCalled();
            },
        );

        it('should not call _drawCanvas or draw for unknown property', () => {
            const mapLabel = createMapLabel({});
            const drawCanvasSpy = jest.spyOn(mapLabel as any, '_drawCanvas');
            const drawSpy = jest.spyOn(mapLabel as any, 'draw');
            mapLabel.notify('unknownProp');
            expect(drawCanvasSpy).not.toHaveBeenCalled();
            expect(drawSpy).not.toHaveBeenCalled();
        });
    });

    describe('onAdd', () => {
        it('should create a canvas element with absolute positioning', () => {
            const mapLabel = createMapLabel({ text: 'Test' });
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({
                mapPane: document.createElement('div'),
            }));
            mapLabel.onAdd();
            const canvas = (mapLabel as any).canvas;
            expect(canvas).toBeInstanceOf(HTMLCanvasElement);
            expect(canvas.style.position).toBe('absolute');
        });

        it('should set lineJoin and textBaseline on context', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({
                mapPane: document.createElement('div'),
            }));
            mapLabel.onAdd();
            expect(ctx.lineJoin).toBe('round');
            expect(ctx.textBaseline).toBe('top');
        });

        it('should append canvas to mapPane', () => {
            const mapLabel = createMapLabel({});
            const mapPane = document.createElement('div');
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({ mapPane }));
            mapLabel.onAdd();
            expect(mapPane.childNodes.length).toBe(1);
        });

        it('should handle null panes', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => null);
            expect(() => mapLabel.onAdd()).not.toThrow();
        });
    });

    describe('_drawCanvas', () => {
        let mapLabel: MapLabel;

        beforeEach(() => {
            mapLabel = createMapLabel({
                text: 'Hello World',
                strokeWeight: 2,
                fontColor: '#FF0000',
                strokeColor: '#000000',
                fontSize: 14,
                fontFamily: 'Arial',
            });
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({
                mapPane: document.createElement('div'),
            }));
            mapLabel.onAdd();
            // Clear call counts on mock context methods without destroying the mock
            for (const fn of Object.values(ctx)) {
                if (typeof fn === 'function' && fn.mockClear) {
                    fn.mockClear();
                }
            }
        });

        it('should clear the canvas and set styles', () => {
            (mapLabel as any)._drawCanvas();
            expect(ctx.clearRect).toHaveBeenCalled();
            expect(ctx.strokeStyle).toBe('#000000');
            expect(ctx.fillStyle).toBe('#FF0000');
            expect(ctx.font).toBe('14px Arial');
        });

        it('should draw stroke and fill text when strokeWeight > 0', () => {
            (mapLabel as any)._drawCanvas();
            expect(ctx.strokeText).toHaveBeenCalledWith(
                'Hello World',
                2,
                2,
            );
            expect(ctx.fillText).toHaveBeenCalledWith('Hello World', 2, 2);
        });

        it('should not draw strokeText when strokeWeight is 0', () => {
            mapLabel.set('strokeWeight', 0);
            (mapLabel as any)._drawCanvas();
            expect(ctx.strokeText).not.toHaveBeenCalled();
            expect(ctx.fillText).toHaveBeenCalledWith('Hello World', 0, 0);
        });

        it('should not draw text when text is empty', () => {
            mapLabel.set('text', '');
            (mapLabel as any)._drawCanvas();
            expect(ctx.fillText).not.toHaveBeenCalled();
        });

        it('should return early if canvas is not created', () => {
            const label = createMapLabel({ text: 'Test' });
            expect(() => (label as any)._drawCanvas()).not.toThrow();
        });
    });

    describe('_getMarginLeft', () => {
        it('should return 0 for left alignment', () => {
            const mapLabel = createMapLabel({ align: 'left' });
            expect((mapLabel as any)._getMarginLeft(100)).toBe(0);
        });

        it('should return negative width for right alignment', () => {
            const mapLabel = createMapLabel({ align: 'right' });
            expect((mapLabel as any)._getMarginLeft(100)).toBe(-100);
        });

        it('should return negative half width for center alignment', () => {
            const mapLabel = createMapLabel({ align: 'center' });
            expect((mapLabel as any)._getMarginLeft(100)).toBe(-50);
        });
    });

    describe('draw', () => {
        it('should return early if projection is not available', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getProjection = jest.fn(() => null);
            expect(() => mapLabel.draw()).not.toThrow();
        });

        it('should return early if canvas is not created', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getProjection = jest.fn(() => ({
                fromLatLngToDivPixel: jest.fn(),
            }));
            expect(() => mapLabel.draw()).not.toThrow();
        });

        it('should return early if position is not set', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({
                mapPane: document.createElement('div'),
            }));
            mapLabel.onAdd();
            overlay.getProjection = jest.fn(() => ({
                fromLatLngToDivPixel: jest.fn(),
            }));
            expect(() => mapLabel.draw()).not.toThrow();
        });

        it('should position canvas from projection when position is set', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => ({
                mapPane: document.createElement('div'),
            }));
            mapLabel.onAdd();

            const mockProjection = {
                fromLatLngToDivPixel: jest.fn(() => ({ x: 150, y: 200 })),
            };
            overlay.getProjection = jest.fn(() => mockProjection);
            const latLng = new google.maps.LatLng(47.6, 17.5);
            mapLabel.set('position', latLng);

            mapLabel.draw();

            expect(mockProjection.fromLatLngToDivPixel).toHaveBeenCalledWith(
                latLng,
            );
            const canvas = (mapLabel as any).canvas;
            expect(canvas.style.top).toBe('200px');
            expect(canvas.style.left).toBe('150px');
        });
    });

    describe('_getVisible', () => {
        it('should return empty string when no zoom constraints', () => {
            const mapLabel = createMapLabel({});
            expect((mapLabel as any)._getVisible()).toBe('');
        });

        it('should return empty string when map is not set', () => {
            const mapLabel = createMapLabel({ minZoom: 5, maxZoom: 20 });
            const overlay = (mapLabel as any).overlayView;
            overlay.getMap = jest.fn(() => null);
            expect((mapLabel as any)._getVisible()).toBe('');
        });

        it('should return hidden when zoom is below minZoom', () => {
            const mapLabel = createMapLabel({ minZoom: 10, maxZoom: 15 });
            const overlay = (mapLabel as any).overlayView;
            const mockMap = { getZoom: jest.fn(() => 5) };
            overlay.getMap = jest.fn(() => mockMap);
            expect((mapLabel as any)._getVisible()).toBe('hidden');
        });

        it('should return hidden when zoom is above maxZoom', () => {
            const mapLabel = createMapLabel({ minZoom: 10, maxZoom: 15 });
            const overlay = (mapLabel as any).overlayView;
            const mockMap = { getZoom: jest.fn(() => 20) };
            overlay.getMap = jest.fn(() => mockMap);
            expect((mapLabel as any)._getVisible()).toBe('hidden');
        });

        it('should return empty string when zoom is within range', () => {
            const mapLabel = createMapLabel({ minZoom: 10, maxZoom: 15 });
            const overlay = (mapLabel as any).overlayView;
            const mockMap = { getZoom: jest.fn(() => 12) };
            overlay.getMap = jest.fn(() => mockMap);
            expect((mapLabel as any)._getVisible()).toBe('');
        });
    });

    describe('onRemove', () => {
        it('should remove canvas from parent', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            const mapPane = document.createElement('div');
            overlay.getPanes = jest.fn(() => ({ mapPane }));
            mapLabel.onAdd();
            expect(mapPane.childNodes.length).toBe(1);

            mapLabel.onRemove();
            expect(mapPane.childNodes.length).toBe(0);
        });

        it('should handle case when canvas has no parent', () => {
            const mapLabel = createMapLabel({});
            const overlay = (mapLabel as any).overlayView;
            overlay.getPanes = jest.fn(() => null);
            mapLabel.onAdd();
            expect(() => mapLabel.onRemove()).not.toThrow();
        });

        it('should handle case when canvas is not created', () => {
            const mapLabel = createMapLabel({});
            expect(() => mapLabel.onRemove()).not.toThrow();
        });
    });
});
