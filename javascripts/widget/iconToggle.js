goog.provide('SUI.widget.IconToggle');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.widget');
goog.require('SUI.widget.BaseCheckbox');

/**
 * @constructor
 * @extends {SUI.widget.BaseCheckbox}
 * @this {SUI.widget.IconToggle}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.IconToggle = function(input, label, error, inputBlock) {
  SUI.widget.BaseCheckbox.call(this, input, label, error, inputBlock);
};
goog.inherits(SUI.widget.IconToggle, SUI.widget.BaseCheckbox);

/**
 * @override
 * @return {undefined}
 */
SUI.widget.IconToggle.prototype.render = function() {
  this.label.addClass(['mdl-icon-toggle', 'mdl-js-icon-toggle', 'mdl-js-ripple-effect']);

  var icon = /** @type {string} */ (this.input.getData('icon'));

  this.icon = new SUI.Node('i');
  this.icon.addClass(['mdl-icon-toggle__label', 'material-icons']);
  this.icon.setHtml(icon);

  this.input.addClass('mdl-icon-toggle__input');

  var labelText = this.label.getText();

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-icon__label');
  this.spanLabel.setHtml(labelText);

  this.label.insert(this.input);
  this.label.appendChild(this.icon);
  this.label.appendChild(this.spanLabel);

  SUI.mdl(this.label);
};
