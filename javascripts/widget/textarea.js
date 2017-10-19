goog.provide('SUI.widget.Textarea');

goog.require('SUI');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.Textarea}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 */
SUI.widget.Textarea = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.Textarea, SUI.Widget);

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.Textarea.prototype._init = function() {
  this.inputBlock.addClass('textarea-widget');
  this._initInfo();

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
 * @returns {undefined}
 */
SUI.widget.Textarea.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input', 'mdl-textarea__input']);
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  SUI.mdl(this.inputBlock);
};


/**
 * @override
 * @param {!Function|boolean|number|string|null|undefined} value
 * @returns {undefined}
 */
SUI.widget.Textarea.prototype.setValue = function(value) {
  var inputNode = this.input.getNode();
  inputNode.value = value;
  this.input.trigger('change');
};

/**
 * @override
 * @returns {*}
 */
SUI.widget.Textarea.prototype.getValue = function() {
  var inputNode = this.input.getNode();
  return SUI.typeCast(inputNode.value);
};

