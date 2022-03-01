goog.provide('SUI.Url');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.BaseWidget');

/**
 * @constructor
 * @extends {SUI.BaseWidget}
 * @this {SUI.Url}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.Url = function(input, label, error, inputBlock) {
  SUI.Url.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.Url, SUI.BaseWidget);

/**
 * @private
 * @return {undefined}
 */
SUI.Url.prototype._init = function() {
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
SUI.Url.prototype.render = function() {
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
SUI.Url.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};
