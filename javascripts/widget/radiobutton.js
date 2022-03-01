goog.provide('SUI.Radiobutton');

goog.requireType('SUI.Form');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Radiobutton}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 * @param {!SUI.Form} form
 */
SUI.Radiobutton = function(input, label, error, inputBlock, form) {
  SUI.Radiobutton.base(this, 'constructor', input, label, error, inputBlock, form);
  this._init();
};
goog.inherits(SUI.Radiobutton, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Radiobutton.prototype._init = function() {
  this.inputBlock.addClass('radiobutton-widget');

  /* this.label.addEventListener('click', () => {
      this._change();
  });*/

  this.input.addEventListener('change', () => {
    this._change();
    return true;
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Radiobutton.prototype._change = function() {
  const value = this.input.getAttribute('value');
  this.modelChange(value);

  const name = this.input.getAttribute('name');
  const radioButtonInputs = new SUI.Query(SUI.format('input[name="{0}"]', [name]), this.form.formNode);
  radioButtonInputs.each((radioButtonInput) => {
    const labelNode = radioButtonInput.getParentNode();
    labelNode.addClass('is-other-checked');
    const inputBlockNode = labelNode.getParentNode();
    inputBlockNode.removeClass('is-invalid');
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.Radiobutton.prototype.render = function() {
  this.label.addClass(['mdl-radio', 'mdl-js-radio', 'mdl-js-ripple-effect']);
  const id = this.input.getId();
  this.label.setFor(/** @type {string} */(id));

  const labelText = this.label.getHtml(true);

  const spanLabel = new SUI.Node('span');
  spanLabel.addClass('mdl-radio__label');
  spanLabel.setHtml(labelText);

  this.input.addClass('mdl-radio__button');

  this.label.insert(this.input);
  this.label.appendChild(spanLabel);

  this.dataLabelNode = new SUI.Node('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

/**
 * @override
 */
SUI.Radiobutton.prototype.refresh = function() {
  const dataLabelText = /** @type {string} */ (this.label.getAttribute('data-label'));
  if (dataLabelText) {
    const labelText = this._getLabelRequiredText(dataLabelText);
    this.dataLabelNode.setHtml(labelText);
  } else {
    this.dataLabelNode.setHtml('');
  }
  if (this.isDisabled()) {
    this.inputBlock.addClass('is-disabled');
  }

  SUI.mdl(this.label, false);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.Radiobutton.prototype.setValue = function(value) {
  if (this.input.getAttribute('value') === value) {
    this.input.getNode().checked = true;
    this.input.trigger('change');
  }
};

/**
 * @override
 * @return {*}
 */
SUI.Radiobutton.prototype.getValue = function() {
  let value = null;
  this._getRadioButtonInputs().each((radioButtonInput) => {
    const checked = radioButtonInput.getNode().checked;
    if (checked) {
      value = radioButtonInput.getAttribute('value');
    }
  });
  return SUI.typeCast(value);
};

/**
 * @override
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Radiobutton.prototype.setDisabled = function(state) {
  this._getRadioButtonInputs().each((radioButtonInput) => {
    if (state) {
      radioButtonInput.setAttribute('disabled');
      radioButtonInput.getParentNode().addClass('is-disabled');
      radioButtonInput.getParentNode().getParentNode().addClass('is-disabled');
    } else {
      radioButtonInput.removeAttribute('disabled');
      radioButtonInput.getParentNode().removeClass('is-disabled');
      radioButtonInput.getParentNode().getParentNode().removeClass('is-disabled');
    }
    radioButtonInput.getNode().disabled = state;
  });
  this.checkValidity(true, false);
};

/**
 * @override
 * @return {boolean}
 */
SUI.Radiobutton.prototype.isDisabled = function() {
  let isDisabled = false;
  this._getRadioButtonInputs().each((radioButtonInput) => {
    if (radioButtonInput.getNode().disabled) {
      isDisabled = true;
    }
  });
  return isDisabled;
};

/**
 * @return {!SUI.Query}
 */
SUI.Radiobutton.prototype._getRadioButtonInputs = function() {
  const name = this.input.getAttribute('name');
  return new SUI.Query(SUI.format('input[name="{0}"]', [name]), this.form.formNode);
};

/**
 * @override
 * @param {string} text
 * @return {undefined}
 */
SUI.Radiobutton.prototype.setLabel = function(text) {
  if (this.spanLabel && !this.spanLabel.isEmpty()) {
    this.spanLabel.setHtml(text);
    this._setAdditionalLabel(this.spanLabel);
  }
};
