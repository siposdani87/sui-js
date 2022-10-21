import { Objekt } from '../core/objekt';
import { Route } from './route';
import { ClassRef, Injection } from '../utils';
/**
 * @class
 */
export declare class Application {
    options: Objekt;
    private _injections;
    private _instances;
    private _module;
    private _routeOptions;
    /**
     * @param {!Object} options
     * @param {!Injection} resources
     */
    constructor(options: Object, resources: Injection);
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions;
    /**
     * @private
     * @param {!Injection} resources
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
    private _initDepots;
    /**
     * @private
     * @return {undefined}
     */
    private _initHelper;
    /**
     * @private
     * @return {undefined}
     */
    private _initPage;
    /**
     * @private
     * @return {undefined}
     */
    private _initScreen;
    /**
     * @private
     * @return {undefined}
     */
    private _initEventBus;
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
    private _initRoutes;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id: string, opt_params?: Object): void;
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
     * @param {!Array<Route>} routes
     * @param {!Array<string>} services
     * @return {undefined}
     */
    run(routes: Route[], services: string[]): void;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!ClassRef} moduleCallback
     * @return {string}
     */
    controller(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!ClassRef} moduleCallback
     * @return {string}
     */
    service(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
}
