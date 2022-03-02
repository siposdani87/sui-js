import { mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";
import { Tooltip } from "../component/tooltip";
import { Query } from "../core/query";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Range}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Range = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
Range.prototype = Object.create(BaseWidget.prototype);
Range.prototype.constructor = Range;

/**
 * @private
 * @return {undefined}
 */
Range.prototype._init = function() {
  this.inputBlock.addClass('range-widget');

  this.input.addEventListener('input', (input) => {
    const inputNode = input.getNode();
    this.input.setAttribute('value', inputNode.value);
    this.tooltip.setMessage(inputNode.value);
    this.modelChange(inputNode.value);
  });
};

/**
 * @override
 * @return {undefined}
 */
Range.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-sliderfield']);
  this.input.addClass(['mdl-slider', 'mdl-js-slider']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }

  this.refresh();
};

/**
 * @override
 */
Range.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  mdl(this.input);

  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  } else {
    this.inputBlock.removeClass('is-disabled');
  }

  const containerNode = new Query('.mdl-slider__container', this.inputBlock).getItem();
  const value = /** @type {string} */ (this.getValue());
  this.tooltip = new Tooltip(containerNode);
  this.tooltip.render(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
Range.prototype.setValue = function(value) {
  const inputNode = this.input.getNode();
  inputNode['MaterialSlider']['change'](value);
  this.tooltip.render(value);
};
