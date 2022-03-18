import { Collection } from './collection';
import { Objekt } from './objekt';
/**
 * @class
 */
export declare class State {
    _current: Objekt;
    _previous: Objekt;
    routes: Collection<Objekt>;
    basePath: string;
    options: Objekt;
    /**
     * @param {!Array} routes
     * @param {!Object} options
     */
    constructor(routes: Array<Object>, options: Object);
    /**
     * @private
     * @return {undefined}
     */
    _setRealUrls(): void;
    /**
     * @private
     * @return {string}
     */
    _getUrlPrefix(): string;
    /**
     * @private
     * @param {string} url
     * @return {string}
     */
    _getRealUrl(url: string): string;
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
    _setOptions(options: Object): void;
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
    _parsePath(urlPath: string, successCallback: Function, errorCallback: Function): void;
    /**
     * @private
     * @param {!Objekt} state
     * @param {string} url
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _setHistory(state: Objekt, url: string, opt_params?: Object | undefined, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @private
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _triggerChange(opt_force?: boolean | undefined): void;
    /**
     * @private
     * @param {!Objekt} state
     * @return {undefined}
     */
    _setCurrent(state: Objekt): void;
    /**
     * @template T
     * @param {string=} opt_attribute
     * @return {!T}
     */
    getCurrent<T>(opt_attribute?: string | undefined): T;
    /**
     * @template T
     * @param {string=} opt_attribute
     * @return {!T}
     */
    getPrevious<T>(opt_attribute?: string | undefined): T;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    go(id: string, opt_params?: Object | undefined, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @private
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {!Array}
     */
    _resolveUrlWithState(id: string, opt_params?: Object | undefined): Array<any>;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {string}
     */
    resolveUrl(id: string, opt_params?: Object | undefined): string;
    /**
     * @param {!Object} state
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goState(state: Object, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goHome(opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goRoot(opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @param {boolean=} opt_overwrite
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    goBack(id: string, opt_params: Object | undefined, opt_overwrite?: boolean | undefined, opt_force?: boolean | undefined): void;
    /**
     * @return {undefined}
     */
    back(): void;
    /**
     * @param {string} url
     * @param {boolean=} opt_inTab
     * @return {undefined}
     */
    redirect(url: string, opt_inTab?: boolean | undefined): void;
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
    eventChange(currentState: Objekt, previousState: Objekt, opt_force?: boolean | undefined): void;
    /**
     * @return {!Collection}
     */
    getRoutes(): Collection;
    /**
     * @param {!Object} properties
     * @return {undefined}
     */
    setParams(properties: Object): void;
    /**
     * @param {string} name
     * @param {*} value
     * @return {undefined}
     */
    setParam(name: string, value: any): void;
    /**
     * @return {!Objekt}
     */
    getParams(): Objekt;
    /**
     * @param {string} name
     * @param {*=} opt_defaultValue
     * @return {string}
     */
    getParam(name: string, opt_defaultValue?: any): string;
    /**
     * @return {undefined}
     */
    reload(): void;
    /**
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    refresh(opt_force?: boolean | undefined): void;
    /**
     * @return {!Array}
     */
    getRoot(): Array<any>;
    /**
     * @return {!Array}
     */
    getHome(): Array<any>;
}
