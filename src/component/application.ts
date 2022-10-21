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
import { Promize } from '../core';
import { Route } from './route';
import { ClassRef, Injection, Instance } from '../utils';
import { setDateIOLocale } from '../utils/dateio';

/**
 * @class
 */
export class Application {
    options: Objekt;
    private _injections: Injection = {};
    private _instances: Instance = {
        app: undefined,
        config: undefined,
        eventBus: undefined,
        scheduler: undefined,
        http: undefined,
        flash: undefined,
        template: undefined,
        dialog: undefined,
        confirm: undefined,
        viewer: undefined,
        header: undefined,
        topMenu: undefined,
        leftMenu: undefined,
        footer: undefined,
        bottomMenu: undefined,
        navBar: undefined,
        script: undefined,
        style: undefined,
        state: undefined,
        dom: undefined,
        page: undefined,
        screen: undefined,
        helper: undefined,
        cookie: undefined,
        localDepot: undefined,
        sessionDepot: undefined,
        browser: undefined,
        loader: undefined,
        progressBar: undefined,
        geoLocation: undefined,
        instances: undefined,
        console: undefined,
    };
    private _module: Module;
    private _routeOptions: Objekt;
    /**
     * @param {!Object} options
     * @param {!Injection} resources
     */
    constructor(options: Object, resources: Injection) {
        this._setOptions(options);
        this._init(resources);
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    private _setOptions(options: Object): void {
        const _self = this;
        _self.options = new Objekt({
            app_id: 'sui-app',
            locale: navigator.language,
            backend: '',
            production: false,
            secret: 'f74pej3qpb9qmpvregu7ef33m5w6f6qz',
            theme_color: '#000',
        });
        _self.options.merge(options);
    }
    /**
     * @private
     * @param {!Injection} resources
     * @return {undefined}
     */
    private _init(resources: Injection): void {
        this._injections = resources;

        this._initCertificate();
        this._initApp();
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
     * @return {string}
     */
    getLanguage(): string {
        const locale = this.getLocale();
        return locale.split('-', 2)[0];
    }
    /**
     * @return {string}
     */
    getLocale(): string {
        let locale = this._instances.localDepot.get('app.locale');
        if (!locale) {
            locale = this.options.locale;
        }
        return locale;
    }
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocale(locale: string): void {
        this._instances.localDepot.set('app.locale', locale);
        this.options.locale = locale;
    }
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocaleWithReload(locale: string): void {
        this.setLocale(locale);
        this._instances.state.reload();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initLocale(): void {
        const locale = this.getLocale();
        setDateIOLocale(locale);
        this.setLocale(locale);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initCertificate(): void {
        const rootKnot = new Query('html').getKnot();
        rootKnot.addClass('sui-js');
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initModule(): void {
        this._module = new Module();

        this._module.eventAfterInit = () => {
            this._instances.progressBar.lock();
            this._instances.loader.show();
            this._instances.eventBus.call('module.afterInit');
        };

        this._module.eventStateChange = (currentState): Promize => {
            this._instances.progressBar.lock();
            this._instances.loader.show();
            this._instances.dialog.close();
            this._instances.confirm.close();
            return this._instances.eventBus.call('state.change', [
                currentState,
            ]);
        };

        this._module.eventDomChange = (state, dom): Promize => {
            return this._instances.eventBus.call('dom.change', [state, dom]);
        };

        this._module.eventServiceLoaded = () => {
            // this._instances.geoLocation.setWatcher();
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
     * @private
     * @return {undefined}
     */
    private _loadModules(): void {
        this._instances.instances = this._instances;

        this._module.load(this._instances, this._injections);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initScript(): void {
        this._instances.script = new Script(this._instances.progressBar);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initStyle(): void {
        this._instances.style = new Style(this._instances.progressBar);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initConfig(): void {
        this._instances.config = this.options;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initApp(): void {
        this._instances.app = this;
    }
    /**
     * @private
     * @return {undefined}
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
                (message) => {
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
                (message) => {
                    this._instances.flash.addError(message);
                },
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initCookie(): void {
        this._instances.cookie = new Cookie({
            prefix: this.options.app_id,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initLoader(): void {
        this._instances.loader = new Loader();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initProgressBar(): void {
        this._instances.progressBar = new ProgressBar(
            this._instances.dialog,
            this._instances.confirm,
        );
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _initHelper(): void {
        this._instances.helper = new Helper();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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

        const flash = {
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
                (flash) => {
                    flash.node = this._instances[
                        this._injections.flash
                    ].addWarning(flash.message, flash.duration);
                },
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initEventBus(): void {
        this._instances.eventBus = new EventBus();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initScheduler(): void {
        this._instances.scheduler = new Scheduler();
    }
    /**
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
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
     * @private
     * @return {undefined}
     */
    private _initFlash(): void {
        this._instances.flash = new Flash();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initDialog(): void {
        this._instances.dialog = new Dialog(this._instances.http);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initConfirm(): void {
        this._instances.confirm = new Confirm();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initViewer(): void {
        this._instances.viewer = new Viewer();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHeader(): void {
        this._instances.header = new Header();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initTopMenu(): void {
        this._instances.topMenu = new TopMenu(this._instances.header);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initNavBar(): void {
        this._instances.navBar = new NavBar();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initBottomMenu(): void {
        this._instances.bottomMenu = new BottomMenu(this._instances.footer);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initLeftMenu(): void {
        this._instances.leftMenu = new LeftMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initFooter(): void {
        this._instances.footer = new Footer();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initBrowser(): void {
        this._instances.browser = new Browser();
        this._instances.browser.eventMissingFeatures = (features) => {
            this._instances.flash.addError(features.join(', '));
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initRoutes(): void {
        this._routeOptions = new Objekt();
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id: string, opt_params?: Object): void {
        this._routeOptions.set('root.id', id);
        this._routeOptions.set('root.params', opt_params);
    }
    /**
     * @param {string} name
     * @return {?Object}
     */
    getInstance(name: string): Object | null {
        return this._instances[name] ?? null;
    }
    /**
     * @return {?Object}
     */
    getController(): Object | null {
        return this._module.getController();
    }
    /**
     * @param {!Array<Route>} routes
     * @param {!Array<string>} services
     * @return {undefined}
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
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!ClassRef} moduleCallback
     * @return {string}
     */
    controller(
        name: string,
        moduleInjections: string[],
        moduleCallback: ClassRef,
    ): string {
        return this._module.add(name, moduleInjections, moduleCallback);
    }
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!ClassRef} moduleCallback
     * @return {string}
     */
    service(
        name: string,
        moduleInjections: string[],
        moduleCallback: ClassRef,
    ): string {
        return this._module.add(name, moduleInjections, moduleCallback);
    }
}
