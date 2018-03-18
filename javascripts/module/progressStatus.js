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
    successStyle: 'success',
    infoStyle: 'info',
    warningStyle: 'warning',
    errorStyle: 'error',
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.ProgressStatus.prototype._init = function() {
  this.iconNode = new SUI.Query('.icon', this.progressStatusNode).getItem();
  this.textNode = new SUI.Query('.text', this.progressStatusNode).getItem();
};

/**
 * @private
 * @param {string} cssClass
 * @param {string} text
 * @param {string=} opt_icon
 * @return {undefined}
 */
SUI.ProgressStatus.prototype._setStatus = function(cssClass, text, opt_icon = '') {
  this.progressStatusNode.removeClass([this.options.errorStyle, this.options.successStyle, this.options.infoStyle, this.options.warningStyle]);
  this.progressStatusNode.addClass(cssClass);
  this.textNode.setHtml(text);
  if (opt_icon) {
    this.iconNode.setHtml(opt_icon);
  }
};

/**
 * @param {string} text
 * @param {string=} opt_icon
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setSuccess = function(text, opt_icon = '') {
  this._setStatus(this.options.successStyle, text, opt_icon);
};

/**
 * @param {string} text
 * @param {string=} opt_icon
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setInfo = function(text, opt_icon = '') {
  this._setStatus(this.options.infoStyle, text, opt_icon);
};

/**
 * @param {string} text
 * @param {string=} opt_icon
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setWarning = function(text, opt_icon = '') {
  this._setStatus(this.options.warningStyle, text, opt_icon);
};

/**
 * @param {string} text
 * @param {string=} opt_icon
 * @return {undefined}
 */
SUI.ProgressStatus.prototype.setError = function(text, opt_icon = '') {
  this._setStatus(this.options.errorStyle, text, opt_icon);
};
