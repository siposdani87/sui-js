import { consoleInfo, consoleWarn, eq, typeCast } from '../base';
import { Item } from '../core/item';
import { Query } from '../core/query';
import { Tooltip } from './tooltip';

/**
 * @constructor
 * @this {BaseWidget}
 * @param {!Item} input
 * @param {!Item=} opt_label
 * @param {!Item=} opt_error
 * @param {!Item=} opt_inputBlock
 * @param {!Form=} opt_form
 */
export const BaseWidget = function(input, opt_label, opt_error, opt_inputBlock, opt_form) {
  this.input = input;
  this.label = opt_label;
  this.error = opt_error;
  this.inputBlock = opt_inputBlock;
  this.form = opt_form;

  if (this.error) {
    this.errorTooltip = new Tooltip(this.error);
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
BaseWidget.prototype.eventChange = function(value, previousValue) {
  consoleInfo('BaseWidget.eventChange()', value, previousValue);
};

/**
 * @return {undefined}
 */
BaseWidget.prototype.render = function() {
  consoleWarn('BaseWidget.render()');
};

/**
 * @return {undefined}
 */
BaseWidget.prototype.refresh = function() {
  consoleWarn('BaseWidget.refresh()');
};

/**
 * @param {*} value
 */
BaseWidget.prototype.modelChange = function(value) {
  consoleWarn('BaseWidget.modelChange()', value);
};

/**
 * @return {*}
 */
BaseWidget.prototype.getPreviousValue = function() {
  consoleWarn('BaseWidget.getPreviousValue()');
  return undefined;
};

/**
 * @return {string}
 */
BaseWidget.prototype.getName = function() {
  const name = /** @type {string} */ (this.input.getAttribute('name'));
  return this._getAttributeName(name);
};

/**
 * @return {*}
 */
BaseWidget.prototype.getValue = function() {
  const value = this.input.getNode().value;
  return typeCast(value);
};

/**
 * @protected
 * @param {string} inputName
 * @return {string}
 */
BaseWidget.prototype._getAttributeName = function(inputName) {
  let attribute = inputName || '';
  attribute = attribute.replace(/]/g, '');
  attribute = attribute.replace(/\[/g, '.');
  attribute = eq(attribute.slice(-1), '.') ? attribute.slice(0, -1) : attribute;
  return attribute;
};

/**
 * @param {string=} opt_message
 * @param {boolean=} opt_isCustomError
 * @return {undefined}
 */
BaseWidget.prototype.setError = function(opt_message = '', opt_isCustomError = false) {
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
BaseWidget.prototype.checkValidity = function(opt_force = false, opt_showMessage = true) {
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
BaseWidget.prototype.isValidityValid = function() {
  const node = this.input.getNode();
  return node.validity.valid;
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.isValid = function() {
  return this.isValidityValid();
};

/**
 * @private
 * @return {!Item}
 */
BaseWidget.prototype._getUpgradedNode = function() {
  return /** @type {!Item} */ (this.inputBlock);
};

/**
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
BaseWidget.prototype.setValue = function(value) {
  this.input.getNode().value = value;
  this.input.setAttribute('value', value);
  this.input.trigger('change');
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.exists = function() {
  return this.existsInputBlock() || this.existsInput();
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.existsInput = function() {
  return !!this.input && this.input.exists();
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.existsInputBlock = function() {
  return !!this.inputBlock && this.inputBlock.exists();
};

/**
 * @param {string} attribute
 * @return {*}
 */
BaseWidget.prototype.get = function(attribute) {
  if (attribute === 'model') {
    return this.getName();
  }
  return this.input.get(attribute);
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.isRequired = function() {
  return this.input.getNode().required;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
BaseWidget.prototype.setRequired = function(state) {
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
BaseWidget.prototype.isEnabled = function() {
  return !this.isDisabled();
};

/**
 * @return {boolean}
 */
BaseWidget.prototype.isDisabled = function() {
  return this.input.getNode().disabled;
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
BaseWidget.prototype.setDisabled = function(state) {
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
BaseWidget.prototype.isVisible = function() {
  return !this.inputBlock.hasClass('hidden');
};

/**
 * @param {boolean} state
 * @return {undefined}
 */
BaseWidget.prototype.setVisibility = function(state) {
  if (state) {
    this.show();
  } else {
    this.hide();
  }
};

/**
 * @return {undefined}
 */
BaseWidget.prototype.show = function() {
  if (!this.isVisible()) {
    this.inputBlock.removeClass('hidden');
  }
};

/**
 * @return {undefined}
 */
BaseWidget.prototype.hide = function() {
  if (this.isVisible()) {
    this.inputBlock.addClass('hidden');
  }
};

/**
 * @param {string} text
 * @return {undefined}
 */
BaseWidget.prototype.setLabel = function(text) {
  if (this.label && !this.label.isEmpty()) {
    this.label.setHtml(text);
    this._setAdditionalLabel(this.label);
  }
};

/**
 * @private
 * @return {undefined}
 */
BaseWidget.prototype._setInfoContainer = function() {
  if (this.inputBlock && !this.inputBlock.isEmpty()) {
    this.infoContainerNode = new Query('.info-container', this.inputBlock).getItem();
    if (this.infoContainerNode.isEmpty()) {
      this.infoContainerNode = new Item('div');
      this.infoContainerNode.addClass(['info-container']);
      this.inputBlock.appendChild(this.infoContainerNode);
    }
  }
};

/**
 * @private
 * @return {undefined}
 */
BaseWidget.prototype._setActionContainer = function() {
  if (this.inputBlock && !this.inputBlock.isEmpty()) {
    this.actionContainerNode = new Query('.action-container', this.inputBlock).getItem();
    if (this.actionContainerNode.isEmpty()) {
      this.actionContainerNode = new Item('div');
      this.actionContainerNode.addClass(['action-container']);
      this.inputBlock.appendChild(this.actionContainerNode);
    }
  }
};

/**
 * @private
 * @param {!Item} label
 * @return {undefined}
 */
BaseWidget.prototype._setInfo = function(label) {
  const title = /** @type {string} */ (label.getAttribute('title'));
  const description = /** @type {string} */ (label.getAttribute('desc'));
  if (title || description) {
    let infoButton = new Query('a.info-button', this.infoContainerNode).getItem();
    if (!infoButton.isEmpty()) {
      infoButton.remove();
    }
    infoButton = new Item('a');
    infoButton.setAttribute('title', title || '');
    infoButton.setAttribute('desc', description || '');
    infoButton.setAttribute('href', 'javascript:void(0)');
    infoButton.addClass(['info-button', 'material-icons']);
    infoButton.setHtml('info_outline');
    this.infoContainerNode.appendChild(infoButton);
    const tooltip = new Tooltip(infoButton, 'LEFT');
    tooltip.render();
  }
};

/**
 * @protected
 * @param {!Item|undefined} label
 * @return {undefined}
 */
BaseWidget.prototype._setAdditionalLabel = function(label) {
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
BaseWidget.prototype._getLabelRequiredText = function(labelText) {
  if (eq(labelText, true)) {
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
BaseWidget.prototype._setMutation = function() {
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
