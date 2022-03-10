import { Collection } from './collection';
import { Objekt } from './objekt';
/**
 * @class
 */
export declare class State {
    _current: Objekt;
    _previous: any;
    routes: Collection<Objekt>;
    basePath: string;
    options: Objekt;
    /**
     * @param {!Array} routes
     * @param {!Object} options
     */
    constructor(routes: any, options: any);
    /**
     * @private
     * @return {undefined}
     */
    _setRealUrls(): void;
    /**
     * @private
     * @return {string}
     */
    _getUrlPrefix(): "" | "/#";
    /**
     * @private
     * @param {string} url
     * @return {string}
     */
    _getRealUrl(url: any): string;
    /**
     * @private
     * @return {undefined}
     */
    _setBasePath(): void;
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: any): void;
    /**
     * @private
     * @return {undefined}
     */
    _init(): void;
    /**
     * @private
     * @return {undefined}
     */
    _initPopstate(): void;
    /**
     * @return {undefined}
     */
    run(): void;
    /**
     * @private
     * @return {undefined}
     */
    _parseUrl(): void;
    /**
     * @private
     * @param {string} urlPath
     * @param {!Function} successCallback
     * @param {!Function} errorCallback
     * @return {undefined}
     */
    _parsePath(urlPath: any, successCallback: any, errorCallback: any): void;
    /**
     * @private
     * @param {!Objekt} state
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _setHistory(state: any, url: any, opt_params?: {}, opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @private
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _triggerChange(opt_force?: boolean): void;
    /**
     * @private
     * @param {!Objekt} state
     * @return {undefined}
     */
    _setCurrent(state: any): void;
    /**
     * @param {string=} opt_attribute
     * @return {!Objekt|string}
     */
    getCurrent<T>(opt_attribute?: any): T;
    /**
     * @param {string=} opt_attribute
     * @return {!Objekt|string}
     */
    getPrevious(opt_attribute?: any): any;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    go(id: any, opt_params?: any, opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @private
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {!Array}
     */
    _resolveUrlWithState(id: any, opt_params?: any): (string | Objekt)[];
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {string}
     */
    resolveUrl(id: any, opt_params?: any): string;
    /**
     * @param {!Object} state
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goState(state: any, opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goHome(opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goRoot(opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goBack(id: any, opt_params: any, opt_overwrite?: boolean, opt_force?: boolean): void;
    /**
     * @return {undefined}
     */
    back(): void;
    /**
     * @param {string} url
     * @param {boolean=} opt_inTab
     * @return {undefined}
     */
    redirect(url: any, opt_inTab?: boolean): void;
    /**
     * @return {undefined}
     */
    forward(): void;
    /**
     * @param {!Objekt} currentState
     * @param {!Objekt} previousState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    eventChange(currentState: any, previousState: any, opt_force?: boolean): void;
    /**
     * @return {!Collection}
     */
    getRoutes(): Collection<Objekt>;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setParams(properties: any): void;
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setParam(name: any, value: any): void;
    /**
     * @return {!Objekt}
     */
    getParams(): Objekt;
    /**
     * @param {string} name
     * @param {*=} opt_defaultValue
     * @return {string}
     */
    getParam(name: any, opt_defaultValue: any): string;
    /**
     * @return {undefined}
     */
    reload(): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    refresh(opt_force?: boolean): void;
    /**
     * @return {!Array}
     */
    getRoot(): any[];
    /**
     * @return {!Array}
     */
    getHome(): any[];
}
