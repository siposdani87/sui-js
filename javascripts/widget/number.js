goog.provide('SUI.widget.Number');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Number}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Number = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Number, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Number.prototype._init = function() {
  this.inputBlock.addClass('number-widget');

  this._initButtons();

  this.input.addEventListener('keyup', (input) => {
    this._checkValue();
    const value = this.getValue();
    this.modelChange(value);
    this.checkValidity(true);
  });

  this.input.addEventListener('change', (input) => {
    this._checkValue();
    const value = this.getValue();
    this.modelChange(value);
    this.checkValidity(true);
  });
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Number.prototype._initButtons = function() {
  const upButton = new SUI.Node('a');
  upButton.setAttribute('href', 'javascript:void(0)');
  upButton.addClass(['up-button', 'material-icons']);
  upButton.setHtml('keyboard_arrow_up');
  upButton.addEventListener('click', () => {
    let value = /** @type {number} */ (this.getValue() || 0);
    value += this._getStep();
    this.setValue(value);
    this.checkValidity(true);
  });
  this.inputBlock.appendChild(upButton);

  const downButton = new SUI.Node('a');
  downButton.setAttribute('href', 'javascript:void(0)');
  downButton.addClass(['down-button', 'material-icons']);
  downButton.setHtml('keyboard_arrow_down');
  downButton.addEventListener('click', () => {
    let value = /** @type {number} */ (this.getValue() || 0);
    value -= this._getStep();
    this.setValue(value);
    this.checkValidity(true);
  });
  this.inputBlock.appendChild(downButton);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Number.prototype._checkValue = function() {
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
SUI.widget.Number.prototype._getMax = function() {
  const max = this.input.getAttribute('max') || 9999999999;
  return /** @type {number} */ (SUI.typeCast(max));
};

/**
 * @private
 * @return {number}
 */
SUI.widget.Number.prototype._getMin = function() {
  const min = this.input.getAttribute('min') || 0;
  return /** @type {number} */ (SUI.typeCast(min));
};

/**
 * @private
 * @return {number}
 */
SUI.widget.Number.prototype._getStep = function() {
  const step = this.input.getAttribute('step') || 1;
  return /** @type {number} */ (SUI.typeCast(step));
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Number.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 */
SUI.widget.Number.prototype.refresh = function() {
  SUI.mdl(this.inputBlock);
};
