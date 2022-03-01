import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.NavBar');

goog.require('SUI.Item');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.NavBar}
 */
SUI.NavBar = function() {
  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.NavBar.prototype._init = function() {
  this.navBarHeader = new SUI.Query('.nav-bar-header').getItem();
  this.navBar = new SUI.Query('#nav-bar', this.navBarHeader).getItem();

  const toggleNavBar = new SUI.Query('#toggle-nav-bar', this.navBarHeader).getItem();
  toggleNavBar.setAttribute('href', 'javascript:void(0)');
  toggleNavBar.addEventListener('click', () => {
    this.toggle();
  });
  this.toggleNavBarIcon = new SUI.Query('em', toggleNavBar).getItem();
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.toggle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};

/**
 * @return {boolean}
 */
SUI.NavBar.prototype.isOpened = function() {
  return this.navBar.hasClass('open');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.open = function() {
  this.navBar.addClass('open');
  this.toggleNavBarIcon.setHtml('close');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.close = function() {
  this.navBar.removeClass('open');
  this.toggleNavBarIcon.setHtml('menu');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.show = function() {
  this.navBarHeader.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.hide = function() {
  this.navBarHeader.addClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.showShadow = function() {
  this.navBar.addClass('shadow');
};

/**
 * @return {undefined}
 */
SUI.NavBar.prototype.hideShadow = function() {
  this.navBar.removeClass('shadow');
};

/**
 * @return {!SUI.Item}
 */
SUI.NavBar.prototype.getContainer = function() {
  return this.navBar;
};
