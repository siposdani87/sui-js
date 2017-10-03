goog.provide('SUI.lib.BottomMenu');

goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @param {!SUI.lib.Footer} footer
 * @this {SUI.lib.BottomMenu}
 */
SUI.lib.BottomMenu = function(footer) {
  this.footer = footer;
  this._init();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.BottomMenu.prototype._init = function() {
  this.bottomMenu = new SUI.Query('#bottom-menu', this.footer.footerNode).getItem();

  var toggleBottomMenu = new SUI.Query('#toggle-bottom-menu', this.footer.footerNode).getItem();
  toggleBottomMenu.setAttribute('href', 'javascript:void(0)');
  toggleBottomMenu.addEventListener('click', function() {
    this.toggle();
  }.bind(this));
};

/**
 * @returns {undefined}
 */
SUI.lib.BottomMenu.prototype.toggle = function() {
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
SUI.lib.BottomMenu.prototype._isOpened = function() {
  return this.bottomMenu.hasClass('visible-flex');
};

/**
 * @returns {undefined}
 */
SUI.lib.BottomMenu.prototype.open = function() {
  this.bottomMenu.addClass('visible-flex');
  this.footer.open();
};

/**
 * @returns {undefined}
 */
SUI.lib.BottomMenu.prototype.close = function() {
  this.bottomMenu.removeClass('visible-flex');
  this.footer.close();
};

/**
 * @returns {!SUI.Node}
 */
SUI.lib.BottomMenu.prototype.getContainer  = function(){
  return this.bottomMenu;
};