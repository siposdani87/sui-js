import { noop, each, isFunction } from '../utils/operation';
import { consoleDebug } from '../utils/log';
import { Async } from './async';
import { Deferred } from './deferred';
import { State } from './state';
/**
 * Base class for the application's revealing module pattern. Module manages
 * dependency injection, service lifecycle, and controller routing. It acts
 * as the central coordinator between {@link State} (routing), services
 * (long-lived modules), and controllers (per-route modules).
 *
 * Services are registered via `add()` and initialized in topological
 * dependency order by `handleServices()`. Routes are wired through
 * `handleRoutes()`, which creates a {@link State} instance and connects
 * state change events to the controller enter/exit lifecycle.
 *
 * Subclasses override the `event*` hook methods to integrate with the
 * application's UI layer (e.g., showing loaders, updating navigation,
 * rendering templates).
 *
 * @example
 * const module = new Module();
 *
 * // Register services with their dependency injections
 * module.add('userService', ['http', 'config'], UserService);
 * module.add('authService', ['http', 'userService'], AuthService);
 *
 * // Register a controller
 * module.add('dashboardCtrl', ['userService', 'dom'], DashboardController);
 *
 * // Wire routes and start
 * module.handleRoutes(routes, routeOptions);
 * module.load(instances, injections);
 * module.handleServices(['userService', 'authService']);
 *
 * @see {@link State}
 * @see {@link Async}
 * @see {@link Promize}
 * @category Core
 */
