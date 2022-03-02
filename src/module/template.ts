import { contain, consoleWarn } from "../base";
import { Deferred } from "../core/deferred";
import { Objekt } from "../core/objekt";
import { Query } from "../core/query";

/**
 * @constructor
 * @this {Template}
 * @param {!Http} http
 * @param {!Object=} opt_options
 */
export const Template = function(http, opt_options = {}) {
  this.http = http;

  this._setOptions(opt_options);
  this._init();
};

/**
 * @private
 * @param {!Object=} opt_options
 * @return {undefined}
 */
Template.prototype._setOptions = function(opt_options) {
  const _self = this;
  _self.options = new Objekt({
    selector: '.template-view',
    locale: navigator.language,
  });
  _self.options.merge(opt_options);
};

/**
 * @private
 * @return {undefined}
 */
Template.prototype._init = function() {
  this.viewNode = new Query(this.options.selector).getItem();
};

/**
 * @return {!Item}
 */
Template.prototype.getViewNode = function() {
  return this.viewNode;
};

/**
 * @param {string} url
 * @param {boolean=} opt_force
 * @return {!Promize}
 */
Template.prototype.load = function(url, opt_force = false) {
  const deferred = new Deferred();
  const templateUrl = this.viewNode.getAttribute('data-template-url');
  const locale = this.viewNode.getAttribute('data-locale');
  if (!opt_force && contain(this.options.locale, locale) && contain(url, templateUrl)) {
    this.viewNode.removeAttribute('data-locale');
    const node = new Query('.page-content', this.viewNode).getItem();
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
 * @param {!Item} data
 * @param {boolean} error
 * @return {!Item}
 */
Template.prototype._handleData = function(data, error) {
  const node = new Query('.page-content', data).getItem();
  if (error) {
    const messageItem = new Query('.message', node).getItem();
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
Template.prototype.eventError = function(message) {
  consoleWarn('Template.eventError()', message);
};
