goog.provide('SUI.State');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.State}
 * @param {!Array} routes
 * @param {!Object} options
 */
SUI.State = function(routes, options) {
  this._setBasePath();

  this._current = new SUI.Object();
  this.routes = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection(routes));
  this.routes.each((route) => {
    const realUrl = SUI.format('{0}{1}', [this.basePath === '#' ? '/#' : '', route.get('url')]);
    route.set('realUrl', realUrl);
  });

  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._setBasePath = function() {
  this.basePath = '#';
  const baseMeta = new SUI.Query('base').getItem();
  if (!baseMeta.isEmpty()) {
    this.basePath = baseMeta.getAttribute('href') || '#';
  }
};

/**
 * @private
 * @param {!Object} options
 * @return {undefined}
 */
SUI.State.prototype._setOptions = function(options) {
  const _self = this;
  _self.options = new SUI.Object({
    root: {
      id: 'root',
      params: undefined,
    },
    home: {
      id: 'home',
      params: undefined,
    },
    maintenance: {
      id: 'maintenance',
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
  this._initPopstate();
  this._parseHashTag();
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._initPopstate = function() {
  window.addEventListener('popstate', () => {
    if (window.history.state) {
      const state = new SUI.Object();
      state.merge(window.history.state);
      this._setCurrent(state);
      this._triggerChange();
    } else {
      this._parseHashTag();
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
SUI.State.prototype._parseHashTag = function() {
  const path = this.basePath === '#' ? window.location.hash : window.location.pathname.replace(this.basePath, '/');
  this._parseUrl(path, (state, path, params) => {
    this._setHistory(state, path, params, true);
  }, () => {
    // console.warn('SUI.State._parseHashTag()', path, 'missing state from routes config');
    this.goRoot(true);
  });
};

/**
 * @private
 * @param {string} hashPath
 * @param {!Function} successCallback
 * @param {!Function} errorCallback
 * @return {undefined}
 */
SUI.State.prototype._parseUrl = function(hashPath, successCallback, errorCallback) {
  const path = hashPath[0] === '#' ? hashPath.substr(1) : hashPath;
  let i = 0;
  let state = null;
  let params = null;
  const items = this.routes.getItems();
  let matches = null;
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
 * @param {!SUI.Object} state
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype._setHistory = function(state, url, opt_params, opt_force = false) {
  url = this.basePath === '#' ? this.basePath + url : url;
  opt_params = opt_params || {};
  const stateTemplate = /** @type {string} */ (state.get('template'));
  const router = new SUI.Router(stateTemplate);
  const templateUrl = router.stringify(opt_params);
  state.set('templateUrl', templateUrl);
  state.set('params', opt_params);
  if (opt_force) {
    window.history.replaceState(state.get(), /** @type {string} */(state.get('title', '')), url);
  } else {
    window.history.pushState(state.get(), /** @type {string} */(state.get('title', '')), url);
  }
  this._setCurrent(state);
  if (!opt_force) {
    this._triggerChange();
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.State.prototype._triggerChange = function() {
  const currentState = /** @type {!SUI.Object} */ (this.getCurrent());
  const previousState = /** @type {!SUI.Object} */ (this.getPrevious());
  this.eventChange(currentState, previousState);
};

/**
 * @private
 * @param {!SUI.Object} state
 * @return {undefined}
 */
SUI.State.prototype._setCurrent = function(state) {
  this._previous = this._current;
  this._current = state;
};

/**
 * @param {string=} opt_attribute
 * @return {!SUI.Object|string}
 */
SUI.State.prototype.getCurrent = function(opt_attribute) {
  return /** @type {!SUI.Object|string} */ (this._current.get(opt_attribute));
};

/**
 * @param {string=} opt_attribute
 * @return {!SUI.Object|string}
 */
SUI.State.prototype.getPrevious = function(opt_attribute) {
  return this._previous.get(opt_attribute);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.go = function(id, opt_params, opt_force = false) {
  if (SUI.eq(id[0], '#') || SUI.eq(id[0], '/')) {
    this._parseUrl(id, (state, path, params) => {
      this._setHistory(state, path, params, opt_force);
    }, () => {

    });
  } else {
    const [state, path] = this._resolvePathWithState(id, opt_params);
    if (state && path) {
      this._setHistory(/** @type {!SUI.Object} */ (state), path, opt_params, opt_force);
    }
  }
};

/**
 * @private
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {!Array}
 */
SUI.State.prototype._resolvePathWithState = function(id, opt_params) {
  const state = this.routes.findById(id);
  let path = '';
  if (state) {
    const stateUrl = /** @type {string} */ (state.get('url'));
    const router = new SUI.Router(stateUrl);
    path = router.stringify(opt_params);
  }
  return [state, path];
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.State.prototype.resolveUrl = function(id, opt_params) {
  return /** @type {string} */ ('/#' + this._resolvePathWithState(id, opt_params)[1]);
};

/**
 * @param {!Object} state
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goState = function(state, opt_force = false) {
  this.go(state['id'], state['params'], opt_force);
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goHome = function(opt_force) {
  this.go(this.options.home.id, this.options.home.params, opt_force);
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goRoot = function(opt_force) {
  this.go(this.options.root.id, this.options.root.params, opt_force);
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goMaintenance = function(opt_force) {
  this.go(this.options.maintenance.id, this.options.maintenance.params, opt_force);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.State.prototype.goBack = function(id, opt_params, opt_force = false) {
  if (SUI.eq(window.history.length, 0)) {
    this.go(id, opt_params, opt_force);
  } else {
    this.back();
  }
};

/**
 * @return {undefined}
 */
SUI.State.prototype.back = function() {
  window.history.back();
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
 * @param {!SUI.Object} currentState
 * @param {!SUI.Object} previousState
 * @return {undefined}
 */
SUI.State.prototype.eventChange = function(currentState, previousState) {
  console.warn('SUI.State.eventChange()', currentState, previousState);
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
  SUI.each(properties, (value, name) => {
    this.setParam(name, value);
  });
};

/**
 * @param {string} name
 * @param {string} value
 * @return {undefined}
 */
SUI.State.prototype.setParam = function(name, value) {
  const id = /** @type {string} */ (this.getCurrent('id'));
  const params = this.getParams();
  params.set(name, value);
  this.go(id, params, true);
};

/**
 * @return {!SUI.Object}
 */
SUI.State.prototype.getParams = function() {
  return /** @type {!SUI.Object} */ (this.getCurrent('params'));
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
 * @return {undefined}
 */
SUI.State.prototype.refresh = function() {
  this._triggerChange();
};
