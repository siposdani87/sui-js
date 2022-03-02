import { format, mdl, typeCast } from "../base";
import { BaseWidget } from "../component/baseWidget";
import { Item } from "../core/item";
import { Query } from "../core/query";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Radiobutton}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 * @param {!Form} form
 */
export const Radiobutton = function(input, label, error, inputBlock, form) {
  BaseWidget.call(this, input, label, error, inputBlock, form);
  this._init();
};
Radiobutton.prototype = Object.create(BaseWidget.prototype);
Radiobutton.prototype.constructor = Radiobutton;

/**
 * @private
 * @return {undefined}
 */
Radiobutton.prototype._init = function() {
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
Radiobutton.prototype._change = function() {
  const value = this.input.getAttribute('value');
  this.modelChange(value);

  const name = this.input.getAttribute('name');
  const radioButtonInputs = new Query(format('input[name="{0}"]', [name]), this.form.formNode);
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
Radiobutton.prototype.render = function() {
  this.label.addClass(['mdl-radio', 'mdl-js-radio', 'mdl-js-ripple-effect']);
  const id = this.input.getId();
  this.label.setFor(/** @type {string} */(id));

  const labelText = this.label.getHtml(true);

  const spanLabel = new Item('span');
  spanLabel.addClass('mdl-radio__label');
  spanLabel.setHtml(labelText);

  this.input.addClass('mdl-radio__button');

  this.label.insert(this.input);
  this.label.appendChild(spanLabel);

  this.dataLabelNode = new Item('span');
  this.dataLabelNode.addClass('widget-label');
  this.label.insertBefore(this.dataLabelNode);

  this.refresh();
};

/**
 * @override
 */
Radiobutton.prototype.refresh = function() {
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

  mdl(this.label, false);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
Radiobutton.prototype.setValue = function(value) {
  if (this.input.getAttribute('value') === value) {
    this.input.getNode().checked = true;
    this.input.trigger('change');
  }
};

/**
 * @override
 * @return {*}
 */
Radiobutton.prototype.getValue = function() {
  let value = null;
  this._getRadioButtonInputs().each((radioButtonInput) => {
    const checked = radioButtonInput.getNode().checked;
    if (checked) {
      value = radioButtonInput.getAttribute('value');
    }
  });
  return typeCast(value);
};

/**
 * @override
 * @param {boolean} state
 * @return {undefined}
 */
Radiobutton.prototype.setDisabled = function(state) {
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
Radiobutton.prototype.isDisabled = function() {
  let isDisabled = false;
  this._getRadioButtonInputs().each((radioButtonInput) => {
    if (radioButtonInput.getNode().disabled) {
      isDisabled = true;
    }
  });
  return isDisabled;
};

/**
 * @return {!Query}
 */
Radiobutton.prototype._getRadioButtonInputs = function() {
  const name = this.input.getAttribute('name');
  return new Query(format('input[name="{0}"]', [name]), this.form.formNode);
};

/**
 * @override
 * @param {string} text
 * @return {undefined}
 */
Radiobutton.prototype.setLabel = function(text) {
  if (this.spanLabel && !this.spanLabel.isEmpty()) {
    this.spanLabel.setHtml(text);
    this._setAdditionalLabel(this.spanLabel);
  }
};
