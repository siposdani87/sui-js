import {
    each,
    inArray,
    isUndefined,
    eachObject,
    convert,
} from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleInfo } from '../utils/log';
import { Item, Promize } from '../core';
import { IconOptions, Id } from '../utils';

/**
 * @typedef {!Object} MapText
 */
type MapLabel = any;

/**
 * @typedef {!Object} MapText
 */
type MapText = any;

/**
 * @typedef {{icon: string | google.maps.Icon | google.maps.Symbol, shape: google.maps.MarkerShape}} MarkerIcon
 */
type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};

/**
 * @typedef {{latitude: number, longitude: number, weight: (string|undefined)}} WeightLatLng
 */
export type WeightLatLng = {
    latitude: number;
    longitude: number;
    weight?: number;
};

/**
 * @typedef {{latitude: number, longitude: number}} LatLng
 */
export type LatLng = {
    latitude: number;
    longitude: number;
};

/**
 * @param {!google.maps.Marker} marker
 * @param {string} title
 * @return {!MapLabel}
 */
const _getMapLabel = (marker: google.maps.Marker, title: string): MapLabel => {
    // https://github.com/googlemaps/js-map-label/blob/gh-pages/src/maplabel.js
    // https://googlemaps.github.io/js-map-label/docs/reference.html
    const mapLabel = new window['MapLabel']({
        text: title,
        strokeWeight: 2,
        fontFamily: 'sans-serif',
    });

    mapLabel['bindTo']('position', marker);
    mapLabel['bindTo']('map', marker);

    return mapLabel;
};

/**
 * @param {string} title
 * @param {!google.maps.LatLng} position
 * @param {!google.maps.Map} map
 * @return {!MapText}
 */
const _getMapText = (
    title: string,
    position: google.maps.LatLng,
    map: google.maps.Map,
): MapText =>
    new window['MapLabel']({
        text: title,
        strokeWeight: 2,
        fontFamily: 'sans-serif',
        position: position,
        map: map,
    });

/**
 * @class
 */
