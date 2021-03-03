goog.provide('SUI.Popup');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.PopupContainer');

/**
 * @constructor
 * @this {SUI.Popup}
 * @param {!SUI.Node} content
 * @param {!SUI.Node=} opt_parent
 * @param {boolean=} opt_withClose
 */
SUI.Popup = function(content, opt_parent, opt_withClose = false) {
  this.content = content;
  this.parent = opt_parent;
  this.withClose = opt_withClose;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._init = function() {
  this.popupContainer = new SUI.PopupContainer();
  this._draw();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._draw = function() {
  this.popupNode = new SUI.Node('div');
  this.popupNode.addClass(['popup', 'hidden']);

  this.parent.addClass('popup-parent');
  this.parent.appendChild(this.popupNode);

  this.popupNode.appendChild(this.content);

  this._initCloseButton();
};


/**
 * @private
 * @return {undefined}
 */
SUI.Popup.prototype._initCloseButton = function() {
  if (this.withClose) {
    const btnClose = new SUI.Node('button');
    btnClose.setAttribute('type', 'button');
    btnClose.addClass(['close', 'mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnClose.addEventListener('click', () => {
      this.close();
    });
    this.popupNode.appendChild(btnClose);

    const iconNode = new SUI.Node('em');
    iconNode.addClass('material-icons');
    iconNode.setHtml('close');
    btnClose.appendChild(iconNode);

    SUI.mdl(btnClose);
  }
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.open = function() {
  this.popupContainer.closeAll();
  this.popupContainer.push(SUI.Popup, this);
  this.popupNode.removeClass('hidden');
  this.popupContainer.setPosition(this.popupNode);
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.close = function() {
  this.popupContainer.delete(this);
  this.popupContainer.clearPosition(this.popupNode);
  this.popupNode.addClass('hidden');
  this.eventClose();
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.eventClose = function() {
  SUI.consoleInfo('SUI.Popup.eventClose()');
};

/**
 * @return {undefined}
 */
SUI.Popup.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.Popup.prototype.isOpened = function() {
  return !this.popupNode.hasClass('hidden');
};
