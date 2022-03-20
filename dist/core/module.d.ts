import { Promize } from './promize';
import { Objekt } from './objekt';
import { Item } from './item';
/**
 * @typedef {{moduleInjections: Array, moduleCallback: !Function, opt_extendModule: Object=}} Dependency
 */
declare type Dependency = {
    moduleInjections: any[];
    moduleCallback: Function;
    opt_extendModule?: any;
};
/**
 * @class
 */
export declare class Module {
    _modules: {
        [key: string]: Dependency;
    };
    _instances: {
        [key: string]: any;
    };
    _injections: {
        [key: string]: any;
    };
    _dependencies: any[];
    _services: any[];
    _controller: any;
    /**
     */
    constructor();
    /**
     * @param {!Object} instances
     * @param {!Object} injections
     * @return {undefined}
     */
    load(instances: Object, injections: Object): void;
    /**
     * @return {!Object}
     */
    getController(): Object;
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(name: string, moduleInjections: Array<any>, moduleCallback: Function): void;
    /**
     * @private
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @param {string=} opt_extendModule
     * @return {!Object}
     */
    _getDependencies(moduleInjections: Array<any>, moduleCallback: Function, opt_extendModule?: string | undefined): Dependency;
    /**
     * @private
     * @param {!Dependency} dependency
     * @return {!Object}
     */
    private _resolveDependencies;
    /**
     * @private
     * @return {undefined}
     */
    private _orderServices;
    /**
     * @private
     * @param {string} value
     * @return {boolean}
     */
    private _isModule;
    /**
     * @private
     * @param {string} service
     * @param {string} injection
     * @return {undefined}
     */
    private _changeServices;
    /**
     * @return {undefined}
     */
    handleServices(): void;
    /**
     * @param {!Array} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes: Array<any>, options: Object): void;
    /**
     * @param {!Objekt} currentState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _handleStateChange(currentState: Objekt, opt_force?: boolean | undefined): void;
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {undefined}
     */
    private _initController;
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom: Item): void;
    /**
     * @return {undefined}
     */
    eventControllerFailed(): void;
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state: Objekt): void;
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state: Objekt): void;
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state: Objekt): Promize;
    /**
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {!Promize}
     */
    eventDomChange(state: Objekt, dom: Item): Promize;
    /**
     * @return {undefined}
     */
    eventAfterInit(): void;
    /**
     * @return {undefined}
     */
    eventServiceLoaded(): void;
    /**
     * @return {undefined}
     */
    eventServiceFailed(): void;
}
export {};
