goog.provide('SUI.widget.Submit');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Submit}
 * @param {!SUI.Node} input
 */
SUI.widget.Submit = function(input) {
  SUI.widget.Submit.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.widget.Submit, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Submit.prototype._init = function() {
  this.input.setAttribute('name', 'submit');
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Submit.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--primary']);
  this.refresh();
};

/**
 * @override
 */
SUI.widget.Submit.prototype.refresh = function() {
  SUI.mdl(this.input);
};
