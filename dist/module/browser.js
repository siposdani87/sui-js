import { isEmpty, eq } from '../utils/operation';
import { consoleDebug } from '../utils/log';
export class Browser {
    constructor() {
        this._init();
    }
    _init() {
        this._detectOS();
        this._detectBrowsers();
        this._detectMissingFeatures();
    }
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
    detect() {
        if (!isEmpty(this.features)) {
            this.eventMissingFeatures(this.features);
        }
    }
    _setFeature(name, value) {
        if (eq(!!value, false)) {
            this.features.push(name);
        }
    }
    eventMissingFeatures(features) {
        consoleDebug('Browser.eventMissingFeatures()', features);
    }
    _detectBrowsers() {
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
        if (macosPlatforms.indexOf(platform) !== -1) {
            this.os = 'macOS';
        }
        else if (iosPlatforms.indexOf(platform) !== -1) {
            this.os = 'iOS';
        }
        else if (windowsPlatforms.indexOf(platform) !== -1) {
            this.os = 'Windows';
        }
        else if (/Android/.test(userAgent)) {
            this.os = 'Android';
        }
        else if (/Linux/.test(platform)) {
            this.os = 'Linux';
        }
    }
    isMacOS() {
        return this.os === 'macOS';
    }
    isIOS() {
        return this.os === 'iOS';
    }
    isWindows() {
        return this.os === 'Windows';
    }
    isAndroid() {
        return this.os === 'Android';
    }
    isLinux() {
        return this.os === 'Linux';
    }
    isInternetExplorer(opt_version) {
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
    isEdge() {
        return this.browsers.edge;
    }
    isChromiumEdge() {
        return this.browsers.chromiumEdge;
    }
    isFirefox() {
        return this.browsers.firefox;
    }
    isChrome() {
        return this.browsers.chrome;
    }
    isOpera() {
        return this.browsers.opera;
    }
    isSafari() {
        return this.browsers.safari;
    }
    isWebkit() {
        return this.browsers.webkit;
    }
    isChromium() {
        return this.browsers.chromium;
    }
}
