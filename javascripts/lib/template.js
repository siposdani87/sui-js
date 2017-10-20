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
SUI.lib.Template = function(http, opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    selector: '.template-view'
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
  var deferred = new SUI.Deferred();
  this.get(url).then(function(data) {
    var node = new SUI.Query('.page-content', data).getItem();
    this.view.insert(node);
    deferred.resolve(node);
  }.bind(this), function(){
    deferred.reject();
  });
  return deferred.promise();
};

/**
 * @param {string} url
 * @return {!SUI.Promise}
 */
SUI.lib.Template.prototype.get = function(url) {
  var deferred = new SUI.Deferred();
  this.http.get(url).then(function(data) {
    deferred.resolve(data);
  }, function(data) {
    deferred.reject(data);
    var messageItem = new SUI.Query('#message', data).getItem();
    var message = {
      'content': messageItem.getText(),
      'type': messageItem.getAttribute('class')
    };
    this.eventError(message);
  }.bind(this));
  return deferred.promise();
};

/**
 * @param {!Object} message
 * @return {undefined}
 */
SUI.lib.Template.prototype.eventError = function(message) {
  console.warn('SUI.lib.Template.eventError()', message);
};
