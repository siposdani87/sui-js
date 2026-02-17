import { each, inArray, isUndefined, eachObject } from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { Knot } from '../core';
import { IconOptions, Id } from '../utils';
import { MapLabel } from './mapLabel';

/**
 * Internal marker icon configuration containing the icon image and clickable shape.
 */
type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};

/**
 * Geographic coordinate with an optional weight value, used for heatmap data points.
 */
export type WeightLatLng = {
    latitude: number;
    longitude: number;
    weight?: number;
};

/**
 * Geographic coordinate with latitude and longitude.
 */
export type LatLng = {
    latitude: number;
    longitude: number;
};

/**
 * Creates a {@link MapLabel} bound to a marker's position and map.
 * @param marker - The Google Maps marker to bind the label to.
 * @param title - The text content of the label.
 * @returns A new MapLabel instance bound to the marker.
 */
const _createMapLabelByMarker = (
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
 * Creates a {@link MapLabel} at a fixed position on the map.
 * @param map - The Google Maps instance.
 * @param position - The geographic position for the label.
 * @param title - The text content of the label.
 * @returns A new MapLabel instance placed at the given position.
 */
const _createMapLabelByMarkerByPosition = (
    map: google.maps.Map,
    position: google.maps.LatLng,
    title: string,
): MapLabel =>
    new MapLabel({
        text: title,
        strokeWeight: 2,
        position: position,
        map: map,
    });

/**
 * Google Maps wrapper with support for markers, polygons, heatmaps, geocoding, and custom map styles.
 *
 * @description Provides a high-level API over the Google Maps JavaScript API. Manages
 * collections of markers and polygons with associated {@link MapLabel} overlays,
 * heatmap visualization, address geocoding, and custom map styling.
 *
 * @example
 * const googleMap = new GoogleMap(containerKnot, '.map', {
 *     center: { lat: 47.6, lng: 17.53 },
 *     zoom: 10,
 * });
 * googleMap.setMarkerIcon('default', iconOptions);
 * googleMap.createMarker('m1', 'My Marker', 'default', 47.6, 17.53);
 *
 * @see {@link MapLabel}
 * @see {@link Collection}
 * @see {@link Objekt}
 * @see {@link Deferred}
 * @category Component
 */
export class GoogleMap {
    mapKnot: Knot;
    options!: Objekt;
    map!: google.maps.Map;
    markerIcons!: {
        [key: string]: MarkerIcon;
    };
    overlay!: google.maps.OverlayView;
    polygonOptions!: Objekt;
    polygons!: Collection<Objekt>;
    markers!: Collection<Objekt>;
    markerOptions!: Objekt;
    heatmapOptions!: Objekt;
    heatmap!: google.maps.visualization.HeatmapLayer;

    /**
     * @param dom - The parent DOM wrapper {@link Knot}.
     * @param opt_selector - CSS selector for the map container element.
     * @param opt_options - Google Maps configuration options merged with defaults.
     */
    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.map',
        opt_options: object | undefined = {},
    ) {
        this.mapKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

    /**
     * Merges user-provided options with default map configuration.
     * @param opt_options - Configuration options to merge.
     */
    private _setOptions(opt_options: object | undefined = {}): void {
        this.options = new Objekt({
            center: {
                lat: 47.6,
                lng: 17.533333,
            },
            zoom: 8,
            scrollwheel: false,
            streetViewControl: false,
            // disableDefaultUI: true,
            scaleControl: true,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControlOptions: {
                mapTypeIds: [
                    google.maps.MapTypeId.TERRAIN,
                    google.maps.MapTypeId.SATELLITE,
                ],
            },
        });
        this.options.merge(opt_options);
    }

    /**
     * Returns the current map type identifier (e.g. terrain, satellite).
     *
     * @returns The active map type ID string.
     *
     * @example
     * const mapType = googleMap.getMapType();
     */
    getMapType(): string {
        return this.map.getMapTypeId()!;
    }

    /**
     * Sets the map type to display.
     *
     * @param mapTypeId - The map type identifier to set (e.g. 'terrain', 'satellite').
     *
     * @example
     * googleMap.setMapType('satellite');
     */
    setMapType(mapTypeId: string): void {
        this.map.setMapTypeId(mapTypeId);
    }

    /**
     * Registers a custom styled map type on the map instance.
     *
     * @param mapTypeId - Unique identifier for the custom map type.
     * @param mapTypeName - Display name for the custom map type.
     * @param mapStyles - Array of Google Maps style definitions.
     *
     * @example
     * googleMap.setCustomMapStyle('custom', 'Custom Style', [
     *     { featureType: 'water', stylers: [{ color: '#0000ff' }] },
     * ]);
     */
    setCustomMapStyle(
        mapTypeId: string,
        mapTypeName: string,
        mapStyles: Array<google.maps.MapTypeStyle | null>,
    ): void {
        const styledMapType = new google.maps.StyledMapType(mapStyles, {
            name: mapTypeName,
        });
        this.map.mapTypes.set(mapTypeId, styledMapType);
    }

    /**
     * Initializes marker icons, map instance, overlay, and collections.
     */
    private _init(): void {
        this.markerIcons = {};

        this._initMap();
        this._initOverlay();

        this.setMarkers();
        this.setPolygons();
    }

    /**
     * Creates the Google Maps instance and binds map-level events.
     */
    private _initMap(): void {
        this.map = new google.maps.Map(
            this.mapKnot.getNode(),
            this.options.copyObject() as google.maps.MapOptions,
        );

        this._unbindEventsToMap();
        this._bindEventsToMap();
    }

    /**
     * Binds click and map type change events to the map.
     */
    private _bindEventsToMap(): void {
        this.map.addListener('click', (event: any) => {
            const vertex = event.latLng;
            this.eventMapClick(vertex.lat(), vertex.lng(), event);
        });

        this.map.addListener('maptypeid_changed', (event: any) => {
            this.eventMapTypeChange(this.getMapType(), event);
        });
    }

    /**
     * Removes all event listeners from the map instance.
     */
    private _unbindEventsToMap(): void {
        google.maps.event.clearInstanceListeners(this.map);
    }

    /**
     * Initializes the overlay view used for coordinate projections.
     */
    private _initOverlay(): void {
        this.overlay = new google.maps.OverlayView();
        this.overlay.draw = () => {
            // empty function
        };
        this.overlay.setMap(this.map);
    }

    /**
     * Called when a polygon's path changes. Override to handle polygon edits.
     * @param polygonData - The polygon data object (without internal properties).
     * @param points - The updated array of polygon vertex coordinates.
     */
    eventPolygonChanged(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        consoleDebug('GoogleMap.eventPolygonChanged()', polygonData, points);
    }

    /**
     * Creates a new polygon or updates an existing one identified by ID.
     *
     * @param id - Unique identifier for the polygon.
     * @param title - Display label for the polygon.
     * @param points - Array of vertex coordinates forming the polygon.
     * @param opt_polygonData - Additional data to associate with the polygon.
     * @param opt_options - Google Maps Polygon style options.
     *
     * @example
     * googleMap.createOrUpdatePolygon('p1', 'Area', [
     *     { latitude: 47.6, longitude: 17.5 },
     *     { latitude: 47.7, longitude: 17.6 },
     *     { latitude: 47.5, longitude: 17.7 },
     * ]);
     */
    createOrUpdatePolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const polygon = this.getPolygon(id);
        if (polygon) {
            this.updatePolygon(id, title, points, opt_polygonData, opt_options);
        } else {
            this.createPolygon(id, title, points, opt_polygonData, opt_options);
        }
    }

    /**
     * Creates a new polygon on the map with a label at its center.
     *
     * @param id - Unique identifier for the polygon.
     * @param title - Display label for the polygon.
     * @param points - Array of vertex coordinates forming the polygon.
     * @param opt_polygonData - Additional data to associate with the polygon.
     * @param opt_options - Google Maps Polygon style options.
     *
     * @example
     * googleMap.createPolygon('p1', 'Field', [
     *     { latitude: 47.6, longitude: 17.5 },
     *     { latitude: 47.7, longitude: 17.6 },
     *     { latitude: 47.5, longitude: 17.7 },
     * ]);
     */
    createPolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const polygonData = new Objekt(opt_polygonData);
        if (!polygonData.get('id')) {
            polygonData.set('id', id);
        }
        const options = new Objekt(this.polygonOptions);
        options.merge(opt_options);

        const polygon = new google.maps.Polygon(options.copyObject());
        polygon.setMap(this.map);
        polygonData.setRaw('_polygon', polygon);
        this._addPointsToPolygon(polygonData, points);

        const latLng = this.getCenterOfPolygon(polygonData);
        const mapLabel = _createMapLabelByMarkerByPosition(
            this.map,
            new google.maps.LatLng(latLng.latitude, latLng.longitude),
            title,
        );
        polygonData.setRaw('_map_label', mapLabel);

        this.polygons.push(polygonData);

        this._bindEventsToPolygon(polygon, polygonData);
    }

    /**
     * Updates an existing polygon's data, path, and label.
     *
     * @param id - The polygon identifier to update.
     * @param title - Updated display label.
     * @param points - Updated array of vertex coordinates.
     * @param opt_polygonData - Updated data to merge into the polygon.
     * @param opt_options - Updated Google Maps Polygon style options.
     *
     * @example
     * googleMap.updatePolygon('p1', 'Updated Field', [
     *     { latitude: 47.61, longitude: 17.51 },
     *     { latitude: 47.71, longitude: 17.61 },
     *     { latitude: 47.51, longitude: 17.71 },
     * ]);
     */
    updatePolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const polygonData = this.getPolygon(id)!;
        eachObject(this._cleanPolygonData(opt_polygonData), (value, key) => {
            polygonData.set(key, value);
        });

        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        polygon.setOptions(opt_options);
        this._addPointsToPolygon(polygonData, points);

        const latLng = this.getCenterOfPolygon(polygonData);
        const mapLabel = polygonData.get<MapLabel>('_map_label');
        mapLabel.set('text', title);
        mapLabel.set(
            'position',
            new google.maps.LatLng(latLng.latitude, latLng.longitude),
        );
    }

    /**
     * Strips internal properties (_polygon, _map_label, _bounds) from polygon data.
     * @param polygonData - Raw polygon data object.
     * @returns A cleaned {@link Objekt} without internal keys.
     */
    private _cleanPolygonData(polygonData: object): Objekt {
        const cleanData = new Objekt();
        eachObject(polygonData, (value, key) => {
            if (!inArray(['_polygon', '_map_label', '_bounds'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }

    /**
     * Retrieves a polygon data object by its identifier.
     *
     * @param id - The polygon identifier.
     * @returns The polygon data {@link Objekt}, or null if not found.
     *
     * @example
     * const polygon = googleMap.getPolygon('p1');
     */
    getPolygon(id: Id): Objekt | null {
        return this.polygons.findById(id);
    }

    /**
     * Removes a polygon and its label from the map.
     *
     * @param id - The polygon identifier to remove.
     *
     * @example
     * googleMap.removePolygon('p1');
     */
    removePolygon(id: Id): void {
        const polygonData = this.getPolygon(id);
        if (polygonData) {
            const mapLabel = polygonData.get<MapLabel>('_map_label');
            mapLabel.set('map', null);
            const polygon = polygonData.get<google.maps.Polygon>('_polygon');
            polygon.setMap(null);
            this._unbindEventsToPolygon(polygon);
            this.polygons.deleteById(id);
        }
    }

    /**
     * Removes all polygons and their labels from the map.
     *
     * @example
     * googleMap.removeAllPolygon();
     */
    removeAllPolygon(): void {
        this.polygons.each((polygonData) => {
            const polygon = polygonData.get<google.maps.Polygon>('_polygon');
            polygon.setMap(null);
            const mapLabel = polygonData.get<MapLabel>('_map_label');
            mapLabel.set('map', null);
            this._unbindEventsToPolygon(polygon);
        });
        this.polygons.clear();
    }

    /**
     * Binds click, double-click, right-click, and path change events to a polygon.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _bindEventsToPolygon(
        polygon: google.maps.Polygon,
        polygonData: Objekt,
    ): void {
        const cleanPolygonData = this._cleanPolygonData(polygonData);

        polygon.addListener('rightclick', (event: any) => {
            if (event.vertex) {
                const path = polygon.getPath();
                path.removeAt(event.vertex);
            } else {
                const vertex = event.latLng;
                this.eventPolygonRightClick(
                    cleanPolygonData,
                    vertex.lat(),
                    vertex.lng(),
                    event,
                );
            }
        });

        polygon.addListener('click', (event: any) => {
            const vertex = event.latLng;
            this.eventPolygonClick(
                cleanPolygonData,
                vertex.lat(),
                vertex.lng(),
                event,
            );
        });

        polygon.addListener('dblclick', (event: any) => {
            const vertex = event.latLng;
            this.eventPolygonDoubleClick(
                cleanPolygonData,
                vertex.lat(),
                vertex.lng(),
                event,
            );
        });

        this._bindEventsToPolygonPath(polygon, polygonData);
    }

    /**
     * Removes all event listeners from a polygon and its path.
     * @param polygon - The Google Maps Polygon instance.
     */
    private _unbindEventsToPolygon(polygon: google.maps.Polygon): void {
        google.maps.event.clearInstanceListeners(polygon);
        this._unbindEventsToPolygonPath(polygon);
    }

    /**
     * Binds insert, set, and remove events on the polygon path to trigger change callbacks.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _bindEventsToPolygonPath(
        polygon: google.maps.Polygon,
        polygonData: Objekt,
    ): void {
        const path = polygon.getPath();
        if (path) {
            path.addListener('insert_at', () => {
                this._callPolygonChangeEvent(polygon, polygonData);
            });
            path.addListener('set_at', () => {
                this._callPolygonChangeEvent(polygon, polygonData);
            });
            path.addListener('remove_at', () => {
                this._callPolygonChangeEvent(polygon, polygonData);
            });
        }
    }

    /**
     * Removes all event listeners from a polygon's path.
     * @param polygon - The Google Maps Polygon instance.
     */
    private _unbindEventsToPolygonPath(polygon: google.maps.Polygon): void {
        const path = polygon.getPath();
        if (path) {
            google.maps.event.clearInstanceListeners(path);
        }
    }

    /**
     * Fires the polygon change event after updating bounds and label position.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _callPolygonChangeEvent(
        polygon: google.maps.Polygon,
        polygonData: Objekt,
    ): void {
        const points = this._getPointsFromPolygon(polygonData);
        this._setBoundsByPoints(polygonData, points);

        const mapLabel = polygonData.get<MapLabel>('_map_label');
        const centerLatLng = this.getCenterOfPolygon(polygonData);
        mapLabel.set(
            'position',
            new google.maps.LatLng(
                centerLatLng.latitude,
                centerLatLng.longitude,
            ),
        );

        const cleanPolygonData = this._cleanPolygonData(polygonData);
        this.eventPolygonChanged(cleanPolygonData, points);
    }

    /**
     * Called when a polygon is clicked. Override to handle polygon clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Click latitude coordinate.
     * @param longitude - Click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: object,
    ): void {
        consoleDebug(
            'GoogleMap.eventPolygonClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }

    /**
     * Called when a polygon is double-clicked. Override to handle polygon double-clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Double-click latitude coordinate.
     * @param longitude - Double-click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonDoubleClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: object,
    ): void {
        consoleDebug(
            'GoogleMap.eventPolygonDoubleClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }

    /**
     * Called when a polygon is right-clicked. Override to handle polygon right-clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Right-click latitude coordinate.
     * @param longitude - Right-click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonRightClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: object,
    ): void {
        consoleDebug(
            'GoogleMap.eventPolygonRightClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }

    /**
     * Called when the map is clicked. Override to handle map clicks.
     * @param latitude - Click latitude coordinate.
     * @param longitude - Click longitude coordinate.
     * @param event - The native map event.
     */
    eventMapClick(latitude: number, longitude: number, event: object): void {
        consoleDebug('GoogleMap.eventMapClick()', latitude, longitude, event);
    }

    /**
     * Called when the map type changes. Override to handle map type changes.
     * @param mapType - The new map type identifier.
     * @param event - The native map event.
     */
    eventMapTypeChange(mapType: string, event: object): void {
        consoleDebug('GoogleMap.eventMapTypeChange()', mapType, event);
    }

    /**
     * Sets the polygon path from an array of points and updates bounds.
     * @param polygonData - The polygon data object.
     * @param points - Array of vertex coordinates.
     */
    private _addPointsToPolygon(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = this._convertPointsToPath(points);
        polygon.setPath(path);
        this._bindEventsToPolygonPath(polygon, polygonData);
        this._setBoundsByPath(polygonData, path);
    }

    /**
     * Converts an array of coordinate objects to Google Maps LatLng instances.
     * @param points - Array of coordinate objects with optional weight.
     * @returns Array of Google Maps LatLng (or weighted location) instances.
     */
    private _convertPointsToPath(
        points: Array<WeightLatLng>,
    ): Array<google.maps.LatLng> {
        const path: any[] = [];
        each(points, (point) => {
            let vertex: any = new google.maps.LatLng(
                point.latitude,
                point.longitude,
            );
            if (!isUndefined(point.weight)) {
                vertex = {
                    location: vertex,
                    weight: point.weight,
                };
            }
            path.push(vertex);
        });
        return path;
    }

    /**
     * Updates the bounds on polygon data from an array of coordinate points.
     * @param polygonData - The polygon data object.
     * @param points - Array of vertex coordinates.
     */
    private _setBoundsByPoints(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        const path = this._convertPointsToPath(points);
        this._setBoundsByPath(polygonData, path);
    }

    /**
     * Calculates and stores the bounding box from a path of LatLng values.
     * @param polygonData - The polygon data object to store bounds on.
     * @param path - Array of Google Maps LatLng instances.
     */
    private _setBoundsByPath(
        polygonData: Objekt,
        path: Array<google.maps.LatLng>,
    ): void {
        const bounds = new google.maps.LatLngBounds();
        if (path.length > 0) {
            each(path, (vertex) => {
                bounds.extend(vertex);
            });
        }
        polygonData.setRaw('_bounds', bounds);
    }

    /**
     * Returns the geographic center of a polygon's bounding box.
     *
     * @param polygonData - The polygon data object containing stored bounds.
     * @returns An object with latitude and longitude of the center.
     *
     * @example
     * const center = googleMap.getCenterOfPolygon(polygonData);
     * // { latitude: 47.6, longitude: 17.5 }
     */
    getCenterOfPolygon(polygonData: Objekt): {
        latitude: number;
        longitude: number;
    } {
        const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
        const vertex = bounds.getCenter();
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }

    /**
     * Pans and zooms the map to fit a polygon's bounds.
     *
     * @param polygonId - The polygon identifier to fit.
     *
     * @example
     * googleMap.fitPolygonToMap('p1');
     */
    fitPolygonToMap(polygonId: string | number): void {
        const polygonData = this.getPolygon(polygonId);
        if (polygonData) {
            const bounds = polygonData.get<google.maps.LatLngBounds>('_bounds');
            if (bounds) {
                const center = bounds.getCenter();
                this.map.setCenter(center);
                this.map.fitBounds(bounds);
            }
        }
    }

    /**
     * Extracts the current vertex coordinates from a polygon's path.
     * @param polygonData - The polygon data object.
     * @returns Array of latitude/longitude objects for each vertex.
     */
    private _getPointsFromPolygon(
        polygonData: Objekt,
    ): Array<{ latitude: number; longitude: number }> {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath().getArray();
        this._setBoundsByPath(polygonData, path);
        const points: Array<{ latitude: number; longitude: number }> = [];
        each(path, (vertex) => {
            points.push({
                latitude: vertex.lat(),
                longitude: vertex.lng(),
            });
        });
        return points;
    }

    /**
     * Computes the area of a polygon in square meters using spherical geometry.
     *
     * @param polygonData - The polygon data object.
     * @returns The computed area in square meters.
     *
     * @example
     * const area = googleMap.getComputeArea(polygonData);
     */
    getComputeArea(polygonData: Objekt): number {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath();
        return google.maps.geometry.spherical.computeArea(path);
    }

    /**
     * Appends a vertex to an existing polygon's path.
     *
     * @param polygonData - The polygon data object.
     * @param latitude - Latitude of the new vertex.
     * @param longitude - Longitude of the new vertex.
     *
     * @example
     * googleMap.addPointToPolygon(polygonData, 47.65, 17.55);
     */
    addPointToPolygon(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
    ): void {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath();
        path.push(new google.maps.LatLng(latitude, longitude));
    }

    /**
     * Initializes or resets the marker {@link Collection} and default marker options.
     *
     * @param opt_options - Default marker options merged into all new markers.
     *
     * @example
     * googleMap.setMarkers({ draggable: true });
     */
    setMarkers(opt_options: object | undefined = {}): void {
        this.markers = new Collection();

        this.markerOptions = new Objekt({
            draggable: false,
        });
        this.markerOptions.merge(opt_options);
    }

    /**
     * Initializes the heatmap configuration with default gradient and options.
     *
     * @param opt_options - Heatmap options to merge with defaults.
     *
     * @example
     * googleMap.setHeatmap({ opacity: 0.8, radius: 20 });
     */
    setHeatmap(opt_options: object | undefined = {}): void {
        const gradient = [
            'rgba(102, 255, 0, 0)',
            'rgba(102, 255, 0, 1)',
            'rgba(147, 255, 0, 1)',
            'rgba(193, 255, 0, 1)',
            'rgba(238, 255, 0, 1)',
            'rgba(244, 227, 0, 1)',
            'rgba(249, 198, 0, 1)',
            'rgba(255, 170, 0, 1)',
            'rgba(255, 113, 0, 1)',
            'rgba(255, 57, 0, 1)',
            'rgba(255, 0, 0, 1)',
        ];

        this.heatmapOptions = new Objekt({
            opacity: 0.6,
            radius: null,
            gradient: gradient,
        });
        this.heatmapOptions.merge(opt_options);
    }

    /**
     * Creates a heatmap layer on the map from weighted coordinate data.
     *
     * @param points - Array of weighted geographic coordinates.
     * @param opt_heatmapOptions - Additional heatmap options to merge.
     *
     * @example
     * googleMap.setHeatmap();
     * googleMap.createHeatmap([
     *     { latitude: 47.6, longitude: 17.5, weight: 3 },
     *     { latitude: 47.7, longitude: 17.6, weight: 1 },
     * ]);
     */
    createHeatmap(
        points: Array<WeightLatLng>,
        opt_heatmapOptions: object | undefined = {},
    ): void {
        this.heatmap = new google.maps.visualization.HeatmapLayer({
            data: this._convertPointsToPath(points),
            map: this.map,
        });

        this.heatmapOptions.merge(opt_heatmapOptions);
        eachObject(this.heatmapOptions, (value, property) => {
            this.heatmap.set(property, value);
        });
    }

    /**
     * Removes the current heatmap layer from the map.
     *
     * @example
     * googleMap.removeHeatmap();
     */
    removeHeatmap(): void {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
    }

    /**
     * Initializes or resets the polygon {@link Collection} and default polygon options.
     *
     * @param opt_options - Default polygon style options merged into all new polygons.
     *
     * @example
     * googleMap.setPolygons({ fillColor: '#00FF00', editable: true });
     */
    setPolygons(opt_options: object | undefined = {}): void {
        this.polygons = new Collection();

        this.polygonOptions = new Objekt({
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2,
            editable: false,
        });
        this.polygonOptions.merge(opt_options);
    }

    /**
     * Creates a new marker or updates an existing one identified by ID.
     *
     * @param id - Unique identifier for the marker.
     * @param title - Display label for the marker.
     * @param iconName - Name of a registered marker icon.
     * @param latitude - Latitude position.
     * @param longitude - Longitude position.
     * @param opt_markerData - Additional data to associate with the marker.
     * @param opt_options - Google Maps Marker options.
     *
     * @example
     * googleMap.createOrUpdateMarker('m1', 'Location', 'default', 47.6, 17.5);
     */
    createOrUpdateMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const marker = this.getMarker(id);
        if (marker) {
            this.updateMarker(
                id,
                title,
                iconName,
                latitude,
                longitude,
                opt_markerData,
                opt_options,
            );
        } else {
            this.createMarker(
                id,
                title,
                iconName,
                latitude,
                longitude,
                opt_markerData,
                opt_options,
            );
        }
    }

    /**
     * Creates a new marker on the map with an associated {@link MapLabel}.
     *
     * @param id - Unique identifier for the marker.
     * @param title - Display label for the marker.
     * @param iconName - Name of a registered marker icon (see {@link setMarkerIcon}).
     * @param latitude - Latitude position.
     * @param longitude - Longitude position.
     * @param opt_markerData - Additional data to associate with the marker.
     * @param opt_options - Google Maps Marker options.
     *
     * @example
     * googleMap.createMarker('m1', 'Home', 'default', 47.6, 17.5);
     */
    createMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const markerData = new Objekt(opt_markerData);
        if (!markerData.get('id')) {
            markerData.set('id', id);
        }
        const options = new Objekt(this.markerOptions);
        options.merge(opt_options);

        const text = title.toString();
        const marker = new google.maps.Marker(options.copyObject());
        marker.setPosition(new google.maps.LatLng(latitude, longitude));
        marker.setIcon(this.markerIcons[iconName].icon);
        marker.setShape(this.markerIcons[iconName].shape);
        marker.setTitle(text);
        marker.setMap(this.map);
        markerData.setRaw('_marker', marker);

        const mapLabel = _createMapLabelByMarker(marker, text);
        markerData.setRaw('_map_label', mapLabel);

        this.markers.push(markerData);

        this._bindEventsToMarker(marker, markerData);
    }

    /**
     * Creates a marker from pixel coordinates, converting them to geographic coordinates.
     *
     * @param id - Unique identifier for the marker.
     * @param title - Display label for the marker.
     * @param iconName - Name of a registered marker icon.
     * @param x - Horizontal pixel coordinate on the map container.
     * @param y - Vertical pixel coordinate on the map container.
     * @param markerData - Additional data to associate with the marker.
     *
     * @example
     * googleMap.createMarkerByXY('m2', 'Dropped', 'default', 150, 200);
     */
    createMarkerByXY(
        id: Id,
        title: string,
        iconName: string,
        x: number,
        y: number,
        markerData: object | undefined = {},
    ): void {
        const point = new google.maps.Point(x, y);
        const projection = this.overlay.getProjection();
        const location = projection.fromContainerPixelToLatLng(point)!;

        this.createMarker(
            id,
            title,
            iconName,
            location.lat(),
            location.lng(),
            markerData,
        );
    }

    /**
     * Binds click, double-click, right-click, drag, and dragend events to a marker.
     * @param marker - The Google Maps Marker instance.
     * @param markerData - The associated marker data object.
     */
    private _bindEventsToMarker(
        marker: google.maps.Marker,
        markerData: Objekt,
    ): void {
        const cleanMarkerData = this._cleanMarkerData(markerData);

        marker.addListener('click', (event: any) => {
            this.eventMarkerClick(cleanMarkerData, event);
        });

        marker.addListener('dblclick', (event: any) => {
            this.eventMarkerDoubleClick(cleanMarkerData, event);
        });

        marker.addListener('rightclick', (event: any) => {
            this.eventMarkerRightClick(cleanMarkerData, event);
        });

        marker.addListener('drag', (_event: any) => {
            const vertex = marker.getPosition()!;
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.set('position', vertex);
        });

        marker.addListener('dragend', (event: any) => {
            const vertex = marker.getPosition()!;
            const latitude = vertex.lat();
            const longitude = vertex.lng();
            this.eventMarkerChanged(
                cleanMarkerData,
                latitude,
                longitude,
                event,
            );
        });
    }

    /**
     * Removes all event listeners from a marker.
     * @param marker - The Google Maps Marker instance.
     */
    private _unbindEventsToMarker(marker: google.maps.Marker): void {
        google.maps.event.clearInstanceListeners(marker);
    }

    /**
     * Updates an existing marker's data, icon, title, and position.
     *
     * @param id - The marker identifier to update.
     * @param title - Updated display label.
     * @param iconName - Updated icon name from registered marker icons.
     * @param latitude - Updated latitude position.
     * @param longitude - Updated longitude position.
     * @param opt_markerData - Updated data to merge into the marker.
     * @param opt_options - Updated Google Maps Marker options.
     *
     * @example
     * googleMap.updateMarker('m1', 'New Title', 'default', 47.65, 17.55);
     */
    updateMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: object | undefined = {},
        opt_options: object | undefined = {},
    ): void {
        const markerData = this.getMarker(id)!;
        eachObject(this._cleanMarkerData(opt_markerData), (value, key) => {
            markerData.set(key, value);
        });
        const text = title.toString();
        const marker = markerData.get<google.maps.Marker>('_marker');
        marker.setOptions(opt_options);

        const markerIcon = this.markerIcons[iconName];
        marker.setIcon(markerIcon.icon);
        marker.setShape(markerIcon.shape);
        marker.setTitle(text);
        marker.setPosition(new google.maps.LatLng(latitude, longitude));

        const mapLabel = markerData.get<MapLabel>('_map_label');
        mapLabel.set('text', text);
    }

    /**
     * Strips internal properties (_marker, _map_label) from marker data.
     * @param markerData - Raw marker data object.
     * @returns A cleaned {@link Objekt} without internal keys.
     */
    private _cleanMarkerData(markerData: object): Objekt {
        const cleanData = new Objekt();
        eachObject(markerData, (value, key) => {
            if (!inArray(['_marker', '_map_label'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }

    /**
     * Retrieves a marker data object by its identifier.
     *
     * @param id - The marker identifier.
     * @returns The marker data {@link Objekt}, or null if not found.
     *
     * @example
     * const marker = googleMap.getMarker('m1');
     */
    getMarker(id: Id): Objekt | null {
        return this.markers.findById(id);
    }

    /**
     * Removes a marker and its label from the map.
     *
     * @param id - The marker identifier to remove.
     *
     * @example
     * googleMap.removeMarker('m1');
     */
    removeMarker(id: Id): void {
        const markerData = this.getMarker(id);
        if (markerData) {
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.setMap(null as any);
            const marker = markerData.get<google.maps.Marker>('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
            this.markers.deleteById(id);
        }
    }

    /**
     * Removes all markers and their labels from the map.
     *
     * @example
     * googleMap.removeAllMarker();
     */
    removeAllMarker(): void {
        this.markers.each((markerData) => {
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.setMap(null as any);
            const marker = markerData.get<google.maps.Marker>('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
        });
        this.markers.clear();
    }

    /**
     * Centers the map on a specific marker's position.
     *
     * @param markerId - The marker identifier to center on.
     *
     * @example
     * googleMap.fitMarkerToMap('m1');
     */
    fitMarkerToMap(markerId: string | number): void {
        const markerData = this.getMarker(markerId);
        if (markerData) {
            const marker = markerData.get<google.maps.Marker>('_marker');
            const vertex = marker.getPosition()!;
            const latitude = vertex.lat();
            const longitude = vertex.lng();
            this.setCenter(latitude, longitude);
        }
    }

    /**
     * Opens an info window above a marker with HTML content.
     *
     * @param markerId - The marker identifier to attach the info window to.
     * @param content - HTML content string for the info window.
     *
     * @example
     * googleMap.openInfoWindow('m1', '<h3>Details</h3><p>More info</p>');
     */
    openInfoWindow(markerId: string | number, content: string): void {
        const markerData = this.getMarker(markerId)!;
        const marker = markerData.get<google.maps.Marker>('_marker');
        const infoWindow = new google.maps.InfoWindow({
            content: content.toString(),
        });
        infoWindow.open(this.map, marker);
    }

    /**
     * Called when a marker is clicked. Override to handle marker clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerClick()', markerData, event);
    }

    /**
     * Called when a marker is double-clicked. Override to handle marker double-clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerDoubleClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerDoubleClick()', markerData, event);
    }

    /**
     * Called when a marker is right-clicked. Override to handle marker right-clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerRightClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerRightClick()', markerData, event);
    }

    /**
     * Called when a marker is dragged to a new position. Override to handle marker moves.
     * @param markerData - The marker data object (without internal properties).
     * @param latitude - New latitude after drag.
     * @param longitude - New longitude after drag.
     * @param event - The native map event.
     */
    eventMarkerChanged(
        markerData: Objekt,
        latitude: number,
        longitude: number,
        event: object,
    ): void {
        consoleDebug(
            'GoogleMap.eventMarkerChanged()',
            markerData,
            latitude,
            longitude,
            event,
        );
    }

    /**
     * Registers a named marker icon configuration for use with marker creation.
     *
     * @param name - Unique name to reference this icon.
     * @param iconOptions - Icon configuration including URL, size, origin, anchor, and coords.
     *
     * @example
     * googleMap.setMarkerIcon('default', {
     *     url: '/icons/marker.png',
     *     size: [32, 32],
     *     origin: [0, 0],
     *     anchor: [16, 32],
     *     coords: [16, 0, 32, 32, 0, 32],
     * });
     */
    setMarkerIcon(name: string, iconOptions: IconOptions): void {
        // https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
        const icon = {
            url: iconOptions.url,
            size: new google.maps.Size(
                iconOptions.size[0],
                iconOptions.size[1],
            ),
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

        this.markerIcons[name] = {
            icon: icon,
            shape: shape,
        };
    }

    /**
     * Geocodes an address query and returns matching locations.
     *
     * @param query - The address string to search for.
     * @returns A {@link Deferred} promise resolving with an array of address/coordinate results.
     *
     * @example
     * googleMap.searchAddress('Budapest').then(([results]) => {
     *     results.forEach((r) => console.log(r.address, r.latitude, r.longitude));
     * });
     */
    searchAddress(query: string) {
        const deferred = new Deferred<
            [{ address: string; latitude: number; longitude: number }[]],
            void
        >();
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode(
            {
                address: query.toString(),
            },
            (results, status) => {
                if (
                    status === google.maps.GeocoderStatus.OK &&
                    results &&
                    results.length > 0
                ) {
                    const points: Array<{
                        address: string;
                        latitude: number;
                        longitude: number;
                    }> = [];
                    each(results, (result) => {
                        const point = {
                            address: result.formatted_address,
                            latitude: result.geometry.location.lat(),
                            longitude: result.geometry.location.lng(),
                        };
                        points.push(point);
                    });
                    deferred.resolve([points]);
                } else {
                    deferred.reject();
                }
            },
        );
        return deferred.promise();
    }

    /**
     * Sets the map center to the specified coordinates.
     *
     * @param latitude - Center latitude.
     * @param longitude - Center longitude.
     * @param opt_boundCheck - When true, only re-centers if the position is outside the current viewport.
     *
     * @example
     * googleMap.setCenter(47.6, 17.5);
     * googleMap.setCenter(47.6, 17.5, true); // only if out of bounds
     */
    setCenter(
        latitude: number,
        longitude: number,
        opt_boundCheck: boolean | undefined = false,
    ): void {
        const position = new google.maps.LatLng(latitude, longitude);
        if (opt_boundCheck) {
            if (!this.map.getBounds()!.contains(position)) {
                this.map.setCenter(position);
            }
        } else {
            this.map.setCenter(position);
        }
    }

    /**
     * Returns the current center coordinates of the map.
     *
     * @returns An object with latitude and longitude of the map center.
     *
     * @example
     * const center = googleMap.getCenter();
     * // { latitude: 47.6, longitude: 17.5 }
     */
    getCenter(): { latitude: number; longitude: number } {
        const vertex = this.map.getCenter()!;
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }

    /**
     * Triggers a map resize event, useful after the map container size changes.
     *
     * @example
     * googleMap.triggerResize();
     */
    triggerResize(): void {
        google.maps.event.trigger(this.map, 'resize');
    }

    /**
     * Converts a pixel radius to a geographic distance in meters based on the current zoom and projection.
     *
     * @param radiusPx - Radius in pixels.
     * @returns The equivalent distance in meters.
     *
     * @example
     * const meters = googleMap.getDinamicRadius(50);
     */
    getDinamicRadius(radiusPx: number): number {
        const point1 = new google.maps.Point(0, 0);
        const point2 = new google.maps.Point(radiusPx, radiusPx);

        const projection = this.overlay.getProjection();
        const location1 = projection.fromContainerPixelToLatLng(point1)!;
        const location2 = projection.fromContainerPixelToLatLng(point2)!;

        const latLng1 = new google.maps.LatLng(
            location1.lat(),
            location1.lng(),
        );
        const latLng2 = new google.maps.LatLng(
            location2.lat(),
            location2.lng(),
        );

        return google.maps.geometry.spherical.computeDistanceBetween(
            latLng1,
            latLng2,
        );
    }
}
