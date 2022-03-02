import { mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Reset}
 * @param {!Item} input
 */
export const Reset = function(input) {
  BaseWidget.call(this, input);
  this._init();
};
Reset.prototype = Object.create(BaseWidget.prototype);
Reset.prototype.constructor = Reset;

/**
 * @private
 * @return {undefined}
 */
Reset.prototype._init = function() {
  this.input.setAttribute('name', 'reset');
};

/**
 * @override
 * @return {undefined}
 */
Reset.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-js-ripple-effect']);
  this.refresh();
};

/**
 * @override
 */
Reset.prototype.refresh = function() {
  mdl(this.input);
};
