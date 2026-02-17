import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Knot } from '../core';
import { IconOptions, Id } from '../utils';
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
export declare class GoogleMap {
    mapKnot: Knot;
    options: Objekt;
    map: google.maps.Map;
    markerIcons: {
        [key: string]: MarkerIcon;
    };
    overlay: google.maps.OverlayView;
    polygonOptions: Objekt;
    polygons: Collection<Objekt>;
    markers: Collection<Objekt>;
    markerOptions: Objekt;
    heatmapOptions: Objekt;
    heatmap: google.maps.visualization.HeatmapLayer;
    /**
     * @param dom - The parent DOM wrapper {@link Knot}.
     * @param opt_selector - CSS selector for the map container element.
     * @param opt_options - Google Maps configuration options merged with defaults.
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: object | undefined);
    /**
     * Merges user-provided options with default map configuration.
     * @param opt_options - Configuration options to merge.
     */
    private _setOptions;
    /**
     * Returns the current map type identifier (e.g. terrain, satellite).
     *
     * @returns The active map type ID string.
     *
     * @example
     * const mapType = googleMap.getMapType();
     */
    getMapType(): string;
    /**
     * Sets the map type to display.
     *
     * @param mapTypeId - The map type identifier to set (e.g. 'terrain', 'satellite').
     *
     * @example
     * googleMap.setMapType('satellite');
     */
    setMapType(mapTypeId: string): void;
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
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    /**
     * Initializes marker icons, map instance, overlay, and collections.
     */
    private _init;
    /**
     * Creates the Google Maps instance and binds map-level events.
     */
    private _initMap;
    /**
     * Binds click and map type change events to the map.
     */
    private _bindEventsToMap;
    /**
     * Removes all event listeners from the map instance.
     */
    private _unbindEventsToMap;
    /**
     * Initializes the overlay view used for coordinate projections.
     */
    private _initOverlay;
    /**
     * Called when a polygon's path changes. Override to handle polygon edits.
     * @param polygonData - The polygon data object (without internal properties).
     * @param points - The updated array of polygon vertex coordinates.
     */
    eventPolygonChanged(polygonData: Objekt, points: Array<{
        latitude: number;
        longitude: number;
    }>): void;
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
    createOrUpdatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: object | undefined, opt_options?: object | undefined): void;
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
    createPolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: object | undefined, opt_options?: object | undefined): void;
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
    updatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: object | undefined, opt_options?: object | undefined): void;
    /**
     * Strips internal properties (_polygon, _map_label, _bounds) from polygon data.
     * @param polygonData - Raw polygon data object.
     * @returns A cleaned {@link Objekt} without internal keys.
     */
    private _cleanPolygonData;
    /**
     * Retrieves a polygon data object by its identifier.
     *
     * @param id - The polygon identifier.
     * @returns The polygon data {@link Objekt}, or null if not found.
     *
     * @example
     * const polygon = googleMap.getPolygon('p1');
     */
    getPolygon(id: Id): Objekt | null;
    /**
     * Removes a polygon and its label from the map.
     *
     * @param id - The polygon identifier to remove.
     *
     * @example
     * googleMap.removePolygon('p1');
     */
    removePolygon(id: Id): void;
    /**
     * Removes all polygons and their labels from the map.
     *
     * @example
     * googleMap.removeAllPolygon();
     */
    removeAllPolygon(): void;
    /**
     * Binds click, double-click, right-click, and path change events to a polygon.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _bindEventsToPolygon;
    /**
     * Removes all event listeners from a polygon and its path.
     * @param polygon - The Google Maps Polygon instance.
     */
    private _unbindEventsToPolygon;
    /**
     * Binds insert, set, and remove events on the polygon path to trigger change callbacks.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _bindEventsToPolygonPath;
    /**
     * Removes all event listeners from a polygon's path.
     * @param polygon - The Google Maps Polygon instance.
     */
    private _unbindEventsToPolygonPath;
    /**
     * Fires the polygon change event after updating bounds and label position.
     * @param polygon - The Google Maps Polygon instance.
     * @param polygonData - The associated polygon data object.
     */
    private _callPolygonChangeEvent;
    /**
     * Called when a polygon is clicked. Override to handle polygon clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Click latitude coordinate.
     * @param longitude - Click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonClick(polygonData: Objekt, latitude: number, longitude: number, event: object): void;
    /**
     * Called when a polygon is double-clicked. Override to handle polygon double-clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Double-click latitude coordinate.
     * @param longitude - Double-click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonDoubleClick(polygonData: Objekt, latitude: number, longitude: number, event: object): void;
    /**
     * Called when a polygon is right-clicked. Override to handle polygon right-clicks.
     * @param polygonData - The polygon data object (without internal properties).
     * @param latitude - Right-click latitude coordinate.
     * @param longitude - Right-click longitude coordinate.
     * @param event - The native map event.
     */
    eventPolygonRightClick(polygonData: Objekt, latitude: number, longitude: number, event: object): void;
    /**
     * Called when the map is clicked. Override to handle map clicks.
     * @param latitude - Click latitude coordinate.
     * @param longitude - Click longitude coordinate.
     * @param event - The native map event.
     */
    eventMapClick(latitude: number, longitude: number, event: object): void;
    /**
     * Called when the map type changes. Override to handle map type changes.
     * @param mapType - The new map type identifier.
     * @param event - The native map event.
     */
    eventMapTypeChange(mapType: string, event: object): void;
    /**
     * Sets the polygon path from an array of points and updates bounds.
     * @param polygonData - The polygon data object.
     * @param points - Array of vertex coordinates.
     */
    private _addPointsToPolygon;
    /**
     * Converts an array of coordinate objects to Google Maps LatLng instances.
     * @param points - Array of coordinate objects with optional weight.
     * @returns Array of Google Maps LatLng (or weighted location) instances.
     */
    private _convertPointsToPath;
    /**
     * Updates the bounds on polygon data from an array of coordinate points.
     * @param polygonData - The polygon data object.
     * @param points - Array of vertex coordinates.
     */
    private _setBoundsByPoints;
    /**
     * Calculates and stores the bounding box from a path of LatLng values.
     * @param polygonData - The polygon data object to store bounds on.
     * @param path - Array of Google Maps LatLng instances.
     */
    private _setBoundsByPath;
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
    };
    /**
     * Pans and zooms the map to fit a polygon's bounds.
     *
     * @param polygonId - The polygon identifier to fit.
     *
     * @example
     * googleMap.fitPolygonToMap('p1');
     */
    fitPolygonToMap(polygonId: string | number): void;
    /**
     * Extracts the current vertex coordinates from a polygon's path.
     * @param polygonData - The polygon data object.
     * @returns Array of latitude/longitude objects for each vertex.
     */
    private _getPointsFromPolygon;
    /**
     * Computes the area of a polygon in square meters using spherical geometry.
     *
     * @param polygonData - The polygon data object.
     * @returns The computed area in square meters.
     *
     * @example
     * const area = googleMap.getComputeArea(polygonData);
     */
    getComputeArea(polygonData: Objekt): number;
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
    addPointToPolygon(polygonData: Objekt, latitude: number, longitude: number): void;
    /**
     * Initializes or resets the marker {@link Collection} and default marker options.
     *
     * @param opt_options - Default marker options merged into all new markers.
     *
     * @example
     * googleMap.setMarkers({ draggable: true });
     */
    setMarkers(opt_options?: object | undefined): void;
    /**
     * Initializes the heatmap configuration with default gradient and options.
     *
     * @param opt_options - Heatmap options to merge with defaults.
     *
     * @example
     * googleMap.setHeatmap({ opacity: 0.8, radius: 20 });
     */
    setHeatmap(opt_options?: object | undefined): void;
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
    createHeatmap(points: Array<WeightLatLng>, opt_heatmapOptions?: object | undefined): void;
    /**
     * Removes the current heatmap layer from the map.
     *
     * @example
     * googleMap.removeHeatmap();
     */
    removeHeatmap(): void;
    /**
     * Initializes or resets the polygon {@link Collection} and default polygon options.
     *
     * @param opt_options - Default polygon style options merged into all new polygons.
     *
     * @example
     * googleMap.setPolygons({ fillColor: '#00FF00', editable: true });
     */
    setPolygons(opt_options?: object | undefined): void;
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
    createOrUpdateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: object | undefined, opt_options?: object | undefined): void;
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
    createMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: object | undefined, opt_options?: object | undefined): void;
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
    createMarkerByXY(id: Id, title: string, iconName: string, x: number, y: number, markerData?: object | undefined): void;
    /**
     * Binds click, double-click, right-click, drag, and dragend events to a marker.
     * @param marker - The Google Maps Marker instance.
     * @param markerData - The associated marker data object.
     */
    private _bindEventsToMarker;
    /**
     * Removes all event listeners from a marker.
     * @param marker - The Google Maps Marker instance.
     */
    private _unbindEventsToMarker;
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
    updateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: object | undefined, opt_options?: object | undefined): void;
    /**
     * Strips internal properties (_marker, _map_label) from marker data.
     * @param markerData - Raw marker data object.
     * @returns A cleaned {@link Objekt} without internal keys.
     */
    private _cleanMarkerData;
    /**
     * Retrieves a marker data object by its identifier.
     *
     * @param id - The marker identifier.
     * @returns The marker data {@link Objekt}, or null if not found.
     *
     * @example
     * const marker = googleMap.getMarker('m1');
     */
    getMarker(id: Id): Objekt | null;
    /**
     * Removes a marker and its label from the map.
     *
     * @param id - The marker identifier to remove.
     *
     * @example
     * googleMap.removeMarker('m1');
     */
    removeMarker(id: Id): void;
    /**
     * Removes all markers and their labels from the map.
     *
     * @example
     * googleMap.removeAllMarker();
     */
    removeAllMarker(): void;
    /**
     * Centers the map on a specific marker's position.
     *
     * @param markerId - The marker identifier to center on.
     *
     * @example
     * googleMap.fitMarkerToMap('m1');
     */
    fitMarkerToMap(markerId: string | number): void;
    /**
     * Opens an info window above a marker with HTML content.
     *
     * @param markerId - The marker identifier to attach the info window to.
     * @param content - HTML content string for the info window.
     *
     * @example
     * googleMap.openInfoWindow('m1', '<h3>Details</h3><p>More info</p>');
     */
    openInfoWindow(markerId: string | number, content: string): void;
    /**
     * Called when a marker is clicked. Override to handle marker clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerClick(markerData: Objekt, event: object): void;
    /**
     * Called when a marker is double-clicked. Override to handle marker double-clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerDoubleClick(markerData: Objekt, event: object): void;
    /**
     * Called when a marker is right-clicked. Override to handle marker right-clicks.
     * @param markerData - The marker data object (without internal properties).
     * @param event - The native map event.
     */
    eventMarkerRightClick(markerData: Objekt, event: object): void;
    /**
     * Called when a marker is dragged to a new position. Override to handle marker moves.
     * @param markerData - The marker data object (without internal properties).
     * @param latitude - New latitude after drag.
     * @param longitude - New longitude after drag.
     * @param event - The native map event.
     */
    eventMarkerChanged(markerData: Objekt, latitude: number, longitude: number, event: object): void;
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
    setMarkerIcon(name: string, iconOptions: IconOptions): void;
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
    searchAddress(query: string): import("../core").Promize<[{
        address: string;
        latitude: number;
        longitude: number;
    }[]], void>;
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
    setCenter(latitude: number, longitude: number, opt_boundCheck?: boolean | undefined): void;
    /**
     * Returns the current center coordinates of the map.
     *
     * @returns An object with latitude and longitude of the map center.
     *
     * @example
     * const center = googleMap.getCenter();
     * // { latitude: 47.6, longitude: 17.5 }
     */
    getCenter(): {
        latitude: number;
        longitude: number;
    };
    /**
     * Triggers a map resize event, useful after the map container size changes.
     *
     * @example
     * googleMap.triggerResize();
     */
    triggerResize(): void;
    /**
     * Converts a pixel radius to a geographic distance in meters based on the current zoom and projection.
     *
     * @param radiusPx - Radius in pixels.
     * @returns The equivalent distance in meters.
     *
     * @example
     * const meters = googleMap.getDinamicRadius(50);
     */
    getDinamicRadius(radiusPx: number): number;
}
export {};
