import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Checkbox');

goog.require('SUI');
goog.require('SUI.Item');
goog.require('SUI.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.BaseCheckbox}
 * @this {SUI.Checkbox}
 * @param {!SUI.Item} input
 * @param {!SUI.Item} label
 * @param {!SUI.Item} error
 * @param {!SUI.Item} inputBlock
 */
SUI.Checkbox = function(input, label, error, inputBlock) {
  SUI.Checkbox.base(this, 'constructor', input, label, error, inputBlock);
};
goog.inherits(SUI.Checkbox, SUI.BaseCheckbox);

/**
 * @override
 * @return {undefined}
 */
SUI.Checkbox.prototype.render = function() {
  this.label.addClass(['mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect']);
  const id = this.input.getId();
  this.label.setFor(/** @type {string} */(id));

  const labelText = this.label.getHtml(true);

  this.spanLabel = new SUI.Item('span');
  this.spanLabel.addClass('mdl-checkbox__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-checkbox__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new SUI.Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};
