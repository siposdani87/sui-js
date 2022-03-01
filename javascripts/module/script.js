import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Script');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Item');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');
goog.require('SUI.Query');
goog.require('SUI.ProgressBar');

/**
 * @constructor
 * @this {SUI.Script}
 * @param {!SUI.ProgressBar} progressBar
 * @param {!Object=} opt_options
 */
SUI.Script = function(progressBar, opt_options = {}) {
  this.progressBar = progressBar;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Script.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Script.prototype._init = function() {
  this.head = new SUI.Query('head').getItem();
};

/**
 * @param {string} id
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {boolean=} opt_async
 * @param {boolean=} opt_defer
 * @return {!SUI.Promize}
 */
SUI.Script.prototype.load = function(id, url, opt_params, opt_async = false, opt_defer = false) {
  this.progressBar.show();
  const deferred = new SUI.Deferred();
  const script = new SUI.Query('#' + id);
  if (script.size() > 0) {
    this.progressBar.hide();
    deferred.resolve();
  } else {
    const node = new SUI.Item('script');
    node.setId(id);
    const urlWithQueryString = SUI.urlWithQueryString(url, opt_params);
    node.setAttribute('src', urlWithQueryString);
    // TODO: check there is a good performance solution for script load
    if (opt_async) {
      node.setAttribute('async');
    }
    if (opt_defer) {
      node.setAttribute('defer');
    }

    node.setAttribute('onload', () => {
      this.progressBar.hide();
      deferred.resolve();
    });

    node.setAttribute('onerror', () => {
      this.progressBar.hide();
      deferred.reject();
    });

    this.head.appendChild(node);
  }
  return deferred.promise();
};

/**
 * @param {string} id
 * @return {undefined}
 */
SUI.Script.prototype.remove = function(id) {
  const script = new SUI.Query('#' + id).getItem();
  if (!script.isEmpty()) {
    script.remove();
  }
};