export class GoogleMap {
    mapNode: Item;
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
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(
        dom: Item,
        opt_selector: string | undefined = '.map',
        opt_options: Object | undefined = {},
    ) {
        this.mapNode = new Query(opt_selector, dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions(opt_options: Object | undefined = {}): void {
        const _self = this;
        _self.options = new Objekt({
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
        this.options = this.options.copy(true);
    }
    /**
     * @return {string}
     */
    getMapType(): string {
        return this.map.getMapTypeId();
    }
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId: string): void {
        this.map.setMapTypeId(mapTypeId);
    }
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this.markerIcons = {};

        this._initMap();
        this._initOverlay();

        this.setMarkers();
        this.setPolygons();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initMap(): void {
        this.map = new google.maps.Map(
            this.mapNode.getNode(),
            this.options as google.maps.MapOptions,
        );

        this._unbindEventsToMap();
        this._bindEventsToMap();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _bindEventsToMap(): void {
        this.map.addListener('click', (event) => {
            const vertex = event.latLng;
            this.eventMapClick(vertex.lat(), vertex.lng(), event);
        });

        this.map.addListener('maptypeid_changed', (event) => {
            this.eventMapTypeChange(this.getMapType(), event);
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    private _unbindEventsToMap(): void {
        google.maps.event.clearInstanceListeners(this.map);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initOverlay(): void {
        this.overlay = new google.maps.OverlayView();
        this.overlay.draw = () => {
            // empty function
        };
        this.overlay.setMap(this.map);
    }
    /**
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    eventPolygonChanged(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        consoleInfo('GoogleMap.eventPolygonChanged()', polygonData, points);
    }
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createOrUpdatePolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: Object | undefined = {},
        opt_options: Object | undefined = {},
    ): void {
        const polygon = this.getPolygon(id);
        if (polygon) {
            this.updatePolygon(id, title, points, opt_polygonData, opt_options);
        } else {
            this.createPolygon(id, title, points, opt_polygonData, opt_options);
        }
    }
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createPolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: Object | undefined = {},
        opt_options: Object | undefined = {},
    ): void {
        const polygonData = new Objekt(opt_polygonData);
        if (!polygonData.get('id')) {
            polygonData.set('id', id);
        }
        const options = new Objekt(this.polygonOptions);
        options.merge(opt_options);

        const polygon = new google.maps.Polygon(options.copy(true));
        polygon.setMap(this.map);
        polygonData.setRaw('_polygon', polygon);
        this._addPointsToPolygon(polygonData, points);

        const latLng = this.getCenterOfPolygon(polygonData);
        const mapText = _getMapText(
            title,
            new google.maps.LatLng(latLng.latitude, latLng.longitude),
            this.map,
        );
        polygonData.setRaw('_map_text', mapText);

        this.polygons.push(polygonData);

        this._bindEventsToPolygon(polygon, polygonData);
    }
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    updatePolygon(
        id: Id,
        title: string,
        points: Array<{ latitude: number; longitude: number }>,
        opt_polygonData: Object | undefined = {},
        opt_options: Object | undefined = {},
    ): void {
        const polygonData = this.getPolygon(id);
        each(this._cleanPolygonData(opt_polygonData), (value, key) => {
            polygonData.set(key, value);
        });

        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        polygon.setOptions(opt_options);
        this._addPointsToPolygon(polygonData, points);

        const latLng = this.getCenterOfPolygon(polygonData);
        const mapText = polygonData.get<MapText>('_map_text');
        mapText.set('text', title);
        mapText.set(
            'position',
            new google.maps.LatLng(latLng.latitude, latLng.longitude),
        );
    }
    /**
     * @param {!Object} polygonData
     * @return {!Objekt}
     */
    private _cleanPolygonData(polygonData: Object): Objekt {
        const cleanData = new Objekt();
        each(polygonData, (value, key) => {
            if (!inArray(['_polygon', '_map_text', '_bounds'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }
    /**
     * @param {Id} id
     * @return {!Objekt}
     */
    getPolygon(id: Id): Objekt {
        return this.polygons.findById(id);
    }
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removePolygon(id: Id): void {
        const polygonData = this.getPolygon(id);
        if (polygonData) {
            const mapText = polygonData.get<MapText>('_map_text');
            mapText.set('map', null);
            const polygon = polygonData.get<google.maps.Polygon>('_polygon');
            polygon.setMap(null);
            this._unbindEventsToPolygon(polygon);
            this.polygons.deleteById(id);
        }
    }
    /**
     * @return {undefined}
     */
    removeAllPolygon(): void {
        this.polygons.each((polygonData) => {
            const polygon = polygonData.get<google.maps.Polygon>('_polygon');
            polygon.setMap(null);
            const mapText = polygonData.get<MapText>('_map_text');
            mapText.set('map', null);
            this._unbindEventsToPolygon(polygon);
        });
        this.polygons.clear();
    }
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    private _bindEventsToPolygon(
        polygon: google.maps.Polygon,
        polygonData: Objekt,
    ): void {
        const cleanPolygonData = this._cleanPolygonData(polygonData);

        polygon.addListener('rightclick', (event) => {
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

        polygon.addListener('click', (event) => {
            const vertex = event.latLng;
            this.eventPolygonClick(
                cleanPolygonData,
                vertex.lat(),
                vertex.lng(),
                event,
            );
        });

        polygon.addListener('dblclick', (event) => {
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
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    private _unbindEventsToPolygon(polygon: google.maps.Polygon): void {
        google.maps.event.clearInstanceListeners(polygon);
        this._unbindEventsToPolygonPath(polygon);
    }
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
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
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    private _unbindEventsToPolygonPath(polygon: google.maps.Polygon): void {
        const path = polygon.getPath();
        if (path) {
            google.maps.event.clearInstanceListeners(path);
        }
    }
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    private _callPolygonChangeEvent(
        polygon: google.maps.Polygon,
        polygonData: Objekt,
    ): void {
        const points = this._getPointsFromPolygon(polygonData);
        this._setBoundsByPoints(polygonData, points);

        const mapText = polygonData.get<MapText>('_map_text');
        const centerLatLng = this.getCenterOfPolygon(polygonData);
        mapText.set(
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
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: Object,
    ): void {
        consoleInfo(
            'GoogleMap.eventPolygonClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonDoubleClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: Object,
    ): void {
        consoleInfo(
            'GoogleMap.eventPolygonDoubleClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonRightClick(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
        event: Object,
    ): void {
        consoleInfo(
            'GoogleMap.eventPolygonRightClick()',
            polygonData,
            latitude,
            longitude,
            event,
        );
    }
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapClick(latitude: number, longitude: number, event: Object): void {
        consoleInfo('GoogleMap.eventMapClick()', latitude, longitude, event);
    }
    /**
     * @param {string} mapType
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapTypeChange(mapType: string, event: Object): void {
        consoleInfo('GoogleMap.eventMapTypeChange()', mapType, event);
    }
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
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
     * @private
     * @param {!Array<WeightLatLng>} points
     * @return {!Array<!google.maps.LatLng>}
     */
    private _convertPointsToPath(
        points: Array<WeightLatLng>,
    ): Array<google.maps.LatLng> {
        const path = [];
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
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    private _setBoundsByPoints(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        const path = this._convertPointsToPath(points);
        this._setBoundsByPath(polygonData, path);
    }
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<!google.maps.LatLng>} path
     * @return {undefined}
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
     * @param {!Objekt} polygonData
     * @return {LatLng}
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
     * @param {string|number} polygonId
     * @return {undefined}
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
     * @private
     * @param {!Objekt} polygonData
     * @return {!Array<LatLng>}
     */
    private _getPointsFromPolygon(
        polygonData: Objekt,
    ): Array<{ latitude: number; longitude: number }> {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath().getArray();
        this._setBoundsByPath(polygonData, path);
        const points = [];
        each(path, (vertex) => {
            points.push({
                latitude: vertex.lat(),
                longitude: vertex.lng(),
            });
        });
        return points;
    }
    /**
     * @param {!Objekt} polygonData
     * @return {number}
     */
    getComputeArea(polygonData: Objekt): number {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath();
        return google.maps.geometry.spherical.computeArea(path);
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @return {undefined}
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
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setMarkers(opt_options: Object | undefined = {}): void {
        this.markers = new Collection();

        this.markerOptions = new Objekt({
            draggable: false,
        });
        this.markerOptions.merge(opt_options);
    }
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setHeatmap(opt_options: Object | undefined = {}): void {
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
     * @param {!Array<WeightLatLng>} points
     * @param {!Object=} opt_heatmapOptions
     * @return {undefined}
     */
    createHeatmap(
        points: Array<WeightLatLng>,
        opt_heatmapOptions: Object | undefined = {},
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
     * @return {undefined}
     */
    removeHeatmap(): void {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
    }
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setPolygons(opt_options: Object | undefined = {}): void {
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
     * @param {Id} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createOrUpdateMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: Object | undefined = {},
        opt_options: Object | undefined = {},
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
     * @param {Id} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: Object | undefined = {},
        opt_options: Object | undefined = {},
    ): void {
        const markerData = new Objekt(opt_markerData);
        if (!markerData.get('id')) {
            markerData.set('id', id);
        }
        const options = new Objekt(this.markerOptions);
        options.merge(opt_options);

        const text = convert(title, 'string');
        const marker = new google.maps.Marker(options.copy(true));
        marker.setPosition(new google.maps.LatLng(latitude, longitude));
        marker.setIcon(this.markerIcons[iconName].icon);
        marker.setShape(this.markerIcons[iconName].shape);
        marker.setTitle(text);
        marker.setMap(this.map);
        markerData.setRaw('_marker', marker);

        const label = _getMapLabel(marker, text);
        markerData.setRaw('_map_label', label);

        this.markers.push(markerData);

        this._bindEventsToMarker(marker, markerData);
    }
    /**
     * @param {Id} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} x
     * @param {number} y
     * @param {!Object=} markerData
     * @return {undefined}
     */
    createMarkerByXY(
        id: Id,
        title: string,
        iconName: string,
        x: number,
        y: number,
        markerData: Object | undefined = {},
    ): void {
        const point = new google.maps.Point(x, y);
        const projection = this.overlay.getProjection();
        const location = projection.fromContainerPixelToLatLng(point);

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
     * @param {!google.maps.Marker} marker
     * @param {!Objekt} markerData
     * @return {undefined}
     */
    private _bindEventsToMarker(
        marker: google.maps.Marker,
        markerData: Objekt,
    ): void {
        const cleanMarkerData = this._cleanMarkerData(markerData);

        marker.addListener('click', (event) => {
            this.eventMarkerClick(cleanMarkerData, event);
        });

        marker.addListener('dblclick', (event) => {
            this.eventMarkerDoubleClick(cleanMarkerData, event);
        });

        marker.addListener('rightclick', (event) => {
            this.eventMarkerRightClick(cleanMarkerData, event);
        });

        marker.addListener('drag', (_event) => {
            const vertex = marker.getPosition();
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.set('position', vertex);
        });

        marker.addListener('dragend', (event) => {
            const vertex = marker.getPosition();
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
     * @param {!google.maps.Marker} marker
     * @return {undefined}
     */
    private _unbindEventsToMarker(marker: google.maps.Marker): void {
        google.maps.event.clearInstanceListeners(marker);
    }
    /**
     * @param {Id} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    updateMarker(
        id: Id,
        title: string,
        iconName: string,
        latitude: number,
        longitude: number,
        opt_markerData: Object | undefined = {},
        opt_options: Object | undefined = {},
    ): void {
        const markerData = this.getMarker(id);
        each(this._cleanMarkerData(opt_markerData), (value, key) => {
            markerData.set(key, value);
        });
        const text = convert(title, 'string');
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
     * @param {!Object} markerData
     * @return {!Objekt}
     */
    private _cleanMarkerData(markerData: Object): Objekt {
        const cleanData = new Objekt();
        each(markerData, (value, key) => {
            if (!inArray(['_marker', '_map_label'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }
    /**
     * @param {Id} id
     * @return {!Objekt}
     */
    getMarker(id: Id): Objekt {
        return this.markers.findById(id);
    }
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removeMarker(id: Id): void {
        const markerData = this.getMarker(id);
        if (markerData) {
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.setMap(null);
            const marker = markerData.get<google.maps.Marker>('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
            this.markers.deleteById(id);
        }
    }
    /**
     * @return {undefined}
     */
    removeAllMarker(): void {
        this.markers.each((markerData) => {
            const mapLabel = markerData.get<MapLabel>('_map_label');
            mapLabel.setMap(null);
            const marker = markerData.get<google.maps.Marker>('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
        });
        this.markers.clear();
    }
    /**
     * @param {string|number} markerId
     * @return {undefined}
     */
    fitMarkerToMap(markerId: string | number): void {
        const markerData = this.getMarker(markerId);
        if (markerData) {
            const marker = markerData.get<google.maps.Marker>('_marker');
            const vertex = marker.getPosition();
            const latitude = vertex.lat();
            const longitude = vertex.lng();
            this.setCenter(latitude, longitude);
        }
    }
    /**
     * @param {string|number} markerId
     * @param {string} content
     * @return {undefined}
     */
    openInfoWindow(markerId: string | number, content: string): void {
        const markerData = this.getMarker(markerId);
        const marker = markerData.get<google.maps.Marker>('_marker');
        const infoWindow = new google.maps.InfoWindow({
            content: convert(content, 'string'),
        });
        infoWindow.open(this.map, marker);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerClick(markerData: Objekt, event: Object): void {
        consoleInfo('GoogleMap.eventMarkerClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerDoubleClick(markerData: Objekt, event: Object): void {
        consoleInfo('GoogleMap.eventMarkerDoubleClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerRightClick(markerData: Objekt, event: Object): void {
        consoleInfo('GoogleMap.eventMarkerRightClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerChanged(
        markerData: Objekt,
        latitude: number,
        longitude: number,
        event: Object,
    ): void {
        consoleInfo(
            'GoogleMap.eventMarkerChanged()',
            markerData,
            latitude,
            longitude,
            event,
        );
    }
    /**
     * @param {string} name
     * @param {!IconOptions} iconOptions
     * @return {undefined}
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
     * @param {string} query
     * @return {!Promize}
     */
    searchAddress(query: string): Promize {
        const deferred = new Deferred();
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode(
            {
                address: convert(query, 'string'),
            },
            (results, status) => {
                if (
                    status === google.maps.GeocoderStatus.OK &&
                    results.length > 0
                ) {
                    const points = [];
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
     * @param {number} latitude
     * @param {number} longitude
     * @param {boolean=} opt_boundCheck
     * @return {undefined}
     */
    setCenter(
        latitude: number,
        longitude: number,
        opt_boundCheck: boolean | undefined = false,
    ): void {
        const position = new google.maps.LatLng(latitude, longitude);
        if (opt_boundCheck) {
            if (!this.map.getBounds().contains(position)) {
                this.map.setCenter(position);
            }
        } else {
            this.map.setCenter(position);
        }
    }
    /**
     * @return {LatLng}
     */
    getCenter(): { latitude: number; longitude: number } {
        const vertex = this.map.getCenter();
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }
    /**
     * @return {undefined}
     */
    triggerResize(): void {
        google.maps.event.trigger(this.map, 'resize');
    }
    /**
     * @param {number} radiusPx
     * @return {number}
     */
    getDinamicRadius(radiusPx: number): number {
        const point1 = new google.maps.Point(0, 0);
        const point2 = new google.maps.Point(radiusPx, radiusPx);

        const projection = this.overlay.getProjection();
        const location1 = projection.fromContainerPixelToLatLng(point1);
        const location2 = projection.fromContainerPixelToLatLng(point2);

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
