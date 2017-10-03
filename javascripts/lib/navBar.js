goog.provide('SUI.lib.NavBar');

goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.NavBar}
 */
SUI.lib.NavBar = function() {
  this._init();
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype._init = function() {
  this.navBarHeader = new SUI.Query('.nav-bar-header').getItem();
  this.navBar =  new SUI.Query('#nav-bar', this.navBarHeader).getItem();

  var toggleNavBar = new SUI.Query('#toggle-nav-bar', this.navBarHeader).getItem();
  toggleNavBar.setAttribute('href', 'javascript:void(0)');
  toggleNavBar.addEventListener('click', () => {
    this.toggle();
  });
  this.toggleNavBarIcon = new SUI.Query('.material-icons', toggleNavBar).getItem();
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.toggle = function() {
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
SUI.lib.NavBar.prototype._isOpened = function() {
  return this.navBar.hasClass('open');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.open = function() {
  this.navBar.addClass('open');
  this.toggleNavBarIcon.setHtml('close');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.close = function() {
  this.navBar.removeClass('open');
  this.toggleNavBarIcon.setHtml('menu');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.show = function() {
  this.navBarHeader.removeClass('hidden');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.hide = function() {
  this.navBarHeader.addClass('hidden');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.showShadow = function() {
  this.navBar.addClass('shadow');
};

/**
 * @returns {undefined}
 */
SUI.lib.NavBar.prototype.hideShadow = function() {
  this.navBar.removeClass('shadow');
};

/**
 * @returns {!SUI.Node}
 */
SUI.lib.NavBar.prototype.getContainer = function() {
  return this.navBar;
};
