goog.provide('SUI.widget.AutoComplete');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.widget.AutoComplete}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.AutoComplete = function(input, label, error, inputBlock) {
  SUI.widget.AutoComplete.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.AutoComplete, SUI.BaseWidget);


/**
 * @private
 * @return {undefined}
 */
SUI.widget.AutoComplete.prototype._init = function() {

};
