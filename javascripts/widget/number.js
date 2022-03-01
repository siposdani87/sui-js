goog.provide('SUI.Number');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Number}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.Number = function(input, label, error, inputBlock) {
  SUI.Number.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Number, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Number.prototype._init = function() {
  this.inputBlock.addClass('number-widget');

  this._initButtons();

  this.input.addEventListener('keyup', (_input) => {
    this._checkValue();
    const value = this.getValue();
    this.modelChange(value);
    return true;
  });

  this.input.addEventListener('change', () => {
    this._checkValue();
    const value = this.getValue();
    this.modelChange(value);
    return true;
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.Number.prototype._initButtons = function() {
  const actionNode = new SUI.Node('span');
  actionNode.addClass('step-change');
  this.actionContainerNode.appendChild(actionNode);

  const upButton = new SUI.Node('a');
  upButton.setAttribute('href', 'javascript:void(0)');
  upButton.addClass(['up-button', 'material-icons']);
  upButton.setHtml('keyboard_arrow_up');
  upButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      let value = /** @type {number} */ (this.getValue() || 0);
      value += this._getStep();
      this.setValue(value);
    }
  });
  actionNode.appendChild(upButton);

  const downButton = new SUI.Node('a');
  downButton.setAttribute('href', 'javascript:void(0)');
  downButton.addClass(['down-button', 'material-icons']);
  downButton.setHtml('keyboard_arrow_down');
  downButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      let value = /** @type {number} */ (this.getValue() || 0);
      value -= this._getStep();
      this.setValue(value);
    }
  });
  actionNode.appendChild(downButton);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Number.prototype._checkValue = function() {
  const value = /** @type {number} */ (this.getValue());
  const min = this._getMin();
  if (value < min) {
    this.setValue(min);
  }
  const max = this._getMax();
  if (value > max) {
    this.setValue(max);
  }
};

/**
 * @private
 * @return {number}
 */
SUI.Number.prototype._getMax = function() {
  const max = this.input.getAttribute('max') || 9999999999;
  return /** @type {number} */ (SUI.typeCast(max));
};

/**
 * @private
 * @return {number}
 */
SUI.Number.prototype._getMin = function() {
  const min = this.input.getAttribute('min') || 0;
  return /** @type {number} */ (SUI.typeCast(min));
};

/**
 * @private
 * @return {number}
 */
SUI.Number.prototype._getStep = function() {
  const step = this.input.getAttribute('step') || 1;
  return /** @type {number} */ (SUI.typeCast(step));
};

/**
 * @override
 * @return {undefined}
 */
SUI.Number.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 */
SUI.Number.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};
