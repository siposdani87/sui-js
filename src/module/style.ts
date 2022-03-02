import { urlWithQueryString } from "../base";
import { Deferred } from "../core/deferred";
import { Item } from "../core/item";
import { Objekt } from "../core/objekt";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Style}
 * @param {!ProgressBar} progressBar
 * @param {!Object=} opt_options
 */
export const Style = function(progressBar, opt_options = {}) {
  this.progressBar = progressBar;
  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Style.prototype._setOptions = function(opt_options = {}) {
  const _self = this;
  _self.options = new Objekt();
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Style.prototype._init = function() {
  this.head = new Query('head').getItem();
};

/**
 * @param {string} id
 * @param {string} url
 * @param {!Object=} opt_params
 * @param {string=} opt_rel
 * @param {string=} opt_media
 * @return {!Promize}
 */
Style.prototype.load = function(id, url, opt_params, opt_rel = 'stylesheet', opt_media = 'all') {
  this.progressBar.show();
  const deferred = new Deferred();
  const style = new Query('#' + id);
  if (style.size() > 0) {
    this.progressBar.hide();
    deferred.resolve(true);
  } else {
    const node = new Item('link');
    node.setId(id);
    node.setAttribute('href', urlWithQueryString(url, opt_params));
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
Style.prototype.remove = function(id) {
  const style = new Query('#' + id).getItem();
  if (!style.isEmpty()) {
    style.remove();
  }
};
