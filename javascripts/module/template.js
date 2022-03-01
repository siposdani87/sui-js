import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Template');

goog.require('SUI');
goog.require('SUI.Deferred');
goog.require('SUI.Objekt');
goog.require('SUI.Promize');
goog.require('SUI.Query');
goog.require('SUI.Item');
goog.require('SUI.Http');

/**
 * @constructor
 * @this {SUI.Template}
 * @param {!SUI.Http} http
 * @param {!Object=} opt_options
 */
SUI.Template = function(http, opt_options = {}) {
  this.http = http;

  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
SUI.Template.prototype._setOptions = function(opt_options) {
  const _self = this;
  _self.options = new SUI.Objekt({
    selector: '.template-view',
    locale: navigator.language,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Template.prototype._init = function() {
  this.viewNode = new SUI.Query(this.options.selector).getItem();
};

/**
 * @return {!SUI.Item}
 */
SUI.Template.prototype.getViewNode = function() {
  return this.viewNode;
};

/**
 * @param {string} url
 * @param {boolean=} opt_force
 * @return {!SUI.Promize}
 */
SUI.Template.prototype.load = function(url, opt_force = false) {
  const deferred = new SUI.Deferred();
  const templateUrl = this.viewNode.getAttribute('data-template-url');
  const locale = this.viewNode.getAttribute('data-locale');
  if (!opt_force && SUI.contain(this.options.locale, locale) && SUI.contain(url, templateUrl)) {
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
 * @param {!SUI.Item} data
 * @param {boolean} error
 * @return {!SUI.Item}
 */
SUI.Template.prototype._handleData = function(data, error) {
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
SUI.Template.prototype.eventError = function(message) {
  SUI.consoleWarn('SUI.Template.eventError()', message);
};
