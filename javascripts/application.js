goog.provide('SUI.Application');

goog.require('SUI');
goog.require('SUI.PopupContainer');
goog.require('SUI.Module');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Promise');
goog.require('SUI.Query');
goog.require('SUI.Test');

goog.require('SUI.ActionCable');
goog.require('SUI.BottomMenu');
goog.require('SUI.Browser');
goog.require('SUI.Confirm');
goog.require('SUI.Cookie');
goog.require('SUI.Dialog');
goog.require('SUI.Document');
goog.require('SUI.Event');
goog.require('SUI.Footer');
goog.require('SUI.GeoLocation');
goog.require('SUI.Header');
goog.require('SUI.Helper');
goog.require('SUI.Http');
goog.require('SUI.LeftMenu');
goog.require('SUI.Loader');
goog.require('SUI.NavBar');
goog.require('SUI.Flash');
goog.require('SUI.ProgressBar');
goog.require('SUI.Scheduler');
goog.require('SUI.Script');
goog.require('SUI.ServiceWorker');
goog.require('SUI.Sidebar');
goog.require('SUI.Storage');
goog.require('SUI.Style');
goog.require('SUI.Template');
goog.require('SUI.TopMenu');
goog.require('SUI.Viewer');
goog.require('SUI.Window');

/**
 * @constructor
 * @export
 * @this {SUI.Application}
 * @param {!Object} options
 * @param {!Object} resources
 */
