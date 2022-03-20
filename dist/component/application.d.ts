import { Module } from '../core/module';
import { Objekt } from '../core/objekt';
/**
 * @class
 * @export
 */
export declare class Application {
    options: Objekt;
    _injections: any;
    _instances: {
        [key: string]: any;
    };
    _module: Module;
    _routes: Objekt[];
    _routeOptions: Objekt;
    /**
     * @param {!Object} options
     * @param {!Object} resources
     */
    constructor(options: Object, resources: Object);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @param {!Object} resources
     * @return {undefined}
     */
    private _init;
    /**
     * @return {string}
     */
    getLanguage(): string;
    /**
     * @return {string}
     */
    getLocale(): string;
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocale(locale: string): void;
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocaleWithReload(locale: string): void;
    /**
     * @private
     * @return {undefined}
     */
    private _initLocale;
    /**
     * @private
     * @return {undefined}
     */
    private _initCertificate;
    /**
     * @private
     * @return {undefined}
     */
    private _initModule;
    /**
     * @private
     * @return {undefined}
     */
    private _loadModules;
    /**
     * @private
     * @return {undefined}
     */
    private _initScript;
    /**
     * @private
     * @return {undefined}
     */
    private _initStyle;
    /**
     * @private
     * @return {undefined}
     */
    private _initConfig;
    /**
     * @private
     * @return {undefined}
     */
    private _initApp;
    /**
     * @private
     * @return {undefined}
     */
    private _initGeoLocation;
    /**
     * @private
     * @return {undefined}
     */
    private _initCookie;
    /**
     * @private
     * @return {undefined}
     */
    private _initLoader;
    /**
     * @private
     * @return {undefined}
     */
    private _initProgressBar;
    /**
     * @private
     * @return {undefined}
     */
    private _initStorage;
    /**
     * @private
     * @return {undefined}
     */
    private _initHelper;
    /**
     * @private
     * @return {undefined}
     */
    private _initDocument;
    /**
     * @private
     * @return {undefined}
     */
    private _initWindow;
    /**
     * @private
     * @return {undefined}
     */
    private _initEvent;
    /**
     * @private
     * @return {undefined}
     */
    private _initScheduler;
    /**
     * @private
     * @return {undefined}
     */
    private _initHttp;
    /**
     * @private
     * @return {undefined}
     */
    private _initTemplate;
    /**
     * @private
     * @return {undefined}
     */
    private _initFlash;
    /**
     * @private
     * @return {undefined}
     */
    private _initDialog;
    /**
     * @private
     * @return {undefined}
     */
    private _initConfirm;
    /**
     * @private
     * @return {undefined}
     */
    private _initViewer;
    /**
     * @private
     * @return {undefined}
     */
    private _initHeader;
    /**
     * @private
     * @return {undefined}
     */
    private _initTopMenu;
    /**
     * @private
     * @return {undefined}
     */
    private _initNavBar;
    /**
     * @private
     * @return {undefined}
     */
    private _initBottomMenu;
    /**
     * @private
     * @return {undefined}
     */
    private _initSidebar;
    /**
     * @private
     * @return {undefined}
     */
    private _initLeftMenu;
    /**
     * @private
     * @return {undefined}
     */
    private _initFooter;
    /**
     * @private
     * @return {undefined}
     */
    private _initBrowser;
    /**
     * @private
     * @return {undefined}
     */
    private _initServiceWorker;
    /**
     * @private
     * @return {undefined}
     */
    private _initActionCable;
    /**
     * @private
     * @return {undefined}
     */
    private _initRoutes;
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    addState(id: string, title: string, url: string, controller: string, opt_template?: string | undefined, opt_params?: Object | undefined): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id: string, opt_params?: Object): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setHomeState(id: string, opt_params?: Object): void;
    /**
     * @param {string} name
     * @return {?Object}
     */
    getInstance(name: string): Object | null;
    /**
     * @return {?Object}
     */
    getController(): Object | null;
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
    controller(name: string, moduleInjections: Array<any>, moduleCallback: Function): void;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     */
    service(name: string, moduleInjections: Array<any>, moduleCallback: Function): void;
}
