import { mdl } from "../base";
import { BaseWidget } from "../component/baseWidget";
import { Item } from "../core/item";

/**
 * @constructor
 * @extends {BaseWidget}
 * @this {Url}
 * @param {!Item} input
 * @param {!Item} label
 * @param {!Item} error
 * @param {!Item} inputBlock
 */
export const Url = function(input, label, error, inputBlock) {
  BaseWidget.call(this, input, label, error, inputBlock);
  this._init();
};
Url.prototype = Object.create(BaseWidget.prototype);
Url.prototype.constructor = Url;

/**
 * @private
 * @return {undefined}
 */
Url.prototype._init = function() {
  this.inputBlock.addClass('url-widget');

  /**
   * @private
   * @const {string}
   */
  this.protocol = /** @type {string} */(this.input.getData('protocol'));

  this.input.addEventListener('keyup', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    return true;
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    return true;
  });
};

/**
 * @override
 * @return {undefined}
 */
Url.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }

  if (this.protocol) {
    const protocolNode = new Item('span');
    protocolNode.addClass('protocol');
    protocolNode.setHtml(this.protocol);
    this.input.insertAfter(protocolNode);
  }

  this.refresh();
};

/**
 * @override
 */
Url.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  mdl(this.inputBlock);
};
