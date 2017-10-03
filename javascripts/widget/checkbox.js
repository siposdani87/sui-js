goog.provide('SUI.widget.Checkbox');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.widget');
goog.require('SUI.widget.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.widget.BaseCheckbox}
 * @this {SUI.widget.Checkbox}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Checkbox = function(input, label, error, inputBlock) {
  SUI.widget.BaseCheckbox.call(this, input, label, error, inputBlock);
};
goog.inherits(SUI.widget.Checkbox, SUI.widget.BaseCheckbox);

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Checkbox.prototype.render = function() {
  this.label.addClass(['mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect']);

  var labelText = this.label.getHtml(true);

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-checkbox__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-checkbox__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  SUI.mdl(this.label);
};
