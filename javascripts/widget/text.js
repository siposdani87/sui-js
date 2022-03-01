import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Text');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Text}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.Text = function(input, label, error, inputBlock) {
  SUI.Text.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Text, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Text.prototype._init = function() {
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
SUI.Text.prototype.render = function() {
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
SUI.Text.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};

/**
 * @override
 * @return {*}
 */
SUI.Text.prototype.getValue = function() {
  return this.input.getNode().value;
};
