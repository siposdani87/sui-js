goog.provide('SUI.Widget');

goog.requireType('SUI.Form');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');
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

  this._setInfoContainer();
  this._setActionContainer();
  this._setMutation();
  this._setAdditionalLabel(this.label);
};

/**
 * @param {*} value
 * @param {*} previousValue
 */
SUI.Widget.prototype.eventChange = function(value, previousValue) {
  SUI.consoleInfo('SUI.Widget.prototype.eventChange', value, previousValue);
};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.render = function() {
  SUI.consoleWarn('SUI.Widget.render()');
};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.refresh = function() {
  SUI.consoleWarn('SUI.Widget.refresh()');
};

/**
 * @param {*} value
 */
SUI.Widget.prototype.modelChange = function(value) {
  SUI.consoleWarn('SUI.Widget.modelChange()', value);
};

/**
 * @return {*}
 */
SUI.Widget.prototype.getPreviousValue = function() {
  SUI.consoleWarn('SUI.Widget.getPreviousValue()');
  return undefined;
};

/**
 * @return {string}
 */
SUI.Widget.prototype.getName = function() {
  const name = /** @type {string} */ (this.input.getAttribute('name'));
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
 * @param {string} inputName
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
  const isValid = this.isValid();
  if (isValid) {
    this.setError('');
  } else if (opt_showMessage) {
    this.setError(this.input.getNode().validationMessage);
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
 * @return {boolean}
 */
SUI.Widget.prototype.isValidityValid = function() {
  const node = this.input.getNode();
  return node.validity.valid;
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.isValid = function() {
  return this.isValidityValid();
};

/**
 * @private
 * @return {!SUI.Node}
 */
SUI.Widget.prototype._getUpgradedNode = function() {
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
  this._setAdditionalLabel(this.label);
};

/**
 * @return {boolean}
 */
SUI.Widget.prototype.isEnabled = function() {
  return !this.isDisabled();
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
 * @return {boolean}
 */
SUI.Widget.prototype.isVisible = function() {
  return !this.inputBlock.hasClass('hidden');
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
SUI.Widget.prototype.setVisibility = function(state) {
  if (state) {
    this.show();
  } else {
    this.hide();
  }
};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.show = function() {
  if (!this.isVisible()) {
    this.inputBlock.removeClass('hidden');
  }
};

/**
 * @return {undefined}
 */
SUI.Widget.prototype.hide = function() {
  if (this.isVisible()) {
    this.inputBlock.addClass('hidden');
  }
};

/**
 * @param {string} text
 * @return {undefined}
 */
SUI.Widget.prototype.setLabel = function(text) {
  if (this.label && !this.label.isEmpty()) {
    this.label.setHtml(text);
    this._setAdditionalLabel(this.label);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Widget.prototype._setInfoContainer = function() {
  if (this.inputBlock && !this.inputBlock.isEmpty()) {
    this.infoContainerNode = new SUI.Query('.info-container', this.inputBlock).getItem();
    if (this.infoContainerNode.isEmpty()) {
      this.infoContainerNode = new SUI.Node('div');
      this.infoContainerNode.addClass(['info-container']);
      this.inputBlock.appendChild(this.infoContainerNode);
    }
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.Widget.prototype._setActionContainer = function() {
  if (this.inputBlock && !this.inputBlock.isEmpty()) {
    this.actionContainerNode = new SUI.Query('.action-container', this.inputBlock).getItem();
    if (this.actionContainerNode.isEmpty()) {
      this.actionContainerNode = new SUI.Node('div');
      this.actionContainerNode.addClass(['action-container']);
      this.inputBlock.appendChild(this.actionContainerNode);
    }
  }
};

/**
 * @private
 * @param {!SUI.Node} label
 * @return {undefined}
 */
SUI.Widget.prototype._setInfo = function(label) {
  const title = /** @type {string} */ (label.getAttribute('title'));
  const description = /** @type {string} */ (label.getAttribute('desc'));
  if (title || description) {
    let infoButton = new SUI.Query('a.info-button', this.infoContainerNode).getItem();
    if (!infoButton.isEmpty()) {
      infoButton.remove();
    }
    infoButton = new SUI.Node('a');
    infoButton.setAttribute('title', title || '');
    infoButton.setAttribute('desc', description || '');
    infoButton.setAttribute('href', 'javascript:void(0)');
    infoButton.addClass(['info-button', 'material-icons']);
    infoButton.setHtml('info_outline');
    this.infoContainerNode.appendChild(infoButton);
    const tooltip = new SUI.Tooltip(infoButton, 'LEFT');
    tooltip.render();
  }
};

/**
 * @protected
 * @param {!SUI.Node|undefined} label
 * @return {undefined}
 */
SUI.Widget.prototype._setAdditionalLabel = function(label) {
  if (label && label.exists()) {
    const labelText = this._getLabelRequiredText(label.getHtml(true));
    label.setHtml(labelText);
    this._setInfo(label);
  }
};

/**
 * @protected
 * @param {string} labelText
 * @return {string}
 */
SUI.Widget.prototype._getLabelRequiredText = function(labelText) {
  if (SUI.eq(labelText, true)) {
    return '&nbsp;';
  }
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
        this.refresh();
      } else if (mutation.attributeName === 'required') {
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
