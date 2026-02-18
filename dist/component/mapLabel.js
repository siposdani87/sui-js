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
export class MapLabel {
    /**
     * @param opt_options - Initial property values (text, fontFamily, fontSize, fontColor,
     *     strokeWeight, strokeColor, align, zIndex, position, map, minZoom, maxZoom).
     */
    constructor(opt_options) {
        this.overlayView = new google.maps.OverlayView();
        this.overlayView.set('fontFamily', 'sans-serif');
        this.overlayView.set('fontSize', 12);
        this.overlayView.set('fontColor', '#000000');
        this.overlayView.set('strokeWeight', 4);
        this.overlayView.set('strokeColor', '#ffffff');
        this.overlayView.set('align', 'center');
        this.overlayView.set('zIndex', 1e3);
        this.overlayView.setValues(opt_options);
        this.setup();
    }
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
    bindTo(key, target, targetKey, noNotify) {
        this.overlayView.bindTo(key, target, targetKey, noNotify);
    }
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set(key, value) {
        this.overlayView.set(key, value);
    }
    /**
     * Sets or removes the map on which this label is displayed.
     *
     * @param map - The Google Maps or StreetView instance, or null to remove.
     *
     * @example
     * label.setMap(googleMap.map);
     * label.setMap(null); // remove from map
     */
    setMap(map) {
        this.overlayView.setMap(map);
    }
    /**
     * Wires up the overlay lifecycle methods (onAdd, onRemove, notify, draw).
     */
    setup() {
        this.overlayView.onAdd = this.onAdd.bind(this);
        this.overlayView.onRemove = this.onRemove.bind(this);
        this.overlayView.notify = this.notify.bind(this);
        this.overlayView.draw = this.draw.bind(this);
    }
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
    notify(prop) {
        switch (prop) {
            case 'fontFamily':
            case 'fontSize':
            case 'fontColor':
            case 'strokeWeight':
            case 'strokeColor':
            case 'align':
            case 'text':
                return this._drawCanvas();
            case 'maxZoom':
            case 'minZoom':
            case 'position':
                return this.draw();
        }
    }
    /**
     * Renders the label text onto the canvas with stroke and fill styles.
     */
    _drawCanvas() {
        if (!this.canvas)
            return;
        const style = this.canvas.style;
        style.zIndex = this.overlayView.get('zIndex');
        const ctx = this.canvas.getContext('2d');
        if (!ctx)
            return;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.strokeStyle = this.overlayView.get('strokeColor');
        ctx.fillStyle = this.overlayView.get('fontColor');
        ctx.font =
            this.overlayView.get('fontSize') +
                'px ' +
                this.overlayView.get('fontFamily');
        const strokeWeight = Number(this.overlayView.get('strokeWeight'));
        const text = this.overlayView.get('text');
        if (text) {
            if (strokeWeight) {
                ctx.lineWidth = strokeWeight;
                ctx.strokeText(text, strokeWeight, strokeWeight);
            }
            ctx.fillText(text, strokeWeight, strokeWeight);
            const textMeasure = ctx.measureText(text);
            const textWidth = textMeasure.width + strokeWeight;
            style.marginLeft = this._getMarginLeft(textWidth) + 'px';
            // Bring actual text top in line with desired latitude.
            // Cheaper than calculating height of text.
            style.marginTop = '-0.4em';
        }
    }
    /**
     * Creates the canvas element and appends it to the map overlay pane.
     *
     * @description Called by the Google Maps API when the overlay is added to the map.
     * Initializes the canvas with absolute positioning and draws the initial label text.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    onAdd() {
        this.canvas = document.createElement('canvas');
        const style = this.canvas.style;
        style.position = 'absolute';
        const ctx = this.canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';
        this._drawCanvas();
        const panes = this.overlayView.getPanes();
        if (panes) {
            panes.mapPane.appendChild(this.canvas);
        }
    }
    /**
     * Calculates the horizontal margin offset based on text alignment.
     * @param textWidth - The measured width of the rendered text.
     * @returns The pixel offset for marginLeft.
     */
    _getMarginLeft(textWidth) {
        switch (this.overlayView.get('align')) {
            case 'left':
                return 0;
            case 'right':
                return -textWidth;
        }
        return textWidth / -2;
    }
    /**
     * Positions the canvas element on the map based on the label's geographic coordinates.
     *
     * @description Called by the Google Maps API during map rendering. Converts the label's
     * LatLng position to pixel coordinates and applies visibility based on zoom constraints.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    draw() {
        const projection = this.overlayView.getProjection();
        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }
        if (!this.canvas) {
            // onAdd has not been called yet.
            return;
        }
        const latLng = this.overlayView.get('position');
        if (!latLng) {
            return;
        }
        const pos = projection.fromLatLngToDivPixel(latLng);
        const style = this.canvas.style;
        style['top'] = pos.y + 'px';
        style['left'] = pos.x + 'px';
        style['visibility'] = this._getVisible();
    }
    /**
     * Determines visibility based on minZoom and maxZoom constraints.
     * @returns CSS visibility value: empty string (visible) or 'hidden'.
     */
    _getVisible() {
        const minZoom = this.overlayView.get('minZoom');
        const maxZoom = this.overlayView.get('maxZoom');
        if (minZoom === undefined && maxZoom === undefined) {
            return '';
        }
        const map = this.overlayView.getMap();
        if (!map) {
            return '';
        }
        const mapZoom = map.getZoom();
        if (mapZoom < minZoom || mapZoom > maxZoom) {
            return 'hidden';
        }
        return '';
    }
    /**
     * Removes the canvas element from the DOM when the overlay is removed from the map.
     *
     * @description Called by the Google Maps API when the overlay is removed.
     *
     * @example
     * // Typically called automatically by the Maps API, not directly.
     */
    onRemove() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
