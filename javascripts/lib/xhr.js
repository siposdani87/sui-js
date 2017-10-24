goog.provide('SUI.lib.Xhr');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Xhr}
 * @param {!Object} options
 */
SUI.lib.Xhr = function(options) {
  this.types = {};
  this._setType('json', ['application/json', 'json']);
  this._setType('html', ['text/html', 'document']);
  this._setType('form', ['application/x-www-form-urlencoded', 'json']);
  this._setType('svg', ['image/svg+xml', 'document']);

  let _self = this;
  _self.options = new SUI.Object({
    backend: '',
    content_type: this._getContentType('json'),
    response_type: this._getResponseType('json'),
    authorization: null,
  });
  _self.options.merge(options);
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._init = function() {
  this.http = new XMLHttpRequest();
  this.http.withCredentials = true;
  this.http.onreadystatechange = this._onReadyStateChange();

  this.deferred = new SUI.Deferred();
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
 * @return {string}
 */
SUI.lib.Xhr.prototype._getContentType = function(name) {
  let typeSettings = this.types[name] || this.types['json'];
  return typeSettings[0];
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
SUI.lib.Xhr.prototype._getResponseType = function(name) {
  let typeSettings = this.types[name] || this.types['json'];
  return typeSettings[1];
};

/**
 * @private
 * @return {!Function}
 */
SUI.lib.Xhr.prototype._onReadyStateChange = function() {
  return function() {
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
        let response = this._getResponseData(this.http.response);
        if (SUI.eq(this.http.status, 200)) {
          this.deferred.resolve(response.concat([this.http.status]));
        } else {
          this.deferred.reject(response.concat([this.http.status]));
        }
        break;
      default:
        console.error('SUI.lib.Xhr._onReadyStateChange()', this.http.readyState);
        break;
    }
  }.bind(this);
};

/**
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.get = function(url, opt_params, opt_headers) {
  return this._handleRequest('GET', url, {}, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.post = function(url, opt_data, opt_params, opt_headers) {
  return this._handleRequest('POST', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.put = function(url, opt_data, opt_params, opt_headers) {
  return this._handleRequest('PUT', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.patch = function(url, opt_data, opt_params, opt_headers) {
  return this._handleRequest('PATCH', url, opt_data, opt_params, opt_headers);
};

/**
 * @param {string} url
 * @param {!Object=} opt_data
 * @param {!Object=} opt_params
 * @param {!Object=} opt_headers
 * @return {!SUI.Promise}
 */
SUI.lib.Xhr.prototype.delete = function(url, opt_data, opt_params, opt_headers) {
  return this._handleRequest('DELETE', url, opt_data, opt_params, opt_headers);
};

/**
 * @private
 * @param {string} url
 * @param {!Object=} opt_params
 * @return {string}
 */
SUI.lib.Xhr.prototype._getUrl = function(url, opt_params) {
  let urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
  return this.options.backend + urlWithQueryString;
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
SUI.lib.Xhr.prototype._handleRequest = function(type, url, opt_data, opt_params, opt_headers) {
  this.http.open(type, this._getUrl(url, opt_params), true);
  this._setRequestHeaders(url, opt_headers);
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
    switch (this.options.content_type) {
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
    for (let j in obj) {
      if (obj.hasOwnProperty(j)) {
        let pairs = this._parseObject(obj[j], j, stringKey);
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
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let pair = this._parseObject(obj[key], key, '');
      results = results.concat(pair);
    }
  }
  return results.join('&');
};

/**
 * @private
 * @param {*} data
 * @return {!Array}
 */
SUI.lib.Xhr.prototype._getResponseData = function(data) {
  let type = this.http.getResponseHeader('Content-Type');
  let results = [data];
  if (type) {
    switch (type.split(';')[0]) {
      case this._getContentType('json'):
        data = SUI.isString(data) ? JSON.parse(/** @type {string} */(data) || 'null') : data;
        let object = new SUI.Object();
        object.merge(data);
        results = [object];
        break;
      case this._getContentType('html'):
      // let parserHtml = new DOMParser();
      // result = parserHtml.parseFromString(data, this._getContentType('html'));
      case this._getContentType('form'):
      case this._getContentType('svg'):
        break;
      default:
        // result = new Blob([data], {'type': type});
        let contentDisposition = this.http.getResponseHeader('Content-Disposition');
        let filename = contentDisposition.match(/filename="(.+)"/)[1];
        results = [data, filename];
        break;
    }
  }
  return results;
};

/**
 * @private
 * @param {string} url
 * @param {!Object=} opt_headers
 * @return {undefined}
 */
SUI.lib.Xhr.prototype._setRequestHeaders = function(url, opt_headers) {
  let contentType = SUI.getExtensionName(url);
  this.options.content_type = this._getContentType(contentType);
  this.options.response_type = this._getResponseType(contentType);
  this.http.responseType = this.options.response_type;
  this.setHeader('Accept-Language', this.options.locale);
  this.setHeader('Content-Type', this.options.content_type);
  if (this.options.authorization) {
    this.setHeader('Authorization', this.options.authorization);
  }
  SUI.each(opt_headers, (header, key) => {
    if (SUI.eq(key, 'responseType')) {
      this.http.responseType = header;
    } else {
      this.setHeader(key, header);
    }
  });
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
};

/**
 * @param {string} username
 * @param {string} password
 * @return {undefined}
 */
SUI.lib.Xhr.prototype.setBasicAuthorization = function(username, password) {
  if (username && password) {
    let hash = [username, password].join(':');
    this.options.authorization = 'Basic ' + SUI.encodeBase64(hash);
  }
};

/**
 * @param {string} token
 * @return {undefined}
 */
SUI.lib.Xhr.prototype.setBearerAuthorization = function(token) {
  if (token) {
    this.options.authorization = 'Bearer ' + token;
  }
};
