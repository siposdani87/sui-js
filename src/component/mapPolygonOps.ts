import { each, inArray, eachObject } from '../utils/operation';
import type { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import type { Emitter } from '../core/emitter';
import type { Id } from '../utils';
import { MapLabel } from './mapLabel';
import type { WeightLatLng } from './googleMap';

/**
 * Converts an array of coordinate objects to Google Maps LatLng instances.
 * @param points - Array of coordinate objects with optional weight.
 * @returns Array of Google Maps LatLng (or weighted location) instances.
 * @category Component
 */
export const convertPointsToPath = (
    points: Array<WeightLatLng>,
): Array<google.maps.LatLng> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const path: any[] = [];
    each(points, (point) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let vertex: any = new google.maps.LatLng(
            point.latitude,
            point.longitude,
        );
        if (point.weight !== undefined) {
            vertex = {
                location: vertex,
                weight: point.weight,
            };
        }
        path.push(vertex);
    });
    return path;
};

/**
 * Strips internal properties (_polygon, _map_label, _bounds) from polygon data.
 * @param polygonData - Raw polygon data object.
 * @returns A cleaned {@link Objekt} without internal keys.
 * @category Component
 */
export const cleanPolygonData = (polygonData: object): Objekt => {
    const cleanData = new Objekt();
    eachObject(polygonData, (value, key) => {
        if (!inArray(['_polygon', '_map_label', '_bounds'], key)) {
            cleanData.set(key, value);
        }
    });
    return cleanData;
};

/**
 * Calculates and stores the bounding box from a path of LatLng values.
 * @param polygonData - The polygon data object to store bounds on.
 * @param path - Array of Google Maps LatLng instances.
 * @category Component
 */
export const setBoundsByPath = (
    polygonData: Objekt,
    path: Array<google.maps.LatLng>,
): void => {
    const bounds = new google.maps.LatLngBounds();
    if (path.length > 0) {
        each(path, (vertex) => {
            bounds.extend(vertex);
        });
    }
    polygonData.setRaw('_bounds', bounds);
};

/**
 * Updates the bounds on polygon data from an array of coordinate points.
 * @param polygonData - The polygon data object.
 * @param points - Array of vertex coordinates.
 * @category Component
 */
export const setBoundsByPoints = (
    polygonData: Objekt,
    points: Array<{ latitude: number; longitude: number }>,
): void => {
    const path = convertPointsToPath(points);
    setBoundsByPath(polygonData, path);
};

/**
 * Sets the polygon path from an array of points and updates bounds.
 * @param emitter - The emitter for binding events.
 * @param polygonData - The polygon data object.
 * @param points - Array of vertex coordinates.
 * @category Component
 */
export const addPointsToPolygon = (
    emitter: Emitter,
    polygonData: Objekt,
    points: Array<{ latitude: number; longitude: number }>,
): void => {
    const polygon = polygonData.get<google.maps.Polygon>('_polygon');
    const path = convertPointsToPath(points);
    polygon.setPath(path);
    bindEventsToPolygonPath(emitter, polygon, polygonData);
    setBoundsByPath(polygonData, path);
};

/**
 * Fires the polygon change event after updating bounds and label position.
 * @param emitter - The emitter to fire events on.
 * @param polygonData - The associated polygon data object.
 * @category Component
 */
export const callPolygonChangeEvent = (
    emitter: Emitter,
    polygonData: Objekt,
): void => {
    const points = getPointsFromPolygon(polygonData);
    setBoundsByPoints(polygonData, points);

    const mapLabel = polygonData.get<MapLabel>('_map_label');
    const centerLatLng = getCenterOfPolygon(polygonData);
    mapLabel.set(
        'position',
        new google.maps.LatLng(centerLatLng.latitude, centerLatLng.longitude),
    );

    const clean = cleanPolygonData(polygonData);
    emitter.emit('polygonChanged', clean, points);
};

/**
 * Binds insert, set, and remove events on the polygon path to trigger change callbacks.
 * @param emitter - The emitter for firing events.
 * @param polygon - The Google Maps Polygon instance.
 * @param polygonData - The associated polygon data object.
 * @category Component
 */
export const bindEventsToPolygonPath = (
    emitter: Emitter,
    polygon: google.maps.Polygon,
    polygonData: Objekt,
): void => {
    const path = polygon.getPath();
    if (path) {
        path.addListener('insert_at', () => {
            callPolygonChangeEvent(emitter, polygonData);
        });
        path.addListener('set_at', () => {
            callPolygonChangeEvent(emitter, polygonData);
        });
        path.addListener('remove_at', () => {
            callPolygonChangeEvent(emitter, polygonData);
        });
    }
};

/**
 * Removes all event listeners from a polygon's path.
 * @param polygon - The Google Maps Polygon instance.
 * @category Component
 */
export const unbindEventsToPolygonPath = (
    polygon: google.maps.Polygon,
): void => {
    const path = polygon.getPath();
    if (path) {
        google.maps.event.clearInstanceListeners(path);
    }
};

/**
 * Binds click, double-click, right-click, and path change events to a polygon.
 * @param emitter - The emitter for firing events.
 * @param polygon - The Google Maps Polygon instance.
 * @param polygonData - The associated polygon data object.
 * @category Component
 */
