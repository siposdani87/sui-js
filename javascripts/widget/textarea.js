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
    return true;
  });

  this.input.addEventListener('change', (input) => {
    const inputNode = input.getNode();
    this.modelChange(inputNode.value);
    this.checkValidity(true);
    return true;
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
  let value = /** @type {string} */ (this.getValue());
  value = value.indexOf('<p>') === 0 ? value : `<p>${value || '<br />'}</p>`;
  this.textboxNode.setHtml(value);
  this.input.insertAfter(this.textboxNode);
  this.oDoc = this.textboxNode.getNode();
  this.oDoc.contentEditable = 'true';
  this.textboxNode.addEventListener('keydown', (_node, event) => {
    if (event.keyCode === 13) {
      document.execCommand('defaultParagraphSeparator', false, 'p');
    }
    return true;
  });
  this.textboxNode.addEventListener('keyup', (node) => {
    this._setValue(node.getHtml(true));
    return true;
  });

  this._renderToolbarButtons();
  this.refresh();
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._renderToolbarButtons = function() {
  this.toolbarNode = new SUI.Node('div');
  this.toolbarNode.addClass('toolbar');
  this.input.insertBefore(this.toolbarNode);

  this._renderToolbarButton('undo', () => {
    this._formatDoc('undo');
  });

  this._renderToolbarButton('redo', () => {
    this._formatDoc('redo');
  });

  this._renderToolbarButton('format_bold', () => {
    this._formatDoc('bold');
  });

  this._renderToolbarButton('format_italic', () => {
    this._formatDoc('italic');
  });

  this._renderToolbarButton('format_underline', () => {
    this._formatDoc('underline');
  });

  this._renderToolbarButton('format_list_bulleted', () => {
    this._formatDoc('insertunorderedlist');
  });

  this._renderToolbarButton('format_list_numbered', () => {
    this._formatDoc('insertorderedlist');
  });

  this._renderToolbarButton('format_clear', () => {
    this._formatDoc('removeFormat');
  });

  this._renderToolbarButton('code', () => {
    this._setHtmlMode(!this._isHtmlMode());
  });
};

/**
 * @private
 * @param {string} iconName
 * @param {!Function} action
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._renderToolbarButton = function(iconName, action) {
  const boldButtonNode = new SUI.Node('a');
  boldButtonNode.setAttribute('href', 'javascript:void(0)');
  boldButtonNode.addClass('material-icons');
  boldButtonNode.setHtml(iconName);
  boldButtonNode.addEventListener('click', () => {
    action();
  });
  this.toolbarNode.appendChild(boldButtonNode);
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
 * @param {*=} opt_sValue
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._formatDoc = function(sCmd, opt_sValue) {
  if (!this._isHtmlMode()) {
    // this.oDoc.focus();
    document.execCommand(sCmd, false, opt_sValue);
    this._setValue(this.oDoc.innerHTML);
    // this.oDoc.focus();
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

  if (this.isDisabled()) {
    this.oDoc.contentEditable = 'false';
  }

  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Textarea.prototype._setValue = function(value) {
  const inputNode = this.input.getNode();
  inputNode.value = value;
  this.input.trigger('change');
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.Textarea.prototype.setValue = function(value) {
  this.oDoc.innerHTML = value;
  this._setValue(value);
};

/**
 * @override
 * @return {*}
 */
SUI.widget.Textarea.prototype.getValue = function() {
  return this.input.getNode().value;
};
