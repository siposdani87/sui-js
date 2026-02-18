import { PopupContainer } from './popupContainer';
import { Module } from '../core/module';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { BottomMenu } from '../module/bottomMenu';
import { Page } from '../module/page';
import { Browser } from '../module/browser';
import { Confirm } from '../module/confirm';
import { Cookie } from '../module/cookie';
import { Dialog } from '../module/dialog';
import { Flash } from '../module/flash';
import { Footer } from '../module/footer';
import { GeoLocation } from '../module/geoLocation';
import { Helper } from '../module/helper';
import { Http } from '../module/http';
import { LeftMenu } from '../module/leftMenu';
import { Loader } from '../module/loader';
import { NavBar } from '../module/navBar';
import { ProgressBar } from '../module/progressBar';
import { Script } from '../module/script';
import { Style } from '../module/style';
import { Template } from '../module/template';
import { TopMenu } from '../module/topMenu';
import { Viewer } from '../module/viewer';
import { Depot } from '../module/depot';
import { Header } from '../module/header';
import { EventBus } from '../module/eventBus';
import { Scheduler } from '../module/scheduler';
import { Screen } from '../module/screen';
import { Route } from './route';
import { ClassRef, Injection, Instance, InstanceKey } from '../utils';
import { setDateIOLocale } from '../utils/dateio';

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
export class Application {
    public options!: Objekt;
    private _injections: Injection = {};
    private _instances = {} as Instance;
    private _module!: Module;
    private _routeOptions!: Objekt;

    /**
     * @description Creates a new Application instance, merges options with defaults, and
     * initializes all framework modules.
     *
     * @param {object} options - Configuration options merged with defaults (app_id, locale, backend, production, secret, theme_color).
     * @param {Injection} resources - Dependency injection map that binds token names to service identifiers.
     */
    constructor(options: object, resources: Injection) {
        this._setOptions(options);
        this._init(resources);
    }

    /**
     * @description Merges user-provided options with framework defaults.
     * @param {object} options - User configuration options.
     */
    private _setOptions(options: object): void {
        this.options = new Objekt({
            app_id: 'sui-app',
            locale: navigator.language,
            backend: '',
            production: false,
            secret: 'f74pej3qpb9qmpvregu7ef33m5w6f6qz',
            theme_color: '#000',
        });
        this.options.merge(options);
    }

    /**
     * @description Initializes all framework subsystems and loads registered modules.
     * @param {Injection} resources - Dependency injection resource map.
     */
    private _init(resources: Injection): void {
        this._injections = resources;

        this._initApp();
        this._initCertificate();
        this._initRoutes();
        this._initDepots();
        this._initLocale();
        this._initModule();
        this._initEventBus();
        this._initScheduler();
        this._initLoader();
        this._initHttp();
        this._initDialog();
        this._initConfirm();
        this._initViewer();
        this._initProgressBar();
        this._initCookie();
        this._initFlash();
        this._initTemplate();
        this._initPage();
        this._initScreen();
        this._initHelper();
        this._initHeader();
        this._initTopMenu();
        this._initLeftMenu();
        this._initNavBar();
        this._initFooter();
        this._initBottomMenu();
        this._initBrowser();
        this._initGeoLocation();
        this._initScript();
        this._initStyle();
        this._initConfig();

        this._loadModules();
    }

    /**
     * @description Returns the language code extracted from the current locale (e.g., "en" from "en-US").
     *
     * @returns {string} The ISO 639-1 language code.
     *
     * @example
     * const lang = app.getLanguage(); // 'en'
     */
    getLanguage(): string {
        const locale = this.getLocale();
        return locale.split('-', 2)[0];
    }

    /**
     * @description Returns the current locale, falling back to the configured default if none
     * is stored in local storage.
     *
     * @returns {string} The BCP 47 locale string (e.g., "en-US").
     *
     * @example
     * const locale = app.getLocale(); // 'en-US'
     */
    getLocale(): string {
        let locale = this._instances.localDepot.get('app.locale');
        if (!locale) {
            locale = this.options.locale;
        }
        return locale;
    }

    /**
     * @description Sets the application locale and persists it to local storage.
     *
     * @param {string} locale - The BCP 47 locale string to set (e.g., "hu-HU").
     *
     * @example
     * app.setLocale('hu-HU');
     */
    setLocale(locale: string): void {
        this._instances.localDepot.set('app.locale', locale);
        this.options.locale = locale;
    }

