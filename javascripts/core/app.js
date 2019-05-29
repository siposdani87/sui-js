goog.provide('SUI.App');

goog.require('SUI');
goog.require('SUI.Module');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.Test');

goog.require('SUI.lib.AppCache');
goog.require('SUI.lib.BottomMenu');
goog.require('SUI.lib.Browser');
goog.require('SUI.lib.Confirm');
goog.require('SUI.lib.Console');
goog.require('SUI.lib.Cookie');
goog.require('SUI.lib.Dialog');
goog.require('SUI.lib.Document');
goog.require('SUI.lib.Event');
goog.require('SUI.lib.Footer');
goog.require('SUI.lib.GeoLocation');
goog.require('SUI.lib.Header');
goog.require('SUI.lib.Helper');
goog.require('SUI.lib.Http');
goog.require('SUI.lib.LeftMenu');
goog.require('SUI.lib.Loader');
goog.require('SUI.lib.Notification');
goog.require('SUI.lib.ProgressBar');
goog.require('SUI.lib.Script');
goog.require('SUI.lib.ServiceWorker');
goog.require('SUI.lib.Sidebar');
goog.require('SUI.lib.Storage');
goog.require('SUI.lib.Style');
goog.require('SUI.lib.Template');
goog.require('SUI.lib.TopMenu');
goog.require('SUI.lib.Viewer');
goog.require('SUI.lib.Window');

/**
 * @constructor
 * @this {SUI.App}
 * @param {!Object} options
 * @param {!Object} resources
 */
