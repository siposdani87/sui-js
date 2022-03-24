import { Promize } from './promize';
import { Objekt } from './objekt';
import { Item } from './item';
import { Route } from '../component/route';
import { ClassRef, Dependency, Injection, Instance } from '../utils';
/**
 * @class
 */
export declare class Module {
    _modules: {
        [key: string]: Dependency;
    };
    _instances: Instance;
    _injections: Injection;
    _dependencies: string[];
    _services: string[];
    _controller: any;
    /**
     */
    constructor();
    /**
     * @param {!Instance} instances
     * @param {!Injection} injections
     * @return {undefined}
     */
    load(instances: Instance, injections: Injection): void;
    /**
     * @return {!Object}
     */
    getController(): Object;
    /**
     * @param {string} name
     * @param {!Array<string>} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
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
     * @param {Array<string>} services
     * @return {undefined}
     */
    handleServices(services: string[]): void;
    /**
     * @param {!Array<Route>} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes: Route[], options: Object): void;
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
