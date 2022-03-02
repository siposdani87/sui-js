import { typeCast, mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";
import { Item } from "../core/item";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Number}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Number = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
Number.prototype = Object.create(BaseWidget.prototype);
Number.prototype.constructor = Number;

/**
 * @private
 * @return {undefined}
 */
Number.prototype._init = function() {
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
Number.prototype._initButtons = function() {
  const actionNode = new Item('span');
  actionNode.addClass('step-change');
  this.actionContainerNode.appendChild(actionNode);

  const upButton = new Item('a');
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

  const downButton = new Item('a');
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
Number.prototype._checkValue = function() {
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
Number.prototype._getMax = function() {
  const max = this.input.getAttribute('max') || 9999999999;
  return /** @type {number} */ (typeCast(max));
};

/**
 * @private
 * @return {number}
 */
Number.prototype._getMin = function() {
  const min = this.input.getAttribute('min') || 0;
  return /** @type {number} */ (typeCast(min));
};

/**
 * @private
 * @return {number}
 */
Number.prototype._getStep = function() {
  const step = this.input.getAttribute('step') || 1;
  return /** @type {number} */ (typeCast(step));
};

/**
 * @override
 * @return {undefined}
 */
Number.prototype.render = function() {
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
Number.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  mdl(this.inputBlock);
};
