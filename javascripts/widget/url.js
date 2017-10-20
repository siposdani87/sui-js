goog.provide('SUI.widget.Url');

goog.require('SUI');
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
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Url, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Url.prototype._init = function() {
  this.inputBlock.addClass('url-widget');
  this._initInfo();

  this.protocol = this.input.getData('protocol');

  this.input.addEventListener('keyup', (input) => {
    var inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  });

  this.input.addEventListener('change', (input) => {
    var inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity();
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Url.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }

  if (this.protocol) {
    var protocolNode = new SUI.Node('span');
    protocolNode.addClass('protocol');
    protocolNode.setHtml(this.protocol);
    this.input.insertAfter(protocolNode);
  }

  SUI.mdl(this.inputBlock);
};

