import { PopupContainer } from './popupContainer';
import { Test } from './test';
import { Module } from '../core/module';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
import { ActionCable } from '../module/actionCable';
import { BottomMenu } from '../module/bottomMenu';
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
import { Promize } from '../core';

/**
 * @class
 * @export
 */
export class Application {
    options: Objekt;
    _injections: any;
    _instances: {
        [key: string]: any;
    };
    _module: Module;
    _routes: Objekt[];
    _routeOptions: Objekt;
    /**
     * @param {!Object} options
     * @param {!Object} resources
     */
    constructor(options: object, resources: object) {
        this._setOptions(options);
        this._init(resources);
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options: object): void {
        const _self = this;
        _self.options = new Objekt({
            app_id: 'sui-app',
            locale: navigator.language,
            backend: '',
            production: false,
            secret: 'f74pej3qpb9qmpvregu7ef33m5w6f6qz',
            log_color: '#3f51b5',
        });
        _self.options.merge(options);
    }
    /**
     * @private
     * @param {!Object} resources
     * @return {undefined}
     */
    _init(resources: object): void {
        this._injections = resources;
        this._instances = {};

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
    _initLocale(): void {
        const locale = this.getLocale();
        window['moment']['locale'](locale);
        this.setLocale(locale);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCertificate(): void {
        const rootNode = new Query('html').getItem();
        rootNode.removeClass('no-js');
        rootNode.addClass('sui-js');
    }
    /**
     * @private
     * @return {undefined}
     */
    _initModule(): void {
        this._module = new Module();

        this._module.eventAfterInit = () => {
            this._instances[this._injections.progressBar].lock();
            this._instances[this._injections.loader].show();
            this._instances[this._injections.event].call('module.afterInit');
        };

        this._module.eventStateChange =
            /** @type {function(!Objekt):!Promize} */ (currentState): Promize => {
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

        this._module.eventDomChange =
            /** @type {function(!Objekt, !Item):!Promize} */ (state, dom): Promize => {
                return this._instances[this._injections.event].call(
                    'dom.change',
                    [state, dom],
                );
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

        this._module.eventModuleLoaded =
            /** @type {function(!Objekt):undefined} */ (state): void => {
                this._instances[this._injections.progressBar].unlock();
                this._instances[this._injections.loader].hide(true);
                this._instances[this._injections.event].call('module.loaded', [
                    state,
                ]);
            };

        this._module.eventModuleFailed =
            /** @type {function(!Objekt):undefined} */ (state): void => {
                this._instances[this._injections.progressBar].unlock();
                this._instances[this._injections.loader].hide(true);
                this._instances[this._injections.event].call('module.failed', [
                    state,
                ]);
            };

        this._module.eventControllerLoaded =
            /** @type {function(!Item):undefined} */ (dom): void => {
                this._instances[this._injections.event].call(
                    'controller.loaded',
                    [dom],
                );
            };

        this._module.eventControllerFailed =
            /** @type {function():undefined} */ (): void => {
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
    _loadModules(): void {
        this._module.load(this._instances, this._injections);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initScript(): void {
        this._instances[this._injections.script] = new Script(
            this._instances[this._injections.progressBar],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStyle(): void {
        this._instances[this._injections.style] = new Style(
            this._instances[this._injections.progressBar],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initConfig(): void {
        this._instances[this._injections.config] = this.options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _initApp(): void {
        this._instances[this._injections.app] = this;
    }
    /**
     * @private
     * @return {undefined}
     */
    _initGeoLocation(): void {
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
    _initCookie(): void {
        this._instances[this._injections.cookie] = new Cookie({
            prefix: this.options.app_id,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initLoader(): void {
        this._instances[this._injections.loader] = new Loader();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initProgressBar(): void {
        this._instances[this._injections.progressBar] = new ProgressBar(
            this._instances[this._injections.dialog],
            this._instances[this._injections.confirm],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStorage(): void {
        this._instances[this._injections.localStorage] = new Storage({
            type: 'local',
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
        this._instances[this._injections.sessionStorage] = new Storage({
            type: 'session',
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHelper(): void {
        this._instances[this._injections.helper] = new Helper();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDocument(): void {
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
    _initWindow(): void {
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
    _initEvent(): void {
        this._instances[this._injections.event] = new Event();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initScheduler(): void {
        this._instances[this._injections.scheduler] = new Scheduler();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHttp(): void {
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
    _initTemplate(): void {
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
    _initFlash(): void {
        this._instances[this._injections.flash] = new Flash();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDialog(): void {
        this._instances[this._injections.dialog] = new Dialog(
            this._instances[this._injections.http],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initConfirm(): void {
        this._instances[this._injections.confirm] = new Confirm();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initViewer(): void {
        this._instances[this._injections.viewer] = new Viewer();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHeader(): void {
        this._instances[this._injections.header] = new Header();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initTopMenu(): void {
        this._instances[this._injections.topMenu] = new TopMenu(
            this._instances[this._injections.header],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initNavBar(): void {
        this._instances[this._injections.navBar] = new NavBar();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initBottomMenu(): void {
        this._instances[this._injections.bottomMenu] = new BottomMenu(
            this._instances[this._injections.footer],
        );
    }
    /**
     * @private
     * @return {undefined}
     */
    _initSidebar(): void {
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
    _initLeftMenu(): void {
        this._instances[this._injections.leftMenu] = new LeftMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initFooter(): void {
        this._instances[this._injections.footer] = new Footer();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initBrowser(): void {
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
    _initServiceWorker(): void {
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
    _initActionCable(): void {
        this._instances[this._injections.actionCable] = new ActionCable();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initRoutes(): void {
        this._routes = [];
        this._routeOptions = new Objekt();
    }
    /**
     * @param {string} id
     * @param {string} title
     * @param {string} url
     * @param {string} controller
     * @param {string=} opt_template
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    addState(id: string, title: string, url: string, controller: string, opt_template: string | undefined = '', opt_params: object | undefined = {}): void {
        const state = new Objekt(opt_params);
        state.set('id', id);
        state.set('title', title);
        state.set('url', url);
        state.set('controller', controller);
        state.set('template', opt_template);
        this._routes.push(state);
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id: string, opt_params: object | undefined): void {
        this._routeOptions.set('root.id', id);
        this._routeOptions.set('root.params', opt_params);
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setHomeState(id: string, opt_params: object | undefined): void {
        this._routeOptions.set('home.id', id);
        this._routeOptions.set('home.params', opt_params);
    }
    /**
     * @param {string} name
     * @return {?Object}
     */
    getInstance(name: string): object | null {
        return this._instances[name];
    }
    /**
     * @return {?Object}
     */
    getController(): object | null {
        return this._module.getController();
    }
    /**
     * @export
     * @return {undefined}
     */
    run(): void {
        if (this.options.production) {
            console.info(
                '%cApplication run in production environment...',
                `font-weight:bold;color:${this.options.log_color};`,
            );
        } else {
            console.info(
                '%cApplication run in development environment...',
                `font-weight:bold;color:${this.options.log_color};`,
            );
            const test = new Test();
            test.run();
        }
        this._module.handleRoutes(this._routes, this._routeOptions);
        this._module.handleServices();
    }
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     */
    controller(name: string, moduleInjections: Array<any>, moduleCallback: Function) {
        this._module.add(name, moduleInjections, moduleCallback);
    }
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     */
    service(name: string, moduleInjections: Array<any>, moduleCallback: Function) {
        this._module.add(name, moduleInjections, moduleCallback);
    }
}
