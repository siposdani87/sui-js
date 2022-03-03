/**
 * @class
 */
export declare class Module {
    _modules: {
        [key: string]: any;
    };
    _instances: {
        [key: string]: any;
    };
    _injections: {
        [key: string]: any;
    };
    _dependencies: any[];
    _services: any[];
    _controller: {
        enter: () => any;
        exit: () => any;
    };
    /**
     */
    constructor();
    /**
     * @param {!Object} instances
     * @param {!Object} injections
     * @return {undefined}
     */
    load(instances: any, injections: any): void;
    /**
     * @return {!Object}
     */
    getController(): {
        enter: () => any;
        exit: () => any;
    };
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(name: any, moduleInjections: any, moduleCallback: any): void;
    /**
     * @private
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @param {string=} opt_extendModule
     * @return {!Object}
     */
    _getDependencies(moduleInjections: any, moduleCallback: any, opt_extendModule?: any): {
        moduleInjections: any;
        moduleCallback: any;
        extendModule: any;
    };
    /**
     * @private
     * @param {!Object} dependency
     * @return {!Object}
     */
    _resolveDependencies(dependency: any): any;
    /**
     * @private
     * @return {undefined}
     */
    _orderServices(): void;
    /**
     * @private
     * @param {string} value
     * @return {boolean}
     */
    _isModule(value: any): boolean;
    /**
     * @private
     * @param {string} service
     * @param {string} injection
     * @return {undefined}
     */
    _changeServices(service: any, injection: any): void;
    /**
     * @return {undefined}
     */
    handleServices(): void;
    /**
     * @param {!Array} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes: any, options: any): void;
    /**
     * @param {!Objekt} currentState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _handleStateChange(currentState: any, opt_force?: boolean): void;
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {undefined}
     */
    _initController(state: any, dom: any): void;
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom: any): void;
    /**
     * @return {undefined}
     */
    eventControllerFailed(): void;
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state: any): void;
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state: any): void;
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state: any): import("./promize").Promize;
    /**
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {!Promize}
     */
    eventDomChange(state: any, dom: any): import("./promize").Promize;
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
