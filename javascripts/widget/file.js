goog.provide('SUI.widget.File');

goog.require('SUI');
goog.require('SUI.Node');
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
 */
SUI.widget.File = function(input, label, error, inputBlock) {
  SUI.Widget.call(this, input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.File, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._init = function() {
  this.inputBlock.addClass('file-widget');

  this.defaultSrc = null;

  this.imageTag = new SUI.Query('img', this.inputBlock).getItem();
  if (this.imageTag.isEmpty()) {
    this.imageTag = new SUI.Node('img');
    this.inputBlock.beforeChild(this.imageTag);
  } else {
    this.defaultSrc = this.imageTag.getAttribute('src');
  }

  this.imageTag.addEventListener('click', () => {
    this._remove();
  });

  this.label.setStyle({
    'top': '0px',
  });

  this.input.addEventListener('change', (inputNode) => {
    let input = inputNode.getNode();
    let file = input.files[0];
    this._read(file);
  });
};

/**
 * @override
 * @return {undefined}
 */
SUI.widget.File.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass('mdl-textfield__input');
  if (this.label) {
    this.label.addClass('mdl-textfield__label');
  }
  this.refresh();
};

/**
 * @override
 */
SUI.widget.File.prototype.refresh = function() {
  SUI.mdl(this.inputBlock);
};

/**
 * @private
 * @param {!Blob} file
 * @return {undefined}
 */
SUI.widget.File.prototype._read = function(file) {
  if (file) {
    let reader = new FileReader();
    reader.onload = (event) => {
      let source = /** @type {string} */ (event.target.result);
      this.imageTag.setAttribute('src', source);
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
