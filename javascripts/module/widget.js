goog.provide('SUI.Widget');

goog.require('SUI');
goog.require('SUI.Tooltip');

/**
 * @constructor
 * @this {SUI.Widget}
 * @param {!SUI.Node} input
 * @param {!SUI.Node=} opt_label
 * @param {!SUI.Node=} opt_error
 * @param {!SUI.Node=} opt_inputBlock
 * @param {!SUI.Form=} opt_form
 */
SUI.Widget = function(input, opt_label, opt_error, opt_inputBlock, opt_form) {
  this.input = input;
  this.label = opt_label;
  this.error = opt_error;
  this.inputBlock = opt_inputBlock;
  this.form = opt_form;

  if (this.error) {
    this.errorTooltip = new SUI.Tooltip(this.error);
  }
};

/**
 * @param {*} value
 */
SUI.Widget.prototype.eventChange = function(value) {

};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.render = function() {
  console.warn('SUI.Widget.render()');
};

/**
 * @param {*} value
 */
SUI.Widget.prototype.modelChange = function(value) {
  console.warn('SUI.Widget.modelChange()', value);
};

/**
 * @return {string}
 */
SUI.Widget.prototype.getName = function() {
  let name = this.input.getAttribute('name');
  return this._getAttributeName(name);
};

/**
 * @return {*}
 */
SUI.Widget.prototype.getValue = function() {
  let value = this.input.getNode().value;
  return SUI.typeCast(value);
};

/**
 * @protected
 * @param {string|null} inputName
 * @return {string}
 */
SUI.Widget.prototype._getAttributeName = function(inputName) {
  let attribute = inputName || '';
  attribute = attribute.replace(/]/g, '');
  attribute = attribute.replace(/\[/g, '.');
  attribute = SUI.eq(attribute.slice(-1), '.') ? attribute.slice(0, -1) : attribute;
  return attribute;
};

/**
 * @param {string=} opt_message
 * @param {boolean=} opt_isCustomError
 * @return {undefined}
 */
SUI.Widget.prototype.setError = function(opt_message = '', opt_isCustomError = false) {
  if (this.error) {
    this.errorTooltip.setMessage(opt_message);
    this.error.setHtml(opt_message);
    if (opt_message && opt_isCustomError && this.inputBlock) {
      this.inputBlock.addClass('is-invalid');
    }
  }
};

/**
 * @param {boolean=} opt_force
 * @param {boolean=} opt_showMessage
 * @return {undefined}
 */
SUI.Widget.prototype.checkValidity = function(opt_force = false, opt_showMessage = true) {
  let node = this.input.getNode();
  let isValid = node.validity.valid;
  if (isValid) {
    this.setError('');
  } else if (opt_showMessage) {
    this.setError(node.validationMessage);
  }
  if (opt_force && this.inputBlock) {
    if (this.getValue()) {
      this.inputBlock.addClass('is-dirty');
    }
    if (isValid) {
      this.inputBlock.removeClass('is-invalid');
    } else {
      this.inputBlock.addClass('is-invalid');
    }
  }
};

/**
 * @param {!Function|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.Widget.prototype.setValue = function(value) {
  this.input.getNode().value = value;
  this.input.setAttribute('value', value);
  this.input.trigger('change');
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.exists = function() {
  let existsInputBlock = !!this.inputBlock && this.inputBlock.exists();
  let existsInput = !!this.input && this.input.exists();
  return existsInputBlock || existsInput;
};

/**
 * @param {string} attribute
 * @return {*}
 */
SUI.Widget.prototype.get = function(attribute) {
  if (attribute === 'model') {
    return this.getName();
  }
  return this.input.get(attribute);
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.getRequired = function() {
  return this.input.getNode().required;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Widget.prototype.setRequired = function(state) {
  this.input.getNode().required = state;
  this.checkValidity(true, false);
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.getDisabled = function() {
  return this.input.getNode().disabled;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Widget.prototype.setDisabled = function(state) {
  this.input.getNode().disabled = state;
  this.checkValidity(true, false);
};

/**
 * @protected
 * @return {undefined}
 */
SUI.Widget.prototype._initInfo = function() {
  if (this.label) {
    let title = this.label.getAttribute('title');
    let description = this.label.getAttribute('desc');
    if (title || description) {
      let infoButton = new SUI.Node('a');
      infoButton.setAttribute('title', title || '');
      infoButton.setAttribute('desc', description || '');
      infoButton.setAttribute('href', 'javascript:void(0)');
      infoButton.addClass(['info', 'material-icons']);
      infoButton.setHtml('info_outline');
      this.inputBlock.appendChild(infoButton);
      new SUI.Tooltip(infoButton, '', 'LEFT');
    }
  }
};
