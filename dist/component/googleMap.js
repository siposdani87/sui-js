import { each, inArray, isUndefined, eachObject } from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { MapLabel } from './mapLabel';
const _createMapLabelByMarker = (marker, title) => {
    const mapLabel = new MapLabel({
        text: title,
        strokeWeight: 2,
    });
    mapLabel.bindTo('position', marker);
    mapLabel.bindTo('map', marker);
    return mapLabel;
};
const _createMapLabelByMarkerByPosition = (map, position, title) => new MapLabel({
    text: title,
    strokeWeight: 2,
    position: position,
    map: map,
});
export class GoogleMap {
    constructor(dom, opt_selector = '.map', opt_options = {}) {
        this.mapKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
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
    getMapType() {
        return this.map.getMapTypeId();
    }
    setMapType(mapTypeId) {
        this.map.setMapTypeId(mapTypeId);
    }
    setCustomMapStyle(mapTypeId, mapTypeName, mapStyles) {
        const styledMapType = new google.maps.StyledMapType(mapStyles, {
            name: mapTypeName,
        });
        this.map.mapTypes.set(mapTypeId, styledMapType);
    }
    _init() {
        this.markerIcons = {};
        this._initMap();
        this._initOverlay();
        this.setMarkers();
        this.setPolygons();
    }
    _initMap() {
        this.map = new google.maps.Map(this.mapKnot.getNode(), this.options.copyObject());
        this._unbindEventsToMap();
        this._bindEventsToMap();
    }
    _bindEventsToMap() {
        this.map.addListener('click', (event) => {
            const vertex = event.latLng;
            this.eventMapClick(vertex.lat(), vertex.lng(), event);
        });
        this.map.addListener('maptypeid_changed', (event) => {
            this.eventMapTypeChange(this.getMapType(), event);
        });
    }
    _unbindEventsToMap() {
        google.maps.event.clearInstanceListeners(this.map);
    }
    _initOverlay() {
        this.overlay = new google.maps.OverlayView();
        this.overlay.draw = () => {
            // empty function
        };
        this.overlay.setMap(this.map);
    }
    eventPolygonChanged(polygonData, points) {
        consoleDebug('GoogleMap.eventPolygonChanged()', polygonData, points);
    }
    createOrUpdatePolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
        const polygon = this.getPolygon(id);
        if (polygon) {
            this.updatePolygon(id, title, points, opt_polygonData, opt_options);
        }
        else {
            this.createPolygon(id, title, points, opt_polygonData, opt_options);
        }
    }
    createPolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
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
        const mapLabel = _createMapLabelByMarkerByPosition(this.map, new google.maps.LatLng(latLng.latitude, latLng.longitude), title);
        polygonData.setRaw('_map_label', mapLabel);
        this.polygons.push(polygonData);
        this._bindEventsToPolygon(polygon, polygonData);
    }
    updatePolygon(id, title, points, opt_polygonData = {}, opt_options = {}) {
        const polygonData = this.getPolygon(id);
        eachObject(this._cleanPolygonData(opt_polygonData), (value, key) => {
            polygonData.set(key, value);
        });
        const polygon = polygonData.get('_polygon');
        polygon.setOptions(opt_options);
        this._addPointsToPolygon(polygonData, points);
        const latLng = this.getCenterOfPolygon(polygonData);
        const mapLabel = polygonData.get('_map_label');
        mapLabel.set('text', title);
        mapLabel.set('position', new google.maps.LatLng(latLng.latitude, latLng.longitude));
    }
    _cleanPolygonData(polygonData) {
        const cleanData = new Objekt();
        eachObject(polygonData, (value, key) => {
            if (!inArray(['_polygon', '_map_label', '_bounds'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }
    getPolygon(id) {
        return this.polygons.findById(id);
    }
    removePolygon(id) {
        const polygonData = this.getPolygon(id);
        if (polygonData) {
            const mapLabel = polygonData.get('_map_label');
            mapLabel.set('map', null);
            const polygon = polygonData.get('_polygon');
            polygon.setMap(null);
            this._unbindEventsToPolygon(polygon);
            this.polygons.deleteById(id);
        }
    }
    removeAllPolygon() {
        this.polygons.each((polygonData) => {
            const polygon = polygonData.get('_polygon');
            polygon.setMap(null);
            const mapLabel = polygonData.get('_map_label');
            mapLabel.set('map', null);
            this._unbindEventsToPolygon(polygon);
        });
        this.polygons.clear();
    }
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
    _unbindEventsToPolygon(polygon) {
        google.maps.event.clearInstanceListeners(polygon);
        this._unbindEventsToPolygonPath(polygon);
    }
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
    _unbindEventsToPolygonPath(polygon) {
        const path = polygon.getPath();
        if (path) {
            google.maps.event.clearInstanceListeners(path);
        }
    }
    _callPolygonChangeEvent(polygon, polygonData) {
        const points = this._getPointsFromPolygon(polygonData);
        this._setBoundsByPoints(polygonData, points);
        const mapLabel = polygonData.get('_map_label');
        const centerLatLng = this.getCenterOfPolygon(polygonData);
        mapLabel.set('position', new google.maps.LatLng(centerLatLng.latitude, centerLatLng.longitude));
        const cleanPolygonData = this._cleanPolygonData(polygonData);
        this.eventPolygonChanged(cleanPolygonData, points);
    }
    eventPolygonClick(polygonData, latitude, longitude, event) {
        consoleDebug('GoogleMap.eventPolygonClick()', polygonData, latitude, longitude, event);
    }
    eventPolygonDoubleClick(polygonData, latitude, longitude, event) {
        consoleDebug('GoogleMap.eventPolygonDoubleClick()', polygonData, latitude, longitude, event);
    }
    eventPolygonRightClick(polygonData, latitude, longitude, event) {
        consoleDebug('GoogleMap.eventPolygonRightClick()', polygonData, latitude, longitude, event);
    }
    eventMapClick(latitude, longitude, event) {
        consoleDebug('GoogleMap.eventMapClick()', latitude, longitude, event);
    }
    eventMapTypeChange(mapType, event) {
        consoleDebug('GoogleMap.eventMapTypeChange()', mapType, event);
    }
    _addPointsToPolygon(polygonData, points) {
        const polygon = polygonData.get('_polygon');
        const path = this._convertPointsToPath(points);
        polygon.setPath(path);
        this._bindEventsToPolygonPath(polygon, polygonData);
        this._setBoundsByPath(polygonData, path);
    }
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
    _setBoundsByPoints(polygonData, points) {
        const path = this._convertPointsToPath(points);
        this._setBoundsByPath(polygonData, path);
    }
    _setBoundsByPath(polygonData, path) {
        const bounds = new google.maps.LatLngBounds();
        if (path.length > 0) {
            each(path, (vertex) => {
                bounds.extend(vertex);
            });
        }
        polygonData.setRaw('_bounds', bounds);
    }
    getCenterOfPolygon(polygonData) {
        const bounds = polygonData.get('_bounds');
        const vertex = bounds.getCenter();
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }
    fitPolygonToMap(polygonId) {
        const polygonData = this.getPolygon(polygonId);
        if (polygonData) {
            const bounds = polygonData.get('_bounds');
            if (bounds) {
                const center = bounds.getCenter();
                this.map.setCenter(center);
                this.map.fitBounds(bounds);
            }
        }
    }
    _getPointsFromPolygon(polygonData) {
        const polygon = polygonData.get('_polygon');
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
    getComputeArea(polygonData) {
        const polygon = polygonData.get('_polygon');
        const path = polygon.getPath();
        return google.maps.geometry.spherical.computeArea(path);
    }
    addPointToPolygon(polygonData, latitude, longitude) {
        const polygon = polygonData.get('_polygon');
        const path = polygon.getPath();
        path.push(new google.maps.LatLng(latitude, longitude));
    }
    setMarkers(opt_options = {}) {
        this.markers = new Collection();
        this.markerOptions = new Objekt({
            draggable: false,
        });
        this.markerOptions.merge(opt_options);
    }
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
    removeHeatmap() {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
    }
    setPolygons(opt_options = {}) {
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
    createOrUpdateMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
        const marker = this.getMarker(id);
        if (marker) {
            this.updateMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
        }
        else {
            this.createMarker(id, title, iconName, latitude, longitude, opt_markerData, opt_options);
        }
    }
    createMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
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
    createMarkerByXY(id, title, iconName, x, y, markerData = {}) {
        const point = new google.maps.Point(x, y);
        const projection = this.overlay.getProjection();
        const location = projection.fromContainerPixelToLatLng(point);
        this.createMarker(id, title, iconName, location.lat(), location.lng(), markerData);
    }
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
    _unbindEventsToMarker(marker) {
        google.maps.event.clearInstanceListeners(marker);
    }
    updateMarker(id, title, iconName, latitude, longitude, opt_markerData = {}, opt_options = {}) {
        const markerData = this.getMarker(id);
        eachObject(this._cleanMarkerData(opt_markerData), (value, key) => {
            markerData.set(key, value);
        });
        const text = title.toString();
        const marker = markerData.get('_marker');
        marker.setOptions(opt_options);
        const markerIcon = this.markerIcons[iconName];
        marker.setIcon(markerIcon.icon);
        marker.setShape(markerIcon.shape);
        marker.setTitle(text);
        marker.setPosition(new google.maps.LatLng(latitude, longitude));
        const mapLabel = markerData.get('_map_label');
        mapLabel.set('text', text);
    }
    _cleanMarkerData(markerData) {
        const cleanData = new Objekt();
        eachObject(markerData, (value, key) => {
            if (!inArray(['_marker', '_map_label'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }
    getMarker(id) {
        return this.markers.findById(id);
    }
    removeMarker(id) {
        const markerData = this.getMarker(id);
        if (markerData) {
            const mapLabel = markerData.get('_map_label');
            mapLabel.setMap(null);
            const marker = markerData.get('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
            this.markers.deleteById(id);
        }
    }
    removeAllMarker() {
        this.markers.each((markerData) => {
            const mapLabel = markerData.get('_map_label');
            mapLabel.setMap(null);
            const marker = markerData.get('_marker');
            marker.setMap(null);
            this._unbindEventsToMarker(marker);
        });
        this.markers.clear();
    }
    fitMarkerToMap(markerId) {
        const markerData = this.getMarker(markerId);
        if (markerData) {
            const marker = markerData.get('_marker');
            const vertex = marker.getPosition();
            const latitude = vertex.lat();
            const longitude = vertex.lng();
            this.setCenter(latitude, longitude);
        }
    }
    openInfoWindow(markerId, content) {
        const markerData = this.getMarker(markerId);
        const marker = markerData.get('_marker');
        const infoWindow = new google.maps.InfoWindow({
            content: content.toString(),
        });
        infoWindow.open(this.map, marker);
    }
    eventMarkerClick(markerData, event) {
        consoleDebug('GoogleMap.eventMarkerClick()', markerData, event);
    }
    eventMarkerDoubleClick(markerData, event) {
        consoleDebug('GoogleMap.eventMarkerDoubleClick()', markerData, event);
    }
    eventMarkerRightClick(markerData, event) {
        consoleDebug('GoogleMap.eventMarkerRightClick()', markerData, event);
    }
    eventMarkerChanged(markerData, latitude, longitude, event) {
        consoleDebug('GoogleMap.eventMarkerChanged()', markerData, latitude, longitude, event);
    }
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
    searchAddress(query) {
        const deferred = new Deferred();
        const geoCoder = new google.maps.Geocoder();
        geoCoder.geocode({
            address: query.toString(),
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
    getCenter() {
        const vertex = this.map.getCenter();
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }
    triggerResize() {
        google.maps.event.trigger(this.map, 'resize');
    }
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
