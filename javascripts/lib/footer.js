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
 * @param {string} content
 * @return {undefined}
 */
SUI.lib.Footer.prototype.setContent = function(content) {
  this.contentNode.setHtml(content);
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

