goog.provide('SUI.widget.Radiobutton');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Radiobutton}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 * @param {!SUI.Form} form
 */
SUI.widget.Radiobutton = function(input, label, error, inputBlock, form) {
  SUI.Widget.call(this, input, label, error, inputBlock, form);
  this._init();
};
goog.inherits(SUI.widget.Radiobutton, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Radiobutton.prototype._init = function() {
  this.inputBlock.addClass('radiobutton-widget');

  /* this.label.addEventListener('click', () => {
      this._triggerClick();
  });*/

  this.input.addEventListener('change', () => {
      this._triggerClick();
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Radiobutton.prototype._triggerClick = function() {
  let value = this.input.getAttribute('value');
  this.modelChange(value);
  this.checkValidity();

  let name = this.input.getAttribute('name');
  let radioButtonInputs = new SUI.Query(SUI.format('input[name="{0}"]', [name]), this.form.formNode);
  radioButtonInputs.each((radioButtonInput) => {
    let labelNode = radioButtonInput.getParent();
    labelNode.addClass('is-other-checked');
    let inputBlockNode = labelNode.getParent();
    inputBlockNode.removeClass('is-invalid');
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Radiobutton.prototype.render = function() {
  this.label.addClass(['mdl-radio', 'mdl-js-radio', 'mdl-js-ripple-effect']);
  let id = this.input.getId();
  this.label.setFor(/** @type {string} */(id));

  let labelText = this.label.getHtml(true);

  this.spanLabel = new SUI.Node('span');
  this.spanLabel.addClass('mdl-radio__label');
  this.spanLabel.setHtml(labelText);

  this.input.addClass('mdl-radio__button');

  this.label.insert(this.input);
  this.label.appendChild(this.spanLabel);

  this.refresh();
};

/**
 * @override
 */
SUI.widget.Radiobutton.prototype.refresh = function() {
  SUI.mdl(this.label);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Radiobutton.prototype.setValue = function(value) {
  if (this.input.getAttribute('value') === value) {
    this.input.getNode().checked = true;
    this.input.trigger('change');
    // this._triggerClick();
  }
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Radiobutton.prototype.getValue = function() {
  let value = null;
  let name = this.input.getAttribute('name');
  let radioButtonInputs = new SUI.Query(SUI.format('input[name="{0}"]', [name]), this.form.formNode);
  radioButtonInputs.each((radioButtonInput) => {
    let checked = radioButtonInput.getNode().checked;
    if (checked) {
      value = radioButtonInput.getAttribute('value');
    }
  });
  return SUI.typeCast(value);
};
