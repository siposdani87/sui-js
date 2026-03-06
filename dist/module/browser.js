import { isEmpty, eq } from '../utils/operation';
import { consoleDebug } from '../utils/log';
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
export class Browser {
    /**
     * Creates a new Browser instance and immediately detects the OS,
     * browser type, and missing features.
     */
    constructor() {
        this._init();
    }
    /**
     * Runs all detection routines: OS, browsers, and missing features.
     */
    _init() {
        this._detectOS();
        this._detectBrowsers();
        this._detectMissingFeatures();
    }
    /**
     * Checks for the availability of required browser features and
     * populates the `features` array with the names of any that are
     * missing.
     */
    _detectMissingFeatures() {
        this.features = [];
        this._setFeature('navigator.geolocation', navigator && navigator.geolocation);
        this._setFeature('window.history', window.history);
        this._setFeature('window.localStorage', window.localStorage);
        this._setFeature('window.sessionStorage', window.sessionStorage);
        this._setFeature('console.log', console.log);
        this._setFeature('console.info', console.info);
        this._setFeature('console.warn', console.warn);
        this._setFeature('console.error', console.error);
    }
    /**
     * Triggers the {@link Browser.eventMissingFeatures} hook if one or
     * more required browser features are unavailable. Call this method
     * after construction to notify the application of missing capabilities.
     *
     * @example
     * const browser = new Browser();
     * browser.detect();
     */
    detect() {
        if (!isEmpty(this.features)) {
            this.eventMissingFeatures(this.features);
        }
    }
    /**
     * Records a feature as missing if its value is falsy.
     *
     * @param {string} name The feature identifier (e.g. 'window.history').
     * @param {any} value The feature reference to test for truthiness.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _setFeature(name, value) {
        if (eq(!!value, false)) {
            this.features.push(name);
        }
    }
    /**
     * Called by {@link Browser.detect} when one or more required browser
     * features are missing. Override this method to display a warning to
     * the user or degrade functionality gracefully.
     *
     * @param {Array<any>} features List of missing feature identifiers.
     */
    eventMissingFeatures(features) {
        consoleDebug('Browser.eventMissingFeatures()', features);
    }
    /**
     * Populates the `browsers` map by inspecting CSS property support,
     * global objects, and the user-agent string.
     */
    _detectBrowsers() {
        this.browsers = {};
        const userAgent = window.navigator.userAgent.toLowerCase();
        this.browsers.webkit =
            'WebkitAppearance' in document.documentElement.style;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.browsers.chromium = !!window['chrome'];
        this.browsers.chrome =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !!window['chrome'] &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                !!window['chrome']['webstore'];
        this.browsers.opera =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            !!window['opera'] ||
                /opera|opr/i.test(navigator.userAgent);
        this.browsers.firefox =
            'MozAppearance' in document.documentElement.style;
        this.browsers.safari = /constructor/i.test(window.HTMLElement.name);
        this.browsers.IE10 =
            'behavior' in document.documentElement.style &&
                '-ms-user-select' in document.documentElement.style;
        this.browsers.lteIE10 = /*@cc_on!@*/ false;
        this.browsers.gteIE10 =
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            document.body.style['msTouchAction'] !== undefined;
        this.browsers.IE11 =
            '-ms-scroll-limit' in document.documentElement.style &&
                '-ms-ime-align' in document.documentElement.style;
        this.browsers.edge = userAgent.includes('edge');
        this.browsers.chromiumEdge =
            !userAgent.includes('edge') && userAgent.includes('edg');
    }
    /**
     * Detects the operating system from the navigator platform string and
     * user-agent. Sets `this.os` to one of 'macOS', 'iOS', 'Windows',
     * 'Android', 'Linux', or `null` if unrecognized.
     */
    _detectOS() {
        this.os = null;
        const userAgent = window.navigator.userAgent;
        const platform = window.navigator.platform;
        const macosPlatforms = [
            'Macintosh',
            'MacIntel',
            'MacPPC',
            'Mac68K',
            'darwin',
        ];
        const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
        const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
        if (macosPlatforms.includes(platform)) {
            this.os = 'macOS';
        }
        else if (iosPlatforms.includes(platform)) {
            this.os = 'iOS';
        }
        else if (windowsPlatforms.includes(platform)) {
            this.os = 'Windows';
        }
        else if (/Android/.test(userAgent)) {
            this.os = 'Android';
        }
        else if (/Linux/.test(platform)) {
            this.os = 'Linux';
        }
    }
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
    isMacOS() {
        return this.os === 'macOS';
    }
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
    isIOS() {
        return this.os === 'iOS';
    }
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
    isWindows() {
        return this.os === 'Windows';
    }
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
    isAndroid() {
        return this.os === 'Android';
    }
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
    isLinux() {
        return this.os === 'Linux';
    }
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
    isInternetExplorer(opt_version) {
        var _a, _b, _c, _d, _e;
        let result = ((_a = this.browsers.lteIE10) !== null && _a !== void 0 ? _a : false) ||
            ((_b = this.browsers.gteIE10) !== null && _b !== void 0 ? _b : false);
        if (opt_version) {
            switch (opt_version) {
                case 11:
                    result = (_c = this.browsers.IE11) !== null && _c !== void 0 ? _c : false;
                    break;
                case 10:
                    result = (_d = this.browsers.IE10) !== null && _d !== void 0 ? _d : false;
                    break;
                default:
                    result = (_e = this.browsers.lteIE10) !== null && _e !== void 0 ? _e : false;
                    break;
            }
        }
        return result;
    }
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
    isEdge() {
        var _a;
        return (_a = this.browsers.edge) !== null && _a !== void 0 ? _a : false;
    }
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
    isChromiumEdge() {
        var _a;
        return (_a = this.browsers.chromiumEdge) !== null && _a !== void 0 ? _a : false;
    }
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
    isFirefox() {
        var _a;
        return (_a = this.browsers.firefox) !== null && _a !== void 0 ? _a : false;
    }
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
    isChrome() {
        var _a;
        return (_a = this.browsers.chrome) !== null && _a !== void 0 ? _a : false;
    }
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
    isOpera() {
        var _a;
        return (_a = this.browsers.opera) !== null && _a !== void 0 ? _a : false;
    }
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
    isSafari() {
        var _a;
        return (_a = this.browsers.safari) !== null && _a !== void 0 ? _a : false;
    }
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
    isWebkit() {
        var _a;
        return (_a = this.browsers.webkit) !== null && _a !== void 0 ? _a : false;
    }
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
    isChromium() {
        var _a;
        return (_a = this.browsers.chromium) !== null && _a !== void 0 ? _a : false;
    }
}
