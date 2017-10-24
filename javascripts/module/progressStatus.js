goog.provide('SUI.ProgressStatus');

goog.require('SUI');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');

/**
 * @constructor
 * @this {SUI.ProgressStatus}
 * @param {!SUI.Node} dom
 * @param {!Object=} opt_options
 * @param {string=} opt_selector
 */
SUI.ProgressStatus = function(dom, opt_options, opt_selector = '.progress-status') {
  this.progressStatusNode = new SUI.Query(opt_selector, dom).getItem();
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.ProgressStatus.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object({
    errorStyle: 'error',
    successStyle: 'success',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.ProgressStatus.prototype._init = function() {
  this.textNode = new SUI.Query('.text', this.progressStatusNode).getItem();
};

/**
 * @private
 * @param {string} cssClass
 * @param {string} text
 * @return {undefined}
 */
SUI.ProgressStatus.prototype._setStatus = function(cssClass, text) {
  this.progressStatusNode.removeClass([this.options.errorStyle, this.options.successStyle]);
  this.progressStatusNode.addClass(cssClass);
  this.textNode.setHtml(text);
};

/**
 * @param {string} text
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setSuccess = function(text) {
  this._setStatus(this.options.successStyle, text);
};

/**
 * @param {string} text
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setError = function(text) {
  this._setStatus(this.options.errorStyle, text);
};
