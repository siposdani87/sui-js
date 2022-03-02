import { typeCast } from "../base";
import { Item } from "../core/item";
import { BaseCheckbox } from "./baseCheckbox";

/**
 * @constructor
 * @extends {BaseCheckbox}
 * @this {IconToggle}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const IconToggle = function(input, label, error, inputBlock) {
  BaseCheckbox.call(this, input, label, error, inputBlock);
};
IconToggle.prototype = Object.create(BaseCheckbox.prototype);
IconToggle.prototype.constructor = IconToggle;

/**
 * @override
 * @return {undefined}
 */
IconToggle.prototype.render = function() {
  this.label.addClass(['mdl-icon-toggle', 'mdl-js-icon-toggle', 'mdl-js-ripple-effect']);

  this.checkedIcon = /** @type {string} */ (this.input.getData('checked'));
  this.uncheckedIcon = /** @type {string} */ (this.input.getData('unchecked'));

  this.icon = new Item('em');
  this.icon.addClass(['mdl-icon-toggle__label', 'material-icons']);
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);

  this.input.addClass('mdl-icon-toggle__input');

  const labelText = this.label.getText();

  this.spanLabel = new Item('span');
  this.spanLabel.addClass('mdl-icon__label');
  this.spanLabel.setHtml(labelText);

  this.label.insert(this.input);
  this.label.appendChild(this.icon);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

/**
 * @override
 * @return {undefined}
 */
IconToggle.prototype._change = function() {
  const value = this.getValue();
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);
  this.modelChange(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
IconToggle.prototype.setValue = function(value) {
  const currentValue = typeCast(this.input.getAttribute('value'));
  this.input.getNode().checked = currentValue === value;
  if (!this.input.getNode().checked) {
    this.input.removeAttribute('checked');
  }
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);
  this.input.trigger('change');
};
