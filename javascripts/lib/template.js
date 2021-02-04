goog.provide('SUI.lib.Template');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Object');
goog.require('SUI.Promise');
goog.require('SUI.Query');
goog.require('SUI.Node');
goog.require('SUI.lib');
goog.require('SUI.lib.Http');

/**
 * @constructor
 * @this {SUI.lib.Template}
 * @param {!SUI.lib.Http} http
 * @param {!Object=} opt_options
 */
SUI.lib.Template = function(http, opt_options = {}) {
  this.http = http;

  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.lib.Template.prototype._setOptions = function(opt_options) {
  const _self = this;
  _self.options = new SUI.Object({
    selector: '.template-view',
    locale: navigator.language,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.lib.Template.prototype._init = function() {
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
 * @param {boolean=} opt_force
 * @return {!SUI.Promise}
 */
SUI.lib.Template.prototype.load = function(url, opt_force = false) {
  const deferred = new SUI.Deferred();
  const templateUrl = this.viewNode.getAttribute('data-template-url');
  const locale = this.viewNode.getAttribute('data-locale');
  if (!opt_force && SUI.contain(this.options.locale, locale) && templateUrl === url) {
    this.viewNode.removeAttribute('data-locale');
    const node = new SUI.Query('.page-content', this.viewNode).getItem();
    deferred.resolve(node);
  } else {
    this.viewNode.setAttribute('data-template-url', url);
    this.http.get(url).then((data) => {
      deferred.resolve(this._handleData(data, false));
    }, (data) => {
      deferred.reject(this._handleData(data, true));
    });
  }
  return deferred.promise();
};

/**
 * @private
 * @param {!SUI.Node} data
 * @param {boolean} error
 * @return {!SUI.Node}
 */
SUI.lib.Template.prototype._handleData = function(data, error) {
  const node = new SUI.Query('.page-content', data).getItem();
  if (error) {
    const messageItem = new SUI.Query('.message', node).getItem();
    const message = {
      'content': messageItem.getText(),
      'type': messageItem.getAttribute('class').split(' ')[1],
    };
    this.eventError(message);
  } else {
    this.viewNode.insert(node);
  }
  return node;
};

/**
 * @param {!Object} message
 * @return {undefined}
 */
SUI.lib.Template.prototype.eventError = function(message) {
  SUI.consoleWarn('SUI.lib.Template.eventError()', message);
};