    /**
     * @description Sets the application locale and reloads the current state to apply it.
     *
     * @param {string} locale - The BCP 47 locale string to set.
     *
     * @example
     * app.setLocaleWithReload('de-DE');
     */
    setLocaleWithReload(locale: string): void {
        this.setLocale(locale);
        this._instances.state.reload();
    }

    /**
     * @description Reads the persisted locale and configures the date I/O library.
     */
    private _initLocale(): void {
        const locale = this.getLocale();
        setDateIOLocale(locale);
        this.setLocale(locale);
    }

    /**
     * @description Adds the `sui-js` CSS class to the root HTML element.
     */
    private _initCertificate(): void {
        const rootKnot = new Query('html').getKnot();
        rootKnot.addClass('sui-js');
    }

    /**
     * @description Initializes the {@link Module} system and wires up lifecycle event callbacks.
     */
    private _initModule(): void {
        this._module = new Module();

        this._module.eventAfterInit = () => {
            this._instances.progressBar.lock();
            this._instances.loader.show();
            this._instances.eventBus.call('module.afterInit');
        };

        this._module.eventStateChange = (currentState) => {
            this._instances.progressBar.lock();
            this._instances.loader.show();
            this._instances.dialog.close();
            this._instances.confirm.close();
            return this._instances.eventBus.call('state.change', [
                currentState,
            ]);
        };

        this._module.eventDomChange = (state, dom) => {
            return this._instances.eventBus.call('dom.change', [state, dom]);
        };

        this._module.eventServiceLoaded = () => {
            this._instances.browser.detect();
            this._instances.eventBus.call('module.serviceLoaded');
        };

        this._module.eventServiceFailed = () => {
            this._instances.eventBus.call('module.serviceFailed');
        };

        this._module.eventModuleLoaded = (state): void => {
            this._instances.progressBar.unlock();
            this._instances.loader.hide(true);
            this._instances.eventBus.call('module.loaded', [state]);
        };

        this._module.eventModuleFailed = (state): void => {
            this._instances.progressBar.unlock();
            this._instances.loader.hide(true);
            this._instances.eventBus.call('module.failed', [state]);
        };

        this._module.eventControllerLoaded = (dom): void => {
            this._instances.eventBus.call('controller.loaded', [dom]);
        };

        this._module.eventControllerFailed = (): void => {
            this._instances.eventBus.call('controller.failed', []);
        };
    }

    /**
     * @description Passes all resolved instances and injections to the module loader.
     */
    private _loadModules(): void {
        this._instances.instances = this._instances;

        this._module.load(this._instances, this._injections);
    }

    /**
     * @description Initializes the {@link Script} loader for dynamic script injection.
     */
    private _initScript(): void {
        this._instances.script = new Script(this._instances.progressBar);
    }

    /**
     * @description Initializes the {@link Style} loader for dynamic stylesheet injection.
     */
    private _initStyle(): void {
        this._instances.style = new Style(this._instances.progressBar);
    }

    /**
     * @description Exposes the application options as the `config` instance.
     */
    private _initConfig(): void {
        this._instances.config = this.options;
    }

    /**
     * @description Registers this Application instance in the DI container.
     */
    private _initApp(): void {
        this._instances.app = this;
    }

    /**
     * @description Initializes the {@link GeoLocation} module and wires change/error events.
     */
    private _initGeoLocation(): void {
        this._instances.geoLocation = new GeoLocation();

        this._instances.geoLocation.eventChange = (
            latitude,
            longitude,
            message,
        ) => {
            this._instances.eventBus.override(
                'geoLocation.success',
                [message],
                (message: string) => {
                    this._instances.flash.addInfo(message);
                },
            );
            this._instances.eventBus.call('geoLocation.change', [
                latitude,
                longitude,
            ]);
        };

        this._instances.geoLocation.eventError = (message, code) => {
            this._instances.eventBus.override(
                'geoLocation.error',
                [message, code],
                (message: string) => {
                    this._instances.flash.addError(message);
                },
            );
        };
    }

    /**
     * @description Initializes the {@link Cookie} module with the application prefix.
     */
    private _initCookie(): void {
        this._instances.cookie = new Cookie({
            prefix: this.options.app_id,
        });
    }

