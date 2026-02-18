/**
 * Canvas-based text label overlay for Google Maps markers and positions.
 *
 * @description Renders text labels on a Google Maps instance using an HTML5 canvas element
 * as an overlay. Supports configurable font, color, stroke, alignment, and zoom-based visibility.
 * Labels can be bound to marker positions or placed at fixed geographic coordinates.
 *
 * @example
 * const label = new MapLabel({ text: 'My Label', strokeWeight: 2 });
 * label.bindTo('position', marker);
 * label.bindTo('map', marker);
 *
 * @see {@link GoogleMap}
 * @category Component
 */
export declare class MapLabel {
    private canvas;
    private overlayView;
    /**
     * @param opt_options - Initial property values (text, fontFamily, fontSize, fontColor,
     *     strokeWeight, strokeColor, align, zIndex, position, map, minZoom, maxZoom).
     */
    constructor(opt_options?: object);
    /**
     * Binds a property of this label to a property of another MVC object.
     *
     * @param key - The property name to bind.
     * @param target - The target MVC object to bind to.
     * @param targetKey - The property name on the target (defaults to key).
     * @param noNotify - When true, suppresses change notifications.
     *
     * @example
     * label.bindTo('position', marker);
     * label.bindTo('map', marker);
     */
    bindTo(key: string, target: google.maps.MVCObject, targetKey?: string, noNotify?: boolean): void;
    /**
     * Sets a property value on the overlay, triggering a redraw if applicable.
     *
     * @param key - The property name to set.
     * @param value - The value to assign.
     *
     * @example
     * label.set('text', 'Updated Label');
     * label.set('fontColor', '#FF0000');
     */
    set(key: string, value: any): void;
    /**
     * Sets or removes the map on which this label is displayed.
     *
     * @param map - The Google Maps or StreetView instance, or null to remove.
     *
     * @example
     * label.setMap(googleMap.map);
     * label.setMap(null); // remove from map
     */
    setMap(map: google.maps.Map | google.maps.StreetViewPanorama | null): void;
    /**
     * Wires up the overlay lifecycle methods (onAdd, onRemove, notify, draw).
     */
    private setup;
    /**
     * Handles property change notifications and triggers the appropriate redraw.
     *
     * @description Redraws the canvas text for visual property changes (font, color, text)
     * and repositions the canvas for spatial property changes (position, zoom constraints).
     *
     * @param prop - The property name that changed.
     *
     * @example
     * label.notify('text'); // triggers canvas text redraw
     * label.notify('position'); // triggers repositioning
     */
    notify(prop: string): void;
    /**
     * Renders the label text onto the canvas with stroke and fill styles.
     */
    private _drawCanvas;
    /**
     * Creates the canvas element and appends it to the map overlay pane.
     *
     * @description Called by the Google Maps API when the overlay is added to the map.
     * Initializes the canvas with absolute positioning and draws the initial label text.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    onAdd(): void;
    /**
     * Calculates the horizontal margin offset based on text alignment.
     * @param textWidth - The measured width of the rendered text.
     * @returns The pixel offset for marginLeft.
     */
    private _getMarginLeft;
    /**
     * Positions the canvas element on the map based on the label's geographic coordinates.
     *
     * @description Called by the Google Maps API during map rendering. Converts the label's
     * LatLng position to pixel coordinates and applies visibility based on zoom constraints.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    draw(): void;
    /**
     * Determines visibility based on minZoom and maxZoom constraints.
     * @returns CSS visibility value: empty string (visible) or 'hidden'.
     */
    private _getVisible;
    /**
     * Removes the canvas element from the DOM when the overlay is removed from the map.
     *
     * @description Called by the Google Maps API when the overlay is removed.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    onRemove(): void;
}
