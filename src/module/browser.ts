import { isEmpty, eq } from '../utils/operation';
import { consoleDebug } from '../utils/log';

export class Browser {
    features!: string[];
    browsers!: {
        [key: string]: boolean;
    };
    os!: string | null;

    constructor() {
        this._init();
    }

    private _init(): void {
        this._detectOS();
        this._detectBrowsers();
        this._detectMissingFeatures();
    }

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

    detect(): void {
        if (!isEmpty(this.features)) {
            this.eventMissingFeatures(this.features);
        }
    }

    private _setFeature(name: string, value: any): void {
        if (eq(!!value, false)) {
            this.features.push(name);
        }
    }

    eventMissingFeatures(features: Array<any>): void {
        consoleDebug('Browser.eventMissingFeatures()', features);
    }

    private _detectBrowsers(): void {
        this.browsers = {};

        const userAgent = window.navigator.userAgent.toLowerCase();

        this.browsers.webkit =
            'WebkitAppearance' in document.documentElement.style;
        this.browsers.chromium = !!(window as Record<string, any>)['chrome'];
        this.browsers.chrome =
            !!(window as Record<string, any>)['chrome'] && !!(window as Record<string, any>)['chrome']['webstore'];

        this.browsers.opera =
            !!(window as Record<string, any>)['opera'] || /opera|opr/i.test(navigator.userAgent);

        this.browsers.firefox =
            'MozAppearance' in document.documentElement.style;

        this.browsers.safari = /constructor/i.test(window.HTMLElement.name);

        this.browsers.IE10 =
            'behavior' in document.documentElement.style &&
            '-ms-user-select' in document.documentElement.style;
        this.browsers.lteIE10 = /*@cc_on!@*/ false;
        this.browsers.gteIE10 =
            (document.body.style as unknown as Record<string, any>)['msTouchAction'] !== undefined;
        this.browsers.IE11 =
            '-ms-scroll-limit' in document.documentElement.style &&
            '-ms-ime-align' in document.documentElement.style;
        this.browsers.edge = userAgent.indexOf('edge') !== -1;
        this.browsers.chromiumEdge =
            userAgent.indexOf('edge') === -1 && userAgent.indexOf('edg') !== -1;
    }

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

    isMacOS(): boolean {
        return this.os === 'macOS';
    }

    isIOS(): boolean {
        return this.os === 'iOS';
    }

    isWindows(): boolean {
        return this.os === 'Windows';
    }

    isAndroid(): boolean {
        return this.os === 'Android';
    }

    isLinux(): boolean {
        return this.os === 'Linux';
    }

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

    isEdge(): boolean {
        return this.browsers.edge;
    }

    isChromiumEdge(): boolean {
        return this.browsers.chromiumEdge;
    }

    isFirefox(): boolean {
        return this.browsers.firefox;
    }

    isChrome(): boolean {
        return this.browsers.chrome;
    }

    isOpera(): boolean {
        return this.browsers.opera;
    }

    isSafari(): boolean {
        return this.browsers.safari;
    }

    isWebkit(): boolean {
        return this.browsers.webkit;
    }

    isChromium(): boolean {
        return this.browsers.chromium;
    }
}
