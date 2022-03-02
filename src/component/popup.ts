import { mdl, consoleInfo } from "../base";
import { Item } from "../core/item";
import { PopupContainer } from "./popupContainer";

/**
 * @constructor
 * @this {Popup}
 * @param {!Item} content
 * @param {!Item=} opt_parent
 * @param {boolean=} opt_withClose
 */
export const Popup = function(content, opt_parent, opt_withClose = false) {
  this.content = content;
  this.parent = opt_parent;
  this.withClose = opt_withClose;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
Popup.prototype._init = function() {
  this.popupContainer = new PopupContainer();
  this._draw();
};

/**
 * @private
 * @return {undefined}
 */
Popup.prototype._draw = function() {
  this.popupNode = new Item('div');
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
Popup.prototype._initCloseButton = function() {
  if (this.withClose) {
    const btnClose = new Item('button');
    btnClose.setAttribute('type', 'button');
    btnClose.addClass(['close', 'mdl-button', 'mdl-js-button', 'mdl-button--icon']);
    btnClose.addEventListener('click', () => {
      this.close();
    });
    this.popupNode.appendChild(btnClose);

    const iconNode = new Item('em');
    iconNode.addClass('material-icons');
    iconNode.setHtml('close');
    btnClose.appendChild(iconNode);

    mdl(btnClose);
  }
};

/**
 * @return {undefined}
 */
Popup.prototype.open = function() {
  this.popupContainer.closeAll();
  this.popupContainer.push(Popup, this);
  this.popupNode.removeClass('hidden');
  this.popupContainer.setPosition(this.popupNode);
};

/**
 * @return {undefined}
 */
Popup.prototype.close = function() {
  this.popupContainer.delete(this);
  this.popupContainer.clearPosition(this.popupNode);
  this.popupNode.addClass('hidden');
  this.eventClose();
};

/**
 * @return {undefined}
 */
Popup.prototype.eventClose = function() {
  consoleInfo('Popup.eventClose()');
};

/**
 * @return {undefined}
 */
Popup.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
Popup.prototype.isOpened = function() {
  return !this.popupNode.hasClass('hidden');
};
