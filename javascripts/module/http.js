import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Http');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');
goog.require('SUI.Xhr');

/**
 * @constructor
 * @this {SUI.Http}
 * @param {!Object=} opt_options
 */
SUI.Http = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Http.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt({
    backend: '',
    locale: '',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Http.prototype._init = function() {
  this.username = null;
  this.password = null;
  this.token = null;
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
SUI.Http.prototype.setBasicAuthorization = function(username, password) {
  this.username = username;
  this.password = password;
};

/**
 * @param {string} token
 */
SUI.Http.prototype.setBearerAuthorization = function(token) {
  this.token = token;
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promize}
 */
SUI.Http.prototype.get = function(url, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.get(url, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promize}
 */
SUI.Http.prototype.post = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.post(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promize}
 */
SUI.Http.prototype.put = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.put(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promize}
 */
SUI.Http.prototype.patch = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.patch(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promize}
 */
SUI.Http.prototype.delete = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.delete(url, opt_data, opt_params, opt_headers));
};

/**
 * @private
 * @return {!SUI.Xhr}
 */
SUI.Http.prototype._getRequestHandler = function() {
  const http = new SUI.Xhr(this.options);
  this.eventBeforeRequest(http);
  http.setBasicAuthorization(this.username, this.password);
  http.setBearerAuthorization(this.token);
  return http;
};

/**
 * @private
 * @param {!SUI.Promize} promise
 * @return {!SUI.Promize}
 */
SUI.Http.prototype._getPromise = function(promise) {
  const deferred = new SUI.Deferred();
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
 * @param {!SUI.Xhr} http
 * @return {undefined}
 */
SUI.Http.prototype.eventBeforeRequest = function(http) {
  SUI.consoleWarn('SUI.Http.eventBeforeRequest', http);
};

/**
 * @param {!XMLHttpRequest} http
 * @param {*} response
 * @return {undefined}
 */
SUI.Http.prototype.eventAfterRequest = function(http, response) {
  SUI.consoleWarn('SUI.Http.eventAfterRequest', http, response);
};
