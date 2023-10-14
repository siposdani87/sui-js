import { Objekt } from './objekt';
import { Knot } from './knot';
import { Route } from '../component/route';
import { ClassRef, Injection, Instance } from '../utils';
/**
 * @class
 */
export declare class Module {
    private _instances;
    private _injections;
    private _modules;
    private _controller;
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
     * @param {Array<string>} services
     * @return {Array<string>}
     */
    private _getSortedServices;
    /**
     *
     * @param {Array<Array<string>>} edges
     * @return {Array<string>}
     */
    private _topologicalSort;
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
    private _handleStateChange;
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {undefined}
     */
    private _initController;
    /**
     * @param {!Knot} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom: Knot): void;
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
    eventStateChange(state: Objekt): import("./promize").Promize<Object, Object>;
    /**
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {!Promize}
     */
    eventDomChange(state: Objekt, dom: Knot): import("./promize").Promize<Object, Object>;
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
