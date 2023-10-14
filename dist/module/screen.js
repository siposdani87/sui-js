import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
export class Screen {
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            delay: 250,
        });
        this.options.merge(opt_options);
    }
    _init() {
        this.window = window;
        this.document = document;
        this.orientation = this.getOrientation();
        this._initResizeEvent();
        this._initScrollEvent();
        this._initConnectionEvent();
        this._initColorSchemeEvent();
    }
    _initResizeEvent() {
        this.window.addEventListener('resize', debounce((event) => {
            this._resize(event);
        }, this.options.delay), false);
    }
    _initScrollEvent() {
        this.window.addEventListener('scroll', debounce((event) => {
            this._scroll(event);
        }, this.options.delay), false);
    }
    _initConnectionEvent() {
        this.window.addEventListener('online', (event) => {
            this.eventOnline(event);
        }, false);
        this.window.addEventListener('offline', (event) => {
            this.eventOffline(event);
        }, false);
    }
    eventOffline(event) {
        consoleDebug('Window.eventOffline()', event);
    }
    eventOnline(event) {
        consoleDebug('Window.eventOffline()', event);
    }
    eventResize(width, height, event) {
        consoleDebug('Window.eventResize()', width, height, event);
    }
    eventOrientationChange(orientation, width, height, event) {
        consoleDebug('Window.eventOrientationChange()', orientation, width, height, event);
    }
    eventScroll(scrollTop, event) {
        consoleDebug('Window.eventScroll()', scrollTop, event);
    }
    _resize(event) {
        this.eventResize(this.getWidth(), this.getHeight(), event);
        const orientation = this.getOrientation();
        if (neq(this.orientation, orientation)) {
            this.orientation = orientation;
            this.eventOrientationChange(this.orientation, this.getWidth(), this.getHeight(), event);
        }
    }
    _scroll(event) {
        this.eventScroll(this.getScrollTop(), event);
    }
    getScrollTop() {
        return (this.document.documentElement.scrollTop ||
            this.document.body.scrollTop);
    }
    getWidth() {
        return this.window.innerWidth;
    }
    getHeight() {
        return this.window.innerHeight;
    }
    getOrientation() {
        return gte(this.getWidth(), this.getHeight())
            ? 'landscape'
            : 'portrait';
    }
    _initColorSchemeEvent() {
        if (window.matchMedia) {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (event) => {
                if (event.matches) {
                    this.eventColorSchemeChange('dark', event);
                }
                else {
                    this.eventColorSchemeChange('light', event);
                }
            });
        }
    }
    eventColorSchemeChange(colorScheme, event) {
        consoleDebug('Window.eventColorSchemeChange()', colorScheme, event);
    }
    isColorScheme(type) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, `(prefers-color-scheme: ${type})`)) === null || _b === void 0 ? void 0 : _b.matches) !== null && _c !== void 0 ? _c : false);
    }
}
