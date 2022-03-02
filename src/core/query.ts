
import { isFunction } from '../base';
import { Collection } from './collection';
import { Item } from './item';

/**
 * @constructor
 * @export
 * @this {Query}
 * @extends {Collection}
 * @param {string} selector
 * @param {!Element|!Item=} opt_element
 */
export const Query = function(selector, opt_element?) {
  this.element = opt_element || document;
  if (isFunction(this.element.getNode)) {
    this.element = this.element.getNode();
  }

  const items = this._querySelector(selector);
  Collection.call(this, items, Item, {
    parent: null,
  });
};
Query.prototype = Object.create(Collection.prototype);
Query.prototype.constructor = Query;

/**
 * @param {string} selector
 * @return {!Array}
 * @private
 */
Query.prototype._querySelector = function(selector) {
  let nodeList = [];
  if (selector.indexOf(' ') !== -1 || selector.split('.').length - 1 > 1 || (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) || selector.indexOf('[') !== -1) {
    nodeList = this.element.querySelectorAll(selector);
  } else if (selector.indexOf('#') === 0) {
    if (!isFunction(this.element.getElementById)) {
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
 * @return {!Item}
 */
Query.prototype.getItem = function() {
  let firstNode = /** @type {!Item} */ (this.get(0));
  if (!firstNode) {
    firstNode = new Item(null);
  }
  return firstNode;
};
