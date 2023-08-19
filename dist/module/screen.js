import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { consoleWarn } from '../utils/log';
/**
 * @class
 */
export class Screen {
    /**
     * @param {!Object=} opt_options
     */
    constructor(opt_options = {}) {
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * @private
     * @param {!Object=} opt_options
     * @return {undefined}
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            delay: 250,
        });
        this.options.merge(opt_options);
    }
    /**
     * @private
     * @return {undefined}
     */
    _init() {
        this.window = window;
        this.document = document;
        this.orientation = this.getOrientation();
        this._initResizeEvent();
        this._initScrollEvent();
        this._initConnectionEvent();
        this._initColorSchemeEvent();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initResizeEvent() {
        this.window.addEventListener('resize', debounce((event) => {
            this._resize(event);
        }, this.options.delay), false);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initScrollEvent() {
        this.window.addEventListener('scroll', debounce((event) => {
            this._scroll(event);
        }, this.options.delay), false);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initConnectionEvent() {
        this.window.addEventListener('online', (event) => {
            this.eventOnline(event);
        }, false);
        this.window.addEventListener('offline', (event) => {
            this.eventOffline(event);
        }, false);
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOffline(event) {
        consoleWarn('Window.eventOffline()', event);
    }
    /**
     * @param {!Event} event
     * @return {undefined}
     */
    eventOnline(event) {
        consoleWarn('Window.eventOffline()', event);
    }
    /**
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventResize(width, height, event) {
        consoleWarn('Window.eventResize()', width, height, event);
    }
    /**
     * @param {string} orientation
     * @param {number} width
     * @param {number} height
     * @param {!Event} event
     * @return {undefined}
     */
    eventOrientationChange(orientation, width, height, event) {
        consoleWarn('Window.eventOrientationChange()', orientation, width, height, event);
    }
    /**
     * @param {number} scrollTop
     * @param {!Event} event
     * @return {undefined}
     */
    eventScroll(scrollTop, event) {
        consoleWarn('Window.eventScroll()', scrollTop, event);
    }
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    _resize(event) {
        this.eventResize(this.getWidth(), this.getHeight(), event);
        const orientation = this.getOrientation();
        if (neq(this.orientation, orientation)) {
            this.orientation = orientation;
            this.eventOrientationChange(this.orientation, this.getWidth(), this.getHeight(), event);
        }
    }
    /**
     * @private
     * @param {!Event} event
     * @return {undefined}
     */
    _scroll(event) {
        this.eventScroll(this.getScrollTop(), event);
    }
    /**
     * @return {number}
     */
    getScrollTop() {
        return (this.document.documentElement.scrollTop ||
            this.document.body.scrollTop);
    }
    /**
     * @return {number}
     */
    getWidth() {
        return this.window.innerWidth;
    }
    /**
     * @return {number}
     */
    getHeight() {
        return this.window.innerHeight;
    }
    /**
     * @return {string} landscape|portrait
     */
    getOrientation() {
        return gte(this.getWidth(), this.getHeight())
            ? 'landscape'
            : 'portrait';
    }
    /**
     * @private
     * @return {undefined}
     */
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
    /**
     * @param {string} colorScheme
     * @param {!Event} event
     * @return {undefined}
     */
    eventColorSchemeChange(colorScheme, event) {
        consoleWarn('Window.eventColorSchemeChange()', colorScheme, event);
    }
    /**
     * @param {string} type dark|light|no-preference
     * @return {boolean}
     */
    isColorScheme(type) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, `(prefers-color-scheme: ${type})`)) === null || _b === void 0 ? void 0 : _b.matches) !== null && _c !== void 0 ? _c : false);
    }
}
