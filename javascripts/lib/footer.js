goog.provide('SUI.Footer');

goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.Footer}
 * @param {!Object=} opt_options
 */
SUI.Footer = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Footer.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Footer.prototype._init = function() {
  this.footerNode = new SUI.Query('#footer').getItem();
  this.templateViewNode = new SUI.Query('.template-view').getItem();
  this.contentNode = new SUI.Query('.content', this.footerNode).getItem();
  this.localesNode = new SUI.Query('.locales', this.footerNode).getItem();
};

/**
 * @return {undefined}
 */
SUI.Footer.prototype.show = function() {
  this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
  const contentNode = new SUI.Query('.page-content.fullscreen', this.templateViewNode).getItem();
  if (contentNode && !contentNode.isEmpty()) {
    const isLightContent = contentNode.hasClass('light');
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
SUI.Footer.prototype.hide = function() {
  this.footerNode.addClass('hidden');
  this.footerNode.removeClass('static');
  this.templateViewNode.removeClass('has-footer');
};

/**
 * @param {!SUI.Node} contentNode
 * @return {undefined}
 */
SUI.Footer.prototype.setContent = function(contentNode) {
  this.contentNode.appendChild(contentNode);
};

/**
 * @return {!SUI.Node}
 */
SUI.Footer.prototype.getLocalesContainer = function() {
  return this.localesNode;
};

/**
 * @return {undefined}
 */
SUI.Footer.prototype.open = function() {
  this.footerNode.addClass('open');
};

/**
 * @return {undefined}
 */
SUI.Footer.prototype.close = function() {
  this.footerNode.removeClass('open');
};

/**
 * @return {boolean}
 */
SUI.Footer.prototype.isOpened = function() {
  return this.footerNode.hasClass('open');
};

/**
 * @return {undefined}
 */
SUI.Footer.prototype.toogle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};
