/**
 * @class
 */
export class MapLabel {
    private canvas: HTMLCanvasElement;
    private overlayView: google.maps.OverlayView;
    /**
     * @constructor
     * @param {Object.<string, *>=} opt_options
     */
    constructor(opt_options?: Object) {
        this.overlayView = new google.maps.OverlayView();

        this.overlayView.set('fontFamily', 'sans-serif');
        this.overlayView.set('fontSize', 12);
        this.overlayView.set('fontColor', '#000000');
        this.overlayView.set('strokeWeight', 4);
        this.overlayView.set('strokeColor', '#ffffff');
        this.overlayView.set('align', 'center');
        this.overlayView.set('zIndex', 1e3);

        this.overlayView.setValues(opt_options);
    }

    public bindTo(
        key: string,
        target: google.maps.MVCObject,
        targetKey?: string,
        noNotify?: boolean,
    ): void {
        this.overlayView.bindTo(key, target, targetKey, noNotify);
    }

    public set(key: string, value: any): void {
        this.overlayView.set(key, value);
    }

    public setMap(map: google.maps.Map | google.maps.StreetViewPanorama): void {
        this.overlayView.setMap(map);
    }

    changed(prop) {
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
     * Draws the label to the canvas 2d context.
     * @private
     */
    private _drawCanvas(): void {
        const canvas = this.canvas;
        if (!canvas) return;

        const style = canvas.style;
        style.zIndex = /** @type number */ this.overlayView.get('zIndex');

        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    onAdd() {
        const canvas = (this.canvas = document.createElement('canvas'));
        const style = canvas.style;
        style.position = 'absolute';

        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'round';
        ctx.textBaseline = 'top';

        this._drawCanvas();

        const panes = this.overlayView.getPanes();
        if (panes) {
            panes.mapPane.appendChild(canvas);
        }
    }
    /**
     * Gets the appropriate margin-left for the canvas.
     * @private
     * @param {number} textWidth  the width of the text, in pixels.
     * @return {number} the margin-left, in pixels.
     */
    private _getMarginLeft(textWidth: number): number {
        switch (this.overlayView.get('align')) {
            case 'left':
                return 0;
            case 'right':
                return -textWidth;
        }
        return textWidth / -2;
    }

    draw(): void {
        const projection = this.overlayView.getProjection();

        if (!projection) {
            // The map projection is not ready yet so do nothing
            return;
        }

        if (!this.canvas) {
            // onAdd has not been called yet.
            return;
        }

        const latLng =
            /** @type {google.maps.LatLng} */ this.overlayView.get('position');
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
     * Get the visibility of the label.
     * @private
     * @return {string} blank string if visible, 'hidden' if invisible.
     */
    private _getVisible(): string {
        const minZoom = /** @type number */ this.overlayView.get('minZoom');
        const maxZoom = /** @type number */ this.overlayView.get('maxZoom');

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

    onRemove(): void {
        const canvas = this.canvas;
        if (canvas && canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
        }
    }
}
