import { mdl, consoleWarn } from "../base";
import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Button}
 * @param {!Item} input
 */
export const Button = function(input) {
  BaseWidget.call(this, input);
  this._init();
};
Button.prototype = Object.create(BaseWidget.prototype);
Button.prototype.constructor = Button;

/**
 * @private
 * @return {undefined}
 */
Button.prototype._init = function() {
  this.input.setAttribute('name', 'button');
};

/**
 * @override
 * @return {undefined}
 */
Button.prototype.render = function() {
  this.input.addClass(['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-js-ripple-effect', 'mdl-button--accent']);

  this.input.addEventListener('click', (node) => {
    this.eventClick(node);
  });

  this.refresh();
};

/**
 * @override
 */
Button.prototype.refresh = function() {
  mdl(this.input);
};

/**
 * @param {!Item} node
 * @return {undefined}
 */
Button.prototype.eventClick = function(node) {
  consoleWarn('Button.eventClick()', node);
};
