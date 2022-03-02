import { Query } from "../core/query";

/**
 * @constructor
 * @param {!Footer} footer
 * @this {BottomMenu}
 */
export const BottomMenu = function(footer) {
  this.footer = footer;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
BottomMenu.prototype._init = function() {
  this.bottomMenu = new Query('#bottom-menu', this.footer.footerNode).getItem();

  const openBottomMenu = new Query('#open-bottom-menu', this.footer.footerNode).getItem();
  openBottomMenu.setAttribute('href', 'javascript:void(0)');
  openBottomMenu.addEventListener('click', () => {
    this.toggle();
  });

  const closeBottomMenu = new Query('#close-bottom-menu', this.footer.footerNode).getItem();
  closeBottomMenu.setAttribute('href', 'javascript:void(0)');
  closeBottomMenu.addEventListener('click', () => {
    this.toggle();
  });
};

/**
 * @return {undefined}
 */
BottomMenu.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
BottomMenu.prototype.isOpened = function() {
  return this.bottomMenu.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
BottomMenu.prototype.open = function() {
  this.bottomMenu.addClass('visible-flex');
  this.footer.open();
};

/**
 * @return {undefined}
 */
BottomMenu.prototype.close = function() {
  this.bottomMenu.removeClass('visible-flex');
  this.footer.close();
};

/**
 * @return {!Item}
 */
BottomMenu.prototype.getContainer = function() {
  return this.bottomMenu;
};
