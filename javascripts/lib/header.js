goog.provide('SUI.Header');

goog.require('SUI');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Header}
 * @param {!Object=} opt_options
 */
SUI.Header = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);

  this._init();
};

/**
 * @private
 * @return {undefined}
 */
SUI.Header.prototype._init = function() {
  this.headerNode = new SUI.Query('#header').getItem();

  this.leftMenuButton = new SUI.Query('#open-left-menu', this.headerNode).getItem();
  this.topMenuButton = new SUI.Query('#toggle-top-menu', this.headerNode).getItem();

  this.brandNode = new SUI.Query('.brand', this.headerNode).getItem();
  this.brandNode.setAttribute('href', 'javascript:void(0)');
  this.brandNode.addEventListener('click', () => {
    this.eventLogoClick();
  });

  this.brandNodeImage = new SUI.Query('.brand img', this.brandNode).getItem();
  this.brandNodeTitle = new SUI.Query('.brand .app-title', this.brandNode).getItem();

  this.mainContainerNode = new SUI.Query('.main-container').getItem();
  this.templateViewNode = new SUI.Query('.template-view').getItem();
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.eventLogoClick = function() {
  SUI.consoleWarn('SUI.Header.eventLogoClick()');
};

/**
 * @param {string} title
 * @return {undefined}
 */
SUI.Header.prototype.setTitle = function(title) {
  this.brandNodeTitle.setHtml(title);
};

/**
 * @param {string} url
 * @return {undefined}
 */
SUI.Header.prototype.setUrl = function(url) {
  this.brandNode.setAttribute('href', url);
};

/**
 * @param {string} imagePath
 * @return {undefined}
 */
SUI.Header.prototype.setImage = function(imagePath) {
  this.brandNodeImage.setAttribute('src', imagePath);
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.open = function() {
  this.headerNode.addClass('open');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.close = function() {
  this.headerNode.removeClass('open');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.show = function() {
  this.headerNode.removeClass('hidden');
  this.mainContainerNode.addClass('header-padding');
  this.templateViewNode.addClass('has-header');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.hide = function() {
  this.headerNode.addClass('hidden');
  this.mainContainerNode.removeClass('header-padding');
  this.templateViewNode.removeClass('has-header');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.showShadow = function() {
  this.headerNode.addClass('shadow');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.hideShadow = function() {
  this.headerNode.removeClass('shadow');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.showLeftMenuButton = function() {
  this.leftMenuButton.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.hideLeftMenuButton = function() {
  this.leftMenuButton.addClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.showTopMenuButton = function() {
  this.topMenuButton.removeClass('hidden');
};

/**
 * @return {undefined}
 */
SUI.Header.prototype.hideTopMenuButton = function() {
  this.topMenuButton.addClass('hidden');
};
