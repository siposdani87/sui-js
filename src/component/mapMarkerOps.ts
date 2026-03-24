import { inArray, eachObject } from '../utils/operation';
import type { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import type { Emitter } from '../core/emitter';
import type { IconOptions, Id } from '../utils';
import { MapLabel } from './mapLabel';

/**
 * Internal marker icon configuration containing an HTML element as marker content.
 * @category Component
 */
export type MarkerIcon = {
    content: HTMLElement;
};

type ListenerEntry = {
    target: EventTarget;
    event: string;
    handler: EventListener;
};

/**
 * Strips internal properties (_marker, _map_label, _listeners) from marker data.
 * @param markerData - Raw marker data object.
 * @returns A cleaned {@link Objekt} without internal keys.
 * @category Component
 */
export const cleanMarkerData = (markerData: object): Objekt => {
    const cleanData = new Objekt();
    eachObject(markerData, (value, key) => {
        if (!inArray(['_marker', '_map_label', '_listeners'], key)) {
            cleanData.set(key, value);
        }
    });
    return cleanData;
};

/**
 * Normalizes a LatLng or LatLngLiteral to a plain `{ lat, lng }` object.
 */
const getLatLng = (
    pos: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined,
): { lat: number; lng: number } => {
    if (!pos) return { lat: 0, lng: 0 };
    if ('lat' in pos && typeof pos.lat === 'function') {
        return {
            lat: (pos as google.maps.LatLng).lat(),
            lng: (pos as google.maps.LatLng).lng(),
        };
    }
    return pos as { lat: number; lng: number };
};

/**
 * Creates a {@link MapLabel} positioned at the marker's location.
 * @param marker - The AdvancedMarkerElement to position the label at.
 * @param title - The text content of the label.
 * @param map - The Google Maps instance.
 * @returns A new MapLabel instance.
 * @category Component
 */
export const createMapLabelByMarker = (
    marker: google.maps.marker.AdvancedMarkerElement,
    title: string,
    map: google.maps.Map,
): MapLabel => {
    const mapLabel = new MapLabel({
        text: title,
        strokeWeight: 2,
        position: marker.position,
    });

    mapLabel.setMap(map);

    return mapLabel;
};

/**
 * Binds click, double-click, right-click, drag, and dragend events to a marker.
 * @param emitter - The emitter for firing events.
 * @param marker - The AdvancedMarkerElement instance.
 * @param markerData - The associated marker data object.
 * @category Component
 */
export const bindEventsToMarker = (
    emitter: Emitter,
    marker: google.maps.marker.AdvancedMarkerElement,
    markerData: Objekt,
): void => {
    const clean = cleanMarkerData(markerData);
    const listeners: ListenerEntry[] = [];

    const addListener = (
        target: EventTarget,
        event: string,
        handler: EventListener,
    ) => {
        target.addEventListener(event, handler);
        listeners.push({ target, event, handler });
    };

    addListener(marker, 'gmp-click', ((event: Event) => {
        emitter.emit('markerClick', clean, event);
    }) as EventListener);

    addListener(marker.element, 'dblclick', ((event: Event) => {
        emitter.emit('markerDoubleClick', clean, event);
    }) as EventListener);

    addListener(marker.element, 'contextmenu', ((event: Event) => {
        emitter.emit('markerRightClick', clean, event);
    }) as EventListener);

    addListener(marker, 'gmp-drag', ((_event: Event) => {
        const { lat, lng } = getLatLng(marker.position);
        const mapLabel = markerData.get<MapLabel>('_map_label');
        mapLabel.set('position', new google.maps.LatLng(lat, lng));
    }) as EventListener);

    addListener(marker, 'gmp-dragend', ((event: Event) => {
        const { lat, lng } = getLatLng(marker.position);
        emitter.emit('markerChanged', clean, lat, lng, event);
    }) as EventListener);

    markerData.setRaw('_listeners', listeners);
};

/**
 * Removes all event listeners from a marker.
 * @param markerData - The marker data containing stored listeners.
 * @category Component
 */
export const unbindEventsToMarker = (markerData: Objekt): void => {
    const listeners = markerData.get<ListenerEntry[]>('_listeners');
    if (listeners) {
        listeners.forEach(({ target, event, handler }) => {
            target.removeEventListener(event, handler);
        });
        markerData.setRaw('_listeners', []);
    }
};

/**
 * Creates a new marker on the map with an associated {@link MapLabel}.
 * @param emitter - The emitter for events.
 * @param map - The Google Maps instance.
 * @param markers - The marker collection.
 * @param markerOptions - Default marker options.
 * @param markerIcons - Registered icon configurations.
 * @param id - Unique identifier.
 * @param title - Display label.
 * @param iconName - Name of a registered marker icon.
 * @param latitude - Latitude position.
 * @param longitude - Longitude position.
 * @param opt_markerData - Additional data.
 * @param opt_options - Marker options.
 * @category Component
 */
export const createMarker = (
    emitter: Emitter,
    map: google.maps.Map,
    markers: Collection<Objekt>,
    markerOptions: Objekt,
    markerIcons: { [key: string]: MarkerIcon },
    id: Id,
    title: string,
    iconName: string,
    latitude: number,
    longitude: number,
    opt_markerData: object,
    opt_options: object,
): void => {
    const markerData = new Objekt(opt_markerData);
    if (!markerData.get('id')) {
        markerData.set('id', id);
    }
    const options = new Objekt(markerOptions);
    options.merge(opt_options);

    const text = title.toString();
    const markerIcon = markerIcons[iconName]!;
    const marker = new google.maps.marker.AdvancedMarkerElement({
        position: new google.maps.LatLng(latitude, longitude),
        content: markerIcon.content.cloneNode(true) as HTMLElement,
        title: text,
        map,
        gmpDraggable: options.get<boolean>('draggable') ?? false,
    });
    markerData.setRaw('_marker', marker);

    const mapLabel = createMapLabelByMarker(marker, text, map);
    markerData.setRaw('_map_label', mapLabel);

    markers.push(markerData);

    bindEventsToMarker(emitter, marker, markerData);
};

/**
 * Updates an existing marker's data, icon, title, and position.
 * @param markers - The marker collection.
 * @param markerIcons - Registered icon configurations.
 * @param id - The marker identifier.
 * @param title - Updated display label.
 * @param iconName - Updated icon name.
 * @param latitude - Updated latitude.
 * @param longitude - Updated longitude.
 * @param opt_markerData - Updated data to merge.
 * @param opt_options - Updated marker options.
 * @category Component
 */
export const updateMarker = (
    markers: Collection<Objekt>,
    markerIcons: { [key: string]: MarkerIcon },
    id: Id,
    title: string,
    iconName: string,
    latitude: number,
    longitude: number,
    opt_markerData: object,
    _opt_options: object,
): void => {
    const markerData = markers.findById(id)!;
    eachObject(cleanMarkerData(opt_markerData), (value, key) => {
        markerData.set(key, value);
    });
    const text = title.toString();
    const marker =
        markerData.get<google.maps.marker.AdvancedMarkerElement>('_marker');

    const markerIcon = markerIcons[iconName]!;
    marker.content = markerIcon.content.cloneNode(true) as HTMLElement;
    marker.title = text;
    marker.position = new google.maps.LatLng(latitude, longitude);

    const mapLabel = markerData.get<MapLabel>('_map_label');
    mapLabel.set('text', text);
};

/**
 * Removes a marker and its label from the map.
 * @param markers - The marker collection.
 * @param id - The marker identifier.
 * @category Component
 */
export const removeMarker = (markers: Collection<Objekt>, id: Id): void => {
    const markerData = markers.findById(id);
    if (markerData) {
        const mapLabel = markerData.get<MapLabel>('_map_label');
        mapLabel.setMap(null);
        const marker =
            markerData.get<google.maps.marker.AdvancedMarkerElement>('_marker');
        marker.map = null;
        unbindEventsToMarker(markerData);
        markers.deleteById(id);
    }
};

/**
 * Removes all markers and their labels from the map.
 * @param markers - The marker collection.
 * @category Component
 */
export const removeAllMarkers = (markers: Collection<Objekt>): void => {
    markers.each((markerData) => {
        const mapLabel = markerData.get<MapLabel>('_map_label');
        mapLabel.setMap(null);
        const marker =
            markerData.get<google.maps.marker.AdvancedMarkerElement>('_marker');
        marker.map = null;
        unbindEventsToMarker(markerData);
    });
    markers.clear();
};

/**
 * Registers a named marker icon configuration.
 * @param markerIcons - The icon registry to update.
 * @param name - Unique name to reference this icon.
 * @param iconOptions - Icon configuration.
 * @category Component
 */
export const setMarkerIcon = (
    markerIcons: { [key: string]: MarkerIcon },
    name: string,
    iconOptions: IconOptions,
): void => {
    const img = document.createElement('img');
    img.src = iconOptions.url;
    img.width = iconOptions.size[0];
    img.height = iconOptions.size[1];
    img.style.display = 'block';
    const tx = -iconOptions.anchor[0];
    const ty = -iconOptions.anchor[1];
    img.style.transform = `translate(${tx}px, ${ty}px)`;

    markerIcons[name] = {
        content: img,
    };
};
