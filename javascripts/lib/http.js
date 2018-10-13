goog.provide('SUI.lib.Http');

goog.require('SUI.Deferred');
goog.require('SUI.lib');
goog.require('SUI.lib.Xhr');

/**
 * @constructor
 * @this {SUI.lib.Http}
 * @param {!Object} options
 */
SUI.lib.Http = function(options) {
  this.options = options;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Http.prototype._init = function() {
  this.username = null;
  this.password = null;
  this.token = null;
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
SUI.lib.Http.prototype.setBasicAuthorization = function(username, password) {
  this.username = username;
  this.password = password;
};

/**
 * @param {string} token
 */
SUI.lib.Http.prototype.setBearerAuthorization = function(token) {
  this.token = token;
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype.get = function(url, opt_params, opt_headers) {
  let http = this._getRequestHandler();
  return this._getPromise(http.get(url, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype.post = function(url, opt_data, opt_params, opt_headers) {
  let http = this._getRequestHandler();
  return this._getPromise(http.post(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype.put = function(url, opt_data, opt_params, opt_headers) {
  let http = this._getRequestHandler();
  return this._getPromise(http.put(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype.patch = function(url, opt_data, opt_params, opt_headers) {
  let http = this._getRequestHandler();
  return this._getPromise(http.patch(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype.delete = function(url, opt_data, opt_params, opt_headers) {
  let http = this._getRequestHandler();
  return this._getPromise(http.delete(url, opt_data, opt_params, opt_headers));
};

/**
 * @private
 * @return {!SUI.lib.Xhr}
 */
SUI.lib.Http.prototype._getRequestHandler = function() {
  let http = new SUI.lib.Xhr(this.options);
  http.setBasicAuthorization(this.username, this.password);
  http.setBearerAuthorization(this.token);
  this.eventBeforeRequest(http);
  return http;
};

/**
 * @private
 * @param {!SUI.Promise} promise
 * @return {!SUI.Promise}
 */
SUI.lib.Http.prototype._getPromise = function(promise) {
  let deferred = new SUI.Deferred();
  promise.then((...params) => {
    this.eventAfterRequest(...params);
    deferred.resolve.apply(deferred, [params.slice(1)]);
  }, (...params) => {
    this.eventAfterRequest(...params);
    deferred.reject.apply(deferred, [params.slice(1)]);
  });
  return deferred.promise();
};

/**
 * @param {!SUI.lib.Xhr} http
 * @return {undefined}
 */
SUI.lib.Http.prototype.eventBeforeRequest = function(http) {
  console.warn('SUI.lib.Http.eventBeforeRequest', http);
};

/**
 * @param {!XMLHttpRequest} http
 * @param {*} response
 * @return {undefined}
 */
SUI.lib.Http.prototype.eventAfterRequest = function(http, response) {
  console.warn('SUI.lib.Http.eventAfterRequest', http, response);
};
