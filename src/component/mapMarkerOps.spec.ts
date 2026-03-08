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

describe('mapMarkerOps', () => {
    let ctx: Record<string, jest.Mock | any>;

    beforeEach(() => {
        ctx = installCanvasMock();
    });

    afterEach(() => {
        uninstallCanvasMock();
    });

    describe('cleanMarkerData', () => {
        it('should strip _marker and _map_label from data', () => {
            const data = { id: 1, name: 'test', _marker: {}, _map_label: {} };
            const result = cleanMarkerData(data);
            expect(result.get('id')).toBe(1);
            expect(result.get('name')).toBe('test');
            expect(result.get('_marker')).toBeUndefined();
            expect(result.get('_map_label')).toBeUndefined();
        });
    });

    describe('createMapLabelByMarker', () => {
        it('should create a MapLabel bound to the marker', () => {
            const marker = new google.maps.Marker();
            const label = createMapLabelByMarker(marker, 'Test Label');
            expect(label).toBeDefined();
            const overlay = (label as any).overlayView;
            expect(overlay.bindTo).toHaveBeenCalledWith(
                'position',
                marker,
                undefined,
                undefined,
            );
            expect(overlay.bindTo).toHaveBeenCalledWith(
                'map',
                marker,
                undefined,
                undefined,
            );
        });
    });

    describe('bindEventsToMarker', () => {
        let emitter: Emitter;
        let marker: google.maps.Marker;
        let markerData: Objekt;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let listenerCallbacks: Record<string, any>;

        beforeEach(() => {
            emitter = new Emitter();
            marker = new google.maps.Marker();
            markerData = new Objekt({ id: 42, name: 'test-marker' });

            const mapLabel = createMapLabelByMarker(marker, 'label');
            patchOverlayStorage((mapLabel as any).overlayView);
            markerData.setRaw('_marker', marker);
            markerData.setRaw('_map_label', mapLabel);

            listenerCallbacks = {};
            (marker.addListener as jest.Mock).mockImplementation(
                (eventName: string, callback: Function) => {
                    listenerCallbacks[eventName] = callback;
                    return { remove: jest.fn() };
                },
            );

            bindEventsToMarker(emitter, marker, markerData);
        });

        it('should register click, dblclick, rightclick, drag, and dragend listeners', () => {
            expect(listenerCallbacks['click']).toBeDefined();
            expect(listenerCallbacks['dblclick']).toBeDefined();
            expect(listenerCallbacks['rightclick']).toBeDefined();
            expect(listenerCallbacks['drag']).toBeDefined();
            expect(listenerCallbacks['dragend']).toBeDefined();
        });

        it('should emit markerClick on click event', () => {
            const handler = jest.fn();
            emitter.on('markerClick', handler);
            const fakeEvent = { latLng: {} };
            listenerCallbacks['click'](fakeEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, event] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(cleanData.get('_marker')).toBeUndefined();
            expect(event).toBe(fakeEvent);
        });

        it('should emit markerDoubleClick on dblclick event', () => {
            const handler = jest.fn();
            emitter.on('markerDoubleClick', handler);
            const fakeEvent = { latLng: {} };
            listenerCallbacks['dblclick'](fakeEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, event] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(event).toBe(fakeEvent);
        });

        it('should emit markerRightClick on rightclick event', () => {
            const handler = jest.fn();
            emitter.on('markerRightClick', handler);
            const fakeEvent = { latLng: {} };
            listenerCallbacks['rightclick'](fakeEvent);
            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, event] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(event).toBe(fakeEvent);
        });

        it('should update map label position on drag event', () => {
            const fakePosition = new google.maps.LatLng(10, 20);
            (marker.getPosition as jest.Mock).mockReturnValue(fakePosition);

            const mapLabel = markerData.get<any>('_map_label');
            const overlay = mapLabel.overlayView;

            listenerCallbacks['drag']({});

            expect(marker.getPosition).toHaveBeenCalled();
            expect(overlay.set).toHaveBeenCalledWith('position', fakePosition);
        });

        it('should emit markerChanged with coordinates on dragend event', () => {
            const handler = jest.fn();
            emitter.on('markerChanged', handler);
            const fakePosition = {
                lat: () => 48.5,
                lng: () => 19.2,
            };
            (marker.getPosition as jest.Mock).mockReturnValue(fakePosition);

            const fakeEvent = { latLng: {} };
            listenerCallbacks['dragend'](fakeEvent);

            expect(handler).toHaveBeenCalledTimes(1);
            const [cleanData, lat, lng, event] = handler.mock.calls[0];
            expect(cleanData.get('id')).toBe(42);
            expect(lat).toBe(48.5);
            expect(lng).toBe(19.2);
            expect(event).toBe(fakeEvent);
        });
    });

    describe('updateMarker', () => {
        it('should update marker data, icon, title, and position', () => {
            const markers = new Collection<Objekt>();
            const marker = new google.maps.Marker();
            const mapLabel = createMapLabelByMarker(marker, 'old');
            patchOverlayStorage((mapLabel as any).overlayView);

            const markerData = new Objekt({
                id: 1,
                name: 'old-name',
            });
            markerData.setRaw('_marker', marker);
            markerData.setRaw('_map_label', mapLabel);
            markers.push(markerData);

            const markerIcons: { [key: string]: MarkerIcon } = {
                updated: {
                    icon: { url: '/updated.png' } as google.maps.Icon,
                    shape: { coords: [0, 0, 32, 32], type: 'poly' },
                },
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
                { draggable: true },
            );

            expect(markerData.get('name')).toBe('new-name');
            expect(markerData.get('extra')).toBe('value');
            expect(marker.setOptions).toHaveBeenCalledWith({
                draggable: true,
            });
            expect(marker.setIcon).toHaveBeenCalledWith(
                markerIcons['updated']!.icon,
            );
            expect(marker.setShape).toHaveBeenCalledWith(
                markerIcons['updated']!.shape,
            );
            expect(marker.setTitle).toHaveBeenCalledWith('New Title');
            expect(marker.setPosition).toHaveBeenCalled();
            const overlay = (mapLabel as any).overlayView;
            expect(overlay.set).toHaveBeenCalledWith('text', 'New Title');
        });
    });

    describe('unbindEventsToMarker', () => {
        it('should clear instance listeners', () => {
            const marker = new google.maps.Marker();
            unbindEventsToMarker(marker);
            expect(
                google.maps.event.clearInstanceListeners,
            ).toHaveBeenCalledWith(marker);
        });
    });

    describe('setMarkerIcon', () => {
        it('should register a marker icon configuration', () => {
            const markerIcons: { [key: string]: MarkerIcon } = {};
            setMarkerIcon(markerIcons, 'test', {
                url: '/icon.png',
                size: [32, 32],
                origin: [0, 0],
                anchor: [16, 32],
                coords: [0, 0, 32, 0, 32, 32, 0, 32],
            });
            expect(markerIcons['test']).toBeDefined();
            expect(markerIcons['test']!.icon).toBeDefined();
            expect(markerIcons['test']!.shape.type).toBe('poly');
        });
    });
});
