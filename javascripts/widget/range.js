import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Range');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Range}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.Range = function(input, label, error, inputBlock) {
  SUI.Range.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Range, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Range.prototype._init = function() {
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
SUI.Range.prototype.render = function() {
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
SUI.Range.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.input);

  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  } else {
    this.inputBlock.removeClass('is-disabled');
  }

  const containerNode = new SUI.Query('.mdl-slider__container', this.inputBlock).getItem();
  const value = /** @type {string} */ (this.getValue());
  this.tooltip = new SUI.Tooltip(containerNode);
  this.tooltip.render(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.Range.prototype.setValue = function(value) {
  const inputNode = this.input.getNode();
  inputNode['MaterialSlider']['change'](value);
  this.tooltip.render(value);
};
