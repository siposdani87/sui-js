import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.AutoComplete');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.AutoComplete}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
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
