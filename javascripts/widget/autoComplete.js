goog.provide('SUI.AutoComplete');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.AutoComplete}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.AutoComplete = function(input, label, error, inputBlock) {
  SUI.AutoComplete.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.AutoComplete, SUI.BaseWidget);


/**
 * @private
 * @return {undefined}
 */
SUI.AutoComplete.prototype._init = function() {

};
