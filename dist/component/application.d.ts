import { Objekt } from '../core/objekt';
import { Route } from './route';
import { ClassRef, Injection, InstanceKey } from '../utils';
/**
 * @description Main entry point for the SUI-JS framework. Manages the dependency injection
 * container and initializes all framework modules and services.
 *
 * @example
 * const app = new Application(
 *     { app_id: 'my-app', locale: 'en-US', backend: '/api', production: true },
 *     { flash: 'flash' },
 * );
 * app.run(routes, ['authService']);
 *
 * @see {@link Module} for the underlying module system
 * @see {@link Route} for route configuration
 * @see {@link Instance} for the full DI container interface
 *
 * @category Component
 */
export declare class Application {
    options: Objekt;
    private _injections;
    private _instances;
    private _module;
    private _routeOptions;
    /**
     * @description Creates a new Application instance, merges options with defaults, and
     * initializes all framework modules.
     *
     * @param {object} options - Configuration options merged with defaults (app_id, locale, backend, production, secret, theme_color).
     * @param {Injection} resources - Dependency injection map that binds token names to service identifiers.
     */
    constructor(options: object, resources: Injection);
    /**
     * @description Merges user-provided options with framework defaults.
     * @param {object} options - User configuration options.
     */
    private _setOptions;
    /**
     * @description Initializes all framework subsystems and loads registered modules.
     * @param {Injection} resources - Dependency injection resource map.
     */
    private _init;
    /**
     * @description Returns the language code extracted from the current locale (e.g., "en" from "en-US").
     *
     * @returns {string} The ISO 639-1 language code.
     *
     * @example
     * const lang = app.getLanguage(); // 'en'
     */
    getLanguage(): string;
    /**
     * @description Returns the current locale, falling back to the configured default if none
     * is stored in local storage.
     *
     * @returns {string} The BCP 47 locale string (e.g., "en-US").
     *
     * @example
     * const locale = app.getLocale(); // 'en-US'
     */
    getLocale(): string;
    /**
     * @description Sets the application locale and persists it to local storage.
     *
     * @param {string} locale - The BCP 47 locale string to set (e.g., "hu-HU").
     *
     * @example
     * app.setLocale('hu-HU');
     */
    setLocale(locale: string): void;
    /**
     * @description Sets the application locale and reloads the current state to apply it.
     *
     * @param {string} locale - The BCP 47 locale string to set.
     *
     * @example
     * app.setLocaleWithReload('de-DE');
     */
    setLocaleWithReload(locale: string): void;
    /**
     * @description Reads the persisted locale and configures the date I/O library.
     */
    private _initLocale;
    /**
     * @description Adds the `sui-js` CSS class to the root HTML element.
     */
    private _initCertificate;
    /**
     * @description Initializes the {@link Module} system and wires up lifecycle event callbacks.
     */
    private _initModule;
    /**
     * @description Passes all resolved instances and injections to the module loader.
     */
    private _loadModules;
    /**
     * @description Initializes the {@link Script} loader for dynamic script injection.
     */
    private _initScript;
    /**
     * @description Initializes the {@link Style} loader for dynamic stylesheet injection.
     */
    private _initStyle;
    /**
     * @description Exposes the application options as the `config` instance.
     */
    private _initConfig;
    /**
     * @description Registers this Application instance in the DI container.
     */
    private _initApp;
    /**
     * @description Initializes the {@link GeoLocation} module and wires change/error events.
     */
    private _initGeoLocation;
    /**
     * @description Initializes the {@link Cookie} module with the application prefix.
     */
    private _initCookie;
    /**
     * @description Initializes the {@link Loader} module for loading indicators.
     */
    private _initLoader;
    /**
     * @description Initializes the {@link ProgressBar} module with dialog and confirm references.
     */
    private _initProgressBar;
    /**
     * @description Initializes local and session {@link Depot} instances for persistent storage.
     */
    private _initDepots;
    /**
     * @description Initializes the {@link Helper} module for miscellaneous DOM utilities.
     */
    private _initHelper;
    /**
     * @description Initializes the {@link Page} module and connects document click events.
     */
    private _initPage;
    /**
     * @description Initializes the {@link Screen} module and wires resize, orientation, scroll, and connectivity events.
     */
    private _initScreen;
    /**
     * @description Initializes the {@link EventBus} for publish/subscribe communication.
     */
    private _initEventBus;
    /**
     * @description Initializes the {@link Scheduler} for deferred and periodic tasks.
     */
    private _initScheduler;
    /**
     * @description Initializes the {@link Http} client and wires before/after request events.
     */
    private _initHttp;
    /**
     * @description Initializes the {@link Template} engine with HTTP client and locale.
     */
    private _initTemplate;
    /**
     * @description Initializes the {@link Flash} module for transient notifications.
     */
    private _initFlash;
    /**
     * @description Initializes the {@link Dialog} module for modal windows.
     */
    private _initDialog;
    /**
     * @description Initializes the {@link Confirm} module for confirmation dialogs.
     */
    private _initConfirm;
    /**
     * @description Initializes the {@link Viewer} module for image/content previews.
     */
    private _initViewer;
    /**
     * @description Initializes the {@link Header} component.
     */
    private _initHeader;
    /**
     * @description Initializes the {@link TopMenu} navigation component.
     */
    private _initTopMenu;
    /**
     * @description Initializes the {@link NavBar} breadcrumb/tab navigation component.
     */
    private _initNavBar;
    /**
     * @description Initializes the {@link BottomMenu} navigation component.
     */
    private _initBottomMenu;
    /**
     * @description Initializes the {@link LeftMenu} drawer navigation component.
     */
    private _initLeftMenu;
    /**
     * @description Initializes the {@link Footer} component.
     */
    private _initFooter;
    /**
     * @description Initializes the {@link Browser} module and wires the missing features event.
     */
    private _initBrowser;
    /**
     * @description Initializes the route options container.
     */
    private _initRoutes;
    /**
     * @description Sets the root (default) state that the router navigates to initially.
     *
     * @param {string} id - The route identifier to use as the root state.
     * @param {object} [opt_params] - Optional route parameters.
     *
     * @example
     * app.setRootState('dashboard', { tab: 'overview' });
     */
    setRootState(id: string, opt_params?: object): void;
    /**
     * @description Retrieves a service instance from the DI container by name.
     *
     * @param {InstanceKey} name - The key identifying the service instance.
     * @returns {object | null} The resolved service instance, or null if not found.
     *
     * @example
     * const http = app.getInstance('http');
     */
    getInstance(name: InstanceKey): object | null;
    /**
     * @description Returns the currently active controller instance.
     *
     * @returns {object | null} The active controller, or null if none is loaded.
     *
     * @example
     * const ctrl = app.getController();
     */
    getController(): object | null;
    /**
     * @description Starts the application by registering routes and loading services.
     *
     * @param {Route[]} routes - Array of {@link Route} definitions for the router.
     * @param {string[]} services - Array of service names to initialize at startup.
     *
     * @example
     * app.run(
     *     [new Route('home', 'Home', '/', 'homeCtrl', '/templates/home.html')],
     *     ['authService', 'analyticsService'],
     * );
     */
    run(routes: Route[], services: string[]): void;
    /**
     * @description Registers a controller module with the given name, dependencies, and constructor.
     *
     * @param {string} name - Unique name for the controller.
     * @param {string[]} moduleInjections - Array of dependency injection token names.
     * @param {ClassRef} moduleCallback - The controller class constructor.
     * @returns {string} The registered module name.
     *
     * @example
     * app.controller('homeCtrl', ['http', 'template'], HomeController);
     */
    controller(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
    /**
     * @description Registers a service module with the given name, dependencies, and constructor.
     *
     * @param {string} name - Unique name for the service.
     * @param {string[]} moduleInjections - Array of dependency injection token names.
     * @param {ClassRef} moduleCallback - The service class constructor.
     * @returns {string} The registered module name.
     *
     * @example
     * app.service('authService', ['http', 'localDepot'], AuthService);
     */
    service(name: string, moduleInjections: string[], moduleCallback: ClassRef): string;
}
