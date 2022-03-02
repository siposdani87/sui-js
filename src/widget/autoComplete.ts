import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {AutoComplete}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const AutoComplete = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
AutoComplete.prototype = Object.create(BaseWidget.prototype);
AutoComplete.prototype.constructor = AutoComplete;

/**
 * @private
 * @return {undefined}
 */
AutoComplete.prototype._init = function() {

};
