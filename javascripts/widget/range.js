goog.provide('SUI.widget.Range');

goog.require('SUI');
goog.require('SUI.Query');
goog.require('SUI.Tooltip');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Range}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Range = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Range, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Range.prototype._init = function() {
  this.inputBlock.addClass('range-widget');

  this.input.addEventListener('input', (input) => {
    let inputNode = input.getNode();
    this.input.setAttribute('value', inputNode.value);
    this.tooltip.setMessage(inputNode.value);
    this.modelChange(inputNode.value);
    this.checkValidity();
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Range.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-sliderfield']);
  this.input.addClass(['mdl-slider', 'mdl-js-slider']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  let containerNode = new SUI.Query('.mdl-slider__container', this.inputBlock).getItem();
  let value = /** @type {string} */ (this.getValue());
  this.tooltip = new SUI.Tooltip(containerNode, value);

  this.refresh();
};

/**
 * @override
 */
SUI.widget.Range.prototype.refresh = function() {
  SUI.mdl(this.input);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Range.prototype.setValue = function(value) {
  let inputNode = this.input.getNode();
  inputNode['MaterialSlider']['change'](value);
};
