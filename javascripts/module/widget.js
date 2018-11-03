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

  this._setInfo();
  this._setLabel();
  this._setMutation();
};

/**
 * @param {*} value
 * @param {*} oldValue
 */
SUI.Widget.prototype.eventChange = function(value, oldValue) {

};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.render = function() {
  console.warn('SUI.Widget.render()');
};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.refresh = function() {
  console.warn('SUI.Widget.refresh()');
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
  const name = this.input.getAttribute('name');
  return this._getAttributeName(name);
};

/**
 * @return {*}
 */
SUI.Widget.prototype.getValue = function() {
  const value = this.input.getNode().value;
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
  const node = this.input.getNode();
  const isValid = node.validity.valid;
  if (isValid) {
    this.setError('');
  } else if (opt_showMessage) {
    this.setError(node.validationMessage);
  }
  const upgradedNode = this._getUpgradedNode();
  if (opt_force && upgradedNode) {
    if (this.getValue()) {
      upgradedNode.addClass('is-dirty');
    }
    if (isValid) {
      upgradedNode.removeClass('is-invalid');
    } else {
      upgradedNode.addClass('is-invalid');
    }
  }
};

/**
 * @private
 * @return {!SUI.Node}
 */
SUI.Widget.prototype._getUpgradedNode = function() {
  /* if (this.label && this.label.exists() && this.label.getAttribute('data-upgraded')) {
    return this.label;
  }*/
  return /** @type {!SUI.Node} */ (this.inputBlock);
};

/**
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
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
  return this.existsInputBlock() || this.existsInput();
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.existsInput = function() {
  return !!this.input && this.input.exists();
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.existsInputBlock = function() {
  return !!this.inputBlock && this.inputBlock.exists();
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
SUI.Widget.prototype.isRequired = function() {
  return this.input.getNode().required;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Widget.prototype.setRequired = function(state) {
  if (state) {
    this.input.setAttribute('required');
  } else {
    this.input.removeAttribute('required');
  }
  this.input.getNode().required = state;
  this.checkValidity(true, false);
  this._setLabel();
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.isDisabled = function() {
  return this.input.getNode().disabled;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Widget.prototype.setDisabled = function(state) {
  if (state) {
    this.input.setAttribute('disabled');
  } else {
    this.input.removeAttribute('disabled');
  }
  this.input.getNode().disabled = state;
  this.checkValidity(true, false);
};

/**
 * @protected
 * @return {undefined}
 */
SUI.Widget.prototype._setInfo = function() {
  if (this.label && this.label.exists()) {
    const title = this.label.getAttribute('title');
    const description = this.label.getAttribute('desc');
    if (title || description) {
      const infoButton = new SUI.Node('a');
      infoButton.setAttribute('title', title || '');
      infoButton.setAttribute('desc', description || '');
      infoButton.setAttribute('href', 'javascript:void(0)');
      infoButton.addClass(['info', 'material-icons']);
      infoButton.setHtml('info_outline');
      this.inputBlock.appendChild(infoButton);
      const tooltip = new SUI.Tooltip(infoButton, 'LEFT');
      tooltip.render();
    }
  }
};

/**
 * @protected
 * @return {undefined}
 */
SUI.Widget.prototype._setLabel = function() {
  if (this.label && this.label.exists()) {
    const labelText = this._getLabelRequiredText(this.label.getHtml(true));
    this.label.setHtml(labelText);
  }
};

/**
 * @protected
 * @param {string} labelText
 * @return {string}
 */
SUI.Widget.prototype._getLabelRequiredText = function(labelText) {
  const requiredPostfix = ' *';
  const postfix = labelText.substr(labelText.length - requiredPostfix.length);

  if (this.isRequired() && postfix !== requiredPostfix) {
    labelText += requiredPostfix;
  } else if (!this.isRequired() && postfix === requiredPostfix) {
    labelText = labelText.replace(requiredPostfix, '');
  }
  return labelText;
};

/**
 * @private
 * @return {undefined}
 */
SUI.Widget.prototype._setMutation = function() {
  const observer = new MutationObserver((mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
      const mutation = mutationsList[i];
      if (mutation.attributeName === 'disabled') {
        // console.log('mutation: disabled', mutation);
        this.refresh();
      } else if (mutation.attributeName === 'required') {
        // console.log('mutation: required', mutation);
        this.refresh();
      }
    }
  });
  // observer.disconnect();
  observer.observe(this.input.getNode(), {
    attributeFilter: ['disabled', 'required'],
    attributes: true,
    attributeOldValue: true,
  });
};
