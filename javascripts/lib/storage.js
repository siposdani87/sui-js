goog.provide('SUI.lib.Storage');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Storage}
 * @param {!Object} options
 */
SUI.lib.Storage = function(options) {
  let _self = this;
  _self.options = new SUI.Object({
    type: 'local',
    secret: '',
    hours: 24 * 7,
    interval: 60 * 1000,
  });
  _self.options.merge(options);

  this._init();
};


/**
 * @private
 * @return {undefined}
 */
SUI.lib.Storage.prototype._init = function() {
  this.storage = this.options.type === 'local' ? window.localStorage : window.sessionStorage;

  setInterval(() => {
    this._checkExpires();
  }, this.options.interval);
};

/**
 * @param {string} name
 * @param {*} value
 * @param {string|number|boolean|!Date=} opt_expires
 * @return {undefined}
 */
SUI.lib.Storage.prototype.set = function(name, value, opt_expires) {
  let expires = this._getExpires(opt_expires);
  let encrypted = expires + ';' + SUI.encrypt(value, this.options.secret);
  this.storage.setItem(name, encrypted);
};

/**
 * @param {string} name
 * @return {*}
 */
SUI.lib.Storage.prototype.get = function(name) {
  let item = this.storage.getItem(name);
  let result = null;
  if (item && item.indexOf(';') !== -1) {
    let encrypted = item.split(';', 2)[1] || SUI.encrypt(null, this.options.secret);
    let decrypted = SUI.decrypt(encrypted, this.options.secret);
    result = SUI.typeCast(decrypted);
  }
  return result;
};

/**
 * @param {string} name
 * @return {undefined}
 */
SUI.lib.Storage.prototype.remove = function(name) {
  this.storage.removeItem(name);
};

/**
 * @return {undefined}
 */
SUI.lib.Storage.prototype.clear = function() {
  this.storage.clear();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Storage.prototype._checkExpires = function() {
  let keys = Object.keys(this.storage);
  SUI.eachArray(keys, (name) => {
    let isExpired = this._isExpired(name);
    if (isExpired) {
      this.remove(name);
    }
  });
};

/**
 * @private
 * @param {string} name
 * @return {boolean}
 */
SUI.lib.Storage.prototype._isExpired = function(name) {
  let date = new Date();
  let expireDate = this._getExpiresDate(name);
  return !!expireDate && date.getTime() >= expireDate.getTime();
};

/**
 * @private
 * @param {string} name
 * @return {?Date}
 */
SUI.lib.Storage.prototype._getExpiresDate = function(name) {
  let item = this.storage.getItem(name);
  if (item) {
    let utcString = item.split(';', 2)[0];
    return new Date(utcString);
  }
  return null;
};

/**
 * @private
 * @param {string|number|boolean|!Date=} opt_expires
 * @return {string}
 */
SUI.lib.Storage.prototype._getExpires = function(opt_expires) {
  let date = new Date();
  if (opt_expires) {
    switch (opt_expires.constructor) {
      case Number:
        date.setTime(date.getTime() + (opt_expires * 60 * 60 * 1000));
        opt_expires = opt_expires === Infinity ? 'Fri, 31 Dec 9999 23:59:59 GMT' : date.toUTCString();
        break;
      case Date:
        opt_expires = opt_expires.toUTCString();
        break;
      default:
        break;
    }
  } else {
    date.setTime(date.getTime() + (this.options.hours * 60 * 60 * 1000));
    opt_expires = date.toUTCString();
  }
  return /** @type {string} */ (opt_expires);
};
