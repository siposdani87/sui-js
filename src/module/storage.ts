import { decrypt, eachArray, encrypt, typeCast } from "../base";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Storage}
 * @param {!Object} options
 */
export const Storage = function(options) {
  const _self = this;
  _self.options = new Objekt({
    type: 'local',
    prefix: 'app',
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
Storage.prototype._init = function() {
  this.storage = this.options.type === 'local' ? window.localStorage : window.sessionStorage;

  setInterval(() => {
    this._checkExpires();
  }, this.options.interval);
};

/**
 * @private
 * @param {string} name
 * @return {string}
 */
Storage.prototype._getPropertyName = function(name) {
  return [this.options.prefix, name].join('.');
};

/**
 * @private
 * @param {string} propertyName
 * @return {string}
 */
Storage.prototype._getName = function(propertyName) {
  const parts = propertyName.split('.');
  parts.shift();
  return parts.join('.');
};

/**
 * @param {string} name
 * @param {*} value
 * @param {string|number|boolean|!Date=} opt_expires
 * @return {undefined}
 */
Storage.prototype.set = function(name, value, opt_expires) {
  const expires = this._getExpires(opt_expires);
  const encrypted = expires + ';' + encrypt(value, this.options.secret);
  const propertyName = this._getPropertyName(name);
  this.storage.setItem(propertyName, encrypted);
};

/**
 * @param {string} name
 * @return {*}
 */
Storage.prototype.get = function(name) {
  const propertyName = this._getPropertyName(name);
  const item = this.storage.getItem(propertyName);
  let result = null;
  if (item && item.indexOf(';') !== -1) {
    const encrypted = item.split(';', 2)[1] || encrypt(null, this.options.secret);
    const decrypted = decrypt(encrypted, this.options.secret);
    result = typeCast(decrypted);
  }
  return result;
};

/**
 * @param {string} name
 * @return {undefined}
 */
Storage.prototype.remove = function(name) {
  const propertyName = this._getPropertyName(name);
  this.storage.removeItem(propertyName);
};

/**
 * @return {undefined}
 */
Storage.prototype.clear = function() {
  this.storage.clear();
};

/**
 * @private
 * @return {undefined}
 */
Storage.prototype._checkExpires = function() {
  const properyNames = Object.keys(this.storage);
  eachArray(properyNames, (properyName) => {
    const name = this._getName(properyName);
    const isExpired = this._isExpired(name);
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
Storage.prototype._isExpired = function(name) {
  const date = new Date();
  const expireDate = this._getExpiresDate(name);
  return !!expireDate && date.getTime() >= expireDate.getTime();
};

/**
 * @private
 * @param {string} name
 * @return {?Date}
 */
Storage.prototype._getExpiresDate = function(name) {
  const propertyName = this._getPropertyName(name);
  const item = this.storage.getItem(propertyName);
  if (item) {
    const utcString = item.split(';', 2)[0];
    return new Date(utcString);
  }
  return null;
};

/**
 * @private
 * @param {string|number|boolean|!Date=} opt_expires
 * @return {string}
 */
Storage.prototype._getExpires = function(opt_expires) {
  const date = new Date();
  if (opt_expires) {
    switch (opt_expires.constructor) {
      case Number:
        date.setTime(date.getTime() + (/** @type {number} */ (opt_expires) * 60 * 60 * 1000));
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
