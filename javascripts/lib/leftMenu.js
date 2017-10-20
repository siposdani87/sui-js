goog.provide('SUI.lib.LeftMenu');

goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.LeftMenu}
 */
SUI.lib.LeftMenu = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype._init = function() {
  this.body = new SUI.Query('body').getItem();
  this.leftMenu = new SUI.Query('#left-menu').getItem();

  this.mainMenu = new SUI.Query('.main-menu', this.leftMenu).getItem();
  this.subMenu = new SUI.Query('.sub-menu', this.leftMenu).getItem();
  this.subMenu.addClass('hidden');

  this.mainContainer = new SUI.Query('.menu-container', this.mainMenu).getItem();
  this.subContainer = new SUI.Query('.menu-container', this.subMenu).getItem();

  this._initEvents();
};

/**
 * @private
 */
SUI.lib.LeftMenu.prototype._initEvents = function(){
  this.leftMenu.addEventListener('click', function() {
    this.close();
  }.bind(this));

  var openLeftMenu = new SUI.Query('#open-left-menu').getItem();
  openLeftMenu.setAttribute('href', 'javascript:void(0)');
  openLeftMenu.addEventListener('click', function() {
    this.open();
  }.bind(this));

  var closeLeftMenu = new SUI.Query('#close-left-menu', this.mainMenu).getItem();
  closeLeftMenu.setAttribute('href', 'javascript:void(0)');
  closeLeftMenu.addEventListener('click', function() {
    this.close();
  }.bind(this));

  var closeSubMenu = new SUI.Query('#close-sub-menu', this.subMenu).getItem();
  closeSubMenu.setAttribute('href', 'javascript:void(0)');
  closeSubMenu.addEventListener('click', function() {
    this.closeSubMenu();
  }.bind(this));

};


/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.open = function() {
  this.body.addClass('overflow-hidden');
  this.leftMenu.addClass('visible');
};

/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.close = function() {
  this.body.removeClass('overflow-hidden');
  this.leftMenu.removeClass('visible');
};

/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.openSubMenu = function(){
  this.mainMenu.addClass('hidden');
  this.subMenu.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.closeSubMenu = function(){
  this.mainMenu.removeClass('hidden');
  this.subMenu.addClass('hidden');
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.LeftMenu.prototype.getMainContainer  = function(){
  return this.mainContainer;
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.LeftMenu.prototype.getSubContainer  = function(){
  return this.subContainer;
};