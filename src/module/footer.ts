import { Objekt } from "../core/objekt";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Footer}
 * @param {!Object=} opt_options
 */
export const Footer = function(opt_options = {}) {
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Footer.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Footer.prototype._init = function() {
  this.footerNode = new Query('#footer').getItem();
  this.templateViewNode = new Query('.template-view').getItem();
  this.contentNode = new Query('.content', this.footerNode).getItem();
  this.localesNode = new Query('.locales', this.footerNode).getItem();
};

/**
 * @return {undefined}
 */
Footer.prototype.show = function() {
  this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
  const contentNode = new Query('.page-content.fullscreen', this.templateViewNode).getItem();
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
Footer.prototype.hide = function() {
  this.footerNode.addClass('hidden');
  this.footerNode.removeClass('static');
  this.templateViewNode.removeClass('has-footer');
};

/**
 * @param {!Item} contentNode
 * @return {undefined}
 */
Footer.prototype.setContent = function(contentNode) {
  this.contentNode.appendChild(contentNode);
};

/**
 * @return {!Item}
 */
Footer.prototype.getLocalesContainer = function() {
  return this.localesNode;
};

/**
 * @return {undefined}
 */
Footer.prototype.open = function() {
  this.footerNode.addClass('open');
};

/**
 * @return {undefined}
 */
Footer.prototype.close = function() {
  this.footerNode.removeClass('open');
};

/**
 * @return {boolean}
 */
Footer.prototype.isOpened = function() {
  return this.footerNode.hasClass('open');
};

/**
 * @return {undefined}
 */
Footer.prototype.toogle = function() {
  if (this.isOpened()) {
    this.close();
  } else {
    this.open();
  }
};
