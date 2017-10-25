goog.provide('SUI.lib.Browser');

goog.require('SUI');
goog.require('SUI.lib');

/**
 * http://browserhacks.com/
 * @constructor
 * @this {SUI.lib.Browser}
 */
SUI.lib.Browser = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Browser.prototype._init = function() {
  this._detectBrowsers();
  this._detectMissingFeatures();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Browser.prototype._detectMissingFeatures = function() {
  this.features = [];

  this._setFeature('navigator.geolocation', navigator && navigator.geolocation);
  this._setFeature('window.history', window.history);
  this._setFeature('window.localStorage', window.localStorage);
  this._setFeature('window.sessionStorage', window.sessionStorage);
  this._setFeature('window.btoa', window.btoa);
  this._setFeature('window.atob', window.atob);
  this._setFeature('console.log', console.log);
  this._setFeature('console.info', console.info);
  this._setFeature('console.warn', console.warn);
  this._setFeature('console.error', console.error);
};

/**
 * @return {undefined}
 */
SUI.lib.Browser.prototype.detect = function() {
  if (!SUI.isEmpty(this.features)) {
    this.eventMissingFeatures(this.features);
  }
};

/**
 * @private
 * @param {string} name
 * @param {*} value
 * @return {undefined}
 */
SUI.lib.Browser.prototype._setFeature = function(name, value) {
  if (SUI.eq(!!value, false)) {
    this.features.push(name);
  }
};

/**
 * @param {!Array} features
 * @return {undefined}
 */
SUI.lib.Browser.prototype.eventMissingFeatures = function(features) {
  console.error('SUI.lib.Browser.eventMissingFeatures()', features);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Browser.prototype._detectBrowsers = function() {
  this.browsers = {};

  this.browsers.webkit = 'WebkitAppearance' in document.documentElement.style;
  this.browsers.chromium = !!window.chrome;
  this.browsers.chrome = !!window.chrome && !!window.chrome.webstore;

  this.browsers.opera = !!window.opera || /opera|opr/i.test(navigator.userAgent);

  this.browsers.firefox = 'MozAppearance' in document.documentElement.style;

  this.browsers.safari = /constructor/i.test(window.HTMLElement);

  this.browsers.IE10 = 'behavior' in document.documentElement.style && '-ms-user-select' in document.documentElement.style;
  this.browsers.lteIE10 = /*@cc_on!@*/false;
  this.browsers.gteIE10 = document.body.style.msTouchAction !== undefined;
  this.browsers.IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
};

/**
 * @param {number=} opt_version
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isInternetExplorer = function(opt_version) {
  let result = this.browsers.lteIE10 || this.browsers.gteIE10;
  if (opt_version) {
    switch (opt_version) {
      case 11:
        result = this.browsers.IE11;
        break;
      case 10:
        result = this.browsers.IE10;
        break;
      default:
        result = this.browsers.lteIE10;
        break;
    }
  }
  return result;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isFirefox = function() {
  return this.browsers.firefox;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isChrome = function() {
  return this.browsers.chrome;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isOpera = function() {
  return this.browsers.opera;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isSafari = function() {
  return this.browsers.safari;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isWebkit = function() {
  return this.browsers.webkit;
};

/**
 * @return {boolean}
 */
SUI.lib.Browser.prototype.isChromium = function() {
  return this.browsers.chromium;
};
