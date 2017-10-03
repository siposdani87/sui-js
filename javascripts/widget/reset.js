goog.provide('SUI.widget.Reset');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Reset}
 * @param {!SUI.Node} input
 */
SUI.widget.Reset = function(input) {
  SUI.Widget.call(this, input);
  this._init();
};
goog.inherits(SUI.widget.Reset, SUI.Widget);

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Reset.prototype._init = function() {
  this.input.setAttribute('name', 'reset');
};

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Reset.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
  SUI.mdl(this.input);
};
