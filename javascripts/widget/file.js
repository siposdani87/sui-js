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
 * @returns {undefined}
 */
SUI.widget.File.prototype._init = function() {

  this.inputBlock.addClass('file-widget');

  this.defaultSrc = null;

  this.imageTag = new SUI.Query('img', this.inputBlock).getItem();
  if (this.imageTag.isEmpty()) {
    this.imageTag = new SUI.Node('img');
    this.inputBlock.beforeChild(this.imageTag);
  }
  else {
    this.defaultSrc = this.imageTag.getAttribute('src');
  }

  this.imageTag.addEventListener('click', function(){
   this._remove();
  }.bind(this));

  this.label.setStyle({
    'top': '0px'
  });

  this.input.addEventListener('change', function(inputNode) {
    var input = inputNode.getNode();
    var file = input.files[0];
    this._read(file);
  }.bind(this));
};

/**
 * @override
 * @returns {undefined}
 */
SUI.widget.File.prototype.render = function() {
  this.inputBlock.addClass(['mdl-textfield', 'mdl-js-textfield', 'mdl-textfield--floating-label']);
  this.input.addClass('mdl-textfield__input');
  if (this.label){
    this.label.addClass('mdl-textfield__label');
  }
  SUI.mdl(this.inputBlock);
};
/**
 * @private
 * @param {!Blob} file
 * @returns {undefined}
 */
SUI.widget.File.prototype._read = function(file) {
  if (file) {
    var reader = new FileReader();
    reader.onload = function(event) {
      var source = /** @type {string} */ (event.target.result);
      this.imageTag.setAttribute('src', source);
      this.modelChange(source);
      this.checkValidity();
    }.bind(this);
    reader.readAsDataURL(file);
  }
};

/**
 * @private
 * @returns {undefined}
 */
SUI.widget.File.prototype._remove = function(){
  this.input.getNode().value = '';
  if (this.defaultSrc) {
    this.imageTag.setAttribute('src', this.defaultSrc);
  }
  else {
    this.imageTag.removeAttribute('src');
  }
  this.modelChange(null);
  this.checkValidity();
};

