goog.provide('SUI.lib.Style');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Node');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Style}
 * @param {!SUI.lib.ProgressBar} progressBar
 * @param {!Object=} opt_options
 */
SUI.lib.Style = function(progressBar, opt_options) {
  this.progressBar = progressBar;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Style.prototype._setOptions = function(opt_options) {
  let _self = this;
  _self.options = new SUI.Object();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Style.prototype._init = function() {
  this.head = new SUI.Query('head').getItem();
};

/**
 * @param {string} id
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {string=} opt_rel
 * @param {string=} opt_media
 * @return {!SUI.Promise}
 */
SUI.lib.Style.prototype.load = function(id, url, opt_params, opt_rel = 'stylesheet', opt_media = 'all') {
  this.progressBar.show();
  let deferred = new SUI.Deferred();
  let style = new SUI.Query('#' + id);
  if (style.size() > 0) {
    this.progressBar.hide();
    deferred.resolve(true);
  } else {
    let node = new SUI.Node('link');
    node.setId(id);
    let urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
    node.setAttribute('href', urlWithQueryString);
    node.setAttribute('rel', opt_rel);
    node.setAttribute('media', opt_media);

    node.setAttribute('onload', function() {
      this.progressBar.hide();
      deferred.resolve(true);
    }.bind(this));

    node.setAttribute('onerror', function() {
      this.progressBar.hide();
      deferred.reject(false);
    }.bind(this));

    this.head.appendChild(node);
  }
  return deferred.promise();
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.lib.Style.prototype.remove = function(id) {
  let style = new SUI.Query('#' + id).getItem();
  if (!style.isEmpty()) {
    style.remove();
  }
};