goog.provide('SUI.widget.Submit');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Submit}
 * @param {!SUI.Node} input
 */
SUI.widget.Submit = function(input) {
  SUI.Widget.call(this, input);
  this._init();
};
goog.inherits(SUI.widget.Submit, SUI.Widget);

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Submit.prototype._init = function() {
  this.input.setAttribute('name', 'submit');
};

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Submit.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--primary']);
  SUI.mdl(this.input);
};
