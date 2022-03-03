/**
 * @class
 * @export
 */
export declare class Application {
    options: any;
    types: {};
    _injections: any;
    _instances: {};
    _module: any;
    _routes: any[];
    _routeOptions: any;
    /**
     * @param {!Object} options
     * @param {!Object} resources
     */
    constructor(options: any, resources: any);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: any): void;
    /**
     * @private
     * @param {!Object} resources
     * @return {undefined}
     */
    _init(resources: any): void;
    /**
     * @return {string}
     */
    getLanguage(): any;
    /**
     * @return {string}
     */
    getLocale(): any;
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocale(locale: any): void;
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocaleWithReload(locale: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _initLocale(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initCertificate(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initModule(): void;
    /**
     * @private
     * @return {undefined}
     */
    _loadModules(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initScript(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStyle(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initConfig(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initApp(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initGeoLocation(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initCookie(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initLoader(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initProgressBar(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initStorage(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHelper(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initDocument(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initWindow(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initEvent(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initScheduler(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHttp(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initTemplate(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initFlash(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initDialog(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initConfirm(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initViewer(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initHeader(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initTopMenu(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initNavBar(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initBottomMenu(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initSidebar(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initLeftMenu(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initFooter(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initBrowser(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initServiceWorker(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initActionCable(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initRoutes(): void;
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    addState(id: any, title: any, url: any, controller: any, opt_template?: string, opt_params?: {}): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id: any, opt_params: any): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setHomeState(id: any, opt_params: any): void;
    /**
     * @param {string} name
     * @return {?Object}
     */
    getInstance(name: any): any;
    /**
     * @return {?Object}
     */
    getController(): any;
    /**
     * @export
     * @return {undefined}
     */
    run(): void;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     */
    controller(name: any, moduleInjections: any, moduleCallback: any): void;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     */
    service(name: any, moduleInjections: any, moduleCallback: any): void;
}
