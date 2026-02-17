import { noop, each, isFunction } from '../utils/operation';
import { consoleDebug } from '../utils/log';
import { Async } from './async';
import { Deferred } from './deferred';
import { State } from './state';
import { Objekt } from './objekt';
import { Knot } from './knot';
import { Route } from '../component/route';
import { ClassRef, Dependency, Injection, Instance } from '../utils';

export class Module {
    private _instances!: Instance;
    private _injections!: Injection;

    private _modules: {
        [key: string]: Dependency;
    };
    private _controller: any;

    constructor() {
        this._modules = {};
        this._controller = {
            enter: noop(),
            exit: noop(),
        };
    }
    load(instances: Instance, injections: Injection): void {
        this._instances = instances;
        this._injections = injections;
    }

    getController(): object {
        return this._controller;
    }

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

    private _resolveDependencies(dependency: Dependency): object {
        const moduleArgs: any[] = [];
        each(dependency.moduleInjections, (injection: any) => {
            moduleArgs.push((this._instances as Record<string, any>)[injection] || injection);
        });

        return new dependency.moduleCallback(...moduleArgs);
    }

    private _getSortedServices(services: string[]): string[] {
        const edges = services
            .map((service) => {
                const moduleInjections = this._modules[
                    service
                ].moduleInjections.filter((moduleInjection) =>
                    services.includes(moduleInjection),
                );
                if (moduleInjections.length === 0) {
                    moduleInjections.push(null as unknown as string);
                }
                return moduleInjections.map((injection) => [
                    injection,
                    service,
                ]);
            })
            .flat();

        return this._topologicalSort(edges).slice(1);
    }

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

    handleServices(services: string[]): void {
        const sortedServices = this._getSortedServices(services);
        const calls: Array<() => any> = [];
        each(sortedServices, (serviceName: any) => {
            const moduleCall = () => {
                (this._instances as Record<string, any>)[serviceName] = this._resolveDependencies(
                    this._modules[serviceName],
                );

                if (isFunction((this._instances as Record<string, any>)[serviceName].enter)) {
                    return (this._instances as Record<string, any>)[serviceName].enter();
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

    handleRoutes(routes: Route[], options: object): void {
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

    private _handleStateChange(
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
                        (this._instances as Record<string, any>)[
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

    eventControllerLoaded(dom: Knot): void {
        consoleDebug('Module.eventControllerLoaded()', dom);
    }

    eventControllerFailed(): void {
        consoleDebug('Module.eventControllerFailed()');
    }

    eventModuleFailed(state: Objekt): void {
        consoleDebug('Module.eventModuleFailed()', state);
    }

    eventModuleLoaded(state: Objekt): void {
        consoleDebug('Module.eventModuleLoaded()', state);
    }

    eventStateChange(state: Objekt) {
        const deferred = new Deferred();
        consoleDebug('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }

    eventDomChange(state: Objekt, dom: Knot) {
        const deferred = new Deferred();
        consoleDebug('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }

    eventAfterInit(): void {
        consoleDebug('Module.eventAfterInit()');
    }

    eventServiceLoaded(): void {
        consoleDebug('Module.eventServiceLoaded()');
    }

    eventServiceFailed(): void {
        consoleDebug('Module.eventServiceFailed()');
    }
}
