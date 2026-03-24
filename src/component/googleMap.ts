import { each, eachObject } from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { Emitter } from '../core/emitter';
import type { Knot } from '../core';
import type { IconOptions, Id } from '../utils';
import {
    type MarkerIcon,
    createMarker as createMarkerOp,
    updateMarker as updateMarkerOp,
    removeMarker as removeMarkerOp,
    removeAllMarkers,
    setMarkerIcon as setMarkerIconOp,
} from './mapMarkerOps';
import {
    convertPointsToPath,
    createPolygon as createPolygonOp,
    updatePolygon as updatePolygonOp,
    removePolygon as removePolygonOp,
    removeAllPolygons,
    getCenterOfPolygon as getCenterOfPolygonOp,
} from './mapPolygonOps';

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
 * Provides a high-level API over the Google Maps JavaScript API. Manages
 * collections of markers and polygons with associated MapLabel overlays,
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
 * @see MapLabel
 * @see {@link Collection}
 * @see {@link Objekt}
 * @see {@link Deferred}
 * @category Component
 */
export class GoogleMap extends Emitter {
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
        super();
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
            mapId: 'DEMO_MAP_ID',
            scrollwheel: false,
            streetViewControl: false,
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

        google.maps.event.clearInstanceListeners(this.map);
        this._bindEventsToMap();
    }

    /**
     * Binds click and map type change events to the map.
     */
    private _bindEventsToMap(): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.map.addListener('click', (event: any) => {
            const vertex = event.latLng;
            this.emit('mapClick', vertex.lat(), vertex.lng(), event);
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.map.addListener('maptypeid_changed', (event: any) => {
            this.emit('mapTypeChange', this.getMapType(), event);
        });
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

    // ── Polygon Operations ──────────────────────────────────────────

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
        createPolygonOp(
            this,
            this.map,
            this.polygons,
            this.polygonOptions,
            id,
            title,
            points,
            opt_polygonData,
            opt_options,
        );
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
        updatePolygonOp(
            this,
            this.polygons,
            id,
            title,
            points,
            opt_polygonData,
            opt_options,
        );
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
        removePolygonOp(this.polygons, id);
    }

    /**
     * Removes all polygons and their labels from the map.
     *
     * @example
     * googleMap.removeAllPolygon();
     */
    removeAllPolygon(): void {
        removeAllPolygons(this.polygons);
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
        return getCenterOfPolygonOp(polygonData);
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

    // ── Marker Operations ───────────────────────────────────────────

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
     * Creates a new marker on the map with an associated MapLabel.
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
        createMarkerOp(
            this,
            this.map,
            this.markers,
            this.markerOptions,
            this.markerIcons,
            id,
            title,
            iconName,
            latitude,
            longitude,
            opt_markerData,
            opt_options,
        );
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
        updateMarkerOp(
            this.markers,
            this.markerIcons,
            id,
            title,
            iconName,
            latitude,
            longitude,
            opt_markerData,
            opt_options,
        );
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
        removeMarkerOp(this.markers, id);
    }

    /**
     * Removes all markers and their labels from the map.
     *
     * @example
     * googleMap.removeAllMarker();
     */
    removeAllMarker(): void {
        removeAllMarkers(this.markers);
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
            const marker =
                markerData.get<google.maps.marker.AdvancedMarkerElement>(
                    '_marker',
                );
            const pos = marker.position as google.maps.LatLngLiteral;
            if (pos) {
                this.setCenter(pos.lat, pos.lng);
            }
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
        const marker =
            markerData.get<google.maps.marker.AdvancedMarkerElement>(
                '_marker',
            );
        const infoWindow = new google.maps.InfoWindow({
            content: content.toString(),
        });
        infoWindow.open({ map: this.map, anchor: marker });
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
        setMarkerIconOp(this.markerIcons, name, iconOptions);
    }

    // ── Heatmap Operations ──────────────────────────────────────────

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
            data: convertPointsToPath(points),
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

    // ── Geocoding & Map Utilities ───────────────────────────────────

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
        void geoCoder.geocode(
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
