import { noop, each, isFunction } from '../utils/operation';
import { consoleWarn } from '../utils/log';
import { Async } from './async';
import { Deferred } from './deferred';
import { State } from './state';
import { Promize } from './promize';
import { Objekt } from './objekt';
import { Knot } from './knot';
import { Route } from '../component/route';
import { ClassRef, Dependency, Injection, Instance } from '../utils';

/**
 * @class
 */
export class Module {
    _instances: Instance;
    _injections: Injection;

    _modules: {
        [key: string]: Dependency;
    };
    _controller: any;
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
    load(instances: Instance, injections: Injection): void {
        this._instances = instances;
        this._injections = injections;
    }
    /**
     * @return {!Object}
     */
    getController(): Object {
        return this._controller;
    }
    /**
     * @param {string} name
     * @param {!Array<string>} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(
        name: string,
        moduleInjections: string[],
        moduleCallback: ClassRef,
    ): string {
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
    private _resolveDependencies(dependency: Dependency): Object {
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
    private _getSortedServices(services: string[]): string[] {
        const edges = services
            .map((service) => {
                const moduleInjections = this._modules[
                    service
                ].moduleInjections.filter((moduleInjection) =>
                    services.includes(moduleInjection),
                );
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
    private _topologicalSort(edges: string[][]): string[] {
        const nodes: {
            [key: string]: {
                id: string;
                afters: string[];
            };
        } = {};
        const sorted: string[] = [];
        const visited: { [key: string]: boolean } = {};

        edges.forEach((v) => {
            const from = v[0];
            const to = v[1];
            if (!nodes[from]) nodes[from] = { id: from, afters: [] };
            if (!nodes[to]) nodes[to] = { id: to, afters: [] };
            nodes[from].afters.push(to);
        });

        const visit = (strId: string, ancestors?: string[]): void => {
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
                /* if (ancestors.includes(afterId)) {
                    // if already in ancestors, a closed chain exists.
                    consoleError(
                        'Modules._topologicalSort()',
                        'Dependency injection circular loop',
                        afterId,
                        '<=>',
                        id,
                    );
                } */

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
    handleServices(services: string[]): void {
        const sortedServices = this._getSortedServices(services);
        const calls = [];
        each(sortedServices, (serviceName) => {
            const moduleCall = () => {
                this._instances[serviceName] = this._resolveDependencies(
                    this._modules[serviceName],
                );

                if (isFunction(this._instances[serviceName].enter)) {
                    return this._instances[serviceName].enter();
                }
                return noop();
            };
            calls.push(moduleCall);
        });

        this.eventAfterInit();

        const async = new Async();
        async.serial(calls).then(
            () => {
                this.eventServiceLoaded();
                this._instances.state.run();
            },
            () => {
                this.eventServiceFailed();
            },
        );
    }
    /**
     * @param {!Array<Route>} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes: Route[], options: Object): void {
        this._instances.state = new State(routes, options);
        this._instances.state.eventChange = (
            currentState,
            previousState,
            force,
        ) => {
            let exit = noop();
            if (
                !previousState.isEmpty() &&
                this._controller &&
                isFunction(this._controller.exit)
            ) {
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
    _handleStateChange(
        currentState: Objekt,
        opt_force: boolean | undefined = false,
    ): void {
        this.eventStateChange(currentState).then(
            () => {
                const template = currentState.get('template');
                if (template) {
                    const templateUrl = currentState.get<string>('templateUrl');
                    this._instances.template.load(templateUrl, opt_force).then(
                        (dom) => {
                            this.eventModuleLoaded(currentState);
                            this._initController(currentState, dom);
                        },
                        () => {
                            this.eventModuleFailed(currentState);
                        },
                    );
                } else {
                    this.eventModuleLoaded(currentState);
                    this._initController(
                        currentState,
                        this._instances[
                            this._injections.template
                        ].getViewKnot(),
                    );
                }
            },
            () => {
                this.eventModuleFailed(currentState);
            },
        );
    }
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {undefined}
     */
    private _initController(state: Objekt, dom: Knot): void {
        this._instances.dom = dom;
        const controller = this._modules[state.get<string>('controller')];
        if (controller) {
            this.eventDomChange(state, dom).then(() => {
                this._controller = this._resolveDependencies(controller);
                if (this._controller && isFunction(this._controller.enter)) {
                    const enter = this._controller.enter.bind(this._controller);
                    const async = new Async();
                    async.serial([enter]).then(() => {
                        this.eventControllerLoaded(dom);
                    });
                } else {
                    this.eventControllerLoaded(dom);
                }
            });
        } else {
            this.eventControllerFailed();
        }
    }
    /**
     * @param {!Knot} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom: Knot): void {
        consoleWarn('Module.eventControllerLoaded()', dom);
    }
    /**
     * @return {undefined}
     */
    eventControllerFailed(): void {
        consoleWarn('Module.eventControllerFailed()');
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state: Objekt): void {
        consoleWarn('Module.eventModuleFailed()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state: Objekt): void {
        consoleWarn('Module.eventModuleLoaded()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state: Objekt): Promize {
        const deferred = new Deferred();
        consoleWarn('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @param {!Objekt} state
     * @param {!Knot} dom
     * @return {!Promize}
     */
    eventDomChange(state: Objekt, dom: Knot): Promize {
        const deferred = new Deferred();
        consoleWarn('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @return {undefined}
     */
    eventAfterInit(): void {
        consoleWarn('Module.eventAfterInit()');
    }
    /**
     * @return {undefined}
     */
    eventServiceLoaded(): void {
        consoleWarn('Module.eventServiceLoaded()');
    }
    /**
     * @return {undefined}
     */
    eventServiceFailed(): void {
        consoleWarn('Module.eventServiceFailed()');
    }
}
