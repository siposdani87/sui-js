/**
 * http://browserhacks.com/
 * @class
 */
export declare class Browser {
    features: any[];
    browsers: {
        [key: string]: any;
    };
    os: any;
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
    _setFeature(name: any, value: any): void;
    /**
     * @param {!Array} features
     * @return {undefined}
     */
    eventMissingFeatures(features: any): void;
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
    isInternetExplorer(opt_version: any): any;
    /**
     * @return {boolean}
     */
    isEdge(): any;
    /**
     * @return {boolean}
     */
    isChromiumEdge(): any;
    /**
     * @return {boolean}
     */
    isFirefox(): any;
    /**
     * @return {boolean}
     */
    isChrome(): any;
    /**
     * @return {boolean}
     */
    isOpera(): any;
    /**
     * @return {boolean}
     */
    isSafari(): any;
    /**
     * @return {boolean}
     */
    isWebkit(): any;
    /**
     * @return {boolean}
     */
    isChromium(): any;
}
