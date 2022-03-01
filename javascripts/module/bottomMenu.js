import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.BottomMenu');

goog.require('SUI.Item');
goog.require('SUI.Query');
goog.require('SUI.Footer');

/**
 * @constructor
 * @param {!SUI.Footer} footer
 * @this {SUI.BottomMenu}
 */
SUI.BottomMenu = function(footer) {
  this.footer = footer;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.BottomMenu.prototype._init = function() {
  this.bottomMenu = new SUI.Query('#bottom-menu', this.footer.footerNode).getItem();

  const openBottomMenu = new SUI.Query('#open-bottom-menu', this.footer.footerNode).getItem();
  openBottomMenu.setAttribute('href', 'javascript:void(0)');
  openBottomMenu.addEventListener('click', () => {
    this.toggle();
  });

  const closeBottomMenu = new SUI.Query('#close-bottom-menu', this.footer.footerNode).getItem();
  closeBottomMenu.setAttribute('href', 'javascript:void(0)');
  closeBottomMenu.addEventListener('click', () => {
    this.toggle();
  });
};

/**
 * @return {undefined}
 */
SUI.BottomMenu.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.BottomMenu.prototype.isOpened = function() {
  return this.bottomMenu.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
SUI.BottomMenu.prototype.open = function() {
  this.bottomMenu.addClass('visible-flex');
  this.footer.open();
};

/**
 * @return {undefined}
 */
SUI.BottomMenu.prototype.close = function() {
  this.bottomMenu.removeClass('visible-flex');
  this.footer.close();
};

/**
 * @return {!SUI.Item}
 */
SUI.BottomMenu.prototype.getContainer = function() {
  return this.bottomMenu;
};
