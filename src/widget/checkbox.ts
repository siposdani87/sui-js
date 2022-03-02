import { Item } from "../core/item";
import { BaseCheckbox } from "./baseCheckbox";

/**
 * @constructor
 * @extends {BaseCheckbox}
 * @this {Checkbox}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Checkbox = function(input, label, error, inputBlock) {
  BaseCheckbox.call(this, input, label, error, inputBlock);
};
Checkbox.prototype = Object.create(BaseCheckbox.prototype);
Checkbox.prototype.constructor = Checkbox;

/**
 * @override
 * @return {undefined}
 */
Checkbox.prototype.render = function() {
  this.label.addClass(['mdl-checkbox', 'mdl-js-checkbox', 'mdl-js-ripple-effect']);
  const id = this.input.getId();
  this.label.setFor(/** @type {string} */(id));

  const labelText = this.label.getHtml(true);

  this.spanLabel = new Item('span');
  this.spanLabel.addClass('mdl-checkbox__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-checkbox__input');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};
