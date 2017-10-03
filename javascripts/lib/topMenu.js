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
 * @returns {undefined}
 */
SUI.lib.TopMenu.prototype._init = function() {
  this.topMenu = new SUI.Query('#top-menu', this.header.headerNode).getItem();

  var toggleTopMenu = new SUI.Query('#toggle-top-menu', this.header.headerNode).getItem();
  toggleTopMenu.setAttribute('href', 'javascript:void(0)');
  toggleTopMenu.addEventListener('click', function() {
    this.toggle();
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.lib.TopMenu.prototype.toggle = function() {
  if (this._isOpened()) {
    this.close();
  }
  else {
    this.open();
  }
};

/**
 * @returns {boolean}
 */
SUI.lib.TopMenu.prototype._isOpened = function() {
  return this.topMenu.hasClass('visible-flex');
};

/**
 * @returns {undefined}
 */
SUI.lib.TopMenu.prototype.open = function() {
  this.header.open();
  this.topMenu.addClass('visible-flex');
  this.header.showShadow();
};

/**
 * @returns {undefined}
 */
SUI.lib.TopMenu.prototype.close = function() {
  this.header.close();
  this.topMenu.removeClass('visible-flex');
  this.header.hideShadow();
};

/**
 * @returns {!SUI.Node}
 */
SUI.lib.TopMenu.prototype.getContainer  = function(){
  return this.topMenu;
};
