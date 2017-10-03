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
 * @returns {undefined}
 */
SUI.widget.Number.prototype._init = function() {
  this.inputBlock.addClass('number-widget');

  this._initButtons();

  this.input.addEventListener('keyup', (input) => {
    this._checkValue();
    var value = this.getValue();
    this.modelChange(value);
    this.checkValidity();
  });

  this.input.addEventListener('change', (input) => {
    this._checkValue();
    var value = this.getValue();
    this.modelChange(value);
    this.checkValidity();
  });
};

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Number.prototype._initButtons = function() {
  var upButton = new SUI.Node('a');
  upButton.setAttribute('href', 'javascript:void(0)');
  upButton.addClass(['up-button', 'material-icons']);
  upButton.setHtml('keyboard_arrow_up');
  upButton.addEventListener('click', () => {
    var value = /** @type {number} */ (this.getValue() || 0);
    value += this._getStep();
    this.setValue(value);
    this.checkValidity(true);
  });
  this.inputBlock.appendChild(upButton);

  var downButton = new SUI.Node('a');
  downButton.setAttribute('href', 'javascript:void(0)');
  downButton.addClass(['down-button', 'material-icons']);
  downButton.setHtml('keyboard_arrow_down');
  downButton.addEventListener('click', () => {
    var value = /** @type {number} */ (this.getValue() || 0);
    value -= this._getStep();
    this.setValue(value);
    this.checkValidity(true);
  });
  this.inputBlock.appendChild(downButton);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Number.prototype._checkValue = function() {
  var value = /** @type {number} */ (this.getValue());
  var min = this._getMin();
  if (value < min) {
    this.setValue(min);
  }
  var max = this._getMax();
  if (value > max) {
    this.setValue(max);
  }
};

/**
 * @private
 * @returns {number}
 */
SUI.widget.Number.prototype._getMax = function() {
  var max = this.input.getAttribute('max') || 9999999999;
  return /** @type {number} */ (SUI.typeCast(max));
};

/**
 * @private
 * @returns {number}
 */
SUI.widget.Number.prototype._getMin = function() {
  var min = this.input.getAttribute('min') || 0;
  return /** @type {number} */ (SUI.typeCast(min));
};

/**
 * @private
 * @returns {number}
 */
SUI.widget.Number.prototype._getStep = function() {
  var step = this.input.getAttribute('step') || 1;
  return /** @type {number} */ (SUI.typeCast(step));
};


/**
 * @override
 * @returns {undefined}
 */
SUI.widget.Number.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  SUI.mdl(this.inputBlock);
};

