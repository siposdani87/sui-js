/// <reference types="google.maps" />
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Knot, Promize } from '../core';
import { IconOptions, Id } from '../utils';
/**
 * @typedef {{icon: string | google.maps.Icon | google.maps.Symbol, shape: google.maps.MarkerShape}} MarkerIcon
 */
declare type MarkerIcon = {
    icon: string | google.maps.Icon | google.maps.Symbol;
    shape: google.maps.MarkerShape;
};
/**
 * @typedef {{latitude: number, longitude: number, weight: (string|undefined)}} WeightLatLng
 */
export declare type WeightLatLng = {
    latitude: number;
    longitude: number;
    weight?: number;
};
/**
 * @typedef {{latitude: number, longitude: number}} LatLng
 */
export declare type LatLng = {
    latitude: number;
    longitude: number;
};
/**
 * @class
 */
export declare class GoogleMap {
    mapNode: Knot;
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
     * @param {!Knot} dom
     * @param {string=} opt_selector
     * @param {!Object=} opt_options
     */
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: Object | undefined);
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @return {string}
     */
    getMapType(): string;
    /**
     * @param {string} mapTypeId
     * @return {undefined}
     */
    setMapType(mapTypeId: string): void;
    /**
     * @param {string} mapTypeId
     * @param {string} mapTypeName
     * @param {!Array<?google.maps.MapTypeStyle>} mapStyles
     * @return {undefined}
     */
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    /**
     * @private
     * @return {undefined}
     */
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _initMap;
    /**
     * @private
     * @return {undefined}
     */
    private _bindEventsToMap;
    /**
     * @private
     * @return {undefined}
     */
    private _unbindEventsToMap;
    /**
     * @private
     * @return {undefined}
     */
    private _initOverlay;
    /**
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    eventPolygonChanged(polygonData: Objekt, points: Array<{
        latitude: number;
        longitude: number;
    }>): void;
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createOrUpdatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    createPolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    /**
     * @param {Id} id
     * @param {string} title
     * @param {!Array<LatLng>} points
     * @param {!Object=} opt_polygonData
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    updatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    /**
     * @param {!Object} polygonData
     * @return {!Objekt}
     */
    private _cleanPolygonData;
    /**
     * @param {Id} id
     * @return {!Objekt}
     */
    getPolygon(id: Id): Objekt;
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removePolygon(id: Id): void;
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
    private _bindEventsToPolygon;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    private _unbindEventsToPolygon;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    private _bindEventsToPolygonPath;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @return {undefined}
     */
    private _unbindEventsToPolygonPath;
    /**
     * @private
     * @param {!google.maps.Polygon} polygon
     * @param {!Objekt} polygonData
     * @return {undefined}
     */
    private _callPolygonChangeEvent;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonDoubleClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventPolygonRightClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapClick(latitude: number, longitude: number, event: Object): void;
    /**
     * @param {string} mapType
     * @param {!Object} event
     * @return {undefined}
     */
    eventMapTypeChange(mapType: string, event: Object): void;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    private _addPointsToPolygon;
    /**
     * @private
     * @param {!Array<WeightLatLng>} points
     * @return {!Array<!google.maps.LatLng>}
     */
    private _convertPointsToPath;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<LatLng>} points
     * @return {undefined}
     */
    private _setBoundsByPoints;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @param {!Array<!google.maps.LatLng>} path
     * @return {undefined}
     */
    private _setBoundsByPath;
    /**
     * @param {!Objekt} polygonData
     * @return {LatLng}
     */
    getCenterOfPolygon(polygonData: Objekt): {
        latitude: number;
        longitude: number;
    };
    /**
     * @param {string|number} polygonId
     * @return {undefined}
     */
    fitPolygonToMap(polygonId: string | number): void;
    /**
     * @private
     * @param {!Objekt} polygonData
     * @return {!Array<LatLng>}
     */
    private _getPointsFromPolygon;
    /**
     * @param {!Objekt} polygonData
     * @return {number}
     */
    getComputeArea(polygonData: Objekt): number;
    /**
     * @param {!Objekt} polygonData
     * @param {number} latitude
     * @param {number} longitude
     * @return {undefined}
     */
    addPointToPolygon(polygonData: Objekt, latitude: number, longitude: number): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setMarkers(opt_options?: Object | undefined): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setHeatmap(opt_options?: Object | undefined): void;
    /**
     * @param {!Array<WeightLatLng>} points
     * @param {!Object=} opt_heatmapOptions
     * @return {undefined}
     */
    createHeatmap(points: Array<WeightLatLng>, opt_heatmapOptions?: Object | undefined): void;
    /**
     * @return {undefined}
     */
    removeHeatmap(): void;
    /**
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    setPolygons(opt_options?: Object | undefined): void;
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
    createOrUpdateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
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
    createMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
    /**
     * @param {Id} id
     * @param {string} title
     * @param {string} iconName
     * @param {number} x
     * @param {number} y
     * @param {!Object=} markerData
     * @return {undefined}
     */
    createMarkerByXY(id: Id, title: string, iconName: string, x: number, y: number, markerData?: Object | undefined): void;
    /**
     * @param {!google.maps.Marker} marker
     * @param {!Objekt} markerData
     * @return {undefined}
     */
    private _bindEventsToMarker;
    /**
     * @param {!google.maps.Marker} marker
     * @return {undefined}
     */
    private _unbindEventsToMarker;
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
    updateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
    /**
     * @param {!Object} markerData
     * @return {!Objekt}
     */
    private _cleanMarkerData;
    /**
     * @param {Id} id
     * @return {!Objekt}
     */
    getMarker(id: Id): Objekt;
    /**
     * @param {Id} id
     * @return {undefined}
     */
    removeMarker(id: Id): void;
    /**
     * @return {undefined}
     */
    removeAllMarker(): void;
    /**
     * @param {string|number} markerId
     * @return {undefined}
     */
    fitMarkerToMap(markerId: string | number): void;
    /**
     * @param {string|number} markerId
     * @param {string} content
     * @return {undefined}
     */
    openInfoWindow(markerId: string | number, content: string): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerClick(markerData: Objekt, event: Object): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerDoubleClick(markerData: Objekt, event: Object): void;
    /**
     * @param {!Objekt} markerData
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerRightClick(markerData: Objekt, event: Object): void;
    /**
     * @param {!Objekt} markerData
     * @param {number} latitude
     * @param {number} longitude
     * @param {!Object} event
     * @return {undefined}
     */
    eventMarkerChanged(markerData: Objekt, latitude: number, longitude: number, event: Object): void;
    /**
     * @param {string} name
     * @param {!IconOptions} iconOptions
     * @return {undefined}
     */
    setMarkerIcon(name: string, iconOptions: IconOptions): void;
    /**
     * @param {string} query
     * @return {!Promize}
     */
    searchAddress(query: string): Promize;
    /**
     * @param {number} latitude
     * @param {number} longitude
     * @param {boolean=} opt_boundCheck
     * @return {undefined}
     */
    setCenter(latitude: number, longitude: number, opt_boundCheck?: boolean | undefined): void;
    /**
     * @return {LatLng}
     */
    getCenter(): {
        latitude: number;
        longitude: number;
    };
    /**
     * @return {undefined}
     */
    triggerResize(): void;
    /**
     * @param {number} radiusPx
     * @return {number}
     */
    getDinamicRadius(radiusPx: number): number;
}
export {};
