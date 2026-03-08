import { inArray, eachObject } from '../utils/operation';
import type { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import type { Emitter } from '../core/emitter';
import type { IconOptions, Id } from '../utils';
import { MapLabel } from './mapLabel';

/**
 * Internal marker icon configuration containing the icon image and clickable shape.
 * @category Component
 */
export type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};

/**
 * Strips internal properties (_marker, _map_label) from marker data.
 * @param markerData - Raw marker data object.
 * @returns A cleaned {@link Objekt} without internal keys.
 * @category Component
 */
export const cleanMarkerData = (markerData: object): Objekt => {
    const cleanData = new Objekt();
    eachObject(markerData, (value, key) => {
        if (!inArray(['_marker', '_map_label'], key)) {
            cleanData.set(key, value);
        }
    });
    return cleanData;
};

/**
 * Creates a {@link MapLabel} bound to a marker's position and map.
 * @param marker - The Google Maps marker to bind the label to.
 * @param title - The text content of the label.
 * @returns A new MapLabel instance bound to the marker.
 * @category Component
 */
export const createMapLabelByMarker = (
    marker: google.maps.Marker,
    title: string,
): MapLabel => {
    const mapLabel = new MapLabel({
        text: title,
        strokeWeight: 2,
    });

    mapLabel.bindTo('position', marker);
    mapLabel.bindTo('map', marker);

    return mapLabel;
};

/**
 * Binds click, double-click, right-click, drag, and dragend events to a marker.
 * @param emitter - The emitter for firing events.
 * @param marker - The Google Maps Marker instance.
 * @param markerData - The associated marker data object.
 * @category Component
 */
export const bindEventsToMarker = (
    emitter: Emitter,
    marker: google.maps.Marker,
    markerData: Objekt,
): void => {
    const clean = cleanMarkerData(markerData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker.addListener('click', (event: any) => {
        emitter.emit('markerClick', clean, event);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker.addListener('dblclick', (event: any) => {
        emitter.emit('markerDoubleClick', clean, event);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker.addListener('rightclick', (event: any) => {
        emitter.emit('markerRightClick', clean, event);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker.addListener('drag', (_event: any) => {
        const vertex = marker.getPosition()!;
        const mapLabel = markerData.get<MapLabel>('_map_label');
        mapLabel.set('position', vertex);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    marker.addListener('dragend', (event: any) => {
        const vertex = marker.getPosition()!;
        const latitude = vertex.lat();
        const longitude = vertex.lng();
        emitter.emit('markerChanged', clean, latitude, longitude, event);
    });
};

/**
 * Removes all event listeners from a marker.
 * @param marker - The Google Maps Marker instance.
 * @category Component
 */
export const unbindEventsToMarker = (marker: google.maps.Marker): void => {
    google.maps.event.clearInstanceListeners(marker);
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
 * @param opt_options - Google Maps Marker options.
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
    const marker = new google.maps.Marker(options.copyObject());
    marker.setPosition(new google.maps.LatLng(latitude, longitude));
    marker.setIcon(markerIcons[iconName]!.icon);
    marker.setShape(markerIcons[iconName]!.shape);
    marker.setTitle(text);
    marker.setMap(map);
    markerData.setRaw('_marker', marker);

    const mapLabel = createMapLabelByMarker(marker, text);
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
 * @param opt_options - Updated Google Maps Marker options.
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
    opt_options: object,
): void => {
    const markerData = markers.findById(id)!;
    eachObject(cleanMarkerData(opt_markerData), (value, key) => {
        markerData.set(key, value);
    });
    const text = title.toString();
    const marker = markerData.get<google.maps.Marker>('_marker');
    marker.setOptions(opt_options);

    const markerIcon = markerIcons[iconName]!;
    marker.setIcon(markerIcon.icon);
    marker.setShape(markerIcon.shape);
    marker.setTitle(text);
    marker.setPosition(new google.maps.LatLng(latitude, longitude));

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
        const marker = markerData.get<google.maps.Marker>('_marker');
        marker.setMap(null);
        unbindEventsToMarker(marker);
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
        const marker = markerData.get<google.maps.Marker>('_marker');
        marker.setMap(null);
        unbindEventsToMarker(marker);
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
    const icon = {
        url: iconOptions.url,
        size: new google.maps.Size(iconOptions.size[0], iconOptions.size[1]),
        origin: new google.maps.Point(
            iconOptions.origin[0],
            iconOptions.origin[1],
        ),
        anchor: new google.maps.Point(
            iconOptions.anchor[0],
            iconOptions.anchor[1],
        ),
    };

    const shape: google.maps.MarkerShape = {
        coords: iconOptions.coords,
        type: 'poly',
    };

    markerIcons[name] = {
        icon: icon,
        shape: shape,
    };
};
