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
  let _self = this;
  _self.options = new SUI.Object({
    selector: '.template-view',
  });
  _self.options.merge(opt_options);
  this.http = http;
  this.view = new SUI.Query(this.options.selector).getItem();
};

/**
 * @param {string} url
 * @return {!SUI.Promise}
 */
SUI.lib.Template.prototype.load = function(url) {
  let deferred = new SUI.Deferred();
  this.get(url).then((data) => {
    let node = new SUI.Query('.page-content', data).getItem();
    this.view.insert(node);
    deferred.resolve(node);
  }, () => {
    deferred.reject();
  });
  return deferred.promise();
};

/**
 * @param {string} url
 * @return {!SUI.Promise}
 */
SUI.lib.Template.prototype.get = function(url) {
  let deferred = new SUI.Deferred();
  this.http.get(url).then((data) => {
    deferred.resolve(data);
  }, (data) => {
    deferred.reject(data);
    let messageItem = new SUI.Query('#message', data).getItem();
    let message = {
      'content': messageItem.getText(),
      'type': messageItem.getAttribute('class'),
    };
    this.eventError(message);
  });
  return deferred.promise();
};

/**
 * @param {!Object} message
 * @return {undefined}
 */
SUI.lib.Template.prototype.eventError = function(message) {
  console.warn('SUI.lib.Template.eventError()', message);
};
