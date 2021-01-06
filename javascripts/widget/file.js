goog.provide('SUI.widget.File');

goog.requireType('SUI.Form');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Query');
goog.require('SUI.Widget');
goog.require('SUI.widget');

/**
 * @constructor
 * @extends {SUI.Widget}
 * @this {SUI.widget.File}
 * @param {!SUI.Node} input
 * @param {!SUI.Node} label
 * @param {!SUI.Node} error
 * @param {!SUI.Node} inputBlock
 * @param {!SUI.Form} form
 */
SUI.widget.File = function(input, label, error, inputBlock, form) {
  SUI.widget.File.base(this, 'constructor', input, label, error, inputBlock, form);
  this._init();
};
goog.inherits(SUI.widget.File, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._init = function() {
  this.inputBlock.addClass('file-widget');
  this.nameHiddenInput = new SUI.Query('input[type=hidden]', this.inputBlock).getItem();

  this._initButtons();
  this._setDefaultSrc();

  this.imageTag.addEventListener('click', () => {
    this._remove();
  });

  this.input.addEventListener('change', (inputNode) => {
    const input = inputNode.getNode();
    const file = input.files[0];
    this._read(file);
    return true;
  });
};

/**
 * @private
 * @return {boolean}
 */
SUI.widget.File.prototype._isDocument = function() {
  const accept = /** @type {string} */ (this.input.getAttribute('accept'));
  return SUI.contain(accept, '.docx') || SUI.contain(accept, '.xlsx') || SUI.contain(accept, '.pdf');
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._setDefaultSrc = function() {
  this.defaultSrc = null;
  this.imageTag = new SUI.Query('img', this.inputBlock).getItem();
  if (this.imageTag.isEmpty()) {
    this.imageTag = new SUI.Node('img');
    this.inputBlock.beforeChild(this.imageTag);
  } else {
    this.defaultSrc = this.imageTag.getAttribute('src');
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._initButtons = function() {
  const browseButton = new SUI.Node('a');
  browseButton.setAttribute('href', 'javascript:void(0)');
  browseButton.addClass(['browse-button', 'material-icons']);
  if (this._isDocument()) {
    browseButton.setHtml('description');
  } else {
    browseButton.setHtml('image');
  }
  browseButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      this.input.getNode().click();
    }
  });
  this.actionContainerNode.appendChild(browseButton);
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.File.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass('mdl-textfield__input');
  if (this.label && this.label.exists()) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 */
SUI.widget.File.prototype.refresh = function() {
  if (this.isRequired() && this.getValue() === '') {
    this.inputBlock.addClass('is-invalid');
  }

  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @param {!Blob} file
 * @return {undefined}
 */
SUI.widget.File.prototype._read = function(file) {
  if (file) {
    const filename = /** @type {string} */ (file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const target = event.target;
      const searchStr = ';base64,';
      const source = /** @type {string} */ (target.result.replace(searchStr, ';filename=' + filename + searchStr));
      if (SUI.contain(file.type, 'image/') && !this.imageTag.isEmpty()) {
        this.imageTag.setAttribute('src', source);
      }
      this.modelChange(source);
      this.checkValidity();
    };
    reader.readAsDataURL(file);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._remove = function() {
  this.input.getNode().value = '';

  if (this.defaultSrc) {
    this.imageTag.setAttribute('src', this.defaultSrc);
  } else {
    this.imageTag.removeAttribute('src');
  }
  this.modelChange(null);
  this.checkValidity();
};