export const bindEventsToPolygon = (
    emitter: Emitter,
    polygon: google.maps.Polygon,
    polygonData: Objekt,
): void => {
    const clean = cleanPolygonData(polygonData);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    polygon.addListener('rightclick', (event: any) => {
        if (event.vertex) {
            const path = polygon.getPath();
            path.removeAt(event.vertex);
        } else {
            const vertex = event.latLng;
            emitter.emit(
                'polygonRightClick',
                clean,
                vertex.lat(),
                vertex.lng(),
                event,
            );
        }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    polygon.addListener('click', (event: any) => {
        const vertex = event.latLng;
        emitter.emit('polygonClick', clean, vertex.lat(), vertex.lng(), event);
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    polygon.addListener('dblclick', (event: any) => {
        const vertex = event.latLng;
        emitter.emit(
            'polygonDoubleClick',
            clean,
            vertex.lat(),
            vertex.lng(),
            event,
        );
    });

    bindEventsToPolygonPath(emitter, polygon, polygonData);
};

/**
 * Removes all event listeners from a polygon and its path.
 * @param polygon - The Google Maps Polygon instance.
 * @category Component
 */
export const unbindEventsToPolygon = (polygon: google.maps.Polygon): void => {
    google.maps.event.clearInstanceListeners(polygon);
    unbindEventsToPolygonPath(polygon);
};

/**
 * Extracts the current vertex coordinates from a polygon's path.
 * @param polygonData - The polygon data object.
 * @returns Array of latitude/longitude objects for each vertex.
 * @category Component
 */
export const getPointsFromPolygon = (
    polygonData: Objekt,
): Array<{ latitude: number; longitude: number }> => {
    const polygon = polygonData.get<google.maps.Polygon>('_polygon');
    const path = polygon.getPath().getArray();
    setBoundsByPath(polygonData, path);
    const points: Array<{ latitude: number; longitude: number }> = [];
    each(path, (vertex) => {
        points.push({
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        });
    });
    return points;
};

/**
 * Returns the geographic center of a polygon's bounding box.
 * @param polygonData - The polygon data object containing stored bounds.
 * @returns An object with latitude and longitude of the center.
 * @category Component
 */
export const getCenterOfPolygon = (
    polygonData: Objekt,
): { latitude: number; longitude: number } => {
    const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
    const vertex = bounds.getCenter();
    return {
        latitude: vertex.lat(),
        longitude: vertex.lng(),
    };
};

/**
 * Creates a polygon on the map with a label at its center.
 * @param emitter - The emitter for events.
 * @param map - The Google Maps instance.
 * @param polygons - The polygon collection.
 * @param polygonOptions - Default polygon style options.
 * @param id - Unique identifier.
 * @param title - Display label.
 * @param points - Array of vertex coordinates.
 * @param opt_polygonData - Additional data.
 * @param opt_options - Google Maps Polygon style options.
 * @category Component
 */
export const createPolygon = (
    emitter: Emitter,
    map: google.maps.Map,
    polygons: Collection<Objekt>,
    polygonOptions: Objekt,
    id: Id,
    title: string,
    points: Array<{ latitude: number; longitude: number }>,
    opt_polygonData: object,
    opt_options: object,
): void => {
    const polygonData = new Objekt(opt_polygonData);
    if (!polygonData.get('id')) {
        polygonData.set('id', id);
    }
    const options = new Objekt(polygonOptions);
    options.merge(opt_options);

    const polygon = new google.maps.Polygon(options.copyObject());
    polygon.setMap(map);
    polygonData.setRaw('_polygon', polygon);
    addPointsToPolygon(emitter, polygonData, points);

    const latLng = getCenterOfPolygon(polygonData);
    const mapLabel = new MapLabel({
        text: title,
        strokeWeight: 2,
        position: new google.maps.LatLng(latLng.latitude, latLng.longitude),
        map: map,
    });
    polygonData.setRaw('_map_label', mapLabel);

    polygons.push(polygonData);

    bindEventsToPolygon(emitter, polygon, polygonData);
};

/**
 * Updates an existing polygon's data, path, and label.
 * @param emitter - The emitter for events.
 * @param polygons - The polygon collection.
 * @param id - The polygon identifier.
 * @param title - Updated display label.
 * @param points - Updated array of vertex coordinates.
 * @param opt_polygonData - Updated data to merge.
 * @param opt_options - Updated style options.
 * @category Component
 */
export const updatePolygon = (
    emitter: Emitter,
    polygons: Collection<Objekt>,
    id: Id,
    title: string,
    points: Array<{ latitude: number; longitude: number }>,
    opt_polygonData: object,
    opt_options: object,
): void => {
    const polygonData = polygons.findById(id)!;
    eachObject(cleanPolygonData(opt_polygonData), (value, key) => {
        polygonData.set(key, value);
    });

    const polygon = polygonData.get<google.maps.Polygon>('_polygon');
    polygon.setOptions(opt_options);
    addPointsToPolygon(emitter, polygonData, points);

    const latLng = getCenterOfPolygon(polygonData);
    const mapLabel = polygonData.get<MapLabel>('_map_label');
    mapLabel.set('text', title);
    mapLabel.set(
        'position',
        new google.maps.LatLng(latLng.latitude, latLng.longitude),
    );
};

/**
 * Removes a polygon and its label from the map.
 * @param polygons - The polygon collection.
 * @param id - The polygon identifier.
 * @category Component
 */
export const removePolygon = (polygons: Collection<Objekt>, id: Id): void => {
    const polygonData = polygons.findById(id);
    if (polygonData) {
        const mapLabel = polygonData.get<MapLabel>('_map_label');
        mapLabel.set('map', null);
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        polygon.setMap(null);
        unbindEventsToPolygon(polygon);
        polygons.deleteById(id);
    }
};

/**
 * Removes all polygons and their labels from the map.
 * @param polygons - The polygon collection.
 * @category Component
 */
export const removeAllPolygons = (polygons: Collection<Objekt>): void => {
    polygons.each((polygonData) => {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        polygon.setMap(null);
        const mapLabel = polygonData.get<MapLabel>('_map_label');
        mapLabel.set('map', null);
        unbindEventsToPolygon(polygon);
    });
    polygons.clear();
};
