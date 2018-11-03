goog.provide('SUI.lib.Cookie');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Cookie}
 * @param {!Object=} opt_options
 */
SUI.lib.Cookie = function(opt_options = {}) {
  this._setOptions(opt_options);
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.Cookie.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    hours: 24,
  });
  _self.options.merge(opt_options);
};

/**
 * @param {string} name
 * @param {string} value
 * @param {string|number|boolean|!Date=} opt_expires
 * @param {string=} opt_path
 * @param {string=} opt_domain
 * @param {boolean=} opt_secure
 * @return {boolean}
 */
SUI.lib.Cookie.prototype.set = function(name, value, opt_expires, opt_path, opt_domain, opt_secure) {
  if (!name || /^(?:expires|max\-age|path|domain|secure)$/i.test(name)) {
    return false;
  }
  if (opt_expires) {
    switch (opt_expires.constructor) {
      case Number:
        opt_expires = opt_expires === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + (opt_expires * 60 * 60);
        break;
      case Date:
        opt_expires = '; expires=' + opt_expires.toUTCString();
        break;
      default:
        break;
    }
  } else {
    const date = new Date();
    date.setTime(date.getTime() + (this.options.hours * 60 * 60 * 1000));
    opt_expires = '; expires=' + date.toUTCString();
  }
  document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + opt_expires + (opt_domain ? '; domain=' + opt_domain : '') + (opt_path ? '; path=' + opt_path : '') + (opt_secure ? '; secure' : '');
  return true;
};

/**
 * @param {string} name
 * @return {*}
 */
SUI.lib.Cookie.prototype.get = function(name) {
  const regex = new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$');
  return SUI.typeCast(decodeURIComponent(document.cookie.replace(regex, '$1')) || null);
};

/**
 * @param {string} name
 * @param {string=} opt_path
 * @param {string=} opt_domain
 * @return {boolean}
 */
SUI.lib.Cookie.prototype.remove = function(name, opt_path, opt_domain) {
  if (!this._has(name)) {
    return false;
  }
  const expires = new Date(1970, 0, 1);
  this.set(name, '', expires, opt_path, opt_domain);
  return true;
};

/**
 * @private
 * @param {string} name
 * @return {boolean}
 */
SUI.lib.Cookie.prototype._has = function(name) {
  const regex = new RegExp('(?:^|;\\s*)' + encodeURIComponent(name).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=');
  return regex.test(document.cookie);
};

/**
 * @private
 * @return {!Array}
 */
SUI.lib.Cookie.prototype._getKeys = function() {
  const keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/);
  for (let i = 0; i < keys.length; i++) {
    keys[i] = decodeURIComponent(keys[i]);
  }
  return keys;
};

/**
 * @return {undefined}
 */
SUI.lib.Cookie.prototype.clear = function() {
  const keys = this._getKeys();
  SUI.each(keys, (key) => {
    this.remove(key);
  });
};
