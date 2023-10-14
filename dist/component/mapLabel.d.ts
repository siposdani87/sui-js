/// <reference types="google.maps" />
export declare class MapLabel {
    private canvas;
    private overlayView;
    constructor(opt_options?: Object);
    bindTo(key: string, target: google.maps.MVCObject, targetKey?: string, noNotify?: boolean): void;
    set(key: string, value: any): void;
    setMap(map: google.maps.Map | google.maps.StreetViewPanorama): void;
    private setup;
    notify(prop: any): void;
    private _drawCanvas;
    onAdd(): void;
    private _getMarginLeft;
    draw(): void;
    private _getVisible;
    onRemove(): void;
}
