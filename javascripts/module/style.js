import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Style');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');
goog.require('SUI.Query');
goog.require('SUI.ProgressBar');

/**
 * @constructor
 * @this {SUI.Style}
 * @param {!SUI.ProgressBar} progressBar
 * @param {!Object=} opt_options
 */
SUI.Style = function(progressBar, opt_options = {}) {
  this.progressBar = progressBar;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Style.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Style.prototype._init = function() {
  this.head = new SUI.Query('head').getItem();
};

/**
 * @param {string} id
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {string=} opt_rel
 * @param {string=} opt_media
 * @return {!SUI.Promize}
 */
SUI.Style.prototype.load = function(id, url, opt_params, opt_rel = 'stylesheet', opt_media = 'all') {
  this.progressBar.show();
  const deferred = new SUI.Deferred();
  const style = new SUI.Query('#' + id);
  if (style.size() > 0) {
    this.progressBar.hide();
    deferred.resolve(true);
  } else {
    const node = new SUI.Item('link');
    node.setId(id);
    const urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
    node.setAttribute('href', urlWithQueryString);
    node.setAttribute('rel', opt_rel);
    node.setAttribute('media', opt_media);

    node.setAttribute('onload', () => {
      this.progressBar.hide();
      deferred.resolve(true);
    });

    node.setAttribute('onerror', () => {
      this.progressBar.hide();
      deferred.reject(false);
    });

    this.head.appendChild(node);
  }
  return deferred.promise();
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Style.prototype.remove = function(id) {
  const style = new SUI.Query('#' + id).getItem();
  if (!style.isEmpty()) {
    style.remove();
  }
};
