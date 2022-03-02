import { mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Submit}
 * @param {!Item} input
 */
export const Submit = function(input) {
  BaseWidget.call(this, input);
  this._init();
};
Submit.prototype = Object.create(BaseWidget.prototype);
Submit.prototype.constructor = Submit;

/**
 * @private
 * @return {undefined}
 */
Submit.prototype._init = function() {
  this.input.setAttribute('name', 'submit');
};

/**
 * @override
 * @return {undefined}
 */
Submit.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--primary']);
  this.refresh();
};

/**
 * @override
 */
Submit.prototype.refresh = function() {
  mdl(this.input);
};
