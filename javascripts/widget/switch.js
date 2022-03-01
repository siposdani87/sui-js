import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Switch');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.BaseCheckbox}
 * @this {SUI.Switch}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.Switch = function(input, label, error, inputBlock) {
  SUI.Switch.base(this, 'constructor', input, label, error, inputBlock);
};
goog.inherits(SUI.Switch, SUI.BaseCheckbox);

/**
 * @override
 * @return {undefined}
 */
SUI.Switch.prototype.render = function() {
  this.label.addClass(['mdl-switch', 'mdl-js-switch', 'mdl-js-ripple-effect']);

  const labelText = this.label.getText();

  this.spanLabel = new SUI.Item('span');
  this.spanLabel.addClass('mdl-switch__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-switch__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new SUI.Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

