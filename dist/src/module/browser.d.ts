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
    private _init;
    /**
     * @private
     * @return {undefined}
     */
    private _detectMissingFeatures;
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
    private _setFeature;
    /**
     * @param {!Array} features
     * @return {undefined}
     */
    eventMissingFeatures(features: Array<any>): void;
    /**
     * @private
     * @return {undefined}
     */
    private _detectBrowsers;
    /**
     * @private
     * @return {undefined}
     */
    private _detectOS;
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
