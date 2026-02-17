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
    features!: string[];
    browsers!: {
        [key: string]: boolean;
    };
    os!: string | null;

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
    private _init(): void {
        this._detectOS();
        this._detectBrowsers();
        this._detectMissingFeatures();
    }

    /**
     * Checks for the availability of required browser features and
     * populates the `features` array with the names of any that are
     * missing.
     */
    private _detectMissingFeatures(): void {
        this.features = [];

        this._setFeature(
            'navigator.geolocation',
            navigator && navigator.geolocation,
        );
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
    detect(): void {
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
    private _setFeature(name: string, value: any): void {
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
    eventMissingFeatures(features: Array<any>): void {
        consoleDebug('Browser.eventMissingFeatures()', features);
    }

    /**
     * Populates the `browsers` map by inspecting CSS property support,
     * global objects, and the user-agent string.
     */
    private _detectBrowsers(): void {
        this.browsers = {};

        const userAgent = window.navigator.userAgent.toLowerCase();

        this.browsers.webkit =
            'WebkitAppearance' in document.documentElement.style;
        this.browsers.chromium = !!(window as Record<string, any>)['chrome'];
        this.browsers.chrome =
            !!(window as Record<string, any>)['chrome'] &&
            !!(window as Record<string, any>)['chrome']['webstore'];

        this.browsers.opera =
            !!(window as Record<string, any>)['opera'] ||
            /opera|opr/i.test(navigator.userAgent);

        this.browsers.firefox =
            'MozAppearance' in document.documentElement.style;

        this.browsers.safari = /constructor/i.test(window.HTMLElement.name);

        this.browsers.IE10 =
            'behavior' in document.documentElement.style &&
            '-ms-user-select' in document.documentElement.style;
        this.browsers.lteIE10 = /*@cc_on!@*/ false;
        this.browsers.gteIE10 =
            (document.body.style as unknown as Record<string, any>)[
                'msTouchAction'
            ] !== undefined;
        this.browsers.IE11 =
            '-ms-scroll-limit' in document.documentElement.style &&
            '-ms-ime-align' in document.documentElement.style;
        this.browsers.edge = userAgent.indexOf('edge') !== -1;
        this.browsers.chromiumEdge =
            userAgent.indexOf('edge') === -1 && userAgent.indexOf('edg') !== -1;
    }

    /**
     * Detects the operating system from the navigator platform string and
     * user-agent. Sets `this.os` to one of 'macOS', 'iOS', 'Windows',
     * 'Android', 'Linux', or `null` if unrecognized.
     */
    private _detectOS(): void {
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

        if (macosPlatforms.indexOf(platform) !== -1) {
            this.os = 'macOS';
        } else if (iosPlatforms.indexOf(platform) !== -1) {
            this.os = 'iOS';
        } else if (windowsPlatforms.indexOf(platform) !== -1) {
            this.os = 'Windows';
        } else if (/Android/.test(userAgent)) {
            this.os = 'Android';
        } else if (/Linux/.test(platform)) {
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
    isMacOS(): boolean {
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
    isIOS(): boolean {
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
    isWindows(): boolean {
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
    isAndroid(): boolean {
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
    isLinux(): boolean {
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
    isInternetExplorer(opt_version: number | undefined): boolean {
        let result = this.browsers.lteIE10 || this.browsers.gteIE10;
        if (opt_version) {
            switch (opt_version) {
                case 11:
                    result = this.browsers.IE11;
                    break;
                case 10:
                    result = this.browsers.IE10;
                    break;
                default:
                    result = this.browsers.lteIE10;
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
    isEdge(): boolean {
        return this.browsers.edge;
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
    isChromiumEdge(): boolean {
        return this.browsers.chromiumEdge;
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
    isFirefox(): boolean {
        return this.browsers.firefox;
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
    isChrome(): boolean {
        return this.browsers.chrome;
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
    isOpera(): boolean {
        return this.browsers.opera;
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
    isSafari(): boolean {
        return this.browsers.safari;
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
    isWebkit(): boolean {
        return this.browsers.webkit;
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
    isChromium(): boolean {
        return this.browsers.chromium;
    }
}
