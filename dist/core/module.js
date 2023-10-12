import { noop, each, isFunction } from '../utils/operation';
import { consoleError, consoleDebug } from '../utils/log';
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
        const edges = services
            .map((service) => {
            const moduleInjections = this._modules[service].moduleInjections.filter((moduleInjection) => services.includes(moduleInjection));
            if (moduleInjections.length === 0) {
                moduleInjections.push(null);
            }
            return moduleInjections.map((injection) => [
                injection,
                service,
            ]);
        })
            .flat();
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
            this._instances.state.run();
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
        this._instances.state = new State(routes, options);
        this._instances.state.eventChange = (currentState, previousState, force) => {
            let exit = noop();
            if (!previousState.isEmpty() &&
                this._controller &&
                isFunction(this._controller.exit)) {
                exit = this._controller.exit.bind(this._controller);
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
                this._instances.template.load(templateUrl, opt_force).then((dom) => {
                    this.eventModuleLoaded(currentState);
                    this._initController(currentState, dom);
                }, () => {
                    this.eventModuleFailed(currentState);
                });
            }
            else {
                this.eventModuleLoaded(currentState);
                this._initController(currentState, this._instances[this._injections.template].getViewKnot());
            }
        }, () => {
            this.eventModuleFailed(currentState);
        });
    }
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {undefined}
     */
    _initController(state, dom) {
        this._instances.dom = dom;
        const controller = this._modules[state.get('controller')];
        if (controller) {
            this.eventDomChange(state, dom).then(() => {
                this._controller = this._resolveDependencies(controller);
                if (this._controller && isFunction(this._controller.enter)) {
                    const enter = this._controller.enter.bind(this._controller);
                    const async = new Async();
                    async.serial([enter]).then(() => {
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
     * @param {!Knot} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom) {
        consoleDebug('Module.eventControllerLoaded()', dom);
    }
    /**
     * @return {undefined}
     */
    eventControllerFailed() {
        consoleDebug('Module.eventControllerFailed()');
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state) {
        consoleDebug('Module.eventModuleFailed()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state) {
        consoleDebug('Module.eventModuleLoaded()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state) {
        const deferred = new Deferred();
        consoleDebug('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {!Promize}
     */
    eventDomChange(state, dom) {
        const deferred = new Deferred();
        consoleDebug('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @return {undefined}
     */
    eventAfterInit() {
        consoleDebug('Module.eventAfterInit()');
    }
    /**
     * @return {undefined}
     */
    eventServiceLoaded() {
        consoleDebug('Module.eventServiceLoaded()');
    }
    /**
     * @return {undefined}
     */
    eventServiceFailed() {
        consoleDebug('Module.eventServiceFailed()');
    }
}
