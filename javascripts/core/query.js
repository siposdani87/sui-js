import * as goog from 'google-closure-library/closure/goog/base';

goog.provide('SUI.Query');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Item');

/**
 * @constructor
 * @export
 * @this {SUI.Query}
 * @extends {SUI.Collection}
 * @param {string} selector
 * @param {!Element|!SUI.Item=} opt_element
 */
SUI.Query = function(selector, opt_element) {
  this.element = opt_element || document;
  if (SUI.isFunction(this.element.getNode)) {
    this.element = this.element.getNode();
  }

  const items = this._querySelector(selector);
  SUI.Query.base(this, 'constructor', items, SUI.Item, {
    parent: null,
  });
};
goog.inherits(SUI.Query, SUI.Collection);

/**
 * @param {string} selector
 * @return {!Array}
 * @private
 */
SUI.Query.prototype._querySelector = function(selector) {
  let nodeList = [];
  if (selector.indexOf(' ') !== -1 || selector.split('.').length - 1 > 1 || (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) || selector.indexOf('[') !== -1) {
    nodeList = this.element.querySelectorAll(selector);
  } else if (selector.indexOf('#') === 0) {
    if (!SUI.isFunction(this.element.getElementById)) {
      this.element = document;
    }
    const node = this.element.getElementById(selector.replace('#', ''));
    nodeList.push(node);
  } else if (selector.indexOf('.') === 0) {
    nodeList = this.element.getElementsByClassName(selector.replace('.', ''));
  } else {
    nodeList = this.element.getElementsByTagName(selector);
  }
  const nodes = [];
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i]) {
      nodes.push(nodeList[i]);
    }
  }
  return nodes;
};

/**
 * @export
 * @return {!SUI.Item}
 */
SUI.Query.prototype.getItem = function() {
  let firstNode = /** @type {!SUI.Item} */ (this.get(0));
  if (!firstNode) {
    firstNode = new SUI.Item(null);
  }
  return firstNode;
};
