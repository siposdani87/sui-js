goog.provide('SUI.lib.Console');

goog.require('SUI.Object');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Console}
 * @param {!SUI.Object} config
 * @param {!Object=} opt_options
 */
SUI.lib.Console = function(config, opt_options) {
  this.config = config;
  this._setOptions(opt_options);
};

/**
 * @param {!Object=} opt_options
 * @private
 * @return {undefined}
 */
SUI.lib.Console.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @param {...*} message
 */
SUI.lib.Console.prototype.log = function(...message) {
  if (this.config.get('development')) {
    console.log.apply(console, message);
  }
};

/**
 * @param {...*} message
 */
SUI.lib.Console.prototype.warn = function(...message) {
  if (this.config.get('development')) {
    console.warn.apply(console, message);
  }
};

/**
 * @param {...*} message
 */
SUI.lib.Console.prototype.info = function(...message) {
  if (this.config.get('development')) {
    console.info.apply(console, message);
  }
};

/**
 * @param {...*} message
 */
SUI.lib.Console.prototype.error = function(...message) {
  if (this.config.get('development')) {
    console.error.apply(console, message);
  }
};
