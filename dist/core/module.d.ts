import { Objekt } from './objekt';
import { Knot } from './knot';
import { Route } from '../component/route';
import { ClassRef, Injection, Instance } from '../utils';
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
export declare class Module {
    private _instances;
    private _injections;
    private _modules;
    private _controller;
    /**
     * Creates a new Module instance with an empty module registry and a
     * default no-op controller.
     */
    constructor();
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
    load(instances: Instance, injections: Injection): void;
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
    getController(): object;
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
    add(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
    /**
     * Resolves a module's dependencies from the instances map and
     * instantiates the module with the resolved arguments.
     *
     * @param dependency The dependency descriptor containing injection
     *     names and the constructor reference.
     * @returns A new instance of the module's class, constructed with
     *     resolved dependencies.
     */
    private _resolveDependencies;
    /**
     * Sorts service names into topological order based on their declared
     * dependency injections, ensuring that a service's dependencies are
     * initialized before the service itself.
     *
     * @param services Array of service names to sort.
     * @returns The service names in dependency-first order.
     */
    private _getSortedServices;
    /**
     * Performs a topological sort on a directed acyclic graph represented
     * as an edge list. Uses depth-first traversal to produce a linear
     * ordering where each node appears before all nodes that depend on it.
     *
     * @param edges Array of [from, to] pairs representing dependency
     *     edges (from must be initialized before to).
     * @returns Array of node identifiers in topological order.
     */
    private _topologicalSort;
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
    handleServices(services: string[]): void;
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
    handleRoutes(routes: Route[], options: object): void;
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
    private _handleStateChange;
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
    private _initController;
    /**
     * Overridable lifecycle hook called when a controller has been
     * successfully loaded and its `enter()` method has completed.
     * Logs by default; override to integrate with the application UI.
     *
     * @param dom The {@link Knot} DOM container rendered by the controller.
     */
    eventControllerLoaded(dom: Knot): void;
    /**
     * Overridable lifecycle hook called when no controller is found for
     * the current route. Logs by default; override to show error states.
     */
    eventControllerFailed(): void;
    /**
     * Overridable lifecycle hook called when a module (template) fails
     * to load for the given state. Logs by default; override to display
     * error feedback to the user.
     *
     * @param state The {@link Objekt} representing the state whose
     *     module failed to load.
     */
    eventModuleFailed(state: Objekt): void;
    /**
     * Overridable lifecycle hook called when a module (template) has
     * been successfully loaded for the given state. Logs by default;
     * override to update navigation or page title.
     *
     * @param state The {@link Objekt} representing the state whose
     *     module was loaded.
     */
    eventModuleLoaded(state: Objekt): void;
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
    eventStateChange(state: Objekt): import("./promize").Promize<object, object>;
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
    eventDomChange(state: Objekt, dom: Knot): import("./promize").Promize<object, object>;
    /**
     * Overridable lifecycle hook called after all service initialization
     * calls have been queued but before they begin executing. Logs by
     * default; override to perform early setup tasks.
     */
    eventAfterInit(): void;
    /**
     * Overridable lifecycle hook called when all registered services
     * have been successfully initialized. Logs by default; override to
     * signal application readiness.
     */
    eventServiceLoaded(): void;
    /**
     * Overridable lifecycle hook called when service initialization
     * fails. Logs by default; override to handle initialization errors
     * gracefully.
     */
    eventServiceFailed(): void;
}
