import { consoleWarn } from "../base";
import { Objekt } from "../core/objekt";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Header}
 * @param {!Object=} opt_options
 */
export const Header = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt();
  _self.options.merge(opt_options);

  this._init();
};

/**
 * @private
 * @return {undefined}
 */
Header.prototype._init = function() {
  this.headerNode = new Query('#header').getItem();

  this.leftMenuButton = new Query('#open-left-menu', this.headerNode).getItem();
  this.topMenuButton = new Query('#toggle-top-menu', this.headerNode).getItem();

  this.brandNode = new Query('.brand', this.headerNode).getItem();
  this.brandNode.setAttribute('href', 'javascript:void(0)');
  this.brandNode.addEventListener('click', () => {
    this.eventLogoClick();
  });

  this.brandNodeImage = new Query('.brand img', this.brandNode).getItem();
  this.brandNodeTitle = new Query('.brand .app-title', this.brandNode).getItem();

  this.mainContainerNode = new Query('.main-container').getItem();
  this.templateViewNode = new Query('.template-view').getItem();
};

/**
 * @return {undefined}
 */
Header.prototype.eventLogoClick = function() {
  consoleWarn('Header.eventLogoClick()');
};

/**
 * @param {string} title
 * @return {undefined}
 */
Header.prototype.setTitle = function(title) {
  this.brandNodeTitle.setHtml(title);
};

/**
 * @param {string} url
 * @return {undefined}
 */
Header.prototype.setUrl = function(url) {
  this.brandNode.setAttribute('href', url);
};

/**
 * @param {string} imagePath
 * @return {undefined}
 */
Header.prototype.setImage = function(imagePath) {
  this.brandNodeImage.setAttribute('src', imagePath);
};

/**
 * @return {undefined}
 */
Header.prototype.open = function() {
  this.headerNode.addClass('open');
};

/**
 * @return {undefined}
 */
Header.prototype.close = function() {
  this.headerNode.removeClass('open');
};

/**
 * @return {undefined}
 */
Header.prototype.show = function() {
  this.headerNode.removeClass('hidden');
  this.mainContainerNode.addClass('header-padding');
  this.templateViewNode.addClass('has-header');
};

/**
 * @return {undefined}
 */
Header.prototype.hide = function() {
  this.headerNode.addClass('hidden');
  this.mainContainerNode.removeClass('header-padding');
  this.templateViewNode.removeClass('has-header');
};

/**
 * @return {undefined}
 */
Header.prototype.showShadow = function() {
  this.headerNode.addClass('shadow');
};

/**
 * @return {undefined}
 */
Header.prototype.hideShadow = function() {
  this.headerNode.removeClass('shadow');
};

/**
 * @return {undefined}
 */
Header.prototype.showLeftMenuButton = function() {
  this.leftMenuButton.removeClass('hidden');
};

/**
 * @return {undefined}
 */
Header.prototype.hideLeftMenuButton = function() {
  this.leftMenuButton.addClass('hidden');
};

/**
 * @return {undefined}
 */
Header.prototype.showTopMenuButton = function() {
  this.topMenuButton.removeClass('hidden');
};

/**
 * @return {undefined}
 */
Header.prototype.hideTopMenuButton = function() {
  this.topMenuButton.addClass('hidden');
};
