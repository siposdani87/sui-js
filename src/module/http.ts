import { consoleWarn } from "../base";
import { Deferred } from "../core/deferred";
import { Objekt } from "../core/objekt";
import { Xhr } from "./xhr";

/**
 * @constructor
 * @this {Http}
 * @param {!Object=} opt_options
 */
export const Http = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Http.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt({
    backend: '',
    locale: '',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Http.prototype._init = function() {
  this.username = null;
  this.password = null;
  this.token = null;
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
Http.prototype.setBasicAuthorization = function(username, password) {
  this.username = username;
  this.password = password;
};

/**
 * @param {string} token
 */
Http.prototype.setBearerAuthorization = function(token) {
  this.token = token;
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Http.prototype.get = function(url, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.get(url, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Http.prototype.post = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.post(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Http.prototype.put = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.put(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Http.prototype.patch = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.patch(url, opt_data, opt_params, opt_headers));
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Http.prototype.delete = function(url, opt_data, opt_params, opt_headers) {
  const http = this._getRequestHandler();
  return this._getPromise(http.delete(url, opt_data, opt_params, opt_headers));
};

/**
 * @private
 * @return {!Xhr}
 */
Http.prototype._getRequestHandler = function() {
  const http = new Xhr(this.options);
  this.eventBeforeRequest(http);
  http.setBasicAuthorization(this.username, this.password);
  http.setBearerAuthorization(this.token);
  return http;
};

/**
 * @private
 * @param {!Promize} promise
 * @return {!Promize}
 */
Http.prototype._getPromise = function(promise) {
  const deferred = new Deferred();
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
 * @param {!Xhr} http
 * @return {undefined}
 */
Http.prototype.eventBeforeRequest = function(http) {
  consoleWarn('Http.eventBeforeRequest', http);
};

/**
 * @param {!XMLHttpRequest} http
 * @param {*} response
 * @return {undefined}
 */
Http.prototype.eventAfterRequest = function(http, response) {
  consoleWarn('Http.eventAfterRequest', http, response);
};
