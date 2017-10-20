goog.provide('SUI.Query');

goog.require('SUI');
goog.require('SUI.Collection');
goog.require('SUI.Object');

/**
 * @constructor
 * @this {SUI.Query}
 * @extends {SUI.Collection}
 * @param {string} selector
 * @param {!Element|!SUI.Node=} opt_element
 * @param {!Object=} opt_options
 */
SUI.Query = function(selector, opt_element, opt_options) {
  var _self = this;
  _self.options = new SUI.Object({
    type: 'Node'
  });
  _self.options.merge(opt_options);

  this.element = opt_element || document;
  if (SUI.isFunction(this.element.getNode)) {
    this.element = this.element.getNode();
  }

  var items = this._querySelector(selector);
  SUI.Collection.call(this, items, SUI.Node, this.options);
};
goog.inherits(SUI.Query, SUI.Collection);

/**
 * @param {string} selector
 * @return {!Array}
 * @private
 */
SUI.Query.prototype._querySelector = function(selector) {
  var nodeList = [];
  if (selector.indexOf(' ') !== -1 || selector.split('.').length - 1 > 1 || (selector.indexOf('.') > -1 && selector.indexOf('.') !== 0) || selector.indexOf('[') !== -1) {
    nodeList = this.element.querySelectorAll(selector);
  }
  else if (selector.indexOf('#') === 0) {
    if (!SUI.isFunction(this.element.getElementById)) {
      this.element = document;
    }
    var node = this.element.getElementById(selector.replace('#', ''));
    nodeList.push(node);
  }
  else if (selector.indexOf('.') === 0) {
    nodeList = this.element.getElementsByClassName(selector.replace('.', ''));
  }
  else {
    nodeList = this.element.getElementsByTagName(selector);
  }
  var nodes = [];
  for (var i = 0; i < nodeList.length; i++) {
    if (nodeList[i]){
      nodes.push(nodeList[i]);
    }
  }
  return nodes;
};

/**
 * @return {!SUI.Node}
 */
SUI.Query.prototype.getItem = function() {
  var node = new SUI.Node(null);
  return /** @type {!SUI.Node} */ (this.get(0) || node);
};
