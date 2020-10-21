goog.provide('SUI.widget.BaseCheckbox');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.BaseCheckbox}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.BaseCheckbox = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.BaseCheckbox, SUI.Widget);

/**
 * @protected
 * @return {undefined}
 */
SUI.widget.BaseCheckbox.prototype._init = function() {
  this.hiddenInput = new SUI.Query('input[type=hidden]', this.inputBlock).getItem();
  this.inputBlock.addClass('checkbox-widget');

  this.input.addEventListener('change', () => {
    this._change();
    return true;
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.BaseCheckbox.prototype._change = function() {
  const value = this.getValue();
  this.modelChange(value);
  this.checkValidity();
};

/**
 * @override
 * @return {*}
 */
SUI.widget.BaseCheckbox.prototype.getValue = function() {
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
SUI.widget.BaseCheckbox.prototype.setValue = function(value) {
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
SUI.widget.BaseCheckbox.prototype.setDisabled = function(state) {
  if (state) {
    this.input.setAttribute('disabled');
    this.label.addClass('is-disabled');
  } else {
    this.input.removeAttribute('disabled');
    this.label.removeClass('is-disabled');
  }
  this.input.getNode().disabled = state;
  this.checkValidity(true, false);
};

/**
 * @override
 * @param {string} text
 * @return {undefined}
 */
SUI.widget.BaseCheckbox.prototype.setLabel = function(text) {
  if (this.spanLabel && !this.spanLabel.isEmpty()) {
    this.spanLabel.setHtml(text);
    this._setAdditionalLabel(this.spanLabel);
  }
};
