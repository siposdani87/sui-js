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
 * @returns {undefined}
 */
SUI.widget.BaseCheckbox.prototype._init = function() {

  this.hiddenInput = new SUI.Query('input[type=hidden]', this.inputBlock).getItem();

  this.label.addEventListener('click', function() {
    this._change();
  }.bind(this));
};

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.BaseCheckbox.prototype._change = function() {
  var value = this.getValue();
  this.modelChange(value);
  this.checkValidity();
};

/**
 * @override
 * @returns {*}
 */
SUI.widget.BaseCheckbox.prototype.getValue = function() {
  var checked = this.input.getNode().checked;
  var value = this.hiddenInput.getAttribute('value');
  if (checked) {
    value = this.input.getAttribute('value');
  }
  return SUI.typeCast(value);
};


/**
 * @override
 * @param {!Function|boolean|number|string|null|undefined} value
 */
SUI.widget.BaseCheckbox.prototype.setValue = function(value) {
  var currentValue = SUI.typeCast(this.input.getAttribute('value'));
  this.input.getNode().checked = currentValue === value;
  if (!this.input.getNode().checked) {
    this.input.removeAttribute('checked');
  }
  this.input.trigger('change');
  this._change();
};