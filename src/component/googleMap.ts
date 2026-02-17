import { each, inArray, isUndefined, eachObject } from '../utils/operation';
import { Collection } from '../core/collection';
import { Deferred } from '../core/deferred';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { consoleDebug } from '../utils/log';
import { Knot } from '../core';
import { IconOptions, Id } from '../utils';
import { MapLabel } from './mapLabel';

type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};

export type WeightLatLng = {
    latitude: number;
    longitude: number;
    weight?: number;
};

export type LatLng = {
    latitude: number;
    longitude: number;
};

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

    constructor(
        dom: Knot,
        opt_selector: string | undefined = '.map',
        opt_options: object | undefined = {},
    ) {
        this.mapKnot = new Query(opt_selector, dom).getKnot();
        this._setOptions(opt_options);
        this._init();
    }

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

    getMapType(): string {
        return this.map.getMapTypeId()!;
    }

    setMapType(mapTypeId: string): void {
        this.map.setMapTypeId(mapTypeId);
    }

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

    private _init(): void {
        this.markerIcons = {};

        this._initMap();
        this._initOverlay();

        this.setMarkers();
        this.setPolygons();
    }

    private _initMap(): void {
        this.map = new google.maps.Map(
            this.mapKnot.getNode(),
            this.options.copyObject() as google.maps.MapOptions,
        );

        this._unbindEventsToMap();
        this._bindEventsToMap();
    }

    private _bindEventsToMap(): void {
        this.map.addListener('click', (event: any) => {
            const vertex = event.latLng;
            this.eventMapClick(vertex.lat(), vertex.lng(), event);
        });

        this.map.addListener('maptypeid_changed', (event: any) => {
            this.eventMapTypeChange(this.getMapType(), event);
        });
    }

    private _unbindEventsToMap(): void {
        google.maps.event.clearInstanceListeners(this.map);
    }

    private _initOverlay(): void {
        this.overlay = new google.maps.OverlayView();
        this.overlay.draw = () => {
            // empty function
        };
        this.overlay.setMap(this.map);
    }

    eventPolygonChanged(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        consoleDebug('GoogleMap.eventPolygonChanged()', polygonData, points);
    }

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

    private _cleanPolygonData(polygonData: object): Objekt {
        const cleanData = new Objekt();
        eachObject(polygonData, (value, key) => {
            if (!inArray(['_polygon', '_map_label', '_bounds'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }

    getPolygon(id: Id): Objekt | null {
        return this.polygons.findById(id);
    }

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

    private _unbindEventsToPolygon(polygon: google.maps.Polygon): void {
        google.maps.event.clearInstanceListeners(polygon);
        this._unbindEventsToPolygonPath(polygon);
    }

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

    private _unbindEventsToPolygonPath(polygon: google.maps.Polygon): void {
        const path = polygon.getPath();
        if (path) {
            google.maps.event.clearInstanceListeners(path);
        }
    }

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

    eventMapClick(latitude: number, longitude: number, event: object): void {
        consoleDebug('GoogleMap.eventMapClick()', latitude, longitude, event);
    }

    eventMapTypeChange(mapType: string, event: object): void {
        consoleDebug('GoogleMap.eventMapTypeChange()', mapType, event);
    }

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

    private _setBoundsByPoints(
        polygonData: Objekt,
        points: Array<{ latitude: number; longitude: number }>,
    ): void {
        const path = this._convertPointsToPath(points);
        this._setBoundsByPath(polygonData, path);
    }

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

    getComputeArea(polygonData: Objekt): number {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath();
        return google.maps.geometry.spherical.computeArea(path);
    }

    addPointToPolygon(
        polygonData: Objekt,
        latitude: number,
        longitude: number,
    ): void {
        const polygon = polygonData.get<google.maps.Polygon>('_polygon');
        const path = polygon.getPath();
        path.push(new google.maps.LatLng(latitude, longitude));
    }

    setMarkers(opt_options: object | undefined = {}): void {
        this.markers = new Collection();

        this.markerOptions = new Objekt({
            draggable: false,
        });
        this.markerOptions.merge(opt_options);
    }

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

    removeHeatmap(): void {
        if (this.heatmap) {
            this.heatmap.setMap(null);
        }
    }

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

    private _unbindEventsToMarker(marker: google.maps.Marker): void {
        google.maps.event.clearInstanceListeners(marker);
    }

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

    private _cleanMarkerData(markerData: object): Objekt {
        const cleanData = new Objekt();
        eachObject(markerData, (value, key) => {
            if (!inArray(['_marker', '_map_label'], key)) {
                cleanData.set(key, value);
            }
        });
        return cleanData;
    }

    getMarker(id: Id): Objekt | null {
        return this.markers.findById(id);
    }

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

    openInfoWindow(markerId: string | number, content: string): void {
        const markerData = this.getMarker(markerId)!;
        const marker = markerData.get<google.maps.Marker>('_marker');
        const infoWindow = new google.maps.InfoWindow({
            content: content.toString(),
        });
        infoWindow.open(this.map, marker);
    }

    eventMarkerClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerClick()', markerData, event);
    }

    eventMarkerDoubleClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerDoubleClick()', markerData, event);
    }

    eventMarkerRightClick(markerData: Objekt, event: object): void {
        consoleDebug('GoogleMap.eventMarkerRightClick()', markerData, event);
    }

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
                    const points: Array<{ address: string; latitude: number; longitude: number }> = [];
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

    getCenter(): { latitude: number; longitude: number } {
        const vertex = this.map.getCenter()!;
        return {
            latitude: vertex.lat(),
            longitude: vertex.lng(),
        };
    }

    triggerResize(): void {
        google.maps.event.trigger(this.map, 'resize');
    }

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
