export class MapLabel {
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
    bindTo(key, target, targetKey, noNotify) {
        this.overlayView.bindTo(key, target, targetKey, noNotify);
    }
    set(key, value) {
        this.overlayView.set(key, value);
    }
    setMap(map) {
        this.overlayView.setMap(map);
    }
    setup() {
        this.overlayView.onAdd = this.onAdd.bind(this);
        this.overlayView.onRemove = this.onRemove.bind(this);
        this.overlayView.notify = this.notify.bind(this);
        this.overlayView.draw = this.draw.bind(this);
    }
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
    _drawCanvas() {
        if (!this.canvas)
            return;
        const style = this.canvas.style;
        style.zIndex = this.overlayView.get('zIndex');
        const ctx = this.canvas.getContext('2d');
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
    _getMarginLeft(textWidth) {
        switch (this.overlayView.get('align')) {
            case 'left':
                return 0;
            case 'right':
                return -textWidth;
        }
        return textWidth / -2;
    }
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
    onRemove() {
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}
