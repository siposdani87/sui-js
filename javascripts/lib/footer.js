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
 * @returns {undefined}
 */
SUI.lib.Footer.prototype._setOptions = function(opt_options) {
  var _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @returns {undefined}
 */
SUI.lib.Footer.prototype._init = function() {
  this.footerNode = new SUI.Query('#footer').getItem();
  this.templateViewNode = new SUI.Query('.template-view').getItem();
  this.contentNode = new SUI.Query('.content', this.footerNode).getItem();
};

/**
 * @returns {undefined}
 */
SUI.lib.Footer.prototype.show = function() {
  this.footerNode.removeClass(['static', 'hidden', 'has-footer']);
  var contentNode = new SUI.Query('.page-content.fullscreen', this.templateViewNode).getItem();
  if (contentNode && !contentNode.isEmpty()) {
    var isLightContent = contentNode.hasClass('light');
    if (isLightContent){
      this.footerNode.addClass('dark');
    }
    else{
      this.footerNode.removeClass('dark');
    }
    this.footerNode.addClass('static');
    this.templateViewNode.addClass('has-footer');
  }
};

/**
 * @returns {undefined}
 */
SUI.lib.Footer.prototype.hide = function() {
  this.footerNode.addClass('hidden');
  this.footerNode.removeClass('static');
  this.templateViewNode.removeClass('has-footer');
};

/**
 * @param {string} content
 * @returns {undefined}
 */
SUI.lib.Footer.prototype.setContent = function(content) {
  this.contentNode.setHtml(content);
};

/**
 * @returns {undefined}
 */
SUI.lib.Footer.prototype.open = function(){
  this.footerNode.addClass('open');
};

/**
 * @returns {undefined}
 */
SUI.lib.Footer.prototype.close = function(){
  this.footerNode.removeClass('open');
};

