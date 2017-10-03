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
 * @returns {undefined}
 */
SUI.lib.Browser.prototype._init = function() {
  this._detectBrowsers();
  this._detectMissingFeatures();
};

/**
 * @private
 */
SUI.lib.Browser.prototype._detectMissingFeatures = function() {
  this.features = [];

  this._setFeature('navigator.geolocation', navigator.geolocation);
  this._setFeature('window.history', window.history);
  this._setFeature('window.localStorage', window.localStorage);
  this._setFeature('window.btoa', window.btoa);
  this._setFeature('window.atob', window.atob);
  this._setFeature('console.log', console.log);
  this._setFeature('console.info', console.info);
  this._setFeature('console.warn', console.warn);
  this._setFeature('console.error', console.error);
};

/**
 * @returns {undefined}
 */
SUI.lib.Browser.prototype.detect = function() {
  if (!SUI.isEmpty(this.features)) {
    this.eventMissingFeatures(this.features);
  }
};

/**
 * @param {string} name
 * @param {*} value
 * @private
 */
SUI.lib.Browser.prototype._setFeature = function(name, value) {
  if (SUI.eq(!!value, false)) {
    this.features.push(name);
  }
};

/**
 * @param {!Array} features
 * @returns {undefined}
 */
SUI.lib.Browser.prototype.eventMissingFeatures = function(features) {
  console.error('SUI.lib.Browser.eventMissingFeatures()', features);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Browser.prototype._detectBrowsers = function() {
  this.webkit = 'WebkitAppearance' in document.documentElement.style;
  this.chromium = !!window.chrome;
  this.chrome = !!window.chrome && !!window.chrome.webstore;

  this.opera = !!window.opera || /opera|opr/i.test(navigator.userAgent);

  this.firefox = 'MozAppearance' in document.documentElement.style;

  this.safari = /constructor/i.test(window.HTMLElement);

  this.IE10 = 'behavior' in document.documentElement.style && '-ms-user-select' in document.documentElement.style;
  this.lteIE10 = /*@cc_on!@*/false;
  this.gteIE10 = document.body.style.msTouchAction !== undefined;
  this.IE11 = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
};

/**
 * @param {number=} opt_version
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isInternetExplorer = function(opt_version) {
  var result = this.lteIE10 || this.gteIE10;
  if (opt_version) {
    switch (opt_version) {
      case 11:
        result = this.IE11;
        break;
      case 10:
        result = this.IE10;
        break;
      default:
        result = this.lteIE10;
        break;
    }
  }
  return result;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isFirefox = function() {
  return this.firefox;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isChrome = function() {
  return this.chrome;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isOpera = function() {
  return this.opera;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isSafari = function() {
  return this.safari;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isWebkit = function() {
  return this.webkit;
};

/**
 * @returns {boolean}
 */
SUI.lib.Browser.prototype.isChromium = function() {
  return this.chromium;
};
