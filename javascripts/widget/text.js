goog.provide('SUI.widget.Text');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Text}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Text = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Text, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Text.prototype._init = function() {
  this.inputBlock.addClass('text-widget');

  this.input.addEventListener('keyup', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Text.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Text.prototype.refresh = function() {
  SUI.mdl(this.inputBlock);
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Text.prototype.getValue = function() {
  return this.input.getNode().value;
};
