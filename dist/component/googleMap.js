import { each, inArray, isUndefined, eachObject, convert, } from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleInfo } from '../utils/log';
/**
 * @param {!google.maps.Marker} marker
 * @param {string} title
 * @return {!MapLabel}
 */
const _getMapLabel = (marker, title) => {
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
 * @export
 * @param {string} title
 * @param {!google.maps.LatLng} position
 * @param {!google.maps.Map} map
 * @return {!MapText}
 */
const _getMapText = (title, position, map) => new window['MapLabel']({
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
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom, opt_selector = '.map', opt_options = {}) {
        this.mapNode = new Query(opt_selector, dom).getItem();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
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
    getMapType() {
        return this.map.getMapTypeId();
    }
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId) {
        this.map.setMapTypeId(mapTypeId);
    }
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId, mapTypeName, mapStyles) {
        const styledMapType = new google.maps.StyledMapType(mapStyles, {
            name: mapTypeName,
        });
        this.map.mapTypes.set(mapTypeId, styledMapType);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
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
    _initMap() {
        this.map = new google.maps.Map(this.mapNode.getNode(), this.options);
        this._unbindEventsToMap();
        this._bindEventsToMap();
    }
    /**
     * @private
     * @return {undefined}
     */
    _bindEventsToMap() {
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
    _unbindEventsToMap() {
        google.maps.event.clearInstanceListeners(this.map);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initOverlay() {
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
    eventPolygonChanged(polygonData, points) {
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
    createOrUpdatePolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
        const polygon = this.getPolygon(id);
        if (polygon) {
            this.updatePolygon(id, title, points, opt_polygonData, opt_options);
        }
        else {
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
    createPolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
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
        const mapText = _getMapText(title, new google.maps.LatLng(latLng.latitude, latLng.longitude), this.map);
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
    updatePolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
        const polygonData = this.getPolygon(id);
        each(this._cleanPolygonData(opt_polygonData), (value, key) => {
            polygonData.set(key, value);
        });
        const polygon = 
        /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
        polygon.setOptions(opt_options);
        this._addPointsToPolygon(polygonData, points);
        const latLng = this.getCenterOfPolygon(polygonData);
        const mapText = polygonData.get('_map_text');
        mapText.set('text', title);
        mapText.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));
    }
    /**
     * @param {!Object} polygonData
     * @return {!Objekt}
     */
    _cleanPolygonData(polygonData) {
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
    getPolygon(id) {
        return this.polygons.findById(id);
    }
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removePolygon(id) {
        const polygonData = this.getPolygon(id);
        if (polygonData) {
            const mapText = polygonData.get('_map_text');
            mapText.set('map', null);
            const polygon = 
            /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
            polygon.setMap(null);
            this._unbindEventsToPolygon(polygon);
            this.polygons.deleteById(id);
        }
    }
    /**
     * @return {undefined}
     */
    removeAllPolygon() {
        this.polygons.each((polygonData) => {
            const polygon = 
            /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
            polygon.setMap(null);
            const mapText = polygonData.get('_map_text');
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
    _bindEventsToPolygon(polygon, polygonData) {
        const cleanPolygonData = this._cleanPolygonData(polygonData);
        polygon.addListener('rightclick', (event) => {
            if (event.vertex) {
                const path = polygon.getPath();
                path.removeAt(event.vertex);
            }
            else {
                const vertex = event.latLng;
                this.eventPolygonRightClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
            }
        });
        polygon.addListener('click', (event) => {
            const vertex = event.latLng;
            this.eventPolygonClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
        });
        polygon.addListener('dblclick', (event) => {
            const vertex = event.latLng;
            this.eventPolygonDoubleClick(cleanPolygonData, vertex.lat(), vertex.lng(), event);
        });
        this._bindEventsToPolygonPath(polygon, polygonData);
    }
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    _unbindEventsToPolygon(polygon) {
        google.maps.event.clearInstanceListeners(polygon);
        this._unbindEventsToPolygonPath(polygon);
    }
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    _bindEventsToPolygonPath(polygon, polygonData) {
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
    _unbindEventsToPolygonPath(polygon) {
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
    _callPolygonChangeEvent(polygon, polygonData) {
        const points = this._getPointsFromPolygon(polygonData);
        this._setBoundsByPoints(polygonData, points);
        const mapText = polygonData.get('_map_text');
        const centerLatLng = this.getCenterOfPolygon(polygonData);
        mapText.set('position', new google.maps.LatLng(centerLatLng.latitude, centerLatLng.longitude));
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
    eventPolygonClick(polygonData, latitude, longitude, event) {
        consoleInfo('GoogleMap.eventPolygonClick()', polygonData, latitude, longitude, event);
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonDoubleClick(polygonData, latitude, longitude, event) {
        consoleInfo('GoogleMap.eventPolygonDoubleClick()', polygonData, latitude, longitude, event);
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonRightClick(polygonData, latitude, longitude, event) {
        consoleInfo('GoogleMap.eventPolygonRightClick()', polygonData, latitude, longitude, event);
    }
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapClick(latitude, longitude, event) {
        consoleInfo('GoogleMap.eventMapClick()', latitude, longitude, event);
    }
    /**
     * @param {string} mapType
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapTypeChange(mapType, event) {
        consoleInfo('GoogleMap.eventMapTypeChange()', mapType, event);
    }
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    _addPointsToPolygon(polygonData, points) {
        const polygon = 
        /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
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
    _convertPointsToPath(points) {
        const path = [];
        each(points, (point) => {
            let vertex = new google.maps.LatLng(point.latitude, point.longitude);
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
    _setBoundsByPoints(polygonData, points) {
        const path = this._convertPointsToPath(points);
        this._setBoundsByPath(polygonData, path);
    }
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<!google.maps.LatLng>} path
     * @return {undefined}
     */
    _setBoundsByPath(polygonData, path) {
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
    getCenterOfPolygon(polygonData) {
        const bounds = 
        /** @type {!google.maps.LatLngBounds} */ polygonData.get('_bounds');
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
    fitPolygonToMap(polygonId) {
        const polygonData = this.getPolygon(polygonId);
        if (polygonData) {
            const bounds = 
            /** @type {!google.maps.LatLngBounds} */ polygonData.get('_bounds');
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
    _getPointsFromPolygon(polygonData) {
        const polygon = 
        /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
        const path = /** @type {!Array<!google.maps.LatLng>} */ polygon
            .getPath()
            .getArray();
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
    getComputeArea(polygonData) {
        const polygon = 
        /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
        const path = polygon.getPath();
        return google.maps.geometry.spherical.computeArea(path);
    }
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @return {undefined}
     */
    addPointToPolygon(polygonData, latitude, longitude) {
        const polygon = 
        /** @type {!google.maps.Polygon} */ polygonData.get('_polygon');
        const path = polygon.getPath();
        path.push(new google.maps.LatLng(latitude, longitude));
    }
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setMarkers(opt_options = {}) {
        this.markers = /** @type {!Collection<!Objekt>} */ new Collection();
        this.markerOptions = new Objekt({
            draggable: false,
        });
        this.markerOptions.merge(opt_options);
    }
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setHeatmap(opt_options = {}) {
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
    createHeatmap(points, opt_heatmapOptions = {}) {
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
    removeHeatmap() {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
    }
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setPolygons(opt_options = {}) {
        this.polygons = /** @type {!Collection<!Objekt>} */ new Collection();
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
    createOrUpdateMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
        const marker = this.getMarker(id);
        if (marker) {
            this.updateMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
        }
        else {
            this.createMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
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
    createMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
        const markerData = new Objekt(opt_markerData);
        if (!markerData.get('id')) {
            markerData.set('id', id);
        }
        const options = new Objekt(this.markerOptions);
        options.merge(opt_options);
        const text = /** @type {string} */ (convert)(title, 'string');
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
    createMarkerByXY(id, title, iconName, x, y, markerData = {}) {
        const point = new google.maps.Point(x, y);
        const projection = this.overlay.getProjection();
        const location = projection.fromContainerPixelToLatLng(point);
        this.createMarker(id, title, iconName, location.lat(), location.lng(), markerData);
    }
    /**
     * @param {!google.maps.Marker} marker
     * @param {!Objekt} markerData
     * @return {undefined}
     */
    _bindEventsToMarker(marker, markerData) {
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
            const mapLabel = markerData.get('_map_label');
            mapLabel.set('position', vertex);
        });
        marker.addListener('dragend', (event) => {
            const vertex = marker.getPosition();
            const latitude = vertex.lat();
            const longitude = vertex.lng();
            this.eventMarkerChanged(cleanMarkerData, latitude, longitude, event);
        });
    }
    /**
     * @param {!google.maps.Marker} marker
     * @return {undefined}
     */
    _unbindEventsToMarker(marker) {
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
    updateMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
        const markerData = this.getMarker(id);
        each(this._cleanMarkerData(opt_markerData), (value, key) => {
            markerData.set(key, value);
        });
        const text = /** @type {string} */ (convert)(title, 'string');
        const marker = 
        /** @type {!google.maps.Marker} */ markerData.get('_marker');
        marker.setOptions(opt_options);
        const markerIcon = this.markerIcons[iconName];
        marker.setIcon(markerIcon.icon);
        marker.setShape(markerIcon.shape);
        marker.setTitle(text);
        marker.setPosition(new google.maps.LatLng(latitude, longitude));
        const mapLabel = markerData.get('_map_label');
        mapLabel.set('text', text);
    }
    /**
     * @param {!Object} markerData
     * @return {!Objekt}
     */
    _cleanMarkerData(markerData) {
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
    getMarker(id) {
        return this.markers.findById(id);
    }
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removeMarker(id) {
        const markerData = this.getMarker(id);
        if (markerData) {
            const mapLabel = markerData.get('_map_label');
            mapLabel.setMap(null);
            const marker = 
            /** @type {!google.maps.Marker} */ markerData.get('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
            this.markers.deleteById(id);
        }
    }
    /**
     * @return {undefined}
     */
    removeAllMarker() {
        this.markers.each((markerData) => {
            const mapLabel = markerData.get('_map_label');
            mapLabel.setMap(null);
            const marker = 
            /** @type {!google.maps.Marker} */ markerData.get('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
        });
        this.markers.clear();
    }
    /**
     * @param {string|number} markerId
     * @return {undefined}
     */
    fitMarkerToMap(markerId) {
        const markerData = this.getMarker(markerId);
        if (markerData) {
            const marker = 
            /** @type {!google.maps.Marker} */ markerData.get('_marker');
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
    openInfoWindow(markerId, content) {
        const markerData = this.getMarker(markerId);
        const marker = 
        /** @type {!google.maps.Marker} */ markerData.get('_marker');
        const infoWindow = new google.maps.InfoWindow({
            content: /** @type {string} */ (convert)(content, 'string'),
        });
        infoWindow.open(this.map, marker);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerClick(markerData, event) {
        consoleInfo('GoogleMap.eventMarkerClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerDoubleClick(markerData, event) {
        consoleInfo('GoogleMap.eventMarkerDoubleClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerRightClick(markerData, event) {
        consoleInfo('GoogleMap.eventMarkerRightClick()', markerData, event);
    }
    /**
     * @param {!Objekt} markerData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerChanged(markerData, latitude, longitude, event) {
        consoleInfo('GoogleMap.eventMarkerChanged()', markerData, latitude, longitude, event);
    }
    /**
     * @param {string} name
     * @param {!IconOptions} iconOptions
     * @return {undefined}
     */
    setMarkerIcon(name, iconOptions) {
        // https://developers.google.com/maps/documentation/javascript/examples/marker-symbol-custom
        const icon = {
            url: iconOptions.url,
            size: new google.maps.Size(iconOptions.size[0], iconOptions.size[1]),
            origin: new google.maps.Point(iconOptions.origin[0], iconOptions.origin[1]),
            anchor: new google.maps.Point(iconOptions.anchor[0], iconOptions.anchor[1]),
        };
        const shape = {
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
    searchAddress(query) {
        const deferred = new Deferred();
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode({
            address: convert(query, 'string'),
        }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK &&
                results.length > 0) {
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
            }
            else {
                deferred.reject();
            }
        });
        return deferred.promise();
    }
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {boolean=} opt_boundCheck
     * @return {undefined}
     */
    setCenter(latitude, longitude, opt_boundCheck = false) {
        const position = new google.maps.LatLng(latitude, longitude);
        if (opt_boundCheck) {
            if (!this.map.getBounds().contains(position)) {
                this.map.setCenter(position);
            }
        }
        else {
            this.map.setCenter(position);
        }
    }
    /**
     * @return {LatLng}
     */
    getCenter() {
        const vertex = this.map.getCenter();
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }
    /**
     * @return {undefined}
     */
    triggerResize() {
        google.maps.event.trigger(this.map, 'resize');
    }
    /**
     * @param {number} radiusPx
     * @return {number}
     */
    getDinamicRadius(radiusPx) {
        const point1 = new google.maps.Point(0, 0);
        const point2 = new google.maps.Point(radiusPx, radiusPx);
        const projection = this.overlay.getProjection();
        const location1 = projection.fromContainerPixelToLatLng(point1);
        const location2 = projection.fromContainerPixelToLatLng(point2);
        const latLng1 = new google.maps.LatLng(location1.lat(), location1.lng());
        const latLng2 = new google.maps.LatLng(location2.lat(), location2.lng());
        return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2);
    }
}
