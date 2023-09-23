import { isEmpty, eq } from '../utils/operation';
import { consoleDebug } from '../utils/log';

/**
 * http://browserhacks.com/
 * @class
 */
export class Browser {
    features: string[];
    browsers: {
        [key: string]: boolean;
    };
    os: string;
    /**
     */
    constructor() {
        this._init();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _init(): void {
        this._detectOS();
        this._detectBrowsers();
        this._detectMissingFeatures();
    }
    /**
     * @private
     * @return {undefined}
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
     * @return {undefined}
     */
    detect(): void {
        if (!isEmpty(this.features)) {
            this.eventMissingFeatures(this.features);
        }
    }
    /**
     * @private
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    private _setFeature(name: string, value: any): void {
        if (eq(!!value, false)) {
            this.features.push(name);
        }
    }
    /**
     * @param {!Array} features
     * @return {undefined}
     */
    eventMissingFeatures(features: Array<any>): void {
        consoleDebug('Browser.eventMissingFeatures()', features);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _detectBrowsers(): void {
        this.browsers = {};

        const userAgent = window.navigator.userAgent.toLowerCase();

        this.browsers.webkit =
            'WebkitAppearance' in document.documentElement.style;
        this.browsers.chromium = !!window['chrome'];
        this.browsers.chrome =
            !!window['chrome'] && !!window['chrome']['webstore'];

        this.browsers.opera =
            !!window['opera'] || /opera|opr/i.test(navigator.userAgent);

        this.browsers.firefox =
            'MozAppearance' in document.documentElement.style;

        this.browsers.safari = /constructor/i.test(window.HTMLElement.name);

        this.browsers.IE10 =
            'behavior' in document.documentElement.style &&
            '-ms-user-select' in document.documentElement.style;
        this.browsers.lteIE10 = /*@cc_on!@*/ false;
        this.browsers.gteIE10 =
            document.body.style['msTouchAction'] !== undefined;
        this.browsers.IE11 =
            '-ms-scroll-limit' in document.documentElement.style &&
            '-ms-ime-align' in document.documentElement.style;
        this.browsers.edge = userAgent.indexOf('edge') !== -1;
        this.browsers.chromiumEdge =
            userAgent.indexOf('edge') === -1 && userAgent.indexOf('edg') !== -1;
    }
    /**
     * @private
     * @return {undefined}
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
     * @return {boolean}
     */
    isMacOS(): boolean {
        return this.os === 'macOS';
    }
    /**
     * @return {boolean}
     */
    isIOS(): boolean {
        return this.os === 'iOS';
    }
    /**
     * @return {boolean}
     */
    isWindows(): boolean {
        return this.os === 'Windows';
    }
    /**
     * @return {boolean}
     */
    isAndroid(): boolean {
        return this.os === 'Android';
    }
    /**
     * @return {boolean}
     */
    isLinux(): boolean {
        return this.os === 'Linux';
    }
    /**
     * @param {number=} opt_version
     * @return {boolean}
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
     * @return {boolean}
     */
    isEdge(): boolean {
        return this.browsers.edge;
    }
    /**
     * @return {boolean}
     */
    isChromiumEdge(): boolean {
        return this.browsers.chromiumEdge;
    }
    /**
     * @return {boolean}
     */
    isFirefox(): boolean {
        return this.browsers.firefox;
    }
    /**
     * @return {boolean}
     */
    isChrome(): boolean {
        return this.browsers.chrome;
    }
    /**
     * @return {boolean}
     */
    isOpera(): boolean {
        return this.browsers.opera;
    }
    /**
     * @return {boolean}
     */
    isSafari(): boolean {
        return this.browsers.safari;
    }
    /**
     * @return {boolean}
     */
    isWebkit(): boolean {
        return this.browsers.webkit;
    }
    /**
     * @return {boolean}
     */
    isChromium(): boolean {
        return this.browsers.chromium;
    }
}
