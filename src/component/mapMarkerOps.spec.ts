import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Emitter } from '../core/emitter';
import { installCanvasMock, uninstallCanvasMock } from '../test-helpers';
import {
    bindEventsToMarker,
    cleanMarkerData,
    createMapLabelByMarker,
    updateMarker,
    createMarker,
    removeMarker,
    removeAllMarkers,
    unbindEventsToMarker,
    setMarkerIcon,
    MarkerIcon,
} from './mapMarkerOps';

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

function createAdvancedMarker(
    opt_options: Partial<google.maps.marker.AdvancedMarkerElementOptions> = {},
): google.maps.marker.AdvancedMarkerElement {
    const marker = new google.maps.marker.AdvancedMarkerElement(opt_options);
    // jsdom doesn't have a real element, so provide a stub
    if (!marker.element) {
        (marker as any).element = document.createElement('div');
    }
    return marker;
}

describe('mapMarkerOps', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    describe('cleanMarkerData', () => {
        it('should strip _marker, _map_label, and _listeners from data', () => {
            const data = {
                id: 1,
                name: 'test',
                _marker: {},
                _map_label: {},
                _listeners: [],
            };
            const result = cleanMarkerData(data);
            expect(result.get('id')).toBe(1);
            expect(result.get('name')).toBe('test');
            expect(result.get('_marker')).toBeUndefined();
            expect(result.get('_map_label')).toBeUndefined();
            expect(result.get('_listeners')).toBeUndefined();
        });
    });

    describe('createMapLabelByMarker', () => {
        it('should create a MapLabel at the marker position', () => {
            const marker = createAdvancedMarker({
                position: { lat: 47.6, lng: 17.5 },
            });
            const map = new google.maps.Map(document.createElement('div'));
            const label = createMapLabelByMarker(marker, 'Test Label', map);
            expect(label).toBeDefined();
            const overlay = (label as any).overlayView;
            expect(overlay.setMap).toHaveBeenCalledWith(map);
        });
    });

    describe('bindEventsToMarker', () => {
        let emitter: Emitter;
        let marker: google.maps.marker.AdvancedMarkerElement;
        let markerData: Objekt;
        let map: google.maps.Map;

        beforeEach(() => {
            emitter = new Emitter();
            marker = createAdvancedMarker({
                position: { lat: 47.6, lng: 17.5 },
            });
            markerData = new Objekt({ id: 42, name: 'test-marker' });

            map = new google.maps.Map(document.createElement('div'));
            const mapLabel = createMapLabelByMarker(marker, 'label', map);
            patchOverlayStorage((mapLabel as any).overlayView);
            markerData.setRaw('_marker', marker);
            markerData.setRaw('_map_label', mapLabel);

            bindEventsToMarker(emitter, marker, markerData);
        });

        it('should store listeners in markerData', () => {
            const listeners = markerData.get<any[]>('_listeners');
            expect(listeners).toBeDefined();
            expect(listeners.length).toBe(5);
        });

        it('should emit markerClick on gmp-click event', () => {
            const handler = jest.fn();
            emitter.on('markerClick', handler);
            marker.dispatchEvent(new Event('gmp-click'));
            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(cleanData.get('_marker')).toBeUndefined();
        });

        it('should emit markerDoubleClick on element dblclick event', () => {
            const handler = jest.fn();
            emitter.on('markerDoubleClick', handler);
            marker.element.dispatchEvent(new Event('dblclick'));
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should emit markerRightClick on element contextmenu event', () => {
            const handler = jest.fn();
            emitter.on('markerRightClick', handler);
            marker.element.dispatchEvent(new Event('contextmenu'));
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should emit markerChanged on gmp-dragend event', () => {
            const handler = jest.fn();
            emitter.on('markerChanged', handler);
            (marker as any).position = { lat: 48.5, lng: 19.2 };
            marker.dispatchEvent(new Event('gmp-dragend'));
            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, lat, lng] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(lat).toBe(48.5);
            expect(lng).toBe(19.2);
        });
    });

    describe('unbindEventsToMarker', () => {
        it('should remove all stored listeners', () => {
            const emitter = new Emitter();
            const marker = createAdvancedMarker({
                position: { lat: 47.6, lng: 17.5 },
            });
            const markerData = new Objekt({ id: 1 });
            const map = new google.maps.Map(document.createElement('div'));
            const mapLabel = createMapLabelByMarker(marker, 'label', map);
            patchOverlayStorage((mapLabel as any).overlayView);
            markerData.setRaw('_marker', marker);
            markerData.setRaw('_map_label', mapLabel);

            bindEventsToMarker(emitter, marker, markerData);

            const listeners = markerData.get<any[]>('_listeners');
            expect(listeners.length).toBe(5);

            unbindEventsToMarker(markerData);

            const afterListeners = markerData.get<any[]>('_listeners');
            expect(afterListeners.length).toBe(0);
        });
    });

    describe('updateMarker', () => {
        it('should update marker data, icon, title, and position', () => {
            const markers = new Collection<Objekt>();
            const marker = createAdvancedMarker({
                position: { lat: 47.6, lng: 17.5 },
            });
            const map = new google.maps.Map(document.createElement('div'));
            const mapLabel = createMapLabelByMarker(marker, 'old', map);
            patchOverlayStorage((mapLabel as any).overlayView);

            const markerData = new Objekt({
                id: 1,
                name: 'old-name',
            });
            markerData.setRaw('_marker', marker);
            markerData.setRaw('_map_label', mapLabel);
            markers.push(markerData);

            const img = document.createElement('img');
            img.src = '/updated.png';
            const markerIcons: { [key: string]: MarkerIcon } = {
                updated: { content: img },
            };

            updateMarker(
                markers,
                markerIcons,
                1,
                'New Title',
                'updated',
                50.0,
                20.0,
                { name: 'new-name', extra: 'value' },
                {},
            );

            expect(markerData.get('name')).toBe('new-name');
            expect(markerData.get('extra')).toBe('value');
            expect(marker.title).toBe('New Title');
            const overlay = (mapLabel as any).overlayView;
            expect(overlay.set).toHaveBeenCalledWith('text', 'New Title');
        });
    });

    describe('setMarkerIcon', () => {
        it('should register a marker icon with an img element', () => {
            const markerIcons: { [key: string]: MarkerIcon } = {};
            setMarkerIcon(markerIcons, 'test', {
                url: '/icon.png',
                size: [32, 32],
                origin: [0, 0],
                anchor: [16, 32],
                coords: [0, 0, 32, 0, 32, 32, 0, 32],
            });
            expect(markerIcons['test']).toBeDefined();
            expect(markerIcons['test']!.content).toBeInstanceOf(
                HTMLImageElement,
            );
            expect(
                (markerIcons['test']!.content as HTMLImageElement).src,
            ).toContain('/icon.png');
            expect(
                (markerIcons['test']!.content as HTMLImageElement).width,
            ).toBe(32);
        });
    });
});
