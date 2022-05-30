import { PopupContainer } from './popupContainer';
import { TestRunner } from './testRunner';
import { Module } from '../core/module';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ActionCable } from '../module/actionCable';
import { BottomMenu } from '../module/bottomMenu';
import { Document } from '../module/document';
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
import { Sidebar } from '../module/sidebar';
import { Style } from '../module/style';
import { Template } from '../module/template';
import { TopMenu } from '../module/topMenu';
import { Viewer } from '../module/viewer';
import { Storage } from '../module/storage';
import { ServiceWorker } from '../module/serviceWorker';
import { Header } from '../module/header';
import { Event } from '../module/event';
import { Scheduler } from '../module/scheduler';
import { Window } from '../module/window';
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
    private _instances: Instance = {};
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
        this._initStorage();
        this._initLocale();
        this._initModule();
        this._initEvent();
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
        this._initDocument();
        this._initWindow();
        this._initHelper();
        this._initHeader();
        this._initTopMenu();
        this._initLeftMenu();
        this._initNavBar();
        this._initSidebar();
        this._initFooter();
        this._initBottomMenu();
        this._initBrowser();
        this._initGeoLocation();
        this._initScript();
        this._initStyle();
        this._initConfig();
        this._initServiceWorker();
        this._initActionCable();

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
        let locale =
            this._instances[this._injections.localStorage].get('app.locale');
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
        this._instances[this._injections.localStorage].set(
            'app.locale',
            locale,
        );
        this.options.locale = locale;
    }
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocaleWithReload(locale: string): void {
        this.setLocale(locale);
        this._instances[this._injections.state].reload();
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
        const rootNode = new Query('html').getItem();
        rootNode.removeClass('no-js');
        rootNode.addClass('sui-js');
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initModule(): void {
        this._module = new Module();

        this._module.eventAfterInit = () => {
            this._instances[this._injections.progressBar].lock();
            this._instances[this._injections.loader].show();
            this._instances[this._injections.event].call('module.afterInit');
        };

        this._module.eventStateChange = (currentState): Promize => {
            this._instances[this._injections.progressBar].lock();
            this._instances[this._injections.loader].show();
            this._instances[this._injections.dialog].close();
            this._instances[this._injections.confirm].close();
            this._instances[this._injections.actionCable].unsubscribeAll();
            return this._instances[this._injections.event].call(
                'state.change',
                [currentState],
            );
        };

        this._module.eventDomChange = (state, dom): Promize => {
            return this._instances[this._injections.event].call('dom.change', [
                state,
                dom,
            ]);
        };

        this._module.eventServiceLoaded = () => {
            // this._instances[this._injections.geoLocation].setWatcher();
            this._instances[this._injections.browser].detect();
            this._instances[this._injections.event].call(
                'module.serviceLoaded',
            );
        };

        this._module.eventServiceFailed = () => {
            this._instances[this._injections.event].call(
                'module.serviceFailed',
            );
        };

        this._module.eventModuleLoaded = (state): void => {
            this._instances[this._injections.progressBar].unlock();
            this._instances[this._injections.loader].hide(true);
            this._instances[this._injections.event].call('module.loaded', [
                state,
            ]);
        };

        this._module.eventModuleFailed = (state): void => {
            this._instances[this._injections.progressBar].unlock();
            this._instances[this._injections.loader].hide(true);
            this._instances[this._injections.event].call('module.failed', [
                state,
            ]);
        };

        this._module.eventControllerLoaded = (dom): void => {
            this._instances[this._injections.event].call('controller.loaded', [
                dom,
            ]);
        };

        this._module.eventControllerFailed = (): void => {
            this._instances[this._injections.event].call(
                'controller.failed',
                [],
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _loadModules(): void {
        this._instances[this._injections.instances] = this._instances;

        this._module.load(this._instances, this._injections);
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initScript(): void {
        this._instances[this._injections.script] = new Script(
            this._instances[this._injections.progressBar],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initStyle(): void {
        this._instances[this._injections.style] = new Style(
            this._instances[this._injections.progressBar],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initConfig(): void {
        this._instances[this._injections.config] = this.options;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initApp(): void {
        this._instances[this._injections.app] = this;
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initGeoLocation(): void {
        this._instances[this._injections.geoLocation] = new GeoLocation();

        this._instances[this._injections.geoLocation].eventChange = (
            latitude,
            longitude,
            message,
        ) => {
            this._instances[this._injections.event].override(
                'geoLocation.success',
                [message],
                (message) => {
                    this._instances[this._injections.flash].addInfo(message);
                },
            );
            this._instances[this._injections.event].call('geoLocation.change', [
                latitude,
                longitude,
            ]);
        };

        this._instances[this._injections.geoLocation].eventError = (
            message,
            code,
        ) => {
            this._instances[this._injections.event].override(
                'geoLocation.error',
                [message, code],
                (message) => {
                    this._instances[this._injections.flash].addError(message);
                },
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initCookie(): void {
        this._instances[this._injections.cookie] = new Cookie({
            prefix: this.options.app_id,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initLoader(): void {
        this._instances[this._injections.loader] = new Loader();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initProgressBar(): void {
        this._instances[this._injections.progressBar] = new ProgressBar(
            this._instances[this._injections.dialog],
            this._instances[this._injections.confirm],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initStorage(): void {
        this._instances[this._injections.localStorage] = new Storage('LOCAL', {
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
        this._instances[this._injections.sessionStorage] = new Storage(
            'SESSION',
            {
                prefix: this.options.app_id,
                secret: this.options.secret,
            },
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHelper(): void {
        this._instances[this._injections.helper] = new Helper();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initDocument(): void {
        const popupContainer = new PopupContainer();
        this._instances[this._injections.document] = new Document();
        this._instances[this._injections.document].eventClick = (
            target,
            event,
        ) => {
            popupContainer.closeAll();
            this._instances[this._injections.event].call('document.click', [
                target,
                event,
            ]);
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initWindow(): void {
        this._instances[this._injections.window] = new Window();
        const width = this._instances[this._injections.window].getWidth();
        const height = this._instances[this._injections.window].getHeight();
        this._instances[this._injections.dialog].setSize(width, height);
        this._instances[this._injections.confirm].setSize(width, height);
        this._instances[this._injections.viewer].setSize(width, height);

        this._instances[this._injections.window].eventResize = (
            width,
            height,
            event,
        ) => {
            this._instances[this._injections.dialog].setSize(width, height);
            this._instances[this._injections.confirm].setSize(width, height);
            this._instances[this._injections.viewer].setSize(width, height);
            this._instances[this._injections.event].call('window.resize', [
                width,
                height,
                event,
            ]);
        };

        this._instances[this._injections.window].eventOrientationChange = (
            orientation,
            width,
            height,
            event,
        ) => {
            this._instances[this._injections.dialog].setSize(width, height);
            this._instances[this._injections.confirm].setSize(width, height);
            this._instances[this._injections.viewer].setSize(width, height);
            this._instances[this._injections.event].call(
                'window.orientationChange',
                [orientation, width, height, event],
            );
        };

        this._instances[this._injections.window].eventScroll = (
            scrollTop,
            event,
        ) => {
            this._instances[this._injections.event].call('window.scroll', [
                scrollTop,
                event,
            ]);
        };

        this._instances[this._injections.window].eventColorSchemeChange = (
            colorScheme,
            event,
        ) => {
            this._instances[this._injections.event].call(
                'window.colorSchemeChange',
                [colorScheme, event],
            );
        };

        const flash = {
            node: null,
            message: 'Unable to connect to the Internet',
            duration: Infinity,
        };
        this._instances[this._injections.window].eventOnline = () => {
            if (flash.node) {
                this._instances[this._injections.flash].remove(flash.node);
            }
        };

        this._instances[this._injections.window].eventOffline = (event) => {
            this._instances[this._injections.event].override(
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
    private _initEvent(): void {
        this._instances[this._injections.event] = new Event();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initScheduler(): void {
        this._instances[this._injections.scheduler] = new Scheduler();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHttp(): void {
        this._instances[this._injections.http] = new Http(this.options);
        this._instances[this._injections.http].eventBeforeRequest = (
            ...params
        ) => {
            this._instances[this._injections.progressBar].show();
            this._instances[this._injections.event].call(
                'http.beforeRequest',
                params,
            );
        };
        this._instances[this._injections.http].eventAfterRequest = (
            ...params
        ) => {
            this._instances[this._injections.event].call(
                'http.afterRequest',
                params,
            );
            this._instances[this._injections.progressBar].hide();
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initTemplate(): void {
        this._instances[this._injections.template] = new Template(
            this._instances[this._injections.http],
            {
                locale: this.getLocale(),
            },
        );
        this._instances[this._injections.template].eventError = (message) => {
            this._instances[this._injections.state].back();
            this._instances[this._injections.loader].hide();
            this._instances[this._injections.flash].addMessage(message);
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initFlash(): void {
        this._instances[this._injections.flash] = new Flash();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initDialog(): void {
        this._instances[this._injections.dialog] = new Dialog(
            this._instances[this._injections.http],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initConfirm(): void {
        this._instances[this._injections.confirm] = new Confirm();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initViewer(): void {
        this._instances[this._injections.viewer] = new Viewer();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initHeader(): void {
        this._instances[this._injections.header] = new Header();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initTopMenu(): void {
        this._instances[this._injections.topMenu] = new TopMenu(
            this._instances[this._injections.header],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initNavBar(): void {
        this._instances[this._injections.navBar] = new NavBar();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initBottomMenu(): void {
        this._instances[this._injections.bottomMenu] = new BottomMenu(
            this._instances[this._injections.footer],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initSidebar(): void {
        this._instances[this._injections.leftSidebar] = new Sidebar(
            '#left-sidebar',
        );

        this._instances[this._injections.rightSidebar] = new Sidebar(
            '#right-sidebar',
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initLeftMenu(): void {
        this._instances[this._injections.leftMenu] = new LeftMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initFooter(): void {
        this._instances[this._injections.footer] = new Footer();
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initBrowser(): void {
        this._instances[this._injections.browser] = new Browser();
        this._instances[this._injections.browser].eventMissingFeatures = (
            features,
        ) => {
            this._instances[this._injections.flash].addError(
                features.join(', '),
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initServiceWorker(): void {
        this._instances[this._injections.serviceWorker] = new ServiceWorker();
        this._instances[this._injections.serviceWorker].eventMissingFeatures = (
            features,
        ) => {
            this._instances[this._injections.flash].addError(
                features.join(', '),
            );
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    private _initActionCable(): void {
        this._instances[this._injections.actionCable] = new ActionCable();
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
            const testRunner = new TestRunner();
            testRunner.run();
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
