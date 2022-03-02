import { Query } from "../core/query";

/**
 * @constructor
 * @param {!Header} header
 * @this {TopMenu}
 */
export const TopMenu = function(header) {
  this.header = header;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
TopMenu.prototype._init = function() {
  this.topMenu = new Query('#top-menu', this.header.headerNode).getItem();

  this.toggleTopMenu = new Query('#toggle-top-menu', this.header.headerNode).getItem();
  this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
  this.toggleTopMenu.addEventListener('click', () => {
    this.toggle();
  });
};

/**
 * @return {undefined}
 */
TopMenu.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
TopMenu.prototype.isOpened = function() {
  return this.topMenu.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
TopMenu.prototype.open = function() {
  this.header.open();
  this.topMenu.addClass('visible-flex');
  this.toggleTopMenu.addClass('active');
  this.header.showShadow();
};

/**
 * @return {undefined}
 */
TopMenu.prototype.close = function() {
  this.header.close();
  this.topMenu.removeClass('visible-flex');
  this.toggleTopMenu.removeClass('active');
  this.header.hideShadow();
};

/**
 * @return {!Item}
 */
TopMenu.prototype.getContainer = function() {
  return this.topMenu;
};
