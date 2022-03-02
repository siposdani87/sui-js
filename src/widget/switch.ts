import { Item } from "../core/item";
import { BaseCheckbox } from "./baseCheckbox";

/**
 * @constructor
 * @extends {BaseCheckbox}
 * @this {Switch}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Switch = function(input, label, error, inputBlock) {
  BaseCheckbox.call(this, input, label, error, inputBlock);
};
Switch.prototype = Object.create(BaseCheckbox.prototype);
Switch.prototype.constructor = Switch;

/**
 * @override
 * @return {undefined}
 */
Switch.prototype.render = function() {
  this.label.addClass(['mdl-switch', 'mdl-js-switch', 'mdl-js-ripple-effect']);

  const labelText = this.label.getText();

  this.spanLabel = new Item('span');
  this.spanLabel.addClass('mdl-switch__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-switch__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

