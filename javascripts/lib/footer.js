goog.provide('SUI.lib.Footer');

goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Footer}
 * @param {!Object=} opt_options
 */
SUI.lib.Footer = function(opt_options) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Footer.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Footer.prototype._init = function() {
  this.footerNode = new SUI.Query('#footer').getItem();
  this.templateViewNode = new SUI.Query('.template-view').getItem();
  this.contentNode = new SUI.Query('.content', this.footerNode).getItem();
  this.localesNode = new SUI.Query('.locales', this.footerNode).getItem();
};

/**
 * @return {undefined}
 */
SUI.lib.Footer.prototype.show = function() {
  this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
  let contentNode = new SUI.Query('.page-content.fullscreen', this.templateViewNode).getItem();
  if (contentNode && !contentNode.isEmpty()) {
    let isLightContent = contentNode.hasClass('light');
    if (isLightContent) {
      this.footerNode.addClass('dark');
    } else {
      this.footerNode.removeClass('dark');
    }
    this.footerNode.addClass('static');
    this.templateViewNode.addClass('has-footer');
  }
};

/**
 * @return {undefined}
 */
SUI.lib.Footer.prototype.hide = function() {
  this.footerNode.addClass('hidden');
  this.footerNode.removeClass('static');
  this.templateViewNode.removeClass('has-footer');
};

/**
 * @param {!SUI.Node} contentNode
 * @return {undefined}
 */
SUI.lib.Footer.prototype.setContent = function(contentNode) {
  this.contentNode.appendChild(contentNode);
};

/**
 * @param {!SUI.Node} localesNode
 * @return {undefined}
 */
SUI.lib.Footer.prototype.setLocales = function(localesNode) {
  this.contentNode.appendChild(localesNode);
};

/**
 * @return {undefined}
 */
SUI.lib.Footer.prototype.open = function() {
  this.footerNode.addClass('open');
};

/**
 * @return {undefined}
 */
SUI.lib.Footer.prototype.close = function() {
  this.footerNode.removeClass('open');
};

/**
 * @return {boolean}
 */
SUI.lib.Footer.prototype.isOpened = function() {
  return this.footerNode.hasClass('open');
};

/**
 * @return {undefined}
 */
SUI.lib.Footer.prototype.toogle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};