SUI.Application = function(options, resources) {
  this._setOptions(options);
  this._init(resources);
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.Application.prototype._setOptions = function(options) {
  const _self = this;
  _self.options = new SUI.Object({
    app_id: 'sui-app',
    locale: navigator.language,
    backend: '',
    production: false,
    secret: 'f74pej3qpb9qmpvregu7ef33m5w6f6qz',
    log_color: '#3f51b5',
  });
  _self.options.merge(options);
};

/**
 * @private
 * @param {!Object} resources
 * @return {undefined}
 */
SUI.Application.prototype._init = function(resources) {
  this.types = {};
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
};

/**
 * @return {string}
 */
SUI.Application.prototype.getLanguage = function() {
  const locale = this.getLocale();
  return locale.split('-', 2)[0];
};

/**
 * @return {string}
 */
SUI.Application.prototype.getLocale = function() {
  let locale = this._instances[this._injections.localStorage].get('app.locale');
  if (!locale) {
    locale = this.options.locale;
  }
  return locale;
};

/**
 * @param {string} locale
 * @return {undefined}
 */
SUI.Application.prototype.setLocale = function(locale) {
  this._instances[this._injections.localStorage].set('app.locale', locale);
  this.options.locale = locale;
};

/**
 * @param {string} locale
 * @return {undefined}
 */
SUI.Application.prototype.setLocaleWithReload = function(locale) {
  this.setLocale(locale);
  this._instances[this._injections.state].reload();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initLocale = function() {
  const locale = this.getLocale();
  window['moment']['locale'](locale);
  this.setLocale(locale);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initCertificate = function() {
  const rootNode = new SUI.Query('html').getItem();
  rootNode.removeClass('no-js');
  rootNode.addClass('sui-js');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initModule = function() {
  this._module = new SUI.Module();

  this._module.eventAfterInit = () => {
    this._instances[this._injections.progressBar].lock();
    this._instances[this._injections.loader].show();
    this._instances[this._injections.event].call('module.afterInit');
  };

  this._module.eventStateChange = /** @type {function(!SUI.Object):!SUI.Promise} */ ((currentState) => {
    this._instances[this._injections.progressBar].lock();
    this._instances[this._injections.loader].show();
    this._instances[this._injections.dialog].close();
    this._instances[this._injections.confirm].close();
    this._instances[this._injections.actionCable].unsubscribeAll();
    return this._instances[this._injections.event].call('state.change', [currentState]);
  });

  this._module.eventDomChange = /** @type {function(!SUI.Object, !SUI.Node):!SUI.Promise} */ ((state, dom) => {
    return this._instances[this._injections.event].call('dom.change', [state, dom]);
  });

  this._module.eventServiceLoaded = () => {
    // this._instances[this._injections.geoLocation].setWatcher();
    this._instances[this._injections.browser].detect();
    this._instances[this._injections.event].call('module.serviceLoaded');
  };

  this._module.eventServiceFailed = () => {
    this._instances[this._injections.event].call('module.serviceFailed');
  };

  this._module.eventModuleLoaded = /** @type {function(!SUI.Object):undefined} */ ((state) => {
    this._instances[this._injections.progressBar].unlock();
    this._instances[this._injections.loader].hide(true);
    this._instances[this._injections.event].call('module.loaded', [state]);
  });

  this._module.eventModuleFailed = /** @type {function(!SUI.Object):undefined} */ ((state) => {
    this._instances[this._injections.progressBar].unlock();
    this._instances[this._injections.loader].hide(true);
    this._instances[this._injections.event].call('module.failed', [state]);
  });

  this._module.eventControllerLoaded = /** @type {function(!SUI.Node):undefined} */ ((dom) => {
    this._instances[this._injections.event].call('controller.loaded', [dom]);
  });

  this._module.eventControllerFailed = /** @type {function():undefined} */ (() => {
    this._instances[this._injections.event].call('controller.failed', []);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._loadModules = function() {
  this._module.load(this._instances, this._injections);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initScript = function() {
  this._instances[this._injections.script] = new SUI.Script(this._instances[this._injections.progressBar]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initStyle = function() {
  this._instances[this._injections.style] = new SUI.Style(this._instances[this._injections.progressBar]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initConfig = function() {
  this._instances[this._injections.config] = this.options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initApp = function() {
  this._instances[this._injections.app] = this;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initGeoLocation = function() {
  this._instances[this._injections.geoLocation] = new SUI.GeoLocation();

  this._instances[this._injections.geoLocation].eventChange = (latitude, longitude, message) => {
    this._instances[this._injections.event].override('geoLocation.success', [message], (message) => {
      this._instances[this._injections.flash].addInfo(message);
    });
    this._instances[this._injections.event].call('geoLocation.change', [latitude, longitude]);
  };

  this._instances[this._injections.geoLocation].eventError = (message, code) => {
    this._instances[this._injections.event].override('geoLocation.error', [message, code], (message) => {
      this._instances[this._injections.flash].addError(message);
    });
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initCookie = function() {
  this._instances[this._injections.cookie] = new SUI.Cookie({
    prefix: this.options.app_id,
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initLoader = function() {
  this._instances[this._injections.loader] = new SUI.Loader();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initProgressBar = function() {
  this._instances[this._injections.progressBar] = new SUI.ProgressBar(this._instances[this._injections.dialog], this._instances[this._injections.confirm]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initStorage = function() {
  this._instances[this._injections.localStorage] = new SUI.Storage({
    type: 'local',
    prefix: this.options.app_id,
    secret: this.options.secret,
  });
  this._instances[this._injections.sessionStorage] = new SUI.Storage({
    type: 'session',
    prefix: this.options.app_id,
    secret: this.options.secret,
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initHelper = function() {
  this._instances[this._injections.helper] = new SUI.Helper();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initDocument = function() {
  const popupContainer = new SUI.PopupContainer();
  this._instances[this._injections.document] = new SUI.Document();
  this._instances[this._injections.document].eventClick = function(target, event) {
    popupContainer.closeAll();
    this._instances[this._injections.event].call('document.click', [target, event]);
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initWindow = function() {
  this._instances[this._injections.window] = new SUI.Window();
  const width = this._instances[this._injections.window].getWidth();
  const height = this._instances[this._injections.window].getHeight();
  this._instances[this._injections.dialog].setSize(width, height);
  this._instances[this._injections.confirm].setSize(width, height);
  this._instances[this._injections.viewer].setSize(width, height);

  this._instances[this._injections.window].eventResize = function(width, height, event) {
    this._instances[this._injections.dialog].setSize(width, height);
    this._instances[this._injections.confirm].setSize(width, height);
    this._instances[this._injections.viewer].setSize(width, height);
    this._instances[this._injections.event].call('window.resize', [width, height, event]);
  }.bind(this);

  this._instances[this._injections.window].eventOrientationChange = function(orientation, width, height, event) {
    this._instances[this._injections.dialog].setSize(width, height);
    this._instances[this._injections.confirm].setSize(width, height);
    this._instances[this._injections.viewer].setSize(width, height);
    this._instances[this._injections.event].call('window.orientationChange', [orientation, width, height, event]);
  }.bind(this);

  this._instances[this._injections.window].eventScroll = function(scrollTop, event) {
    this._instances[this._injections.event].call('window.scroll', [scrollTop, event]);
  }.bind(this);

  this._instances[this._injections.window].eventColorSchemeChange = function(colorScheme, event) {
    this._instances[this._injections.event].call('window.colorSchemeChange', [colorScheme, event]);
  }.bind(this);

  const flash = {
    node: null,
    message: 'Unable to connect to the Internet',
    duration: Infinity,
  };
  this._instances[this._injections.window].eventOnline = function() {
    if (flash.node) {
      this._instances[this._injections.flash].remove(flash.node);
    }
  }.bind(this);

  this._instances[this._injections.window].eventOffline = function(event) {
    this._instances[this._injections.event].override('window.offline', [flash, event], function(flash) {
      flash.node = this._instances[this._injections.flash].addWarning(flash.message, flash.duration);
    }.bind(this));
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initEvent = function() {
  this._instances[this._injections.event] = new SUI.Event();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initScheduler = function() {
  this._instances[this._injections.scheduler] = new SUI.Scheduler();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initHttp = function() {
  this._instances[this._injections.http] = new SUI.Http(this.options);
  this._instances[this._injections.http].eventBeforeRequest = function(...params) {
    this._instances[this._injections.progressBar].show();
    this._instances[this._injections.event].call('http.beforeRequest', params);
  }.bind(this);
  this._instances[this._injections.http].eventAfterRequest = function(...params) {
    this._instances[this._injections.event].call('http.afterRequest', params);
    this._instances[this._injections.progressBar].hide();
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initTemplate = function() {
  this._instances[this._injections.template] = new SUI.Template(this._instances[this._injections.http], {
    locale: this.getLocale(),
  });
  this._instances[this._injections.template].eventError = function(message) {
    this._instances[this._injections.state].back();
    this._instances[this._injections.loader].hide();
    this._instances[this._injections.flash].addMessage(message);
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initFlash = function() {
  this._instances[this._injections.flash] = new SUI.Flash();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initDialog = function() {
  this._instances[this._injections.dialog] = new SUI.Dialog(this._instances[this._injections.http]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initConfirm = function() {
  this._instances[this._injections.confirm] = new SUI.Confirm();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initViewer = function() {
  this._instances[this._injections.viewer] = new SUI.Viewer();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initHeader = function() {
  this._instances[this._injections.header] = new SUI.Header();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initTopMenu = function() {
  this._instances[this._injections.topMenu] = new SUI.TopMenu(this._instances[this._injections.header]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initNavBar = function() {
  this._instances[this._injections.navBar] = new SUI.NavBar();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initBottomMenu = function() {
  this._instances[this._injections.bottomMenu] = new SUI.BottomMenu(this._instances[this._injections.footer]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initSidebar = function() {
  this._instances[this._injections.leftSidebar] = new SUI.Sidebar('#left-sidebar');

  this._instances[this._injections.rightSidebar] = new SUI.Sidebar('#right-sidebar');
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initLeftMenu = function() {
  this._instances[this._injections.leftMenu] = new SUI.LeftMenu();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initFooter = function() {
  this._instances[this._injections.footer] = new SUI.Footer();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initBrowser = function() {
  this._instances[this._injections.browser] = new SUI.Browser();
  this._instances[this._injections.browser].eventMissingFeatures = (features) => {
    this._instances[this._injections.flash].addError(features.join(', '));
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initServiceWorker = function() {
  this._instances[this._injections.serviceWorker] = new SUI.ServiceWorker();
  this._instances[this._injections.serviceWorker].eventMissingFeatures = (features) => {
    this._instances[this._injections.flash].addError(features.join(', '));
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initActionCable = function() {
  this._instances[this._injections.actionCable] = new SUI.ActionCable();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Application.prototype._initRoutes = function() {
  this._routes = [];
  this._routeOptions = new SUI.Object();
};

/**
 * @param {string} id
 * @param {string} title
 * @param {string} url
 * @param {string} controller
 * @param {string=} opt_template
 * @param {!Object=} opt_params
 * @return {undefined}
 */
SUI.Application.prototype.addState = function(id, title, url, controller, opt_template = '', opt_params = {}) {
  const state = new SUI.Object(opt_params);
  state.set('id', id);
  state.set('title', title);
  state.set('url', url);
  state.set('controller', controller);
  state.set('template', opt_template);
  this._routes.push(state);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {undefined}
 */
SUI.Application.prototype.setRootState = function(id, opt_params) {
  this._routeOptions.set('root.id', id);
  this._routeOptions.set('root.params', opt_params);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {undefined}
 */
SUI.Application.prototype.setHomeState = function(id, opt_params) {
  this._routeOptions.set('home.id', id);
  this._routeOptions.set('home.params', opt_params);
};

/**
 * @param {string} name
 * @return {?Object}
 */
SUI.Application.prototype.getInstance = function(name) {
  return this._instances[name];
};

/**
 * @return {?Object}
 */
SUI.Application.prototype.getController = function() {
  return this._module.getController();
};

/**
 * @export
 * @return {undefined}
 */
SUI.Application.prototype.run = function() {
  if (this.options.production) {
    console.info('%cApplication run in production environment...', `font-weight:bold;color:${this.options.log_color};`);
  } else {
    console.info('%cApplication run in development environment...', `font-weight:bold;color:${this.options.log_color};`);
    const test = new SUI.Test();
    test.run();
  }
  this._module.handleRoutes(this._routes, this._routeOptions);
  this._module.handleServices();
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 */
SUI.Application.prototype.controller = function(name, moduleInjections, moduleCallback) {
  this._module.add(name, moduleInjections, moduleCallback);
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 */
SUI.Application.prototype.service = function(name, moduleInjections, moduleCallback) {
  this._module.add(name, moduleInjections, moduleCallback);
};
