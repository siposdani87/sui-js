goog.provide('SUI.lib.Window');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Window}
 * @param {!Object=} opt_options
 */
SUI.lib.Window = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @returns {undefined}
 */
SUI.lib.Window.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    delay: 250
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Window.prototype._init = function() {
  this.window = window;
  this.document = document;

  this.orientation = this.getOrientation();

  this._initResizeEvent();
  this._initScrollEvent();
  this._initOnlineEvent();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Window.prototype._initResizeEvent = function() {
  this.window.addEventListener('resize', SUI.debounce((event) => {
    this._resize(event);
  }, this.options.delay), false);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Window.prototype._initScrollEvent = function() {
  this.window.addEventListener('scroll', SUI.debounce((event) => {
    this._scroll(event);
  }, this.options.delay), false);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Window.prototype._initOnlineEvent = function() {
  this.window.addEventListener('offline', function(event) {
    this.eventOffline(event);
  }.bind(this), false);

  this.window.addEventListener('online', function(event) {
    this.eventOnline(event);
  }.bind(this), false);
};

/**
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype.eventOffline = function(event) {
  console.warn('SUI.Window.eventOffline()', event);
};

/**
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype.eventOnline = function(event) {
  console.warn('SUI.Window.eventOffline()', event);
};

/**
 * @param {number} width
 * @param {number} height
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype.eventResize = function(width, height, event) {
  console.warn('SUI.Window.eventResize()', width, height, event);
};

/**
 * @param {string} orientation
 * @param {number} width
 * @param {number} height
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype.eventOrientationChange = function(orientation, width, height, event) {
  console.warn('SUI.Window.eventOrientationChange()', orientation, width, height, event);
};

/**
 * @param {number} scrollTop
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype.eventScroll = function(scrollTop, event) {
  console.warn('SUI.Window.eventScroll()', scrollTop, event);
};

/**
 * @private
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype._resize = function(event) {
  this.eventResize(this.getWidth(), this.getHeight(), event);

  var orientation = this.getOrientation();
  if (SUI.neq(this.orientation, orientation)) {
    this.orientation = orientation;
    this.eventOrientationChange(this.orientation, this.getWidth(), this.getHeight(), event);
  }
};

/**
 * @private
 * @param {!Event} event
 * @returns {undefined}
 */
SUI.lib.Window.prototype._scroll = function(event) {
  this.eventScroll(this.getScrollTop(), event);
};

/**
 * @returns {number}
 */
SUI.lib.Window.prototype.getScrollTop = function() {
  return this.document.documentElement.scrollTop || this.document.body.scrollTop;
};

/**
 * @returns {number}
 */
SUI.lib.Window.prototype.getWidth = function() {
  return this.window.innerWidth;
};

/**
 * @returns {number}
 */
SUI.lib.Window.prototype.getHeight = function() {
  return this.window.innerHeight;
};

/**
 * @returns {string} landscape|portrait
 */
SUI.lib.Window.prototype.getOrientation = function() {
  return SUI.gte(this.getWidth(), this.getHeight()) ? 'landscape' : 'portrait';
};
