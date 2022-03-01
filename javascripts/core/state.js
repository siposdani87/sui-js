import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.State');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Objekt');
goog.require('SUI.Query');
goog.require('SUI.Router');

/**
 * @constructor
 * @this {SUI.State}
 * @param {!Array} routes
 * @param {!Object} options
 */
SUI.State = function(routes, options) {
  this._current = new SUI.Objekt();
  this._previous = this._current;

  this.routes = /** @type {!SUI.Collection<!SUI.Objekt>} */ (new SUI.Collection(routes));

  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._setRealUrls = function() {
  this.routes.each((route) => {
    const url = /** @type {string} */ (route.get('url'));
    const realUrl = this._getRealUrl(url);
    route.set('realUrl', realUrl);
  });
};

/**
 * @private
 * @return {string}
 */
SUI.State.prototype._getUrlPrefix = function() {
  return this.basePath === '#' ? '/#' : '';
};

/**
 * @private
 * @param {string} url
 * @return {string}
 */
SUI.State.prototype._getRealUrl = function(url) {
  return SUI.format('{0}{1}', [this._getUrlPrefix(), url]);
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._setBasePath = function() {
  this.basePath = '#';
  const baseMetaTag = new SUI.Query('base').getItem();
  if (!baseMetaTag.isEmpty()) {
    this.basePath = baseMetaTag.getAttribute('href') || '#';
  }
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.State.prototype._setOptions = function(options) {
  const _self = this;
  _self.options = new SUI.Objekt({
    root: {
      id: 'root',
      params: undefined,
    },
    home: {
      id: 'home',
      params: undefined,
    },
  });
  _self.options.merge(options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._init = function() {
  this._setBasePath();
  this._setRealUrls();

  this._initPopstate();
  this._parseUrl();
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._initPopstate = function() {
  window.addEventListener('popstate', () => {
    if (window.history.state) {
      const state = new SUI.Objekt();
      state.merge(window.history.state);
      this._setCurrent(state);
      this._triggerChange();
    } else {
      this._parseUrl();
      this._triggerChange();
    }
  });
};

/**
 * @return {undefined}
 */
SUI.State.prototype.run = function() {
  this._triggerChange();
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._parseUrl = function() {
  const path = window.location.hash ? window.location.hash : window.location.pathname.replace(this.basePath, '/') + window.location.search;
  this._parsePath(path, (state, path, params) => {
    this._setHistory(state, path, params, true);
  }, () => {
    // SUI.consoleWarn('SUI.State._parseUrl()', path, 'missing state from routes config');
    this.goRoot(true);
  });
};

/**
 * @private
 * @param {string} urlPath
 * @param {!Function} successCallback
 * @param {!Function} errorCallback
 * @return {undefined}
 */
SUI.State.prototype._parsePath = function(urlPath, successCallback, errorCallback) {
  const path = urlPath[0] === '#' ? urlPath.substr(1) : urlPath;
  const items = this.routes.getItems();

  let state = null;
  let params = null;
  let matches = null;

  let i = 0;
  while (i < items.length && SUI.isNull(matches)) {
    state = items[i];
    const stateUrl = /** @type {string} */ (state.get('url'));
    const router = new SUI.Router(stateUrl);
    matches = router.getMatches(path);
    params = router.parse(path);
    i++;
  }
  if (state && params && matches) {
    successCallback(state, path, params);
  } else {
    errorCallback(state, path, params);
  }
};

/**
 * @private
 * @param {!SUI.Objekt} state
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype._setHistory = function(state, url, opt_params = {}, opt_overwrite = false, opt_force = false) {
  url = this.basePath === '#' ? this.basePath + url : url;
  const template = /** @type {string} */ (state.get('template'));
  const router = new SUI.Router(template);
  state.set('templateUrl', router.stringify(opt_params));
  state.set('params', opt_params);
  if (opt_overwrite) {
    window.history.replaceState(state.get(), /** @type {string} */(state.get('title', '')), url);
  } else {
    window.history.pushState(state.get(), /** @type {string} */(state.get('title', '')), url);
  }
  this._setCurrent(state);
  if (!opt_overwrite) {
    this._triggerChange(opt_force);
  }
};

/**
 * @private
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype._triggerChange = function(opt_force = false) {
  const currentState = /** @type {!SUI.Objekt} */ (this.getCurrent());
  const previousState = /** @type {!SUI.Objekt} */ (this.getPrevious());
  this.eventChange(currentState, previousState, opt_force);
};

/**
 * @private
 * @param {!SUI.Objekt} state
 * @return {undefined}
 */
SUI.State.prototype._setCurrent = function(state) {
  this._previous = this._current;
  this._current = state;
};

/**
 * @param {string=} opt_attribute
 * @return {!SUI.Objekt|string}
 */
SUI.State.prototype.getCurrent = function(opt_attribute) {
  return /** @type {!SUI.Objekt|string} */ (this._current.get(opt_attribute));
};

/**
 * @param {string=} opt_attribute
 * @return {!SUI.Objekt|string}
 */
SUI.State.prototype.getPrevious = function(opt_attribute) {
  return /** @type {!SUI.Objekt|string} */ (this._previous.get(opt_attribute));
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.go = function(id, opt_params = undefined, opt_overwrite = false, opt_force = false) {
  if (SUI.eq(id[0], '#') || SUI.eq(id[0], '/')) {
    this._parsePath(id, (state, path, params) => {
      this._setHistory(state, path, params, opt_overwrite, opt_force);
    }, () => {

    });
  } else {
    const [url, state] = this._resolveUrlWithState(id, opt_params);
    if (url && state) {
      this._setHistory(/** @type {!SUI.Objekt} */ (state), url, opt_params, opt_overwrite, opt_force);
    }
  }
};

/**
 * @private
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {!Array}
 */
SUI.State.prototype._resolveUrlWithState = function(id, opt_params = undefined) {
  const state = this.routes.findById(id);
  let url = '';
  if (state) {
    const stateUrl = /** @type {string} */ (state.get('url'));
    const router = new SUI.Router(stateUrl);
    url = router.stringify(opt_params);
  }
  return [url, state];
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.State.prototype.resolveUrl = function(id, opt_params = undefined) {
  const url = /** @type {string} */ (this._resolveUrlWithState(id, opt_params)[0]);
  return this._getRealUrl(url);
};

/**
 * @param {!Object} state
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goState = function(state, opt_overwrite = false, opt_force = false) {
  this.go(state['id'], state['params'], opt_overwrite, opt_force);
};

/**
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goHome = function(opt_overwrite = false, opt_force = false) {
  this.go(this.options.home.id, this.options.home.params, opt_overwrite, opt_force);
};

/**
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goRoot = function(opt_overwrite = false, opt_force = false) {
  this.go(this.options.root.id, this.options.root.params, opt_overwrite, opt_force);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_overwrite
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goBack = function(id, opt_params, opt_overwrite = false, opt_force = false) {
  if (SUI.eq(window.history.length, 0)) {
    this.go(id, opt_params, opt_overwrite, opt_force);
  } else {
    this.back();
  }
};

/**
 * @return {undefined}
 */
SUI.State.prototype.back = function() {
  window.history.go(-1);
};

/**
 * @param {string} url
 * @param {boolean=} opt_inTab
 * @return {undefined}
 */
SUI.State.prototype.redirect = function(url, opt_inTab = false) {
  if (opt_inTab) {
    window.open(url, '_blank');
  } else {
    window.location.href = url;
  }
};

/**
 * @return {undefined}
 */
SUI.State.prototype.forward = function() {
  window.history.forward();
};

/**
 * @param {!SUI.Objekt} currentState
 * @param {!SUI.Objekt} previousState
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.eventChange = function(currentState, previousState, opt_force = false) {
  SUI.consoleWarn('SUI.State.eventChange()', currentState, previousState, opt_force);
};

/**
 * @return {!SUI.Collection}
 */
SUI.State.prototype.getRoutes = function() {
  return this.routes;
};

/**
 * @param {!Object} properties
 * @return {undefined}
 */
SUI.State.prototype.setParams = function(properties) {
  SUI.eachObject(properties, (value, name) => {
    this.setParam(name, value);
  });
};

/**
 * @param {string} name
 * @param {*} value
 * @return {undefined}
 */
SUI.State.prototype.setParam = function(name, value) {
  const id = /** @type {string} */ (this.getCurrent('id'));
  const params = this.getParams();
  params.set(name, value);
  this.go(id, params, true);
};

/**
 * @return {!SUI.Objekt}
 */
SUI.State.prototype.getParams = function() {
  return /** @type {!SUI.Objekt} */ (this.getCurrent('params'));
};

/**
 * @param {string} name
 * @param {*=} opt_defaultValue
 * @return {string}
 */
SUI.State.prototype.getParam = function(name, opt_defaultValue) {
  const params = this.getParams();
  return /** @type {string} */ (params.get(name, opt_defaultValue));
};

/**
 * @return {undefined}
 */
SUI.State.prototype.reload = function() {
  window.location.reload();
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.refresh = function(opt_force = false) {
  this._triggerChange(opt_force);
};

/**
 * @return {!Array}
 */
SUI.State.prototype.getRoot = function() {
  return [this.options.root.id, this.options.root.params];
};

/**
 * @return {!Array}
 */
SUI.State.prototype.getHome = function() {
  return [this.options.home.id, this.options.home.params];
};
