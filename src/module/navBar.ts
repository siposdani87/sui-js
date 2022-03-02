import { Query } from "../core/query";

/**
 * @constructor
 * @this {NavBar}
 */
export const NavBar = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
NavBar.prototype._init = function() {
  this.navBarHeader = new Query('.nav-bar-header').getItem();
  this.navBar = new Query('#nav-bar', this.navBarHeader).getItem();

  const toggleNavBar = new Query('#toggle-nav-bar', this.navBarHeader).getItem();
  toggleNavBar.setAttribute('href', 'javascript:void(0)');
  toggleNavBar.addEventListener('click', () => {
    this.toggle();
  });
  this.toggleNavBarIcon = new Query('em', toggleNavBar).getItem();
};

/**
 * @return {undefined}
 */
NavBar.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
NavBar.prototype.isOpened = function() {
  return this.navBar.hasClass('open');
};

/**
 * @return {undefined}
 */
NavBar.prototype.open = function() {
  this.navBar.addClass('open');
  this.toggleNavBarIcon.setHtml('close');
};

/**
 * @return {undefined}
 */
NavBar.prototype.close = function() {
  this.navBar.removeClass('open');
  this.toggleNavBarIcon.setHtml('menu');
};

/**
 * @return {undefined}
 */
NavBar.prototype.show = function() {
  this.navBarHeader.removeClass('hidden');
};

/**
 * @return {undefined}
 */
NavBar.prototype.hide = function() {
  this.navBarHeader.addClass('hidden');
};

/**
 * @return {undefined}
 */
NavBar.prototype.showShadow = function() {
  this.navBar.addClass('shadow');
};

/**
 * @return {undefined}
 */
NavBar.prototype.hideShadow = function() {
  this.navBar.removeClass('shadow');
};

/**
 * @return {!Item}
 */
NavBar.prototype.getContainer = function() {
  return this.navBar;
};
