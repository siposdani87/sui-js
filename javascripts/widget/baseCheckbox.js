import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.BaseCheckbox');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.Query');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.BaseCheckbox}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.BaseCheckbox = function(input, label, error, inputBlock) {
  SUI.BaseCheckbox.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.BaseCheckbox, SUI.BaseWidget);

/**
 * @protected
 * @return {undefined}
 */
SUI.BaseCheckbox.prototype._init = function() {
  this.hiddenInput = new SUI.Query('input[type=hidden]', this.inputBlock).getItem();
  this.inputBlock.addClass('checkbox-widget');

  this.input.addEventListener('change', () => {
    this._change();
    return true;
  });
};

/**
 * @protected
 * @return {undefined}
 */
SUI.BaseCheckbox.prototype._change = function() {
  const value = this.getValue();
  this.modelChange(value);
};

/**
 * @override
 * @return {*}
 */
SUI.BaseCheckbox.prototype.getValue = function() {
  const checked = this.input.getNode().checked;
  let value = this.hiddenInput.getAttribute('value');
  if (checked) {
    value = this.input.getAttribute('value');
  }
  return SUI.typeCast(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.BaseCheckbox.prototype.setValue = function(value) {
  const currentValue = SUI.typeCast(this.input.getAttribute('value'));
  this.input.getNode().checked = currentValue === value;
  if (!this.input.getNode().checked) {
    this.input.removeAttribute('checked');
  }
  this.input.trigger('change');
};

/**
 * @override
 * @param {boolean} state
 * @return {undefined}
 */
SUI.BaseCheckbox.prototype.setDisabled = function(state) {
  if (state) {
    this.input.setAttribute('disabled');
    this.label.addClass('is-disabled');
    this.inputBlock.addClass('is-disabled');
  } else {
    this.input.removeAttribute('disabled');
    this.label.removeClass('is-disabled');
    this.inputBlock.removeClass('is-disabled');
  }
  this.input.getNode().disabled = state;
  this.checkValidity(true, false);
};

/**
 * @override
 * @param {string} text
 * @return {undefined}
 */
SUI.BaseCheckbox.prototype.setLabel = function(text) {
  if (this.spanLabel && !this.spanLabel.isEmpty()) {
    this.spanLabel.setHtml(text);
    this._setAdditionalLabel(this.spanLabel);
  }
};

/**
 * @override
 */
SUI.BaseCheckbox.prototype.refresh = function() {
  const dataLabelText = /** @type {string} */ (this.label.getAttribute('data-label'));
  if (dataLabelText) {
    const labelText = this._getLabelRequiredText(dataLabelText);
    this.dataLabelNode.setHtml(labelText);
  } else {
    this.dataLabelNode.setHtml('');
  }
  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  }

  SUI.mdl(this.label, false);
};
