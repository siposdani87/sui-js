import { mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Text}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Text = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
Text.prototype = Object.create(BaseWidget.prototype);
Text.prototype.constructor = Text;

/**
 * @private
 * @return {undefined}
 */
Text.prototype._init = function() {
  this.inputBlock.addClass('text-widget');

  this.input.addEventListener('keyup', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    return true;
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    return true;
  });
};

/**
 * @override
 * @return {undefined}
 */
Text.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 * @return {undefined}
 */
Text.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  mdl(this.inputBlock);
};

/**
 * @override
 * @return {*}
 */
Text.prototype.getValue = function() {
  return this.input.getNode().value;
};
