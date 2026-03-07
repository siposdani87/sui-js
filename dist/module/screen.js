import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { Emitter } from '../core/emitter';
/**
 * Window event manager that listens for and dispatches browser-level
 * events including resize, scroll, online/offline connectivity, and
 * color scheme changes. All resize and scroll events are debounced
 * with a configurable delay to prevent excessive handler invocations.
 *
 * Screen detects orientation changes by comparing window width and
 * height after each resize, and fires a separate `'orientationChange'`
 * event when the orientation shifts between `'landscape'` and
 * `'portrait'`.
 *
 * Register event handlers using the `on()` method inherited from
 * {@link Emitter}. Supported events: `'resize'`, `'scroll'`,
 * `'online'`, `'offline'`, `'orientationChange'`,
 * `'colorSchemeChange'`.
 *
 * @example
 * const screen = new Screen({ delay: 300 });
 *
 * screen.on('resize', (width, height, event) => {
 *     console.log(`Resized to ${width}x${height}`);
 * });
 *
 * screen.on('scroll', (scrollTop, event) => {
 *     console.log('Scrolled to:', scrollTop);
 * });
 *
 * screen.getWidth();       // current window width
 * screen.getOrientation(); // 'landscape' or 'portrait'
 *
 * @see {@link Objekt}
 * @see {@link Emitter}
 * @category Module
 */
export class Screen extends Emitter {
    /**
     * Creates a new Screen instance, initializes window and document
     * references, and sets up event listeners for resize, scroll,
     * connectivity, and color scheme changes.
     *
     * @param opt_options Configuration options. Supports `delay` (number)
     *     for the debounce interval in milliseconds. Defaults to 250.
     */
    constructor(opt_options = {}) {
        super();
        this._setOptions(opt_options);
        this._init();
    }
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    _setOptions(opt_options = {}) {
        this.options = new Objekt({
            delay: 250,
        });
        this.options.merge(opt_options);
    }
    /**
     * Initializes window and document references, computes the initial
     * orientation, and registers all event listeners.
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
     * Registers a debounced resize event listener on the window.
     */
    _initResizeEvent() {
        this._onResize = debounce((event) => {
            this._resize(event);
        }, this.options.delay);
        this.window.addEventListener('resize', this._onResize, false);
    }
    /**
     * Registers a debounced scroll event listener on the window.
     */
    _initScrollEvent() {
        this._onScroll = debounce((event) => {
            this._scroll(event);
        }, this.options.delay);
        this.window.addEventListener('scroll', this._onScroll, false);
    }
    /**
     * Registers online and offline event listeners on the window.
     */
    _initConnectionEvent() {
        this._onOnline = (event) => {
            this.emit('online', event);
        };
        this.window.addEventListener('online', this._onOnline, false);
        this._onOffline = (event) => {
            this.emit('offline', event);
        };
        this.window.addEventListener('offline', this._onOffline, false);
    }
    /**
     * Removes all event listeners registered during initialization.
     * Call this method to clean up when the Screen instance is no
     * longer needed.
     */
    destroy() {
        this.window.removeEventListener('resize', this._onResize);
        this.window.removeEventListener('scroll', this._onScroll);
        this.window.removeEventListener('online', this._onOnline);
        this.window.removeEventListener('offline', this._onOffline);
    }
    /**
     * Handles the debounced resize event by emitting `'resize'` and
     * checking for orientation changes.
     *
     * @param event The native resize event.
     */
    _resize(event) {
        this.emit('resize', this.getWidth(), this.getHeight(), event);
        const orientation = this.getOrientation();
        if (neq(this.orientation, orientation)) {
            this.orientation = orientation;
            this.emit('orientationChange', this.orientation, this.getWidth(), this.getHeight(), event);
        }
    }
    /**
     * Handles the debounced scroll event by emitting `'scroll'`.
     *
     * @param event The native scroll event.
     */
    _scroll(event) {
        this.emit('scroll', this.getScrollTop(), event);
    }
    /**
     * Returns the current vertical scroll position of the document.
     *
     * @returns The scroll offset from the top in pixels.
     *
     * @example
     * const scrollY = screen.getScrollTop();
     */
    getScrollTop() {
        return (this.document.documentElement.scrollTop ||
            this.document.body.scrollTop);
    }
    /**
     * Returns the current inner width of the browser window.
     *
     * @returns The window width in pixels.
     *
     * @example
     * const width = screen.getWidth();
     */
    getWidth() {
        return this.window.innerWidth;
    }
    /**
     * Returns the current inner height of the browser window.
     *
     * @returns The window height in pixels.
     *
     * @example
     * const height = screen.getHeight();
     */
    getHeight() {
        return this.window.innerHeight;
    }
    /**
     * Determines the current screen orientation based on the aspect
     * ratio of the window dimensions.
     *
     * @returns `'landscape'` if the width is greater than or equal to
     *     the height, `'portrait'` otherwise.
     *
     * @example
     * const orientation = screen.getOrientation(); // 'landscape'
     */
    getOrientation() {
        return gte(this.getWidth(), this.getHeight())
            ? 'landscape'
            : 'portrait';
    }
    /**
     * Registers a listener for the `prefers-color-scheme` media query
     * change event to detect system-level light/dark mode switches.
     */
    _initColorSchemeEvent() {
        if (window.matchMedia) {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (event) => {
                if (event.matches) {
                    this.emit('colorSchemeChange', 'dark', event);
                }
                else {
                    this.emit('colorSchemeChange', 'light', event);
                }
            });
        }
    }
    /**
     * Checks whether the system currently uses the specified color
     * scheme preference.
     *
     * @param type The color scheme to check, either `'dark'` or `'light'`.
     * @returns `true` if the system preference matches the given type,
     *     `false` otherwise.
     *
     * @example
     * if (screen.isColorScheme('dark')) {
     *     applyDarkTheme();
     * }
     */
    isColorScheme(type) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, `(prefers-color-scheme: ${type})`)) === null || _b === void 0 ? void 0 : _b.matches) !== null && _c !== void 0 ? _c : false);
    }
}