SUI.App = function(options, resources) {
  this._setOptions(options);
  this._init(resources);
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.App.prototype._setOptions = function(options) {
  const _self = this;
  _self.options = new SUI.Object({
    app_id: 'sui-app',
    title: '',
    backend: '',
    development: false,
    locale: navigator.language,
  });
  _self.options.merge(options);
};

/**
 * @private
 * @param {!Object} resources
 * @return {undefined}
 */
SUI.App.prototype._init = function(resources) {
  const rootNode = new SUI.Query('html').getItem();
  rootNode.addClass('sui-js');

  this.types = {};
  this._injections = resources;
  this._instances = {};

  this._initApp();
  this._initRoutes();
  this._initModule();
  this._initEvent();
  this._initLoader();
  this._initHttp();
  this._initDialog();
  this._initConfirm();
  this._initViewer();
  this._initProgressBar();
  this._initCookie();
  this._initStorage();
  this._initNotification();
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
  this._initConsole();
  this._initAppCache();
  this._initServiceWorker();
  this._initActionCable();

  this._handleLocale();
  this._handleModules();
};

/**
 * @return {string}
 */
SUI.App.prototype.getLanguage = function() {
  const locale = this.getLocale();
  return locale.split('-', 2)[0];
};

/**
 * @return {string}
 */
SUI.App.prototype.getLocale = function() {
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
SUI.App.prototype.setLocale = function(locale) {
  this._instances[this._injections.localStorage].set('app.locale', locale);
  this.options.locale = locale;
};

/**
 * @param {string} locale
 * @return {undefined}
 */
SUI.App.prototype.setLocaleWithReload = function(locale) {
  this.setLocale(locale);
  this._instances[this._injections.state].reload();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._handleLocale = function() {
  const locale = this.getLocale();
  window['moment']['locale'](locale);
  this.setLocale(locale);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initModule = function() {
  this._module = new SUI.Module();

  this._module.eventAfterInit = function() {
    this._instances[this._injections.progressBar].lock();
    this._instances[this._injections.loader].show();
    this._instances[this._injections.event].call('module.afterInit');
  }.bind(this);

  this._module.eventStateChange = /** @type {function(!SUI.Object):!SUI.Promise} */ (function(currentState) {
    this._instances[this._injections.progressBar].lock();
    this._instances[this._injections.loader].show();
    this._instances[this._injections.dialog].close();
    this._instances[this._injections.confirm].close();
    this._instances[this._injections.actionCable].unsubscribeAll();
    return this._instances[this._injections.event].call('state.change', [currentState]);
  }.bind(this));

  this._module.eventDomChange = /** @type {function(!SUI.Object, !SUI.Node):!SUI.Promise} */ (function(state, dom) {
    return this._instances[this._injections.event].call('dom.change', [state, dom]);
  }.bind(this));

  this._module.eventServiceLoaded = function() {
    // this._instances[this._injections.geoLocation].setWatcher();
    this._instances[this._injections.browser].detect();
    this._instances[this._injections.event].call('module.serviceLoaded');
  }.bind(this);

  this._module.eventServiceFailed = function() {
    this._instances[this._injections.event].call('module.serviceFailed');
  }.bind(this);

  this._module.eventModuleLoaded = function(state) {
    this._instances[this._injections.progressBar].unlock();
    this._instances[this._injections.loader].hide(true);
    this._instances[this._injections.event].call('module.loaded', [state]);
  }.bind(this);

  this._module.eventModuleFailed = function(state) {
    this._instances[this._injections.progressBar].unlock();
    this._instances[this._injections.loader].hide(true);
    this._instances[this._injections.event].call('module.failed', [state]);
  }.bind(this);

  this._module.eventControllerLoaded = /** @type {function(!SUI.Node):undefined} */ ((dom) => {
    this._instances[this._injections.event].call('controller.loaded', [dom]);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._handleModules = function() {
  this._module.load(this._instances, this._injections);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initScript = function() {
  this._instances[this._injections.script] = new SUI.lib.Script(this._instances[this._injections.progressBar]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initStyle = function() {
  this._instances[this._injections.style] = new SUI.lib.Style(this._instances[this._injections.progressBar]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initConsole = function() {
  this._instances[this._injections.console] = new SUI.lib.Console(this._instances[this._injections.config]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initConfig = function() {
  this._instances[this._injections.config] = this.options;
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initApp = function() {
  this._instances[this._injections.app] = this;
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initGeoLocation = function() {
  this._instances[this._injections.geoLocation] = new SUI.lib.GeoLocation();

  this._instances[this._injections.geoLocation].eventChange = (latitude, longitude, message) => {
    this._instances[this._injections.event].override('geoLocation.success', [message], (message) => {
      this._instances[this._injections.notification].addInfo(message);
    });
    this._instances[this._injections.event].call('geoLocation.change', [latitude, longitude]);
  };

  this._instances[this._injections.geoLocation].eventError = (message, code) => {
    this._instances[this._injections.event].override('geoLocation.error', [message, code], (message) => {
      this._instances[this._injections.notification].addError(message);
    });
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initCookie = function() {
  this._instances[this._injections.cookie] = new SUI.lib.Cookie();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initLoader = function() {
  this._instances[this._injections.loader] = new SUI.lib.Loader();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initProgressBar = function() {
  this._instances[this._injections.progressBar] = new SUI.lib.ProgressBar(this._instances[this._injections.dialog], this._instances[this._injections.confirm]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initStorage = function() {
  this._instances[this._injections.localStorage] = new SUI.lib.Storage({
    type: 'local',
    prefix: this.options.app_id,
    secret: this.options.secret,
  });
  this._instances[this._injections.sessionStorage] = new SUI.lib.Storage({
    type: 'session',
    prefix: this.options.app_id,
    secret: this.options.secret,
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initHelper = function() {
  this._instances[this._injections.helper] = new SUI.lib.Helper();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initDocument = function() {
  const popupContainer = new SUI.PopupContainer();
  this._instances[this._injections.document] = new SUI.lib.Document(this.options);
  this._instances[this._injections.document].eventClick = function(target, event) {
    popupContainer.closeAll();
    this._instances[this._injections.event].call('document.click', [target, event]);
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initWindow = function() {
  this._instances[this._injections.window] = new SUI.lib.Window();
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

  const notification = {
    node: null,
    message: 'Unable to connect to the Internet',
    duration: Infinity,
  };
  this._instances[this._injections.window].eventOnline = function() {
    if (notification.node) {
      this._instances[this._injections.notification].remove(notification.node);
    }
  }.bind(this);

  this._instances[this._injections.window].eventOffline = function(event) {
    this._instances[this._injections.event].override('window.offline', [notification, event], function(notification) {
      notification.node = this._instances[this._injections.notification].addWarning(notification.message, notification.duration);
    }.bind(this));
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initEvent = function() {
  this._instances[this._injections.event] = new SUI.lib.Event();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initHttp = function() {
  this._instances[this._injections.http] = new SUI.lib.Http(this.options);
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
SUI.App.prototype._initTemplate = function() {
  this._instances[this._injections.template] = new SUI.lib.Template(this._instances[this._injections.http], {
    locale: this.getLocale(),
  });
  this._instances[this._injections.template].eventError = function(message) {
    this._instances[this._injections.loader].hide();
    this._instances[this._injections.notification].addMessage(message);
  }.bind(this);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initNotification = function() {
  this._instances[this._injections.notification] = new SUI.lib.Notification();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initDialog = function() {
  this._instances[this._injections.dialog] = new SUI.lib.Dialog(this._instances[this._injections.http]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initConfirm = function() {
  this._instances[this._injections.confirm] = new SUI.lib.Confirm();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initViewer = function() {
  this._instances[this._injections.viewer] = new SUI.lib.Viewer();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initHeader = function() {
  this._instances[this._injections.header] = new SUI.lib.Header();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initTopMenu = function() {
  this._instances[this._injections.topMenu] = new SUI.lib.TopMenu(this._instances[this._injections.header]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initNavBar = function() {
  this._instances[this._injections.navBar] = new SUI.lib.NavBar();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initBottomMenu = function() {
  this._instances[this._injections.bottomMenu] = new SUI.lib.BottomMenu(this._instances[this._injections.footer]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initSidebar = function() {
  this._instances[this._injections.leftSidebar] = new SUI.lib.Sidebar('#left-sidebar');

  this._instances[this._injections.rightSidebar] = new SUI.lib.Sidebar('#right-sidebar');
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initLeftMenu = function() {
  this._instances[this._injections.leftMenu] = new SUI.lib.LeftMenu();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initFooter = function() {
  this._instances[this._injections.footer] = new SUI.lib.Footer();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initBrowser = function() {
  this._instances[this._injections.browser] = new SUI.lib.Browser();
  this._instances[this._injections.browser].eventMissingFeatures = (features) => {
    this._instances[this._injections.notification].addError(features.join(', '));
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initAppCache = function() {
  this._instances[this._injections.appCache] = new SUI.lib.AppCache();
  this._instances[this._injections.appCache].eventMissingFeatures = (features) => {
    this._instances[this._injections.notification].addError(features.join(', '));
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initServiceWorker = function() {
  this._instances[this._injections.serviceWorker] = new SUI.lib.ServiceWorker();
  this._instances[this._injections.serviceWorker].eventMissingFeatures = (features) => {
    this._instances[this._injections.notification].addError(features.join(', '));
  };
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initActionCable = function() {
  this._instances[this._injections.actionCable] = new SUI.lib.ActionCable();
};

/**
 * @private
 * @return {undefined}
 */
SUI.App.prototype._initRoutes = function() {
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
SUI.App.prototype.addState = function(id, title, url, controller, opt_template = '', opt_params = {}) {
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
SUI.App.prototype.setRootState = function(id, opt_params) {
  this._routeOptions.set('root.id', id);
  this._routeOptions.set('root.params', opt_params);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {undefined}
 */
SUI.App.prototype.setHomeState = function(id, opt_params) {
  this._routeOptions.set('home.id', id);
  this._routeOptions.set('home.params', opt_params);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {undefined}
 */
SUI.App.prototype.setMaintenanceState = function(id, opt_params) {
  this._routeOptions.set('maintenance.id', id);
  this._routeOptions.set('maintenance.params', opt_params);
};

/**
 * @param {string} name
 * @return {?Object}
 */
SUI.App.prototype.getInstance = function(name) {
  return this._instances[name];
};

/**
 * @return {?Object}
 */
SUI.App.prototype.getController = function() {
  return this._module.getController();
};

/**
 * @export
 * @return {undefined}
 */
SUI.App.prototype.run = function() {
  if (this.options.development) {
    console.info('%cFrontend run in development environment...', 'font-weight:bold;color:#795548;');
    const test = new SUI.Test();
    test.run();
  } else {
    console.info('%cFrontend run in production environment...', 'font-weight:bold;color:#795548;');
  }
  this._module.handleRoutes(this._routes, this._routeOptions);
  this._module.handleServices();
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 */
SUI.App.prototype.controller = function(name, moduleInjections, moduleCallback, opt_extendModule) {
  this._module.add(name, moduleInjections, moduleCallback, opt_extendModule);
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 */
SUI.App.prototype.service = function(name, moduleInjections, moduleCallback, opt_extendModule) {
  this._module.add(name, moduleInjections, moduleCallback, opt_extendModule);
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 */
SUI.App.prototype.factory = function(name, moduleInjections, moduleCallback, opt_extendModule) {
  this._module.add(name, moduleInjections, moduleCallback, opt_extendModule);
};
