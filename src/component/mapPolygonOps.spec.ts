import { Emitter } from '../core/emitter';
import { Objekt } from '../core/objekt';
import { Collection } from '../core/collection';
import { MapLabel } from './mapLabel';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';
import {
    setBoundsByPoints,
    callPolygonChangeEvent,
    bindEventsToPolygonPath,
    bindEventsToPolygon,
    getPointsFromPolygon,
    updatePolygon,
} from './mapPolygonOps';

/**
 * Patch an OverlayView instance so set/get/setValues actually store values.
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
 * Create a MapLabel with patched overlay storage.
 */
function createMapLabel(opts?: object): MapLabel {
    const label = new MapLabel(opts);
    const overlay = (label as any).overlayView;
    patchOverlayStorage(overlay);
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

/**
 * Create a mock google.maps.Polygon with listener capture support.
 */
function createMockPolygon(): {
    polygon: google.maps.Polygon;
    listeners: Record<string, Array<(...args: any[]) => void>>;
    pathListeners: Record<string, Array<(...args: any[]) => void>>;
    pathArray: google.maps.LatLng[];
} {
    const polygon = new google.maps.Polygon();
    const listeners: Record<string, Array<(...args: any[]) => void>> = {};
    const pathListeners: Record<string, Array<(...args: any[]) => void>> = {};
    const pathArray: google.maps.LatLng[] = [];

    // Capture polygon-level listeners
    (polygon.addListener as jest.Mock).mockImplementation(
        (event: string, handler: (...args: any[]) => void) => {
            if (!listeners[event]) {
                listeners[event] = [];
            }
            listeners[event].push(handler);
            return { remove: jest.fn() };
        },
    );

    // Create a mock path with listener capture
    const mockPath = {
        addListener: jest.fn(
            (event: string, handler: (...args: any[]) => void) => {
                if (!pathListeners[event]) {
                    pathListeners[event] = [];
                }
                pathListeners[event].push(handler);
                return { remove: jest.fn() };
            },
        ),
        getArray: jest.fn(() => pathArray),
        removeAt: jest.fn(),
    };

    (polygon.getPath as jest.Mock).mockReturnValue(mockPath);
    (polygon.setPath as jest.Mock).mockImplementation(() => {
        // no-op
    });
    (polygon.setOptions as jest.Mock).mockImplementation(() => {
        // no-op
    });
    (polygon.setMap as jest.Mock).mockImplementation(() => {
        // no-op
    });

    return { polygon, listeners, pathListeners, pathArray };
}

/**
 * Build a polygonData Objekt with a polygon, mapLabel, and bounds attached.
 */
function buildPolygonData(
    polygon: google.maps.Polygon,
    opt_extra: object = {},
): Objekt {
    const mapLabel = createMapLabel({ text: 'Test Polygon' });
    const bounds = new google.maps.LatLngBounds();
    const boundsStore = { center: makeLatLng(10, 20) };
    (bounds.extend as jest.Mock).mockImplementation(() => {
        // no-op
    });
    (bounds.getCenter as jest.Mock).mockReturnValue(boundsStore.center);

    const polygonData = new Objekt({ id: 'poly-1', ...opt_extra });
    polygonData.setRaw('_polygon', polygon);
    polygonData.setRaw('_map_label', mapLabel);
    polygonData.setRaw('_bounds', bounds);
    return polygonData;
}

/**
 * Create a google.maps.LatLng whose lat()/lng() return the given values.
 */
function makeLatLng(lat: number, lng: number): google.maps.LatLng {
    const ll = new google.maps.LatLng(lat, lng);
    (ll.lat as jest.Mock).mockReturnValue(lat);
    (ll.lng as jest.Mock).mockReturnValue(lng);
    return ll;
}

describe('mapPolygonOps', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    describe('setBoundsByPoints', () => {
        it('should convert points to path and set bounds on polygonData', () => {
            const polygonData = new Objekt({ id: 'poly-1' });
            const points = [
                { latitude: 10, longitude: 20 },
                { latitude: 30, longitude: 40 },
            ];

            setBoundsByPoints(polygonData, points);

            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            expect(bounds).toBeDefined();
            expect(bounds.extend).toHaveBeenCalledTimes(2);
        });

        it('should handle empty points array', () => {
            const polygonData = new Objekt({ id: 'poly-1' });

            setBoundsByPoints(polygonData, []);

            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            expect(bounds).toBeDefined();
        });
    });

    describe('getPointsFromPolygon', () => {
        it('should extract latitude and longitude from polygon path', () => {
            const { polygon, pathArray } = createMockPolygon();
            const latLng1 = makeLatLng(47.5, 19.0);
            const latLng2 = makeLatLng(48.0, 19.5);
            const latLng3 = makeLatLng(47.0, 18.5);
            pathArray.push(latLng1, latLng2, latLng3);

            const polygonData = buildPolygonData(polygon);

            const points = getPointsFromPolygon(polygonData);

            expect(points).toHaveLength(3);
            expect(points[0]).toEqual({ latitude: 47.5, longitude: 19.0 });
            expect(points[1]).toEqual({ latitude: 48.0, longitude: 19.5 });
            expect(points[2]).toEqual({ latitude: 47.0, longitude: 18.5 });
        });

        it('should update bounds based on the path', () => {
            const { polygon, pathArray } = createMockPolygon();
            const latLng1 = makeLatLng(10, 20);
            pathArray.push(latLng1);

            const polygonData = buildPolygonData(polygon);

            getPointsFromPolygon(polygonData);

            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            expect(bounds).toBeDefined();
        });

        it('should return empty array for polygon with no vertices', () => {
            const { polygon } = createMockPolygon();
            const polygonData = buildPolygonData(polygon);

            const points = getPointsFromPolygon(polygonData);

            expect(points).toEqual([]);
        });
    });

    describe('callPolygonChangeEvent', () => {
        it('should emit polygonChanged with cleaned data and points', () => {
            const { polygon, pathArray } = createMockPolygon();
            const latLng1 = makeLatLng(47.5, 19.0);
            const latLng2 = makeLatLng(48.0, 19.5);
            pathArray.push(latLng1, latLng2);

            const polygonData = buildPolygonData(polygon, {
                name: 'Test Area',
            });

            // Patch bounds.getCenter to return a valid LatLng
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(47.75, 19.25);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonChanged', handler);

            callPolygonChangeEvent(emitter, polygonData);

            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, points] = handler.mock.calls[0];
            expect(cleanData).toBeInstanceOf(Objekt);
            expect(cleanData.get('name')).toBe('Test Area');
            expect(cleanData.get('_polygon')).toBeUndefined();
            expect(cleanData.get('_map_label')).toBeUndefined();
            expect(cleanData.get('_bounds')).toBeUndefined();
            expect(points).toHaveLength(2);
        });

        it('should update the map label position to the polygon center', () => {
            const { polygon, pathArray } = createMockPolygon();
            pathArray.push(makeLatLng(10, 20));

            const polygonData = buildPolygonData(polygon);
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(10, 20);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const mapLabel = polygonData.get<MapLabel>('_map_label');
            const setSpy = jest.spyOn(mapLabel, 'set');

            const emitter = new Emitter();
            callPolygonChangeEvent(emitter, polygonData);

            expect(setSpy).toHaveBeenCalledWith(
                'position',
                expect.any(google.maps.LatLng),
            );
        });
    });

    describe('bindEventsToPolygonPath', () => {
        it('should register insert_at, set_at, and remove_at listeners on the path', () => {
            const { polygon, pathListeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon);

            // Patch bounds for callPolygonChangeEvent
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(10, 20);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const emitter = new Emitter();
            bindEventsToPolygonPath(emitter, polygon, polygonData);

            expect(pathListeners['insert_at']).toHaveLength(1);
            expect(pathListeners['set_at']).toHaveLength(1);
            expect(pathListeners['remove_at']).toHaveLength(1);
        });

        it('should call callPolygonChangeEvent when insert_at fires', () => {
            const { polygon, pathListeners, pathArray } = createMockPolygon();
            pathArray.push(makeLatLng(10, 20));

            const polygonData = buildPolygonData(polygon);
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(10, 20);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonChanged', handler);

            bindEventsToPolygonPath(emitter, polygon, polygonData);
            pathListeners['insert_at']![0]!();

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should call callPolygonChangeEvent when set_at fires', () => {
            const { polygon, pathListeners, pathArray } = createMockPolygon();
            pathArray.push(makeLatLng(10, 20));

            const polygonData = buildPolygonData(polygon);
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(10, 20);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonChanged', handler);

            bindEventsToPolygonPath(emitter, polygon, polygonData);
            pathListeners['set_at']![0]!();

            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should call callPolygonChangeEvent when remove_at fires', () => {
            const { polygon, pathListeners, pathArray } = createMockPolygon();
            pathArray.push(makeLatLng(10, 20));

            const polygonData = buildPolygonData(polygon);
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(10, 20);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonChanged', handler);

            bindEventsToPolygonPath(emitter, polygon, polygonData);
            pathListeners['remove_at']![0]!();

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    describe('bindEventsToPolygon', () => {
        it('should register rightclick, click, and dblclick listeners', () => {
            const { polygon, listeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon);

            const emitter = new Emitter();
            bindEventsToPolygon(emitter, polygon, polygonData);

            expect(listeners['rightclick']).toHaveLength(1);
            expect(listeners['click']).toHaveLength(1);
            expect(listeners['dblclick']).toHaveLength(1);
        });

        it('should remove vertex on rightclick when event has vertex property', () => {
            const { polygon, listeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon);
            const path = polygon.getPath();

            const emitter = new Emitter();
            bindEventsToPolygon(emitter, polygon, polygonData);

            // Trigger rightclick with vertex index
            listeners['rightclick']![0]!({ vertex: 2 });

            expect(path.removeAt).toHaveBeenCalledWith(2);
        });

        it('should emit polygonRightClick when rightclick has no vertex', () => {
            const { polygon, listeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon, {
                name: 'Test Area',
            });

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonRightClick', handler);

            bindEventsToPolygon(emitter, polygon, polygonData);

            const latLng = makeLatLng(47.5, 19.0);
            const event = { latLng, vertex: undefined };
            listeners['rightclick']![0]!(event);

            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, lat, lng, evt] = handler.mock.calls[0];
            expect(cleanData).toBeInstanceOf(Objekt);
            expect(cleanData.get('_polygon')).toBeUndefined();
            expect(lat).toBe(47.5);
            expect(lng).toBe(19.0);
            expect(evt).toBe(event);
        });

        it('should emit polygonClick on click event', () => {
            const { polygon, listeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon, {
                name: 'Clickable',
            });

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonClick', handler);

            bindEventsToPolygon(emitter, polygon, polygonData);

            const latLng = makeLatLng(48.0, 20.0);
            const event = { latLng };
            listeners['click']![0]!(event);

            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, lat, lng, evt] = handler.mock.calls[0];
            expect(cleanData).toBeInstanceOf(Objekt);
            expect(lat).toBe(48.0);
            expect(lng).toBe(20.0);
            expect(evt).toBe(event);
        });

        it('should emit polygonDoubleClick on dblclick event', () => {
            const { polygon, listeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon, {
                name: 'DblClickable',
            });

            const emitter = new Emitter();
            const handler = jest.fn();
            emitter.on('polygonDoubleClick', handler);

            bindEventsToPolygon(emitter, polygon, polygonData);

            const latLng = makeLatLng(46.0, 18.0);
            const event = { latLng };
            listeners['dblclick']![0]!(event);

            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, lat, lng, evt] = handler.mock.calls[0];
            expect(cleanData).toBeInstanceOf(Objekt);
            expect(lat).toBe(46.0);
            expect(lng).toBe(18.0);
            expect(evt).toBe(event);
        });

        it('should also bind path events', () => {
            const { polygon, pathListeners } = createMockPolygon();
            const polygonData = buildPolygonData(polygon);

            const emitter = new Emitter();
            bindEventsToPolygon(emitter, polygon, polygonData);

            expect(pathListeners['insert_at']).toHaveLength(1);
            expect(pathListeners['set_at']).toHaveLength(1);
            expect(pathListeners['remove_at']).toHaveLength(1);
        });
    });

    describe('updatePolygon', () => {
        it('should merge new data into existing polygon and update path and label', () => {
            const { polygon, pathArray } = createMockPolygon();
            pathArray.push(makeLatLng(10, 20));

            const polygonData = buildPolygonData(polygon, {
                name: 'Original',
            });

            // Patch bounds for getCenterOfPolygon
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            const centerLatLng = makeLatLng(15, 25);
            (bounds.getCenter as jest.Mock).mockReturnValue(centerLatLng);

            const polygons = new Collection<Objekt>();
            polygons.push(polygonData);

            const mapLabel = polygonData.get<MapLabel>('_map_label');
            const setSpy = jest.spyOn(mapLabel, 'set');

            const emitter = new Emitter();
            const newPoints = [
                { latitude: 15, longitude: 25 },
                { latitude: 16, longitude: 26 },
            ];

            updatePolygon(
                emitter,
                polygons,
                'poly-1',
                'Updated Title',
                newPoints,
                { name: 'Updated' },
                { fillColor: '#ff0000' },
            );

            // Check data was merged
            expect(polygonData.get('name')).toBe('Updated');

            // Check polygon options were set
            expect(polygon.setOptions).toHaveBeenCalledWith({
                fillColor: '#ff0000',
            });

            // Check path was updated
            expect(polygon.setPath).toHaveBeenCalled();

            // Check label was updated
            expect(setSpy).toHaveBeenCalledWith('text', 'Updated Title');
            expect(setSpy).toHaveBeenCalledWith(
                'position',
                expect.any(google.maps.LatLng),
            );
        });
    });
});
