import { noop, each, isFunction, isObject } from '../utils/operation';
import { consoleError, consoleWarn } from '../utils/log';
import { Async } from './async';
import { Deferred } from './deferred';
import { State } from './state';
/**
 * @class
 */
export class Module {
    /**
     */
    constructor() {
        this._modules = {};
        this._instances = {};
        this._injections = {};
        this._dependencies = [];
        this._controller = {
            enter: noop(),
            exit: noop(),
        };
    }
    /**
     * @param {!Instance} instances
     * @param {!Injection} injections
     * @return {undefined}
     */
    load(instances, injections) {
        this._instances = instances;
        this._injections = injections;
    }
    /**
     * @return {!Object}
     */
    getController() {
        return this._controller;
    }
    /**
     * @param {string} name
     * @param {!Array<string>} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(name, moduleInjections, moduleCallback) {
        this._modules[name] = {
            moduleInjections,
            moduleCallback,
        };
        return name;
    }
    /**
     * @private
     * @param {!Dependency} dependency
     * @return {!Object}
     */
    _resolveDependencies(dependency) {
        const moduleArgs = [];
        each(dependency.moduleInjections, (injection) => {
            moduleArgs.push(this._instances[injection] || injection);
        });
        return new dependency.moduleCallback(...moduleArgs);
    }
    /**
     * @private
     * @param {Array<string>} services
     * @return {Array<string>}
     */
    _getSortedServices(services) {
        const edges = services.map((service) => {
            const moduleInjections = this._modules[service].moduleInjections;
            if (moduleInjections.length === 0) {
                moduleInjections.push(null);
            }
            return moduleInjections.map((injection) => [injection, service]);
        }).flat();
        return this._topologicalSort(edges).slice(1);
    }
    /**
     *
     * @param {Array<Array<string>>} edges
     * @return {Array<string>}
     */
    _topologicalSort(edges) {
        const nodes = {};
        const sorted = [];
        const visited = {};
        edges.forEach((v) => {
            const from = v[0];
            const to = v[1];
            if (!nodes[from])
                nodes[from] = { id: from, afters: [] };
            if (!nodes[to])
                nodes[to] = { id: to, afters: [] };
            nodes[from].afters.push(to);
        });
        const visit = (strId, ancestors) => {
            const node = nodes[strId];
            const id = node.id;
            if (visited[strId]) {
                // if already exists, do nothing
                return;
            }
            if (!Array.isArray(ancestors)) {
                ancestors = [];
            }
            ancestors.push(id);
            visited[strId] = true;
            node.afters.forEach((afterId) => {
                if (ancestors.includes(afterId)) {
                    // if already in ancestors, a closed chain exists.
                    consoleError('Modules._topologicalSort()', 'Dependency injection circular loop', afterId, '<=>', id);
                }
                visit(afterId, ancestors);
            });
            sorted.unshift(id);
        };
        Object.keys(nodes).forEach((key) => visit(key));
        return sorted;
    }
    /**
     * @param {Array<string>} services
     * @return {undefined}
     */
    handleServices(services) {
        const sortedServices = this._getSortedServices(services);
        const calls = [];
        each(sortedServices, (serviceName) => {
            const moduleCall = () => {
                this._instances[serviceName] = this._resolveDependencies(this._modules[serviceName]);
                if (isFunction(this._instances[serviceName].enter)) {
                    return this._instances[serviceName].enter();
                }
                return noop();
            };
            calls.push(moduleCall);
        });
        this.eventAfterInit();
        const async = new Async();
        async.serial(calls).then(() => {
            this.eventServiceLoaded();
            this._instances[this._injections.state].run();
        }, () => {
            this.eventServiceFailed();
        });
    }
    /**
     * @param {!Array<Route>} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes, options) {
        this._instances[this._injections.state] = new State(routes, options);
        this._instances[this._injections.state].eventChange = (currentState, previousState, force) => {
            let exit = noop();
            if (!previousState.isEmpty() &&
                isObject(this._controller) &&
                isFunction(this._controller.exit)) {
                exit = this._controller.exit;
            }
            const async = new Async();
            async.serial([exit]).then(() => {
                this._handleStateChange(currentState, force);
            });
        };
    }
    /**
     * @param {!Objekt} currentState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _handleStateChange(currentState, opt_force = false) {
        this.eventStateChange(currentState).then(() => {
            const template = currentState.get('template');
            if (template) {
                const templateUrl = currentState.get('templateUrl');
                this._instances[this._injections.template]
                    .load(templateUrl, opt_force)
                    .then((dom) => {
                    this.eventModuleLoaded(currentState);
                    this._initController(currentState, dom);
                }, () => {
                    this.eventModuleFailed(currentState);
                });
            }
            else {
                this.eventModuleLoaded(currentState);
                this._initController(currentState, this._instances[this._injections.template].getViewNode());
            }
        }, () => {
            this.eventModuleFailed(currentState);
        });
    }
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {undefined}
     */
    _initController(state, dom) {
        this._instances[this._injections.dom] = dom;
        const controller = this._modules[state.get('controller')];
        if (controller) {
            this.eventDomChange(state, dom).then(() => {
                this._controller = this._resolveDependencies(controller);
                if (isObject(this._controller) &&
                    isFunction(this._controller.enter)) {
                    const async = new Async();
                    async.serial([this._controller.enter]).then(() => {
                        this.eventControllerLoaded(dom);
                    });
                }
                else {
                    this.eventControllerLoaded(dom);
                }
            });
        }
        else {
            this.eventControllerFailed();
        }
    }
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom) {
        consoleWarn('Module.eventControllerLoaded()', dom);
    }
    /**
     * @return {undefined}
     */
    eventControllerFailed() {
        consoleWarn('Module.eventControllerFailed()');
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state) {
        consoleWarn('Module.eventModuleFailed()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state) {
        consoleWarn('Module.eventModuleLoaded()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state) {
        const deferred = new Deferred();
        consoleWarn('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {!Promize}
     */
    eventDomChange(state, dom) {
        const deferred = new Deferred();
        consoleWarn('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @return {undefined}
     */
    eventAfterInit() {
        consoleWarn('Module.eventAfterInit()');
    }
    /**
     * @return {undefined}
     */
    eventServiceLoaded() {
        consoleWarn('Module.eventServiceLoaded()');
    }
    /**
     * @return {undefined}
     */
    eventServiceFailed() {
        consoleWarn('Module.eventServiceFailed()');
    }
}