export class Module {
    /**
     * Creates a new Module instance with an empty module registry and a
     * default no-op controller.
     */
    constructor() {
        this._modules = {};
        this._controller = {
            enter: noop(),
            exit: noop(),
        };
    }
    /**
     * Receives the framework's shared instances map and injection name
     * mappings. This must be called before `handleServices()` so that
     * dependency resolution can look up framework-provided instances.
     *
     * @param instances The shared framework instances (services, config,
     *     DOM references, etc.) keyed by their canonical names.
     * @param injections Name mappings that allow modules to reference
     *     framework instances by alternate keys.
     *
     * @example
     * module.load(app.getInstances(), app.getInjections());
     */
    load(instances, injections) {
        this._instances = instances;
        this._injections = injections;
    }
    /**
     * Returns the current controller object. The controller is the module
     * instance associated with the active route, exposing `enter()` and
     * `exit()` lifecycle methods.
     *
     * @returns The current controller object with enter/exit methods.
     *
     * @example
     * const controller = module.getController();
     */
    getController() {
        return this._controller;
    }
    /**
     * Registers a named module (service or controller) with its dependency
     * injection list and constructor reference. The module is stored
     * internally and later instantiated by `handleServices()` or during
     * route-based controller initialization.
     *
     * @param name Unique name identifying this module. Used as the key
     *     in the instances map after instantiation.
     * @param moduleInjections Array of dependency names that will be
     *     resolved from the instances map and passed to the constructor.
     * @param moduleCallback The constructor function (class reference)
     *     to instantiate when resolving this module.
     * @returns The registered module name.
     *
     * @example
     * module.add('dashboardCtrl', ['http', 'config', 'dom'], DashboardController);
     */
    add(name, moduleInjections, moduleCallback) {
        this._modules[name] = {
            moduleInjections,
            moduleCallback,
        };
        return name;
    }
    /**
     * Resolves a module's dependencies from the instances map and
     * instantiates the module with the resolved arguments.
     *
     * @param dependency The dependency descriptor containing injection
     *     names and the constructor reference.
     * @returns A new instance of the module's class, constructed with
     *     resolved dependencies.
     */
    _resolveDependencies(dependency) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const moduleArgs = [];
        each(dependency.moduleInjections, (injection) => {
            moduleArgs.push(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this._instances[injection] ||
                injection);
        });
        return new dependency.moduleCallback(...moduleArgs);
    }
    /**
     * Sorts service names into topological order based on their declared
     * dependency injections, ensuring that a service's dependencies are
     * initialized before the service itself.
     *
     * @param services Array of service names to sort.
     * @returns The service names in dependency-first order.
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
     * Performs a topological sort on a directed acyclic graph represented
     * as an edge list. Uses depth-first traversal to produce a linear
     * ordering where each node appears before all nodes that depend on it.
     *
     * @param edges Array of [from, to] pairs representing dependency
     *     edges (from must be initialized before to).
     * @returns Array of node identifiers in topological order.
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
     * Resolves and initializes services in topological order, respecting
     * their declared dependency injections. Each service is instantiated
     * and its `enter()` method (if present) is called via {@link Async}
     * serial execution.
     *
     * After all services are initialized, `eventServiceLoaded()` is fired
     * and `state.run()` is called to activate routing. If any service
     * fails to initialize, `eventServiceFailed()` is fired instead.
     *
     * @param services Array of service names (as registered via `add()`)
     *     to initialize.
     *
     * @example
     * module.handleServices(['http', 'eventBus', 'userService']);
     */
    handleServices(services) {
        const sortedServices = this._getSortedServices(services);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const calls = [];
        each(sortedServices, (serviceName) => {
            const moduleCall = () => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._instances[serviceName] =
                    this._resolveDependencies(this._modules[serviceName]);
                if (isFunction(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._instances[serviceName]
                    .enter)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
     * Sets up the {@link State} instance with route definitions and wires
     * state change events to the controller lifecycle. When the state
     * changes, the previous controller's `exit()` method is called (if
     * applicable) before the new controller is initialized.
     *
     * @param routes Array of {@link Route} definitions mapping URL
     *     patterns to controllers and templates.
     * @param options Configuration options passed to the {@link State}
     *     constructor (e.g., base URL, default route).
     *
     * @example
     * module.handleRoutes([
     *     new Route('/dashboard', 'dashboardCtrl', 'dashboard.html'),
     *     new Route('/settings', 'settingsCtrl', 'settings.html'),
     * ], { basePath: '/app' });
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
     * Handles an individual state change by firing `eventStateChange()`,
     * loading the template (if defined), and initializing the controller
     * for the new state.
     *
     * @param currentState The {@link Objekt} representing the new
     *     active state with route parameters, template info, and
     *     controller name.
     * @param opt_force Whether to force-reload the template even if it
     *     is already cached.
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
                this._initController(currentState, 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this._instances[this._injections.template].getViewKnot());
            }
        }, () => {
            this.eventModuleFailed(currentState);
        });
    }
    /**
     * Initializes the controller for the current state by resolving its
     * dependencies, calling its `enter()` method, and firing the
     * appropriate lifecycle event hooks.
     *
     * @param state The {@link Objekt} representing the current state,
     *     containing the controller name under the 'controller' key.
     * @param dom The {@link Knot} DOM container where the controller
     *     should render its content.
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
     * Overridable lifecycle hook called when a controller has been
     * successfully loaded and its `enter()` method has completed.
     * Logs by default; override to integrate with the application UI.
     *
     * @param dom The {@link Knot} DOM container rendered by the controller.
     */
    eventControllerLoaded(dom) {
        consoleDebug('Module.eventControllerLoaded()', dom);
    }
    /**
     * Overridable lifecycle hook called when no controller is found for
     * the current route. Logs by default; override to show error states.
     */
    eventControllerFailed() {
        consoleDebug('Module.eventControllerFailed()');
    }
    /**
     * Overridable lifecycle hook called when a module (template) fails
     * to load for the given state. Logs by default; override to display
     * error feedback to the user.
     *
     * @param state The {@link Objekt} representing the state whose
     *     module failed to load.
     */
    eventModuleFailed(state) {
        consoleDebug('Module.eventModuleFailed()', state);
    }
    /**
     * Overridable lifecycle hook called when a module (template) has
     * been successfully loaded for the given state. Logs by default;
     * override to update navigation or page title.
     *
     * @param state The {@link Objekt} representing the state whose
     *     module was loaded.
     */
    eventModuleLoaded(state) {
        consoleDebug('Module.eventModuleLoaded()', state);
    }
    /**
     * Overridable lifecycle hook called when the application state
     * changes. Returns a {@link Promize} to allow asynchronous operations
     * (such as transition animations or data prefetching) before the
     * controller lifecycle continues.
     *
     * The default implementation resolves immediately. Override to
     * insert async logic before controller initialization.
     *
     * @param state The {@link Objekt} representing the new active state.
     * @returns A {@link Promize} that must be resolved to continue the
     *     state change lifecycle.
     */
    eventStateChange(state) {
        const deferred = new Deferred();
        consoleDebug('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * Overridable lifecycle hook called when the DOM container is ready
     * for the new controller. Returns a {@link Promize} to allow
     * asynchronous operations (such as DOM preparation or cleanup)
     * before the controller is instantiated.
     *
     * The default implementation resolves immediately. Override to
     * insert async logic before controller instantiation.
     *
     * @param state The {@link Objekt} representing the current state.
     * @param dom The {@link Knot} DOM container for the controller.
     * @returns A {@link Promize} that must be resolved to continue
     *     controller initialization.
     */
    eventDomChange(state, dom) {
        const deferred = new Deferred();
        consoleDebug('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * Overridable lifecycle hook called after all service initialization
     * calls have been queued but before they begin executing. Logs by
     * default; override to perform early setup tasks.
     */
    eventAfterInit() {
        consoleDebug('Module.eventAfterInit()');
    }
    /**
     * Overridable lifecycle hook called when all registered services
     * have been successfully initialized. Logs by default; override to
     * signal application readiness.
     */
    eventServiceLoaded() {
        consoleDebug('Module.eventServiceLoaded()');
    }
    /**
     * Overridable lifecycle hook called when service initialization
     * fails. Logs by default; override to handle initialization errors
     * gracefully.
     */
    eventServiceFailed() {
        consoleDebug('Module.eventServiceFailed()');
    }
}
