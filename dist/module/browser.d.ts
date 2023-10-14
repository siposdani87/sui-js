export declare class Browser {
    features: string[];
    browsers: {
        [key: string]: boolean;
    };
    os: string;
    constructor();
    private _init;
    private _detectMissingFeatures;
    detect(): void;
    private _setFeature;
    eventMissingFeatures(features: Array<any>): void;
    private _detectBrowsers;
    private _detectOS;
    isMacOS(): boolean;
    isIOS(): boolean;
    isWindows(): boolean;
    isAndroid(): boolean;
    isLinux(): boolean;
    isInternetExplorer(opt_version: number | undefined): boolean;
    isEdge(): boolean;
    isChromiumEdge(): boolean;
    isFirefox(): boolean;
    isChrome(): boolean;
    isOpera(): boolean;
    isSafari(): boolean;
    isWebkit(): boolean;
    isChromium(): boolean;
}
