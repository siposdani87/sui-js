/// <reference types="google.maps" />
import { Collection } from '../core/collection';
import { Objekt } from '../core/objekt';
import { Knot } from '../core';
import { IconOptions, Id } from '../utils';
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
    constructor(dom: Knot, opt_selector?: string | undefined, opt_options?: Object | undefined);
    private _setOptions;
    getMapType(): string;
    setMapType(mapTypeId: string): void;
    setCustomMapStyle(mapTypeId: string, mapTypeName: string, mapStyles: Array<google.maps.MapTypeStyle | null>): void;
    private _init;
    private _initMap;
    private _bindEventsToMap;
    private _unbindEventsToMap;
    private _initOverlay;
    eventPolygonChanged(polygonData: Objekt, points: Array<{
        latitude: number;
        longitude: number;
    }>): void;
    createOrUpdatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    createPolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    updatePolygon(id: Id, title: string, points: Array<{
        latitude: number;
        longitude: number;
    }>, opt_polygonData?: Object | undefined, opt_options?: Object | undefined): void;
    private _cleanPolygonData;
    getPolygon(id: Id): Objekt;
    removePolygon(id: Id): void;
    removeAllPolygon(): void;
    private _bindEventsToPolygon;
    private _unbindEventsToPolygon;
    private _bindEventsToPolygonPath;
    private _unbindEventsToPolygonPath;
    private _callPolygonChangeEvent;
    eventPolygonClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    eventPolygonDoubleClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    eventPolygonRightClick(polygonData: Objekt, latitude: number, longitude: number, event: Object): void;
    eventMapClick(latitude: number, longitude: number, event: Object): void;
    eventMapTypeChange(mapType: string, event: Object): void;
    private _addPointsToPolygon;
    private _convertPointsToPath;
    private _setBoundsByPoints;
    private _setBoundsByPath;
    getCenterOfPolygon(polygonData: Objekt): {
        latitude: number;
        longitude: number;
    };
    fitPolygonToMap(polygonId: string | number): void;
    private _getPointsFromPolygon;
    getComputeArea(polygonData: Objekt): number;
    addPointToPolygon(polygonData: Objekt, latitude: number, longitude: number): void;
    setMarkers(opt_options?: Object | undefined): void;
    setHeatmap(opt_options?: Object | undefined): void;
    createHeatmap(points: Array<WeightLatLng>, opt_heatmapOptions?: Object | undefined): void;
    removeHeatmap(): void;
    setPolygons(opt_options?: Object | undefined): void;
    createOrUpdateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
    createMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
    createMarkerByXY(id: Id, title: string, iconName: string, x: number, y: number, markerData?: Object | undefined): void;
    private _bindEventsToMarker;
    private _unbindEventsToMarker;
    updateMarker(id: Id, title: string, iconName: string, latitude: number, longitude: number, opt_markerData?: Object | undefined, opt_options?: Object | undefined): void;
    private _cleanMarkerData;
    getMarker(id: Id): Objekt;
    removeMarker(id: Id): void;
    removeAllMarker(): void;
    fitMarkerToMap(markerId: string | number): void;
    openInfoWindow(markerId: string | number, content: string): void;
    eventMarkerClick(markerData: Objekt, event: Object): void;
    eventMarkerDoubleClick(markerData: Objekt, event: Object): void;
    eventMarkerRightClick(markerData: Objekt, event: Object): void;
    eventMarkerChanged(markerData: Objekt, latitude: number, longitude: number, event: Object): void;
    setMarkerIcon(name: string, iconOptions: IconOptions): void;
    searchAddress(query: string): import("../core").Promize<[{
        address: string;
        latitude: number;
        longitude: number;
    }[]], void>;
    setCenter(latitude: number, longitude: number, opt_boundCheck?: boolean | undefined): void;
    getCenter(): {
        latitude: number;
        longitude: number;
    };
    triggerResize(): void;
    getDinamicRadius(radiusPx: number): number;
}
export {};
