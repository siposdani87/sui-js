import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Submit');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Submit}
 * @param {!SUI.Item} input
 */
SUI.Submit = function(input) {
  SUI.Submit.base(this, 'constructor', input);
  this._init();
};
goog.inherits(SUI.Submit, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Submit.prototype._init = function() {
  this.input.setAttribute('name', 'submit');
};

/**
 * @override
 * @return {undefined}
 */
SUI.Submit.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--primary']);
  this.refresh();
};

/**
 * @override
 */
SUI.Submit.prototype.refresh = function() {
  SUI.mdl(this.input);
};
