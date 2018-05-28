goog.provide('SUI.lib.TopMenu');

goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @param {!SUI.lib.Header} header
 * @this {SUI.lib.TopMenu}
 */
SUI.lib.TopMenu = function(header) {
  this.header = header;
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.TopMenu.prototype._init = function() {
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
SUI.lib.TopMenu.prototype.toggle = function() {
  if (this._isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.lib.TopMenu.prototype._isOpened = function() {
  return this.topMenu.hasClass('visible-flex');
};

/**
 * @return {undefined}
 */
SUI.lib.TopMenu.prototype.open = function() {
  this.header.open();
  this.topMenu.addClass('visible-flex');
  this.toggleTopMenu.addClass('active');
  this.header.showShadow();
};

/**
 * @return {undefined}
 */
SUI.lib.TopMenu.prototype.close = function() {
  this.header.close();
  this.topMenu.removeClass('visible-flex');
  this.toggleTopMenu.removeClass('active');
  this.header.hideShadow();
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.TopMenu.prototype.getContainer = function() {
  return this.topMenu;
};
