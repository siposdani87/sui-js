/// <reference types="google.maps" />
/**
 * @class
 */
export declare class MapLabel {
    private canvas;
    private overlayView;
    /**
     * @constructor
     * @param {Object.<string, *>=} opt_options
     */
    constructor(opt_options?: Object);
    bindTo(key: string, target: google.maps.MVCObject, targetKey?: string, noNotify?: boolean): void;
    set(key: string, value: any): void;
    setMap(map: google.maps.Map | google.maps.StreetViewPanorama): void;
    changed(prop: any): void;
    /**
     * Draws the label to the canvas 2d context.
     * @private
     */
    private _drawCanvas;
    onAdd(): void;
    /**
     * Gets the appropriate margin-left for the canvas.
     * @private
     * @param {number} textWidth  the width of the text, in pixels.
     * @return {number} the margin-left, in pixels.
     */
    private _getMarginLeft;
    draw(): void;
    /**
     * Get the visibility of the label.
     * @private
     * @return {string} blank string if visible, 'hidden' if invisible.
     */
    private _getVisible;
    onRemove(): void;
}
