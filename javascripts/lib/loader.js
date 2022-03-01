goog.provide('SUI.Loader');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Loader}
 * @param {!Object=} opt_options
 */
SUI.Loader = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Loader.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    counter: 0,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Loader.prototype._init = function() {
  this.loader = new SUI.Query('#loader').getItem();

  this.spinner = this.loader.createElement('div');
  this.spinner.addClass(['mdl-spinner', 'mdl-spinner--single-color', 'mdl-js-spinner']);

  this.loader.appendChild(this.spinner);
};

/**
 * @return {undefined}
 */
SUI.Loader.prototype.show = function() {
  this.options.counter++;
  this.loader.removeClass('hidden');
  this.spinner.addClass('is-active');
};

/**
 * @param {boolean=} opt_force
 * @return {undefined}
 */
SUI.Loader.prototype.hide = function(opt_force) {
  this.options.counter--;
  if (opt_force || SUI.eq(this.options.counter, 0)) {
    this.options.counter = 0;
    this.loader.addClass('hidden');
    this.spinner.removeClass('is-active');
  }
};
