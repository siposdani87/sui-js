goog.provide('SUI.Widget');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Widget}
 * @param {!SUI.Node} input
 * @param {!SUI.Node=} opt_label
 * @param {!SUI.Node=} opt_error
 * @param {!SUI.Node=} opt_inputBlock
 */
SUI.Widget = function(input, opt_label, opt_error, opt_inputBlock) {
  this.input = input;
  this.label = opt_label;
  this.error = opt_error;
  this.inputBlock = opt_inputBlock;

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
 * @returns {undefined}
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
 * @returns {string}
 */
SUI.Widget.prototype.getName = function() {
  var name = this.input.getAttribute('name');
  return this._getAttributeName(name);
};

/**
 * @returns {*}
 */
SUI.Widget.prototype.getValue = function() {
  var value = this.input.getNode().value;
  return SUI.typeCast(value);
};

/**
 * @protected
 * @param {string|null} inputName
 * @returns {string}
 */
SUI.Widget.prototype._getAttributeName = function(inputName) {
  var attribute = inputName || '';
  attribute = attribute.replace(/]/g, '');
  attribute = attribute.replace(/\[/g, '.');
  attribute = SUI.eq(attribute.slice(-1), '.') ? attribute.slice(0, -1) : attribute;
  return attribute;
};

/**
 * @param {string=} opt_message
 * @param {boolean=} opt_isCustomError
 * @returns {undefined}
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
 * @returns {undefined}
 */
SUI.Widget.prototype.checkValidity = function(opt_force = false) {
  var node = this.input.getNode();
  var isValid = node.validity.valid;
  if (isValid) {
    this.setError('');
  } else {
    this.setError(node.validationMessage);
  }
  if (opt_force && this.inputBlock) {
    if (isValid) {
      this.inputBlock.removeClass('is-invalid');
      this.inputBlock.addClass('is-dirty');
    }
    else {
      this.inputBlock.addClass('is-invalid');

    }
  }
};

/**
 * @param {!Function|boolean|number|string|null|undefined} value
 * @returns {undefined}
 */
SUI.Widget.prototype.setValue = function(value) {
  this.input.getNode().value = value;
  this.input.setAttribute('value', value);
  this.input.trigger('change');
};

/**
 * @returns {boolean}
 */
SUI.Widget.prototype.exists = function() {
  var existsInputBlock = !!this.inputBlock && this.inputBlock.exists();
  var existsInput = !!this.input && this.input.exists();
  return existsInputBlock || existsInput;
};

/**
 * @param {string} attribute
 * @returns {*}
 */
SUI.Widget.prototype.get = function(attribute) {
  if (attribute === 'model') {
    return this.getName();
  }
  return this.input.get(attribute);
};

/**
 * @param {boolean} state
 * @returns {undefined}
 */
SUI.Widget.prototype.setRequired = function(state) {
  this.input.getNode().required = state;
};

/**
 * @param {boolean} state
 * @returns {undefined}
 */
SUI.Widget.prototype.setDisabled = function(state) {
  this.input.getNode().disabled = state;
};

