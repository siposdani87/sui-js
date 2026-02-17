import { debounce, neq, gte } from '../utils/operation';
import { Objekt } from '../core/objekt';
import { consoleDebug } from '../utils/log';
/**
 * Window event manager that listens for and dispatches browser-level
 * events including resize, scroll, online/offline connectivity, and
 * color scheme changes. All resize and scroll events are debounced
 * with a configurable delay to prevent excessive handler invocations.
 *
 * Screen detects orientation changes by comparing window width and
 * height after each resize, and fires a separate
 * {@link eventOrientationChange} when the orientation shifts between
 * `'landscape'` and `'portrait'`.
 *
 * Event handler methods ({@link eventResize}, {@link eventScroll},
 * {@link eventOnline}, {@link eventOffline},
 * {@link eventColorSchemeChange}) are designed to be overridden by
 * subclasses or instances to implement custom behavior.
 *
 * @example
 * const screen = new Screen({ delay: 300 });
 *
 * screen.eventResize = (width, height, event) => {
 *     console.log(`Resized to ${width}x${height}`);
 * };
 *
 * screen.eventScroll = (scrollTop, event) => {
 *     console.log('Scrolled to:', scrollTop);
 * };
 *
 * screen.getWidth();       // current window width
 * screen.getOrientation(); // 'landscape' or 'portrait'
 *
 * @see {@link Objekt}
 * @category Module
 */
export class Screen {
    /**
     * Creates a new Screen instance, initializes window and document
     * references, and sets up event listeners for resize, scroll,
     * connectivity, and color scheme changes.
     *
     * @param opt_options Configuration options. Supports `delay` (number)
     *     for the debounce interval in milliseconds. Defaults to 250.
     */
    constructor(opt_options = {}) {
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
        this.window.addEventListener('resize', debounce((event) => {
            this._resize(event);
        }, this.options.delay), false);
    }
    /**
     * Registers a debounced scroll event listener on the window.
     */
    _initScrollEvent() {
        this.window.addEventListener('scroll', debounce((event) => {
            this._scroll(event);
        }, this.options.delay), false);
    }
    /**
     * Registers online and offline event listeners on the window.
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
     * Called when the browser goes offline. Override this method to
     * implement custom offline behavior such as showing a notification
     * or disabling network-dependent features.
     *
     * @param event The native offline event.
     */
    eventOffline(event) {
        consoleDebug('Window.eventOffline()', event);
    }
    /**
     * Called when the browser comes back online. Override this method
     * to implement custom online behavior such as re-syncing data or
     * hiding offline notifications.
     *
     * @param event The native online event.
     */
    eventOnline(event) {
        consoleDebug('Window.eventOffline()', event);
    }
    /**
     * Called when the window is resized. Override this method to
     * implement custom resize behavior such as adjusting layouts or
     * recalculating dimensions.
     *
     * @param width The new window inner width in pixels.
     * @param height The new window inner height in pixels.
     * @param event The native resize event.
     */
    eventResize(width, height, event) {
        consoleDebug('Window.eventResize()', width, height, event);
    }
    /**
     * Called when the device orientation changes between landscape and
     * portrait. Override this method to implement custom
     * orientation-change behavior.
     *
     * @param orientation The new orientation: `'landscape'` or `'portrait'`.
     * @param width The new window inner width in pixels.
     * @param height The new window inner height in pixels.
     * @param event The native resize event that triggered the orientation change.
     */
    eventOrientationChange(orientation, width, height, event) {
        consoleDebug('Window.eventOrientationChange()', orientation, width, height, event);
    }
    /**
     * Called when the window is scrolled. Override this method to
     * implement custom scroll behavior such as infinite scrolling
     * or sticky headers.
     *
     * @param scrollTop The current vertical scroll position in pixels.
     * @param event The native scroll event.
     */
    eventScroll(scrollTop, event) {
        consoleDebug('Window.eventScroll()', scrollTop, event);
    }
    /**
     * Handles the debounced resize event by dispatching to
     * {@link eventResize} and checking for orientation changes.
     *
     * @param event The native resize event.
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
     * Handles the debounced scroll event by dispatching to
     * {@link eventScroll}.
     *
     * @param event The native scroll event.
     */
    _scroll(event) {
        this.eventScroll(this.getScrollTop(), event);
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
                    this.eventColorSchemeChange('dark', event);
                }
                else {
                    this.eventColorSchemeChange('light', event);
                }
            });
        }
    }
    /**
     * Called when the system color scheme preference changes between
     * light and dark mode. Override this method to implement custom
     * theme-switching behavior.
     *
     * @param colorScheme The new color scheme: `'dark'` or `'light'`.
     * @param event The native media query change event.
     */
    eventColorSchemeChange(colorScheme, event) {
        consoleDebug('Window.eventColorSchemeChange()', colorScheme, event);
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
