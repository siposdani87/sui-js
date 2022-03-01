goog.provide('SUI.widget.Reset');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.widget.Reset}
 * @param {!SUI.Node} input
 */
SUI.widget.Reset = function(input) {
  SUI.widget.Reset.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.widget.Reset, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Reset.prototype._init = function() {
  this.input.setAttribute('name', 'reset');
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Reset.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
  this.refresh();
};

/**
 * @override
 */
SUI.widget.Reset.prototype.refresh = function() {
  SUI.mdl(this.input);
};
