goog.provide('SUI.Reset');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Reset}
 * @param {!SUI.Node} input
 */
SUI.Reset = function(input) {
  SUI.Reset.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.Reset, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Reset.prototype._init = function() {
  this.input.setAttribute('name', 'reset');
};

/**
 * @override
 * @return {undefined}
 */
SUI.Reset.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
  this.refresh();
};

/**
 * @override
 */
SUI.Reset.prototype.refresh = function() {
  SUI.mdl(this.input);
};
