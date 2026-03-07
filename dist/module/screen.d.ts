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
export declare class Screen extends Emitter {
    options: Objekt<{
        delay: number;
    }>;
    window: Window;
    document: Document;
    orientation: string;
    private _onResize;
    private _onScroll;
    private _onOnline;
    private _onOffline;
    /**
     * Creates a new Screen instance, initializes window and document
     * references, and sets up event listeners for resize, scroll,
     * connectivity, and color scheme changes.
     *
     * @param opt_options Configuration options. Supports `delay` (number)
     *     for the debounce interval in milliseconds. Defaults to 250.
     */
    constructor(opt_options?: object | undefined);
    /**
     * Merges the provided options with defaults.
     *
     * @param opt_options User-provided options to merge with defaults.
     */
    private _setOptions;
    /**
     * Initializes window and document references, computes the initial
     * orientation, and registers all event listeners.
     */
    private _init;
    /**
     * Registers a debounced resize event listener on the window.
     */
    private _initResizeEvent;
    /**
     * Registers a debounced scroll event listener on the window.
     */
    private _initScrollEvent;
    /**
     * Registers online and offline event listeners on the window.
     */
    private _initConnectionEvent;
    /**
     * Removes all event listeners registered during initialization.
     * Call this method to clean up when the Screen instance is no
     * longer needed.
     */
    destroy(): void;
    /**
     * Handles the debounced resize event by emitting `'resize'` and
     * checking for orientation changes.
     *
     * @param event The native resize event.
     */
    private _resize;
    /**
     * Handles the debounced scroll event by emitting `'scroll'`.
     *
     * @param event The native scroll event.
     */
    private _scroll;
    /**
     * Returns the current vertical scroll position of the document.
     *
     * @returns The scroll offset from the top in pixels.
     *
     * @example
     * const scrollY = screen.getScrollTop();
     */
    getScrollTop(): number;
    /**
     * Returns the current inner width of the browser window.
     *
     * @returns The window width in pixels.
     *
     * @example
     * const width = screen.getWidth();
     */
    getWidth(): number;
    /**
     * Returns the current inner height of the browser window.
     *
     * @returns The window height in pixels.
     *
     * @example
     * const height = screen.getHeight();
     */
    getHeight(): number;
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
    getOrientation(): string;
    /**
     * Registers a listener for the `prefers-color-scheme` media query
     * change event to detect system-level light/dark mode switches.
     */
    private _initColorSchemeEvent;
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
    isColorScheme(type: string): boolean;
}
