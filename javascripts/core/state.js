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
  this.routes = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection(routes));

  this._current = new SUI.Object();

  this.basePath = '#';
  var baseMeta = new SUI.Query('base').getItem();
  if (!baseMeta.isEmpty()) {
    this.basePath = baseMeta.getAttribute('href') || '';
  }

  this._setOptions(options);
  this._init();
};

/**
 * @private
 * @param {!Object} options
 * @returns {undefined}
 */
SUI.State.prototype._setOptions = function(options) {
  var _self = this;
  _self.options = new SUI.Object({
    root: {
      id: 'root',
      params: undefined
    },
    home: {
      id: 'home',
      params: undefined
    },
    maintenance: {
      id: 'maintenance',
      params: undefined
    }
  });
  _self.options.merge(options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.State.prototype._init = function() {
  this._initPopstate();
  this._parseHashTag();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.State.prototype._initPopstate = function() {
  window.addEventListener('popstate', function() {
    if (window.history.state) {
      var state = new SUI.Object();
      state.merge(window.history.state);
      this._setCurrent(state);
      this._triggerChange();
    }
    else {
      this._parseHashTag();
      this._triggerChange();
    }
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.State.prototype.run = function() {
  this._triggerChange();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.State.prototype._parseHashTag = function() {
  var path = this.basePath === '#' ? window.location.hash : window.location.pathname.replace(this.basePath, '');
  this._parseUrl(path, function(state, path, params) {
    this._setHistory(state, path, params, true);
  }.bind(this), function() {
    //console.warn('SUI.State._parseHashTag()', path, 'missing state from routes config');
    this.goRoot(true);
  }.bind(this));
};

/**
 * @private
 * @param {string} hashPath
 * @param {!Function} successCallback
 * @param {!Function} errorCallback
 * @returns {undefined}
 */
SUI.State.prototype._parseUrl = function(hashPath, successCallback, errorCallback) {
  var path = hashPath[0] === '#' ? hashPath.substr(1) : hashPath;
  var i = 0;
  var state = null;
  var params = null;
  var items = this.routes.getItems();
  var matches = null;
  while (i < items.length && SUI.isNull(matches)) {
    state = items[i];
    var stateUrl = /** @type {string} */ (state.get('url'));
    var router = new SUI.Router(stateUrl);
    matches = router.getMatches(path);
    params = router.parse(path);
    i++;
  }
  if (state && params && matches) {
    successCallback(state, path, params);
  }
  else {
    errorCallback(state, path, params);
  }
};

/**
 * @private
 * @param {!SUI.Object} state
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype._setHistory = function(state, url, opt_params, opt_force = false) {
  url = this.basePath + url;
  opt_params = opt_params || {};
  var stateTemplate = /** @type {string} */ (state.get('template'));
  var router = new SUI.Router(stateTemplate);
  var templateUrl = router.stringify(opt_params);
  state.set('templateUrl', templateUrl);
  state.set('params', opt_params);
  if (opt_force) {
    window.history.replaceState(state.get(), /** @type {string} */ (state.get('title', '')), url);
  }
  else {
    window.history.pushState(state.get(), /** @type {string} */ (state.get('title', '')), url);
  }
  this._setCurrent(state);
  if (!opt_force) {
    this._triggerChange();
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.State.prototype._triggerChange = function() {
  var currentState = /** @type {!SUI.Object} */ (this.getCurrent());
  var previousState = /** @type {!SUI.Object} */ (this.getPrevious());
  this.eventChange(currentState, previousState);
};

/**
 * @private
 * @param {!SUI.Object} state
 * @returns {undefined}
 */
SUI.State.prototype._setCurrent = function(state) {
  this._previous = this._current;
  this._current = state;
};

/**
 * @param {string=} opt_attribute
 * @returns {!SUI.Object|string}
 */
SUI.State.prototype.getCurrent = function(opt_attribute) {
  return /** @type {!SUI.Object|string} */ (this._current.get(opt_attribute));
};

/**
 * @param {string=} opt_attribute
 * @returns {!SUI.Object|string}
 */
SUI.State.prototype.getPrevious = function(opt_attribute) {
  return this._previous.get(opt_attribute);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.go = function(id, opt_params, opt_force = false) {
  if (SUI.eq(id[0], '#') || SUI.eq(id[0], '/')) {
    this._parseUrl(id, function(state, path, params) {
      this._setHistory(state, path, params, opt_force);
    }.bind(this), function() {

    }.bind(this));
  }
  else {
    var state = this.routes.findById(id);
    if (state) {
      var stateUrl = /** @type {string} */ (state.get('url'));
      var router = new SUI.Router(stateUrl);
      var path = router.stringify(opt_params);
      this._setHistory(state, path, opt_params, opt_force);
    }
  }
};

/**
 * @param {!Object} state
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.goState = function(state, opt_force = false) {
  this.go(state['id'], state['params'], opt_force);
};

/**
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.goHome = function(opt_force) {
  this.go(this.options.home.id, this.options.home.params, opt_force);
};

/**
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.goRoot = function(opt_force) {
  this.go(this.options.root.id, this.options.root.params, opt_force);
};

/**
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.goMaintenance = function(opt_force) {
  this.go(this.options.maintenance.id, this.options.maintenance.params, opt_force);
};

/**
 * @param {string} id
 * @param {!Object=} opt_params
 * @param {boolean=} opt_force
 * @returns {undefined}
 */
SUI.State.prototype.goBack = function(id, opt_params, opt_force = false){
  if (SUI.eq(window.history.length, 0)){
    this.go(id, opt_params, opt_force);
  }
  else{
    this.back();
  }
};

/**
 * @returns {undefined}
 */
SUI.State.prototype.back = function() {
  window.history.back();
};

/**
 * @param {string} url
 * @param {boolean=} opt_inTab
 * @returns {undefined}
 */
SUI.State.prototype.redirect = function(url, opt_inTab = false) {
  if (opt_inTab){
    window.open(url, '_blank');
  }
  else {
    window.location.href = url;
  }
};

/**
 * @returns {undefined}
 */
SUI.State.prototype.forward = function() {
  window.history.forward();
};

/**
 * @param {!SUI.Object} currentState
 * @param {!SUI.Object} previousState
 * @returns {undefined}
 */
SUI.State.prototype.eventChange = function(currentState, previousState) {
  console.warn('SUI.State.eventChange()', currentState, previousState);
};

/**
 * @returns {!SUI.Collection}
 */
SUI.State.prototype.getRoutes = function() {
  return this.routes;
};

/**
 * @param {!Object} properties
 * @returns {undefined}
 */
SUI.State.prototype.setParams = function(properties) {
  SUI.each(properties, function(value, name) {
    this.setParam(name, value);
  }.bind(this));
};

/**
 * @param {string} name
 * @param {string} value
 * @returns {undefined}
 */
SUI.State.prototype.setParam = function(name, value) {
  var id = /** @type {string} */ (this.getCurrent('id'));
  var params = this.getParams();
  params.set(name, value);
  this.go(id, params, true);
};

/**
 * @returns {!SUI.Object}
 */
SUI.State.prototype.getParams = function() {
  return /** @type {!SUI.Object} */ (this.getCurrent('params'));
};

/**
 * @param {string} name
 * @param {*=} opt_defaultValue
 * @returns {string}
 */
SUI.State.prototype.getParam = function(name, opt_defaultValue) {
  var params = this.getParams();
  return /** @type {string} */ (params.get(name, opt_defaultValue));
};

/**
 * @returns {undefined}
 */
SUI.State.prototype.reload = function() {
  window.location.reload();
};

/**
 * @returns {undefined}
 */
SUI.State.prototype.refresh = function() {
  this._triggerChange();
};
