/**
 * Detects the current browser type and operating system from the
 * user-agent string and platform properties. Browser also checks for
 * the availability of required browser features (geolocation, history,
 * storage, console) and fires the {@link Browser.eventMissingFeatures}
 * hook when any are absent.
 *
 * OS detection covers macOS, iOS, Windows, Android, and Linux.
 * Browser detection covers Chrome, Firefox, Safari, Edge (legacy and
 * Chromium-based), Opera, Internet Explorer (10/11), and the broader
 * Webkit and Chromium engine families.
 *
 * @example
 * const browser = new Browser();
 * browser.detect(); // triggers eventMissingFeatures if needed
 *
 * if (browser.isChrome()) {
 *     console.log('Running on Chrome');
 * }
 * if (browser.isMacOS()) {
 *     console.log('Running on macOS');
 * }
 *
 * @see {@link Application}
 * @category Module
 */
export declare class Browser {
    features: string[];
    browsers: {
        [key: string]: boolean;
    };
    os: string | null;
    /**
     * Creates a new Browser instance and immediately detects the OS,
     * browser type, and missing features.
     */
    constructor();
    /**
     * Runs all detection routines: OS, browsers, and missing features.
     */
    private _init;
    /**
     * Checks for the availability of required browser features and
     * populates the `features` array with the names of any that are
     * missing.
     */
    private _detectMissingFeatures;
    /**
     * Triggers the {@link Browser.eventMissingFeatures} hook if one or
     * more required browser features are unavailable. Call this method
     * after construction to notify the application of missing capabilities.
     *
     * @example
     * const browser = new Browser();
     * browser.detect();
     */
    detect(): void;
    /**
     * Records a feature as missing if its value is falsy.
     *
     * @param {string} name The feature identifier (e.g. 'window.history').
     * @param {any} value The feature reference to test for truthiness.
     */
    private _setFeature;
    /**
     * Called by {@link Browser.detect} when one or more required browser
     * features are missing. Override this method to display a warning to
     * the user or degrade functionality gracefully.
     *
     * @param {Array<any>} features List of missing feature identifiers.
     */
    eventMissingFeatures(features: Array<string>): void;
    /**
     * Populates the `browsers` map by inspecting CSS property support,
     * global objects, and the user-agent string.
     */
    private _detectBrowsers;
    /**
     * Detects the operating system from the navigator platform string and
     * user-agent. Sets `this.os` to one of 'macOS', 'iOS', 'Windows',
     * 'Android', 'Linux', or `null` if unrecognized.
     */
    private _detectOS;
    /**
     * Checks whether the detected operating system is macOS.
     *
     * @returns {boolean} True if the OS is macOS.
     *
     * @example
     * if (browser.isMacOS()) {
     *     // apply macOS-specific behavior
     * }
     */
    isMacOS(): boolean;
    /**
     * Checks whether the detected operating system is iOS.
     *
     * @returns {boolean} True if the OS is iOS.
     *
     * @example
     * if (browser.isIOS()) {
     *     // apply iOS-specific behavior
     * }
     */
    isIOS(): boolean;
    /**
     * Checks whether the detected operating system is Windows.
     *
     * @returns {boolean} True if the OS is Windows.
     *
     * @example
     * if (browser.isWindows()) {
     *     // apply Windows-specific behavior
     * }
     */
    isWindows(): boolean;
    /**
     * Checks whether the detected operating system is Android.
     *
     * @returns {boolean} True if the OS is Android.
     *
     * @example
     * if (browser.isAndroid()) {
     *     // apply Android-specific behavior
     * }
     */
    isAndroid(): boolean;
    /**
     * Checks whether the detected operating system is Linux.
     *
     * @returns {boolean} True if the OS is Linux.
     *
     * @example
     * if (browser.isLinux()) {
     *     // apply Linux-specific behavior
     * }
     */
    isLinux(): boolean;
    /**
     * Checks whether the browser is any version of Internet Explorer.
     * When `opt_version` is provided, checks for that specific version
     * only (10 or 11). Without the argument, returns true for IE 10 or
     * earlier.
     *
     * @param {number} [opt_version] Specific IE version to check (10 or 11).
     * @returns {boolean} True if the browser matches the requested IE
     *     version or any IE version when unspecified.
     *
     * @example
     * if (browser.isInternetExplorer()) {
     *     console.log('Internet Explorer detected');
     * }
     * if (browser.isInternetExplorer(11)) {
     *     console.log('IE 11 specifically');
     * }
     */
    isInternetExplorer(opt_version: number | undefined): boolean;
    /**
     * Checks whether the browser is legacy Microsoft Edge (EdgeHTML engine).
     *
     * @returns {boolean} True if the browser is legacy Edge.
     *
     * @example
     * if (browser.isEdge()) {
     *     // apply Edge-specific behavior
     * }
     */
    isEdge(): boolean;
    /**
     * Checks whether the browser is Chromium-based Microsoft Edge.
     *
     * @returns {boolean} True if the browser is Chromium Edge.
     *
     * @example
     * if (browser.isChromiumEdge()) {
     *     // apply Chromium Edge-specific behavior
     * }
     */
    isChromiumEdge(): boolean;
    /**
     * Checks whether the browser is Mozilla Firefox.
     *
     * @returns {boolean} True if the browser is Firefox.
     *
     * @example
     * if (browser.isFirefox()) {
     *     // apply Firefox-specific behavior
     * }
     */
    isFirefox(): boolean;
    /**
     * Checks whether the browser is Google Chrome (with Chrome Web Store
     * support, distinguishing it from other Chromium-based browsers).
     *
     * @returns {boolean} True if the browser is Chrome.
     *
     * @example
     * if (browser.isChrome()) {
     *     // apply Chrome-specific behavior
     * }
     */
    isChrome(): boolean;
    /**
     * Checks whether the browser is Opera.
     *
     * @returns {boolean} True if the browser is Opera.
     *
     * @example
     * if (browser.isOpera()) {
     *     // apply Opera-specific behavior
     * }
     */
    isOpera(): boolean;
    /**
     * Checks whether the browser is Apple Safari.
     *
     * @returns {boolean} True if the browser is Safari.
     *
     * @example
     * if (browser.isSafari()) {
     *     // apply Safari-specific behavior
     * }
     */
    isSafari(): boolean;
    /**
     * Checks whether the browser uses the WebKit rendering engine.
     *
     * @returns {boolean} True if the browser is WebKit-based.
     *
     * @example
     * if (browser.isWebkit()) {
     *     // apply WebKit-specific styles
     * }
     */
    isWebkit(): boolean;
    /**
     * Checks whether the browser is built on the Chromium engine
     * (includes Chrome, Chromium Edge, Opera, and other Chromium forks).
     *
     * @returns {boolean} True if the browser is Chromium-based.
     *
     * @example
     * if (browser.isChromium()) {
     *     // apply Chromium-specific behavior
     * }
     */
    isChromium(): boolean;
}
