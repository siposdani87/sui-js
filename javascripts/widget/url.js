goog.provide('SUI.widget.Url');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Url}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Url = function(input, label, error, inputBlock) {
  SUI.widget.Url.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Url, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Url.prototype._init = function() {
  this.inputBlock.addClass('url-widget');

  /**
   * @private
   * @const {string}
   */
  this.protocol = /** @type {string} */(this.input.getData('protocol'));

  this.input.addEventListener('keyup', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
    return true;
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
    return true;
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Url.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }

  if (this.protocol) {
    const protocolNode = new SUI.Node('span');
    protocolNode.addClass('protocol');
    protocolNode.setHtml(this.protocol);
    this.input.insertAfter(protocolNode);
  }

  this.refresh();
};

/**
 * @override
 */
SUI.widget.Url.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};
