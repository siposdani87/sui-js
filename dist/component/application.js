import { PopupContainer } from './popupContainer';
import { Module } from '../core/module';
import { Objekt } from '../core/objekt';
import { Query } from '../core/query';
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
import { Style } from '../module/style';
import { Template } from '../module/template';
import { TopMenu } from '../module/topMenu';
import { Viewer } from '../module/viewer';
import { Storage } from '../module/storage';
import { ServiceWorker } from '../module/serviceWorker';
import { Header } from '../module/header';
import { EventBus } from '../module/eventBus';
import { Scheduler } from '../module/scheduler';
import { Window } from '../module/window';
import { setDateIOLocale } from '../utils/dateio';
/**
 * @class
 */
export class Application {
    /**
     * @param {!Object} options
     * @param {!Injection} resources
     */
    constructor(options, resources) {
        this._injections = {};
        this._instances = {};
        this._setOptions(options);
        this._init(resources);
    }
    /**
     * @private
     * @param {!Object} options
     * @return {undefined}
     */
    _setOptions(options) {
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
    _init(resources) {
        this._injections = resources;
        this._initCertificate();
        this._initApp();
        this._initRoutes();
        this._initStorage();
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
        this._initDocument();
        this._initWindow();
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
        this._initServiceWorker();
        this._loadModules();
    }
    /**
     * @return {string}
     */
    getLanguage() {
        const locale = this.getLocale();
        return locale.split('-', 2)[0];
    }
    /**
     * @return {string}
     */
    getLocale() {
        let locale = this._instances[this._injections.localStorage].get('app.locale');
        if (!locale) {
            locale = this.options.locale;
        }
        return locale;
    }
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocale(locale) {
        this._instances[this._injections.localStorage].set('app.locale', locale);
        this.options.locale = locale;
    }
    /**
     * @param {string} locale
     * @return {undefined}
     */
    setLocaleWithReload(locale) {
        this.setLocale(locale);
        this._instances[this._injections.state].reload();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initLocale() {
        const locale = this.getLocale();
        setDateIOLocale(locale);
        this.setLocale(locale);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCertificate() {
        const rootKnot = new Query('html').getKnot();
        rootKnot.addClass('sui-js');
    }
    /**
     * @private
     * @return {undefined}
     */
    _initModule() {
        this._module = new Module();
        this._module.eventAfterInit = () => {
            this._instances[this._injections.progressBar].lock();
            this._instances[this._injections.loader].show();
            this._instances[this._injections.eventBus].call('module.afterInit');
        };
        this._module.eventStateChange = (currentState) => {
            this._instances[this._injections.progressBar].lock();
            this._instances[this._injections.loader].show();
            this._instances[this._injections.dialog].close();
            this._instances[this._injections.confirm].close();
            return this._instances[this._injections.eventBus].call('state.change', [currentState]);
        };
        this._module.eventDomChange = (state, dom) => {
            return this._instances[this._injections.eventBus].call('dom.change', [state, dom]);
        };
        this._module.eventServiceLoaded = () => {
            // this._instances[this._injections.geoLocation].setWatcher();
            this._instances[this._injections.browser].detect();
            this._instances[this._injections.eventBus].call('module.serviceLoaded');
        };
        this._module.eventServiceFailed = () => {
            this._instances[this._injections.eventBus].call('module.serviceFailed');
        };
        this._module.eventModuleLoaded = (state) => {
            this._instances[this._injections.progressBar].unlock();
            this._instances[this._injections.loader].hide(true);
            this._instances[this._injections.eventBus].call('module.loaded', [
                state,
            ]);
        };
        this._module.eventModuleFailed = (state) => {
            this._instances[this._injections.progressBar].unlock();
            this._instances[this._injections.loader].hide(true);
            this._instances[this._injections.eventBus].call('module.failed', [
                state,
            ]);
        };
        this._module.eventControllerLoaded = (dom) => {
            this._instances[this._injections.eventBus].call('controller.loaded', [dom]);
        };
        this._module.eventControllerFailed = () => {
            this._instances[this._injections.eventBus].call('controller.failed', []);
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _loadModules() {
        this._instances[this._injections.instances] = this._instances;
        this._module.load(this._instances, this._injections);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initScript() {
        this._instances[this._injections.script] = new Script(this._instances[this._injections.progressBar]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStyle() {
        this._instances[this._injections.style] = new Style(this._instances[this._injections.progressBar]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initConfig() {
        this._instances[this._injections.config] = this.options;
    }
    /**
     * @private
     * @return {undefined}
     */
    _initApp() {
        this._instances[this._injections.app] = this;
    }
    /**
     * @private
     * @return {undefined}
     */
    _initGeoLocation() {
        this._instances[this._injections.geoLocation] = new GeoLocation();
        this._instances[this._injections.geoLocation].eventChange = (latitude, longitude, message) => {
            this._instances[this._injections.eventBus].override('geoLocation.success', [message], (message) => {
                this._instances[this._injections.flash].addInfo(message);
            });
            this._instances[this._injections.eventBus].call('geoLocation.change', [latitude, longitude]);
        };
        this._instances[this._injections.geoLocation].eventError = (message, code) => {
            this._instances[this._injections.eventBus].override('geoLocation.error', [message, code], (message) => {
                this._instances[this._injections.flash].addError(message);
            });
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initCookie() {
        this._instances[this._injections.cookie] = new Cookie({
            prefix: this.options.app_id,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initLoader() {
        this._instances[this._injections.loader] = new Loader();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initProgressBar() {
        this._instances[this._injections.progressBar] = new ProgressBar(this._instances[this._injections.dialog], this._instances[this._injections.confirm]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initStorage() {
        this._instances[this._injections.localStorage] = new Storage('LOCAL', {
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
        this._instances[this._injections.sessionStorage] = new Storage('SESSION', {
            prefix: this.options.app_id,
            secret: this.options.secret,
        });
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHelper() {
        this._instances[this._injections.helper] = new Helper();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDocument() {
        const popupContainer = new PopupContainer();
        this._instances[this._injections.document] = new Document();
        this._instances[this._injections.document].eventClick = (target, event) => {
            popupContainer.closeAll();
            this._instances[this._injections.eventBus].call('document.click', [
                target,
                event,
            ]);
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initWindow() {
        this._instances[this._injections.window] = new Window();
        const width = this._instances[this._injections.window].getWidth();
        const height = this._instances[this._injections.window].getHeight();
        this._instances[this._injections.dialog].setSize(width, height);
        this._instances[this._injections.confirm].setSize(width, height);
        this._instances[this._injections.viewer].setSize(width, height);
        this._instances[this._injections.window].eventResize = (width, height, event) => {
            this._instances[this._injections.dialog].setSize(width, height);
            this._instances[this._injections.confirm].setSize(width, height);
            this._instances[this._injections.viewer].setSize(width, height);
            this._instances[this._injections.eventBus].call('window.resize', [
                width,
                height,
                event,
            ]);
        };
        this._instances[this._injections.window].eventOrientationChange = (orientation, width, height, event) => {
            this._instances[this._injections.dialog].setSize(width, height);
            this._instances[this._injections.confirm].setSize(width, height);
            this._instances[this._injections.viewer].setSize(width, height);
            this._instances[this._injections.eventBus].call('window.orientationChange', [orientation, width, height, event]);
        };
        this._instances[this._injections.window].eventScroll = (scrollTop, event) => {
            this._instances[this._injections.eventBus].call('window.scroll', [
                scrollTop,
                event,
            ]);
        };
        this._instances[this._injections.window].eventColorSchemeChange = (colorScheme, event) => {
            this._instances[this._injections.eventBus].call('window.colorSchemeChange', [colorScheme, event]);
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
            this._instances[this._injections.eventBus].override('window.offline', [flash, event], (flash) => {
                flash.node = this._instances[this._injections.flash].addWarning(flash.message, flash.duration);
            });
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initEventBus() {
        this._instances[this._injections.eventBus] = new EventBus();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initScheduler() {
        this._instances[this._injections.scheduler] = new Scheduler();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHttp() {
        this._instances[this._injections.http] = new Http(this.options);
        this._instances[this._injections.http].eventBeforeRequest = (...params) => {
            this._instances[this._injections.progressBar].show();
            this._instances[this._injections.eventBus].call('http.beforeRequest', params);
        };
        this._instances[this._injections.http].eventAfterRequest = (...params) => {
            this._instances[this._injections.eventBus].call('http.afterRequest', params);
            this._instances[this._injections.progressBar].hide();
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initTemplate() {
        this._instances[this._injections.template] = new Template(this._instances[this._injections.http], {
            locale: this.getLocale(),
        });
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
    _initFlash() {
        this._instances[this._injections.flash] = new Flash();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initDialog() {
        this._instances[this._injections.dialog] = new Dialog(this._instances[this._injections.http]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initConfirm() {
        this._instances[this._injections.confirm] = new Confirm();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initViewer() {
        this._instances[this._injections.viewer] = new Viewer();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initHeader() {
        this._instances[this._injections.header] = new Header();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initTopMenu() {
        this._instances[this._injections.topMenu] = new TopMenu(this._instances[this._injections.header]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initNavBar() {
        this._instances[this._injections.navBar] = new NavBar();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initBottomMenu() {
        this._instances[this._injections.bottomMenu] = new BottomMenu(this._instances[this._injections.footer]);
    }
    /**
     * @private
     * @return {undefined}
     */
    _initLeftMenu() {
        this._instances[this._injections.leftMenu] = new LeftMenu();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initFooter() {
        this._instances[this._injections.footer] = new Footer();
    }
    /**
     * @private
     * @return {undefined}
     */
    _initBrowser() {
        this._instances[this._injections.browser] = new Browser();
        this._instances[this._injections.browser].eventMissingFeatures = (features) => {
            this._instances[this._injections.flash].addError(features.join(', '));
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initServiceWorker() {
        this._instances[this._injections.serviceWorker] = new ServiceWorker();
        this._instances[this._injections.serviceWorker].eventMissingFeatures = (features) => {
            this._instances[this._injections.flash].addError(features.join(', '));
        };
    }
    /**
     * @private
     * @return {undefined}
     */
    _initRoutes() {
        this._routeOptions = new Objekt();
    }
    /**
     * @param {string} id
     * @param {!Object=} opt_params
     * @return {undefined}
     */
    setRootState(id, opt_params) {
        this._routeOptions.set('root.id', id);
        this._routeOptions.set('root.params', opt_params);
    }
    /**
     * @param {string} name
     * @return {?Object}
     */
    getInstance(name) {
        var _a;
        return (_a = this._instances[name]) !== null && _a !== void 0 ? _a : null;
    }
    /**
     * @return {?Object}
     */
    getController() {
        return this._module.getController();
    }
    /**
     * @param {!Array<Route>} routes
     * @param {!Array<string>} services
     * @return {undefined}
     */
    run(routes, services) {
        if (this.options.production) {
            console.info('%cApplication run in production environment...', `font-weight:bold;color:${this.options.theme_color};`);
        }
        else {
            console.info('%cApplication run in development environment...', `font-weight:bold;color:${this.options.theme_color};`);
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
    controller(name, moduleInjections, moduleCallback) {
        return this._module.add(name, moduleInjections, moduleCallback);
    }
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!ClassRef} moduleCallback
     * @return {string}
     */
    service(name, moduleInjections, moduleCallback) {
        return this._module.add(name, moduleInjections, moduleCallback);
    }
}
