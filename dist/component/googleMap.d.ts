/// <reference types="google.maps" />
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
/**
 * @class
 */
export declare class GoogleMap {
    mapNode: any;
    options: Objekt;
    map: any;
    markerIcons: {};
    overlay: google.maps.OverlayView;
    polygonOptions: any;
    polygons: any;
    markers: Collection;
    markerOptions: Objekt;
    heatmapOptions: Objekt;
    heatmap: google.maps.visualization.HeatmapLayer;
    /**
     * @param {!Item} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: any, opt_selector?: string, opt_options?: {});
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options?: {}): void;
    /**
     * @return {string}
     */
    getMapType(): any;
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId: any): void;
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId: any, mapTypeName: any, mapStyles: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initMap(): void;
    /**
     * @private
     * @return {undefined}
     */
    _bindEventsToMap(): void;
    /**
     * @private
     * @return {undefined}
     */
    _unbindEventsToMap(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initOverlay(): void;
    /**
     * @param {!Objekt} polygonData
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @return {undefined}
     */
    eventPolygonChanged(polygonData: any, points: any): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createOrUpdatePolygon(id: any, title: any, points: any, opt_polygonData?: {}, opt_options?: {}): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createPolygon(id: any, title: any, points: any, opt_polygonData?: {}, opt_options?: {}): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    updatePolygon(id: any, title: any, points: any, opt_polygonData?: {}, opt_options?: {}): void;
    /**
     * @param {!Object} polygonData
     * @return {!Objekt}
     */
    _cleanPolygonData(polygonData: any): Objekt;
    /**
     * @param {string|number} id
     * @return {!Objekt}
     */
    getPolygon(id: any): any;
    /**
     * @param {string|number} id
     * @return {undefined}
     */
    removePolygon(id: any): void;
    /**
     * @return {undefined}
     */
    removeAllPolygon(): void;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    _bindEventsToPolygon(polygon: any, polygonData: any): void;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    _unbindEventsToPolygon(polygon: any): void;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    _bindEventsToPolygonPath(polygon: any, polygonData: any): void;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    _unbindEventsToPolygonPath(polygon: any): void;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    _callPolygonChangeEvent(polygon: any, polygonData: any): void;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonClick(polygonData: any, latitude: any, longitude: any, event: any): void;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonDoubleClick(polygonData: any, latitude: any, longitude: any, event: any): void;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonRightClick(polygonData: any, latitude: any, longitude: any, event: any): void;
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapClick(latitude: any, longitude: any, event: any): void;
    /**
     * @param {string} mapType
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapTypeChange(mapType: any, event: any): void;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @return {undefined}
     */
    _addPointsToPolygon(polygonData: any, points: any): void;
    /**
     * @private
     * @param {!Array<{latitude: number, longitude: number, weight: (number|undefined)}>} points
     * @return {!Array<!google.maps.LatLng>}
     */
    _convertPointsToPath(points: any): any[];
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<{latitude: number, longitude: number}>} points
     * @return {undefined}
     */
    _setBoundsByPoints(polygonData: any, points: any): void;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<!google.maps.LatLng>} path
     * @return {undefined}
     */
    _setBoundsByPath(polygonData: any, path: any): void;
    /**
     * @param {!Objekt} polygonData
     * @return {{latitude: number, longitude: number}}
     */
    getCenterOfPolygon(polygonData: any): {
        latitude: any;
        longitude: any;
    };
    /**
     * @param {string|number} polygonId
     * @return {undefined}
     */
    fitPolygonToMap(polygonId: any): void;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @return {!Array<{latitude: number, longitude: number}>}
     */
    _getPointsFromPolygon(polygonData: any): any[];
    /**
     * @param {!Objekt} polygonData
     * @return {number}
     */
    getComputeArea(polygonData: any): number;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @return {undefined}
     */
    addPointToPolygon(polygonData: any, latitude: any, longitude: any): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setMarkers(opt_options?: {}): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setHeatmap(opt_options?: {}): void;
    /**
     * @param {!Array<{latitude: number, longitude: number, weight: (number|undefined)}>} points
     * @param {!Object=} opt_heatmapOptions
     * @return {undefined}
     */
    createHeatmap(points: any, opt_heatmapOptions?: {}): void;
    /**
     * @return {undefined}
     */
    removeHeatmap(): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setPolygons(opt_options?: {}): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createOrUpdateMarker(id: any, title: any, iconName: any, latitude: any, longitude: any, opt_markerData?: {}, opt_options?: {}): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createMarker(id: any, title: any, iconName: any, latitude: any, longitude: any, opt_markerData?: {}, opt_options?: {}): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} x
     * @param {number} y
     * @param {!Object=} markerData
     * @return {undefined}
     */
    createMarkerByXY(id: any, title: any, iconName: any, x: any, y: any, markerData?: {}): void;
    /**
     * @param {!google.maps.Marker} marker
     * @param {!Objekt} markerData
     * @return {undefined}
     */
    _bindEventsToMarker(marker: any, markerData: any): void;
    /**
     * @param {!google.maps.Marker} marker
     * @return {undefined}
     */
    _unbindEventsToMarker(marker: any): void;
    /**
     * @param {string|number} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object=} opt_markerData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    updateMarker(id: any, title: any, iconName: any, latitude: any, longitude: any, opt_markerData?: {}, opt_options?: {}): void;
    /**
     * @param {!Object} markerData
     * @return {!Objekt}
     */
    _cleanMarkerData(markerData: any): Objekt;
    /**
     * @param {string|number} id
     * @return {!Objekt}
     */
    getMarker(id: any): any;
    /**
     * @param {string|number} id
     * @return {undefined}
     */
    removeMarker(id: any): void;
    /**
     * @return {undefined}
     */
    removeAllMarker(): void;
    /**
     * @param {string|number} markerId
     * @return {undefined}
     */
    fitMarkerToMap(markerId: any): void;
    /**
     * @param {string|number} markerId
     * @param {string} content
     * @return {undefined}
     */
    openInfoWindow(markerId: any, content: any): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerClick(markerData: any, event: any): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerDoubleClick(markerData: any, event: any): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerRightClick(markerData: any, event: any): void;
    /**
     * @param {!Objekt} markerData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerChanged(markerData: any, latitude: any, longitude: any, event: any): void;
    /**
     * @param {string} name
     * @param {!Object} iconOptions
     * @return {undefined}
     */
    setMarkerIcon(name: any, iconOptions: any): void;
    /**
     * @param {string} query
     * @return {!Promize}
     */
    searchAddress(query: any): import("..").Promize;
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {boolean=} opt_boundCheck
     * @return {undefined}
     */
    setCenter(latitude: any, longitude: any, opt_boundCheck?: boolean): void;
    /**
     * @return {{latitude: number, longitude: number}}
     */
    getCenter(): {
        latitude: any;
        longitude: any;
    };
    /**
     * @return {undefined}
     */
    triggerResize(): void;
    /**
     * @param {number} radiusPx
     * @return {number}
     */
    getDinamicRadius(radiusPx: any): number;
}
