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
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._init = function() {
  this.inputBlock.addClass('textarea-widget');

  this.input.addEventListener('keyup', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity(true);
    this.textboxNode.setHtml(inputNode.value);
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity(true);
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.Textarea.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass(['mdl-textfield__input', 'mdl-textarea__input', 'hidden']);
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }

  this.textboxNode = new SUI.Node('div');
  this.textboxNode.addClass(['mdl-textfield__input', 'mdl-textarea__input', 'textbox']);
  this.input.insertAfter(this.textboxNode);
  this.oDoc = this.textboxNode.getNode();
  this.oDoc.contentEditable = 'true';
  this.textboxNode.addEventListener('keydown', (_node, event) => {
    if (event.keyCode === 13) {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    }
  });
  this.textboxNode.addEventListener('keyup', (node) => {
    this.setValue(node.getHtml(true));
  });

  /*const toolbarNode = new SUI.Node('div');
  toolbarNode.addClass('toolbar');
  this.input.insertBefore(toolbarNode);

  const boldButtonNode = new SUI.Node('a');
  boldButtonNode.setAttribute('href', 'javascript:void(0)');
  boldButtonNode.addClass('material-icons');
  boldButtonNode.setHtml('format_bold');
  boldButtonNode.addEventListener('click', () => {
    this._formatDoc('bold');
  });
  toolbarNode.appendChild(boldButtonNode);

  const codeButtonNode = new SUI.Node('a');
  codeButtonNode.setAttribute('href', 'javascript:void(0)');
  codeButtonNode.addClass('material-icons');
  codeButtonNode.setHtml('code');
  codeButtonNode.addEventListener('click', () => {
    this._setHtmlMode(!this._isHtmlMode());
  });
  toolbarNode.appendChild(codeButtonNode);*/

  this.refresh();
};

/**
 * @private
 * @param {boolean} value
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._setHtmlMode = function(value) {
  this.htmlMode = value;
  this._setDocMode(this.htmlMode);
};

/**
 * @private
 * @return {boolean}
 */
SUI.widget.Textarea.prototype._isHtmlMode = function() {
  return this.htmlMode === true;
};

/**
 * @private
 * @param {string} sCmd
 * @param {*} sValue
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._formatDoc = function(sCmd, sValue) {
  if (!this._isHtmlMode()) { 
    this.oDoc.focus();
    document.execCommand(sCmd, false, sValue);
    this.setValue(this.oDoc.innerHTML);
    this.oDoc.focus();
  }
};

/**
 * @private
 * @param {boolean} _isHtmlMode
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._setDocMode = function(_isHtmlMode) {
  if (_isHtmlMode) {
    this.textboxNode.addClass('hidden');
    this.input.removeClass('hidden');
  } else {
    this.textboxNode.removeClass('hidden');
    this.input.addClass('hidden');
  }
  this.oDoc.focus();
};

/**
 * @override
 */
SUI.widget.Textarea.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Textarea.prototype.setValue = function(value) {
  const inputNode = this.input.getNode();
  inputNode.value = value;
  this.input.trigger('change');
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Textarea.prototype.getValue = function() {
  return this.input.getNode().value;
};
