goog.provide('SUI.IconToggle');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.BaseCheckbox}
 * @this {SUI.IconToggle}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.IconToggle = function(input, label, error, inputBlock) {
  SUI.IconToggle.base(this, 'constructor', input, label, error, inputBlock);
};
goog.inherits(SUI.IconToggle, SUI.BaseCheckbox);

/**
 * @override
 * @return {undefined}
 */
SUI.IconToggle.prototype.render = function() {
  this.label.addClass(['mdl-icon-toggle', 'mdl-js-icon-toggle', 'mdl-js-ripple-effect']);

  this.checkedIcon = /** @type {string} */ (this.input.getData('checked'));
  this.uncheckedIcon = /** @type {string} */ (this.input.getData('unchecked'));

  this.icon = new SUI.Node('em');
  this.icon.addClass(['mdl-icon-toggle__label', 'material-icons']);
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);

  this.input.addClass('mdl-icon-toggle__input');

  const labelText = this.label.getText();

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-icon__label');
  this.spanLabel.setHtml(labelText);

  this.label.insert(this.input);
  this.label.appendChild(this.icon);
  this.label.appendChild(this.spanLabel);

  this.dataLabelNode = new SUI.Node('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

/**
 * @override
 * @return {undefined}
 */
SUI.IconToggle.prototype._change = function() {
  const value = this.getValue();
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);
  this.modelChange(value);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.IconToggle.prototype.setValue = function(value) {
  const currentValue = SUI.typeCast(this.input.getAttribute('value'));
  this.input.getNode().checked = currentValue === value;
  if (!this.input.getNode().checked) {
    this.input.removeAttribute('checked');
  }
  this.icon.setHtml(this.input.getNode().checked ? this.checkedIcon : this.uncheckedIcon);
  this.input.trigger('change');
};
