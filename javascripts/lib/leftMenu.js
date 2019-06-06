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
  this.mainContainerNode = new SUI.Query('.main-container').getItem();
  this.leftMenu = new SUI.Query('#left-menu').getItem();

  this.mainMenu = new SUI.Query('.main-menu', this.leftMenu).getItem();
  this.subMenu = new SUI.Query('.sub-menu', this.leftMenu).getItem();
  this.subMenu.addClass('hidden');

  this.mainMenuContainer = new SUI.Query('.menu-container', this.mainMenu).getItem();
  this.subMenuContainer = new SUI.Query('.menu-container', this.subMenu).getItem();

  this.mainMenuTitle = new SUI.Query('h3', this.mainMenu).getItem();
  this.subMenuTitle = new SUI.Query('h3', this.subMenu).getItem();

  this._initEvents();
};

/**
 * @private
 */
SUI.lib.LeftMenu.prototype._initEvents = function() {
  this.leftMenu.addEventListener('click', () => {
    this.close();
  });

  this.mainMenuContainer.addEventListener('click', SUI.noop());
  this.subMenuContainer.addEventListener('click', SUI.noop());

  const openLeftMenu = new SUI.Query('#open-left-menu').getItem();
  openLeftMenu.setAttribute('href', 'javascript:void(0)');
  openLeftMenu.addEventListener('click', () => {
    this.open();
  });

  const closeLeftMenu = new SUI.Query('#close-left-menu', this.mainMenu).getItem();
  closeLeftMenu.setAttribute('href', 'javascript:void(0)');
  closeLeftMenu.addEventListener('click', () => {
    this.close();
  });

  const closeSubMenu = new SUI.Query('#close-sub-menu', this.subMenu).getItem();
  closeSubMenu.setAttribute('href', 'javascript:void(0)');
  closeSubMenu.addEventListener('click', () => {
    this.closeSubMenu();
  });
};

/**
 * @param {string=} opt_title
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.open = function(opt_title = '') {
  this.body.addClass('overflow-hidden');
  this.mainContainerNode.addClass('blur');

  this.leftMenu.addClass('visible');

  this.mainMenuTitle.setHtml(opt_title);
};

/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.close = function() {
  this.body.removeClass('overflow-hidden');
  this.mainContainerNode.removeClass('blur');
  this.leftMenu.removeClass('visible');
};

/**
 * @param {string=} opt_title
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.openSubMenu = function(opt_title = '') {
  this.mainMenu.addClass('hidden');
  this.subMenu.removeClass('hidden');
  this.subMenuTitle.setHtml(opt_title);
};

/**
 * @return {undefined}
 */
SUI.lib.LeftMenu.prototype.closeSubMenu = function() {
  this.mainMenu.removeClass('hidden');
  this.subMenu.addClass('hidden');
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.LeftMenu.prototype.getMainContainer = function() {
  return this.mainMenuContainer;
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.LeftMenu.prototype.getSubContainer = function() {
  return this.subMenuContainer;
};
