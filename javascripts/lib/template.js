goog.provide('SUI.lib.Template');

goog.require('SUI.Deferred');
goog.require('SUI.Object');
goog.require('SUI.Query');
goog.require('SUI.lib');

/**
 * @constructor
 * @this {SUI.lib.Template}
 * @param {!SUI.lib.Http} http
 * @param {!Object=} opt_options
 */
SUI.lib.Template = function(http, opt_options = {}) {
  const _self = this;
  _self.options = new SUI.Object({
    selector: '.template-view',
  });
  _self.options.merge(opt_options);
  this.http = http;
  this.viewNode = new SUI.Query(this.options.selector).getItem();
};

/**
 * @return {!SUI.Node}
 */
SUI.lib.Template.prototype.getViewNode = function() {
  return this.viewNode;
};

/**
 * @param {string} url
 * @return {!SUI.Promise}
 */
SUI.lib.Template.prototype.load = function(url) {
  const deferred = new SUI.Deferred();
  this.http.get(url).then((data) => {
    deferred.resolve(this._handleData(false, data));
  }, (data) => {
    deferred.reject(this._handleData(true, data));
  });
  return deferred.promise();
};

/**
 * @private
 * @param {boolean} error
 * @param {!SUI.Node} data
 * @return {!SUI.Node}
 */
SUI.lib.Template.prototype._handleData = function(error, data) {
  const node = new SUI.Query('.page-content', data).getItem();
  this.viewNode.insert(node);
  if (error) {
    const messageItem = new SUI.Query('.message', this.viewNode).getItem();
    const message = {
      'content': messageItem.getText(),
      'type': messageItem.getAttribute('class').split(' ')[1],
    };
    this.eventError(message);
  }
  return node;
};

/**
 * @param {!Object} message
 * @return {undefined}
 */
SUI.lib.Template.prototype.eventError = function(message) {
  console.warn('SUI.lib.Template.eventError()', message);
};