    /**
     * @description Initializes the {@link Loader} module for loading indicators.
     */
    private _initLoader(): void {
        this._instances.loader = new Loader();
    }

    /**
     * @description Initializes the {@link ProgressBar} module with dialog and confirm references.
     */
    private _initProgressBar(): void {
        this._instances.progressBar = new ProgressBar(
            this._instances.dialog,
            this._instances.confirm,
        );
    }

    /**
     * @description Initializes local and session {@link Depot} instances for persistent storage.
     */
    private _initDepots(): void {
        this._instances.localDepot = new Depot('LOCAL', {
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
        this._instances.sessionDepot = new Depot('SESSION', {
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
    }

    /**
     * @description Initializes the {@link Helper} module for miscellaneous DOM utilities.
     */
    private _initHelper(): void {
        this._instances.helper = new Helper();
    }

    /**
     * @description Initializes the {@link Page} module and connects document click events.
     */
    private _initPage(): void {
        const popupContainer = new PopupContainer();
        this._instances.page = new Page();
        this._instances.page.eventClick = (target, event) => {
            popupContainer.closeAll();
            this._instances.eventBus.call('document.click', [target, event]);
        };
    }

    /**
     * @description Initializes the {@link Screen} module and wires resize, orientation, scroll, and connectivity events.
     */
    private _initScreen(): void {
        this._instances.screen = new Screen();
        const width = this._instances.screen.getWidth();
        const height = this._instances.screen.getHeight();
        this._instances.dialog.setSize(width, height);
        this._instances.confirm.setSize(width, height);
        this._instances.viewer.setSize(width, height);

        this._instances.screen.eventResize = (width, height, event) => {
            this._instances.dialog.setSize(width, height);
            this._instances.confirm.setSize(width, height);
            this._instances.viewer.setSize(width, height);
            this._instances.eventBus.call('window.resize', [
                width,
                height,
                event,
            ]);
        };

        this._instances.screen.eventOrientationChange = (
            orientation,
            width,
            height,
            event,
        ) => {
            this._instances.dialog.setSize(width, height);
            this._instances.confirm.setSize(width, height);
            this._instances.viewer.setSize(width, height);
            this._instances.eventBus.call('window.orientationChange', [
                orientation,
                width,
                height,
                event,
            ]);
        };

        this._instances.screen.eventScroll = (scrollTop, event) => {
            this._instances.eventBus.call('window.scroll', [scrollTop, event]);
        };

        this._instances.screen.eventColorSchemeChange = (
            colorScheme,
            event,
        ) => {
            this._instances.eventBus.call('window.colorSchemeChange', [
                colorScheme,
                event,
            ]);
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const flash: { node: any; message: string; duration: number } = {
            node: null,
            message: 'Unable to connect to the Internet',
            duration: Infinity,
        };
        this._instances.screen.eventOnline = () => {
            if (flash.node) {
                this._instances.flash.remove(flash.node);
            }
        };

        this._instances.screen.eventOffline = (event) => {
            this._instances.eventBus.override(
                'window.offline',
                [flash, event],
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (flash: any) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    flash.node = (this._instances as Record<string, any>)[
                        this._injections.flash
                    ].addWarning(flash.message, flash.duration);
                },
            );
        };
    }

    /**
     * @description Initializes the {@link EventBus} for publish/subscribe communication.
     */
    private _initEventBus(): void {
        this._instances.eventBus = new EventBus();
    }

    /**
     * @description Initializes the {@link Scheduler} for deferred and periodic tasks.
     */
    private _initScheduler(): void {
        this._instances.scheduler = new Scheduler();
    }

    /**
     * @description Initializes the {@link Http} client and wires before/after request events.
     */
    private _initHttp(): void {
        this._instances.http = new Http(this.options);
        this._instances.http.eventBeforeRequest = (...params) => {
            this._instances.progressBar.show();
            this._instances.eventBus.call('http.beforeRequest', params);
        };
        this._instances.http.eventAfterRequest = (...params) => {
            this._instances.eventBus.call('http.afterRequest', params);
            this._instances.progressBar.hide();
        };
    }

    /**
     * @description Initializes the {@link Template} engine with HTTP client and locale.
     */
    private _initTemplate(): void {
        this._instances.template = new Template(this._instances.http, {
            locale: this.getLocale(),
        });
        this._instances.template.eventError = (message) => {
            this._instances.state.back();
            this._instances.loader.hide();
            this._instances.flash.addMessage(message);
        };
    }

    /**
     * @description Initializes the {@link Flash} module for transient notifications.
     */
    private _initFlash(): void {
        this._instances.flash = new Flash();
    }

    /**
     * @description Initializes the {@link Dialog} module for modal windows.
     */
    private _initDialog(): void {
        this._instances.dialog = new Dialog(this._instances.http);
    }

    /**
     * @description Initializes the {@link Confirm} module for confirmation dialogs.
     */
    private _initConfirm(): void {
        this._instances.confirm = new Confirm();
    }

    /**
     * @description Initializes the {@link Viewer} module for image/content previews.
     */
    private _initViewer(): void {
        this._instances.viewer = new Viewer();
    }

    /**
     * @description Initializes the {@link Header} component.
     */
    private _initHeader(): void {
        this._instances.header = new Header();
    }

    /**
     * @description Initializes the {@link TopMenu} navigation component.
     */
    private _initTopMenu(): void {
        this._instances.topMenu = new TopMenu(this._instances.header);
    }

    /**
     * @description Initializes the {@link NavBar} breadcrumb/tab navigation component.
     */
    private _initNavBar(): void {
        this._instances.navBar = new NavBar();
    }

    /**
     * @description Initializes the {@link BottomMenu} navigation component.
     */
    private _initBottomMenu(): void {
        this._instances.bottomMenu = new BottomMenu(this._instances.footer);
    }

    /**
     * @description Initializes the {@link LeftMenu} drawer navigation component.
     */
    private _initLeftMenu(): void {
        this._instances.leftMenu = new LeftMenu();
    }

    /**
     * @description Initializes the {@link Footer} component.
     */
    private _initFooter(): void {
        this._instances.footer = new Footer();
    }

    /**
     * @description Initializes the {@link Browser} module and wires the missing features event.
     */
    private _initBrowser(): void {
        this._instances.browser = new Browser();
        this._instances.browser.eventMissingFeatures = (features) => {
            this._instances.flash.addError(features.join(', '));
        };
    }

    /**
     * @description Initializes the route options container.
     */
    private _initRoutes(): void {
        this._routeOptions = new Objekt();
    }

    /**
     * @description Sets the root (default) state that the router navigates to initially.
     *
     * @param {string} id - The route identifier to use as the root state.
     * @param {object} [opt_params] - Optional route parameters.
     *
     * @example
     * app.setRootState('dashboard', { tab: 'overview' });
     */
    setRootState(id: string, opt_params?: object): void {
        this._routeOptions.set('root.id', id);
        this._routeOptions.set('root.params', opt_params);
    }

    /**
     * @description Retrieves a service instance from the DI container by name.
     *
     * @param {InstanceKey} name - The key identifying the service instance.
     * @returns {object | null} The resolved service instance, or null if not found.
     *
     * @example
     * const http = app.getInstance('http');
     */
    getInstance(name: InstanceKey): object | null {
        return this._instances[name] ?? null;
    }

    /**
     * @description Returns the currently active controller instance.
     *
     * @returns {object | null} The active controller, or null if none is loaded.
     *
     * @example
     * const ctrl = app.getController();
     */
    getController(): object | null {
        return this._module.getController();
    }

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
    run(routes: Route[], services: string[]): void {
        if (this.options.production) {
            console.info(
                '%cApplication run in production environment...',
                `font-weight:bold;color:${this.options.theme_color};`,
            );
        } else {
            console.info(
                '%cApplication run in development environment...',
                `font-weight:bold;color:${this.options.theme_color};`,
            );
        }
        this._module.handleRoutes(routes, this._routeOptions);
        this._module.handleServices(services);
    }

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
    controller(
        name: string,
        moduleInjections: string[],
        moduleCallback: ClassRef,
    ): string {
        return this._module.add(name, moduleInjections, moduleCallback);
    }

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
    service(
        name: string,
        moduleInjections: string[],
        moduleCallback: ClassRef,
    ): string {
        return this._module.add(name, moduleInjections, moduleCallback);
    }
}
