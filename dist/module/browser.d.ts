/**
 * http://browserhacks.com/
 * @class
 */
export declare class Browser {
    features: string[];
    browsers: {
        [key: string]: boolean;
    };
    os: string;
    /**
     */
    constructor();
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _detectMissingFeatures(): void;
    /**
     * @return {undefined}
     */
    detect(): void;
    /**
     * @private
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    _setFeature(name: string, value: any): void;
    /**
     * @param {!Array} features
     * @return {undefined}
     */
    eventMissingFeatures(features: Array<any>): void;
    /**
     * @private
     * @return {undefined}
     */
    _detectBrowsers(): void;
    /**
     * @private
     * @return {undefined}
     */
    _detectOS(): void;
    /**
     * @return {boolean}
     */
    isMacOS(): boolean;
    /**
     * @return {boolean}
     */
    isIOS(): boolean;
    /**
     * @return {boolean}
     */
    isWindows(): boolean;
    /**
     * @return {boolean}
     */
    isAndroid(): boolean;
    /**
     * @return {boolean}
     */
    isLinux(): boolean;
    /**
     * @param {number=} opt_version
     * @return {boolean}
     */
    isInternetExplorer(opt_version: number | undefined): boolean;
    /**
     * @return {boolean}
     */
    isEdge(): boolean;
    /**
     * @return {boolean}
     */
    isChromiumEdge(): boolean;
    /**
     * @return {boolean}
     */
    isFirefox(): boolean;
    /**
     * @return {boolean}
     */
    isChrome(): boolean;
    /**
     * @return {boolean}
     */
    isOpera(): boolean;
    /**
     * @return {boolean}
     */
    isSafari(): boolean;
    /**
     * @return {boolean}
     */
    isWebkit(): boolean;
    /**
     * @return {boolean}
     */
    isChromium(): boolean;
}
