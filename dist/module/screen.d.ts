import { Objekt } from '../core/objekt';
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
export declare class Screen {
    options: Objekt;
    window: Window;
    document: Document;
    orientation: string;
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
     * Called when the browser goes offline. Override this method to
     * implement custom offline behavior such as showing a notification
     * or disabling network-dependent features.
     *
     * @param event The native offline event.
     */
    eventOffline(event: Event): void;
    /**
     * Called when the browser comes back online. Override this method
     * to implement custom online behavior such as re-syncing data or
     * hiding offline notifications.
     *
     * @param event The native online event.
     */
    eventOnline(event: Event): void;
    /**
     * Called when the window is resized. Override this method to
     * implement custom resize behavior such as adjusting layouts or
     * recalculating dimensions.
     *
     * @param width The new window inner width in pixels.
     * @param height The new window inner height in pixels.
     * @param event The native resize event.
     */
    eventResize(width: number, height: number, event: Event): void;
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
    eventOrientationChange(orientation: string, width: number, height: number, event: Event): void;
    /**
     * Called when the window is scrolled. Override this method to
     * implement custom scroll behavior such as infinite scrolling
     * or sticky headers.
     *
     * @param scrollTop The current vertical scroll position in pixels.
     * @param event The native scroll event.
     */
    eventScroll(scrollTop: number, event: Event): void;
    /**
     * Handles the debounced resize event by dispatching to
     * {@link eventResize} and checking for orientation changes.
     *
     * @param event The native resize event.
     */
    private _resize;
    /**
     * Handles the debounced scroll event by dispatching to
     * {@link eventScroll}.
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
     * Called when the system color scheme preference changes between
     * light and dark mode. Override this method to implement custom
     * theme-switching behavior.
     *
     * @param colorScheme The new color scheme: `'dark'` or `'light'`.
     * @param event The native media query change event.
     */
    eventColorSchemeChange(colorScheme: string, event: Event): void;
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
