goog.provide('SUI.lib.Xhr');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Xhr}
 * @param {!Object=} opt_options
 */
SUI.lib.Xhr = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    backend: '',
    locale: '',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._init = function() {
  this.requestHeaders = {};
  this.authorization = null;
  this.types = {};

  this._setTypes();

  this.http = new XMLHttpRequest();
  this.http.onreadystatechange = this._onReadyStateChange();

  this.deferred = new SUI.Deferred();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._setTypes = function() {
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
SUI.lib.Xhr.prototype._setType = function(name, value) {
  this.types[name] = value;
};

/**
 * @private
 * @param {string} name
 * @return {!Array}
 */
SUI.lib.Xhr.prototype._getType = function(name) {
  return this.types[name] || [];
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
SUI.lib.Xhr.prototype._getContentType = function(name) {
  return this._getType(name)[0] || '';
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
SUI.lib.Xhr.prototype._getResponseType = function(name) {
  return this._getType(name)[1] || 'text';
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
SUI.lib.Xhr.prototype._getAccept = function(name) {
  return this._getType(name)[2] || '*/*';
};

/**
 * @private
 * @return {!Function}
 */
SUI.lib.Xhr.prototype._onReadyStateChange = function() {
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
          if (SUI.eq(this.http.status, 200)) {
            this.deferred.resolve([this.http].concat(response));
          } else {
            this.deferred.reject([this.http].concat(response));
          }
        });
        break;
      default:
        console.error('SUI.lib.Xhr._onReadyStateChange()', this.http.readyState);
        break;
    }
  };
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.get = function(url, opt_params, opt_headers = {}) {
  return this._handleRequest('GET', url, {}, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.post = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('POST', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.put = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('PUT', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.patch = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('PATCH', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.delete = function(url, opt_data, opt_params, opt_headers = {}) {
  return this._handleRequest('DELETE', url, opt_data, opt_params, opt_headers);
};

/**
 * @private
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.lib.Xhr.prototype._getUrl = function(url, opt_params) {
  const urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
  return url[0] === '/' ? this.options.backend + urlWithQueryString : urlWithQueryString;
};

/**
 * @private
 * @param {string} type
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype._handleRequest = function(type, url, opt_data, opt_params, opt_headers = {}) {
  this.http.open(type, this._getUrl(url, opt_params), true);
  const urlType = SUI.getExtensionName(url);
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
SUI.lib.Xhr.prototype._getRequestData = function(opt_data) {
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
SUI.lib.Xhr.prototype._parseObject = function(obj, key, stringKey) {
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
SUI.lib.Xhr.prototype._stringifyObject = function(obj) {
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
 * @param {*} data
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype._getResponseData = function(data) {
  const deferred = new SUI.Deferred();
  const contentType = this.http.getResponseHeader('Content-Type');

  const contentDisposition = this.http.getResponseHeader('Content-Disposition');
  let filename = '';
  if (contentDisposition) {
    filename = contentDisposition.match(/filename="(.+)"/)[1];
  }

  if (contentType) {
    switch (contentType.split(';')[0]) {
      case 'application/json':
        if (SUI.instanceOf(data, Blob)) {
          const reader = new FileReader();
          reader.addEventListener('loadend', (e) => {
            data = JSON.parse(/** @type {string} */(e.srcElement.result) || 'null');
            const object = new SUI.Object();
            object.merge(data);
            deferred.resolve([[object, filename]]);
          });
          reader.readAsText(/** @type {!Blob} */(data));
        } else {
          data = SUI.isString(data) ? JSON.parse(/** @type {string} */(data) || 'null') : data;
          const object = new SUI.Object();
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
SUI.lib.Xhr.prototype._setRequestHeaders = function(urlType, opt_headers = {}) {
  SUI.eachObject(opt_headers, (value, key) => {
    if (SUI.eq(key, 'responseType')) {
      this.http.responseType = value;
    } else {
      this.setHeader(key, value);
    }
  });

  if (SUI.isUndefined(this.getHeader('Accept'))) {
    this.setHeader('Accept', this._getAccept(urlType));
  }
  if (SUI.isUndefined(this.getHeader('Accept-Language'))) {
    this.setHeader('Accept-Language', this.options.locale);
  }
  if (SUI.isUndefined(this.getHeader('Content-Type'))) {
    this.setHeader('Content-Type', this._getContentType(urlType));
  }
  if (SUI.isUndefined(this.getHeader('Authorization')) && this.authorization) {
    this.setHeader('Authorization', this.authorization);
    this.http.withCredentials = true;
  }
  if (SUI.isUndefined(this.getHeader('X-Requested-With'))) {
    this.setHeader('X-Requested-With', 'XMLHttpRequest');
  }
};

/**
 * @private
 * @param {string} urlType
 * @param {!Object=} opt_headers
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._setResponseType = function(urlType, opt_headers = {}) {
  this.http.responseType = this._getResponseType(urlType);
};

/**
 * @param {string} name
 * @param {string} value
 * @return {undefined}
 */
SUI.lib.Xhr.prototype.setHeader = function(name, value) {
  if (name && value) {
    this.http.setRequestHeader(name, value);
  }
  this.requestHeaders[name] = value;
};

/**
 * @param {string} name
 * @return {string|null}
 */
SUI.lib.Xhr.prototype.getHeader = function(name) {
  return this.requestHeaders[name];
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
SUI.lib.Xhr.prototype.setBasicAuthorization = function(username, password) {
  if (username && password) {
    const hash = [username, password].join(':');
    this.authorization = 'Basic ' + SUI.encodeBase64(hash);
  }
};

/**
 * @param {string} token
 * @return {undefined}
 */
SUI.lib.Xhr.prototype.setBearerAuthorization = function(token) {
  if (token) {
    this.authorization = 'Bearer ' + token;
  }
};
