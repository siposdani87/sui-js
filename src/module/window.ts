import { debounce, consoleWarn, neq, gte } from "../base";
import { Objekt } from "../core/objekt";

/**
 * @constructor
 * @this {Window}
 * @param {!Object=} opt_options
 */
export const Window = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Window.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt({
    delay: 250,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Window.prototype._init = function() {
  this.window = window;
  this.document = document;

  this.orientation = this.getOrientation();

  this._initResizeEvent();
  this._initScrollEvent();
  this._initConnectionEvent();
  this._initColorSchemeEvent();
};

/**
 * @private
 * @return {undefined}
 */
Window.prototype._initResizeEvent = function() {
  this.window.addEventListener('resize', debounce((event) => {
    this._resize(event);
  }, this.options.delay), false);
};

/**
 * @private
 * @return {undefined}
 */
Window.prototype._initScrollEvent = function() {
  this.window.addEventListener('scroll', debounce((event) => {
    this._scroll(event);
  }, this.options.delay), false);
};

/**
 * @private
 * @return {undefined}
 */
Window.prototype._initConnectionEvent = function() {
  this.window.addEventListener('online', (event) => {
    this.eventOnline(event);
  }, false);

  this.window.addEventListener('offline', (event) => {
    this.eventOffline(event);
  }, false);
};

/**
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventOffline = function(event) {
  consoleWarn('Window.eventOffline()', event);
};

/**
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventOnline = function(event) {
  consoleWarn('Window.eventOffline()', event);
};

/**
 * @param {number} width
 * @param {number} height
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventResize = function(width, height, event) {
  consoleWarn('Window.eventResize()', width, height, event);
};

/**
 * @param {string} orientation
 * @param {number} width
 * @param {number} height
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventOrientationChange = function(orientation, width, height, event) {
  consoleWarn('Window.eventOrientationChange()', orientation, width, height, event);
};

/**
 * @param {number} scrollTop
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventScroll = function(scrollTop, event) {
  consoleWarn('Window.eventScroll()', scrollTop, event);
};

/**
 * @private
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype._resize = function(event) {
  this.eventResize(this.getWidth(), this.getHeight(), event);

  const orientation = this.getOrientation();
  if (neq(this.orientation, orientation)) {
    this.orientation = orientation;
    this.eventOrientationChange(this.orientation, this.getWidth(), this.getHeight(), event);
  }
};

/**
 * @private
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype._scroll = function(event) {
  this.eventScroll(this.getScrollTop(), event);
};

/**
 * @return {number}
 */
Window.prototype.getScrollTop = function() {
  return this.document.documentElement.scrollTop || this.document.body.scrollTop;
};

/**
 * @return {number}
 */
Window.prototype.getWidth = function() {
  return this.window.innerWidth;
};

/**
 * @return {number}
 */
Window.prototype.getHeight = function() {
  return this.window.innerHeight;
};

/**
 * @return {string} landscape|portrait
 */
Window.prototype.getOrientation = function() {
  return gte(this.getWidth(), this.getHeight()) ? 'landscape' : 'portrait';
};

/**
 * @private
 * @return {undefined}
 */
Window.prototype._initColorSchemeEvent = function() {
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
      if (event.matches) {
        this.eventColorSchemeChange('dark', event);
      } else {
        this.eventColorSchemeChange('light', event);
      }
    });
  }
};

/**
 * @param {string} colorScheme
 * @param {!Event} event
 * @return {undefined}
 */
Window.prototype.eventColorSchemeChange = function(colorScheme, event) {
  consoleWarn('Window.eventColorSchemeChange()', colorScheme, event);
};

/**
 * @param {string} type dark|light|no-preference
 * @return {boolean}
 */
Window.prototype.isColorScheme = function(type) {
  return window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${type})`).matches;
};
