import { eq, consoleError, getExtensionName, instanceOf, isString, eachObject, isUndefined, encodeBase64, urlWithQueryString } from "../base";
import { Deferred } from "../core/deferred";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Xhr}
 * @param {!Object=} opt_options
 */
export const Xhr = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Xhr.prototype._setOptions = function(opt_options = {}) {
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
Xhr.prototype._init = function() {
  this.requestHeaders = {};
  this.authorization = null;
  this.types = {};

  this._setTypes();

  this.http = new XMLHttpRequest();
  this.http.onreadystatechange = this._onReadyStateChange();

  this.deferred = new Deferred();
};

/**
 * @private
 * @return {undefined}
 */
Xhr.prototype._setTypes = function() {
  this._setType('json', ['application/json', 'json', 'application/json']);
  this._setType('form', ['application/x-www-form-urlencoded', 'json', 'application/json']);

  this._setType('html', ['', 'document', 'text/html']);
  this._setType('svg', ['', 'document', 'image/svg-xml']);
  this._setType('xml', ['', 'document', 'application/xml']);
};

/**
 * @private
 * @param {string} name
 * @param {!Array} value
 * @return {undefined}
 */
Xhr.prototype._setType = function(name, value) {
  this.types[name] = value;
};

/**
 * @private
 * @param {string} name
 * @return {!Array}
 */
Xhr.prototype._getType = function(name) {
  return this.types[name] || [];
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
Xhr.prototype._getContentType = function(name) {
  return this._getType(name)[0] || '';
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
Xhr.prototype._getResponseType = function(name) {
  return this._getType(name)[1] || 'text';
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
Xhr.prototype._getAccept = function(name) {
  return this._getType(name)[2] || '*/*';
};

/**
 * @private
 * @return {!Function}
 */
Xhr.prototype._onReadyStateChange = function() {
  return () => {
    switch (this.http.readyState) {
      case 0:
        // request not initialized
      case 1:
        // server connection established
      case 2:
        // request received
      case 3:
        // processing request
        break;
      case 4:
        // Request finished and response is ready
        this._getResponseData(this.http.response).then((response) => {
          if (eq(this.http.status, 200)) {
            this.deferred.resolve([this.http].concat(response));
          } else {
            this.deferred.reject([this.http].concat(response));
          }
        });
        break;
      default:
        consoleError('Xhr._onReadyStateChange()', this.http.readyState);
        break;
    }
  };
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype.get = function(url, opt_params, opt_headers = {}) {
  return this._handleRequest('GET', url, {}, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype.post = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('POST', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype.put = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('PUT', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype.patch = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('PATCH', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype.delete = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('DELETE', url, opt_data, opt_params, opt_headers);
};

/**
 * @private
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
Xhr.prototype._getUrl = function(url, opt_params) {
  const uri = urlWithQueryString(url, opt_params);
  return url[0] === '/' ? this.options.backend + uri : uri;
};

/**
 * @private
 * @param {string} type
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!Promize}
 */
Xhr.prototype._handleRequest = function(type, url, opt_data, opt_params, opt_headers = {}) {
  this.http.open(type, this._getUrl(url, opt_params), true);
  const urlType = getExtensionName(url);
  this._setResponseType(urlType);
  this._setRequestHeaders(urlType, opt_headers);
  this.http.send(this._getRequestData(opt_data));
  return this.deferred.promise();
};

/**
 * @private
 * @param {!Object=} opt_data
 * @return {string}
 */
Xhr.prototype._getRequestData = function(opt_data) {
  let result = '';
  if (opt_data) {
    switch (this.getHeader('Content-Type')) {
      case this._getContentType('json'):
        result = JSON.stringify(opt_data);
        break;
      case this._getContentType('form'):
        result = this._stringifyObject(opt_data);
        break;
    }
  }
  return result;
};

/**
 * @private
 * @param {*} obj
 * @param {string} key
 * @param {string} stringKey
 * @return {!Array}
 */
Xhr.prototype._parseObject = function(obj, key, stringKey) {
  stringKey += stringKey ? '[' + key + ']' : key;
  let results = [];
  if (obj instanceof Array) {
    stringKey += '[]';
    for (let i = 0; i < obj.length; i++) {
      results.push([stringKey, obj[i]].join('='));
    }
  } else if (typeof obj === 'object') {
    for (const j in obj) {
      if (obj.hasOwnProperty(j)) {
        const pairs = this._parseObject(obj[j], j, stringKey);
        results = results.concat(pairs);
      }
    }
  } else {
    results.push([stringKey, obj].join('='));
  }
  return results;
};

/**
 * @private
 * @param {!Object} obj
 * @return {string}
 */
Xhr.prototype._stringifyObject = function(obj) {
  let results = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const pair = this._parseObject(obj[key], key, '');
      results = results.concat(pair);
    }
  }
  return results.join('&');
};

/**
 * @private
 * @return {string}
 */
Xhr.prototype._getFilenameFromHeader = function() {
  let filename = '';

  try {
    const contentDisposition = this.http.getResponseHeader('Content-Disposition');
    if (contentDisposition) {
      filename = contentDisposition.match(/filename="(.+)"/)[1];
    }
  } catch (_e) {
    // consoleWarn(e);
  }
  return filename;
};

/**
 * @private
 * @param {*} data
 * @return {!Promize}
 */
Xhr.prototype._getResponseData = function(data) {
  const deferred = new Deferred();
  const filename = this._getFilenameFromHeader();

  const contentType = this.http.getResponseHeader('Content-Type');
  if (contentType) {
    switch (contentType.split(';')[0]) {
      case 'application/json':
        if (instanceOf(data, Blob)) {
          const reader = new FileReader();
          reader.addEventListener('loadend', (e) => {
            data = JSON.parse(/** @type {string} */(e.target.result as string) || 'null');
            const object = new Objekt();
            object.merge(data);
            deferred.resolve([[object, filename]]);
          });
          reader.readAsText(/** @type {!Blob} */(data));
        } else {
          data = isString(data) ? JSON.parse(/** @type {string} */(data) || 'null') : data;
          const object = new Objekt();
          object.merge(data);
          deferred.resolve([[object, filename]]);
        }
        break;
      default:
        // let parserHtml = new DOMParser();
        // result = parserHtml.parseFromString(data, 'text/html');
        // result = new Blob([data], {'type': contentType});
        // result = data;
        deferred.resolve([[data, filename]]);
        break;
    }
  }
  return deferred.promise();
};

/**
 * @private
 * @param {string} urlType
 * @param {!Object=} opt_headers
 * @return {undefined}
 */
Xhr.prototype._setRequestHeaders = function(urlType, opt_headers = {}) {
  eachObject(opt_headers, (value, key) => {
    if (eq(key, 'responseType')) {
      this.http.responseType = value;
    } else {
      this.setHeader(key, value);
    }
  });

  if (isUndefined(this.getHeader('Accept'))) {
    this.setHeader('Accept', this._getAccept(urlType));
  }
  if (isUndefined(this.getHeader('Accept-Language'))) {
    this.setHeader('Accept-Language', this.options.locale);
  }
  if (isUndefined(this.getHeader('Content-Type'))) {
    this.setHeader('Content-Type', this._getContentType(urlType));
  }
  if (isUndefined(this.getHeader('Authorization')) && this.authorization) {
    this.setHeader('Authorization', this.authorization);
    this.http.withCredentials = true;
  }
  if (isUndefined(this.getHeader('X-Requested-With'))) {
    this.setHeader('X-Requested-With', 'XMLHttpRequest');
  }
};

/**
 * @private
 * @param {string} urlType
 * @return {undefined}
 */
Xhr.prototype._setResponseType = function(urlType) {
  this.http.responseType = this._getResponseType(urlType);
};

/**
 * @param {string} name
 * @param {string} value
 * @return {undefined}
 */
Xhr.prototype.setHeader = function(name, value) {
  if (name && value) {
    this.http.setRequestHeader(name, value);
  }
  this.requestHeaders[name] = value;
};

/**
 * @param {string} name
 * @return {string|null}
 */
Xhr.prototype.getHeader = function(name) {
  return this.requestHeaders[name];
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
Xhr.prototype.setBasicAuthorization = function(username, password) {
  if (username && password) {
    const hash = [username, password].join(':');
    this.authorization = 'Basic ' + encodeBase64(hash);
  }
};

/**
 * @param {string} token
 * @return {undefined}
 */
Xhr.prototype.setBearerAuthorization = function(token) {
  if (token) {
    this.authorization = 'Bearer ' + token;
  }
};
