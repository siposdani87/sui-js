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
  if (!this.defaultSrc) {
    const color = this.isRequired() ? 'grey;stroke:red;stroke-width:10;stroke-dasharray:15,10' : 'grey';
    this.defaultSrc = this._getFileIconSrc('N/A', color);
    this.imageTag.setAttribute('src', this.defaultSrc);
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
      if (SUI.contain(file.type, 'image/')) {
        this.imageTag.setAttribute('src', source);
      } else {
        const [type, color] = this.fileTypes[file.type];
        const imageSrc = this._getFileIconSrc(type, color);
        this.imageTag.setAttribute('src', imageSrc);
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
