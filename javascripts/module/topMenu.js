import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.TopMenu');

goog.require('SUI.Item');
goog.require('SUI.Query');
goog.require('SUI.Header');

/**
 * @constructor
 * @param {!SUI.Header} header
 * @this {SUI.TopMenu}
 */
SUI.TopMenu = function(header) {
  this.header = header;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.TopMenu.prototype._init = function() {
  this.topMenu = new SUI.Query('#top-menu', this.header.headerNode).getItem();

  this.toggleTopMenu = new SUI.Query('#toggle-top-menu', this.header.headerNode).getItem();
  this.toggleTopMenu.setAttribute('href', 'javascript:void(0)');
  this.toggleTopMenu.addEventListener('click', () => {
    this.toggle();
  });
};

/**
 * @return {undefined}
 */
SUI.TopMenu.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.TopMenu.prototype.isOpened = function() {
  return this.topMenu.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
SUI.TopMenu.prototype.open = function() {
  this.header.open();
  this.topMenu.addClass('visible-flex');
  this.toggleTopMenu.addClass('active');
  this.header.showShadow();
};

/**
 * @return {undefined}
 */
SUI.TopMenu.prototype.close = function() {
  this.header.close();
  this.topMenu.removeClass('visible-flex');
  this.toggleTopMenu.removeClass('active');
  this.header.hideShadow();
};

/**
 * @return {!SUI.Item}
 */
SUI.TopMenu.prototype.getContainer = function() {
  return this.topMenu;
};
