goog.provide('SUI.widget.Switch');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.widget');
goog.require('SUI.widget.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.widget.BaseCheckbox}
 * @this {SUI.widget.Switch}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Switch = function(input, label, error, inputBlock) {
  SUI.widget.BaseCheckbox.call(this, input, label, error, inputBlock);
};
goog.inherits(SUI.widget.Switch, SUI.widget.BaseCheckbox);

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Switch.prototype.render = function() {
  this.label.addClass(['mdl-switch', 'mdl-js-switch', 'mdl-js-ripple-effect']);

  let labelText = this.label.getText();

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-switch__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-switch__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.refresh();
};

/**
 * @override
 */
SUI.widget.Switch.prototype.refresh = function() {
  SUI.mdl(this.label, false);
};
