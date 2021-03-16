goog.provide('SUI.widget.File');

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
 */
SUI.widget.File = function(input, label, error, inputBlock) {
  SUI.widget.File.base(this, 'constructor', input, label, error, inputBlock);
  this._init();
};
goog.inherits(SUI.widget.File, SUI.Widget);

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._init = function() {
  this.inputBlock.addClass('file-widget');

  this._initFileIcon();
  this._initRemoveButton();
  this._initButtons();
  this._initDefaultImg();
  this._initValueSrc();

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
SUI.widget.File.prototype._initDefaultImg = function() {
  this.imageTag = new SUI.Query('img', this.inputBlock).getItem();
  if (this.imageTag.isEmpty()) {
    this.imageTag = new SUI.Node('img');
    this.inputBlock.beforeChild(this.imageTag);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._initValueSrc = function() {
  this.valueSrc = this.imageTag.getAttribute('src');

  this.defaultSrc = this.input.getAttribute('data-default-value');
  if (!this.defaultSrc) {
    const color = this.isRequired() ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10' : 'grey';
    this.defaultSrc = this._getFileIconSrc('N/A', color);
  }

  this.imageTag.setAttribute('src', this.valueSrc || this.defaultSrc);
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._initRemoveButton = function() {
  this.removeButton = new SUI.Node('a');
  this.removeButton.setAttribute('href', 'javascript:void(0)');
  this.removeButton.addClass(['remove-button', 'material-icons']);
  this.removeButton.setHtml('delete');
  this.removeButton.addEventListener('click', () => {
    if (this.isEnabled()) {
      this._remove();
    }
  });
  this.actionContainerNode.appendChild(this.removeButton);
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
 * @private
 * @param {string} mimeType
 * @return {!Array}
 */
SUI.widget.File.prototype._lookupByMimeType = function(mimeType) {
  return this.fileTypes[mimeType];
};

/**
 * @private
 * @param {string} extension
 * @return {!Array}
 */
SUI.widget.File.prototype._lookupByExtension = function(extension) {
  let results = [];
  for (const key in this.fileTypes) {
    if (Object.hasOwnProperty.call(this.fileTypes, key)) {
      const fileType = this.fileTypes[key];
      if (fileType[0] === extension) {
        const color = fileType[1];
        results = [key, color];
      }
    }
  }
  return results;
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._initFileIcon = function() {
  this.fileTypes = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['docx', 'blue'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['xlsx', 'green'],
    'application/pdf': ['pdf', 'red'],
  };

  this.fileTypeSVG = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>' +
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">' +
    '<path style="fill:#E2E5E7;" d="M128,0c-17.6,0-32,14.4-32,32v448c0,17.6,14.4,32,32,32h320c17.6,0,32-14.4,32-32V128L352,0H128z"/>' +
    '<path style="fill:#B0B7BD;" d="M384,128h96L352,0v96C352,113.6,366.4,128,384,128z"/>' +
    '<polygon style="fill:#CAD1D8;" points="480,224 384,128 480,128 "/>' +
    '<path style="fill:#CAD1D8;" d="M400,432H96v16h304c8.8,0,16-7.2,16-16v-16C416,424.8,408.8,432,400,432z"/>' +
    '<path style="fill:#000000;" d="M416,416c0,8.8-7.2,16-16,16H48c-8.8,0-16-7.2-16-16V256c0-8.8,7.2-16,16-16h352c8.8,0,16,7.2,16,16V416z"/>' +
    '<text x="220" y="380" text-anchor="middle" style="fill:#FFF;font-weight:700;font-family:Arial;font-size:120px;">TYPE</text>' +
    '</svg>';
};

/**
 * @private
 * @param {string} type
 * @param {string} color
 * @return {string}
 */
SUI.widget.File.prototype._getFileIconSrc = function(type, color) {
  let svg = this.fileTypeSVG;
  svg = svg.replace('#000000', color);
  svg = svg.replace('TYPE', type);
  const data = SUI.encodeBase64(svg);
  return SUI.format('data:image/svg+xml;base64,{0}', [data]);
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

  this._handleRemoveButton();

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
      let imageSrc = /** @type {string} */ (target.result.replace(searchStr, ';filename=' + filename + searchStr));
      if (!SUI.contain(file.type, 'image/')) {
        const [type, color] = this._lookupByMimeType(file.type);
        imageSrc = this._getFileIconSrc(type, color);
      }
      this.valueSrc = imageSrc;
      this.imageTag.setAttribute('src', this.valueSrc);
      this._handleRemoveButton();

      this.modelChange(this.valueSrc);
    };
    reader.readAsDataURL(file);
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._handleRemoveButton = function() {
  if (!this.isRequired() && this.valueSrc) {
    this.removeButton.removeClass('hidden');
  } else {
    this.removeButton.addClass('hidden');
  }
};

/**
 * @private
 * @return {undefined}
 */
SUI.widget.File.prototype._remove = function() {
  this.input.getNode().value = '';
  this.valueSrc = null;

  if (this.defaultSrc) {
    this.imageTag.setAttribute('src', this.defaultSrc);
  } else {
    this.imageTag.removeAttribute('src');
  }
  this._handleRemoveButton();

  this.modelChange(null);
};

/**
 * @override
 * @param {!Object|!Function|!Array|boolean|number|string|null|undefined} value
 * @return {undefined}
 */
SUI.widget.File.prototype.setValue = function(value) {
  let imageSrc = value;
  if (SUI.isObject(value)) {
    imageSrc = value['url'];
  }
  if (imageSrc) {
    if (this._isDocument()) {
      const extension = SUI.getExtensionName(imageSrc);
      const [_mimeType, color] = this._lookupByExtension(extension);
      imageSrc = this._getFileIconSrc(extension, color);
    }
    this.valueSrc = imageSrc;
    this.imageTag.setAttribute('src', this.valueSrc);
    this._handleRemoveButton();
  }
  this.modelChange(null);
};
