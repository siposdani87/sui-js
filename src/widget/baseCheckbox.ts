import { typeCast, mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";
import { Query } from "../core/query";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {BaseCheckbox}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const BaseCheckbox = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
BaseCheckbox.prototype = Object.create(BaseWidget.prototype);
BaseCheckbox.prototype.constructor = BaseCheckbox;

/**
 * @protected
 * @return {undefined}
 */
BaseCheckbox.prototype._init = function() {
  this.hiddenInput = new Query('input[type=hidden]', this.inputBlock).getItem();
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
BaseCheckbox.prototype._change = function() {
  const value = this.getValue();
  this.modelChange(value);
};

/**
 * @override
 * @return {*}
 */
BaseCheckbox.prototype.getValue = function() {
  const checked = this.input.getNode().checked;
  let value = this.hiddenInput.getAttribute('value');
  if (checked) {
    value = this.input.getAttribute('value');
  }
  return typeCast(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
BaseCheckbox.prototype.setValue = function(value) {
  const currentValue = typeCast(this.input.getAttribute('value'));
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
BaseCheckbox.prototype.setDisabled = function(state) {
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
BaseCheckbox.prototype.setLabel = function(text) {
  if (this.spanLabel && !this.spanLabel.isEmpty()) {
    this.spanLabel.setHtml(text);
    this._setAdditionalLabel(this.spanLabel);
  }
};

/**
 * @override
 */
BaseCheckbox.prototype.refresh = function() {
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

  mdl(this.label, false);
};
