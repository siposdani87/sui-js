goog.provide('SUI.TestNode');

goog.require('SUI');
goog.require('SUI.test');
goog.require('SUI.Node');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.TestNode}
 * @extends {SUI.BaseTest}
 */
SUI.TestNode = function() {
  SUI.TestNode.base(this, 'constructor', 'Node');
};
goog.inherits(SUI.TestNode, SUI.BaseTest);

/**
 * @override
 */
SUI.TestNode.prototype.init = function() {
  this.node = new SUI.Node('div');

  this.testAttribute();
  this.testAttributeData();
  this.testData();
};

SUI.TestNode.prototype.testAttribute = function() {
  const values = ['text', null, true, false, Infinity, 0, 1, 10];

  for (let i = 0; i < values.length; i++) {
    this.node.setAttribute('data', values[i]);
    const value = this.node.getAttribute('data');
    if (!SUI.isSame(value, values[i])) {
      this.showError('setAttribute(data)', values[i]);
      this.showError('getAttribute(data)', value);
    }
  }
};

SUI.TestNode.prototype.testAttributeData = function() {
  const values = ['text', null, true, false, Infinity, 0, 1, 10, [0, 1, 10], {key: 'value'}];

  for (let i = 0; i < values.length; i++) {
    this.node.setAttribute('data-value', values[i]);
    const value = this.node.getAttribute('data-value');
    if (!SUI.isSame(value, values[i])) {
      this.showError('setAttribute(data-value)', values[i]);
      this.showError('getAttribute(data-value)', value);
    }
  }
  this.node.removeAttribute('data-value');
};

SUI.TestNode.prototype.testData = function() {
  const values = ['', 'text', null, true, false, undefined, Infinity, 0, 1, 10, [0, 1, 10], {key: 'value'}];

  for (let i = 0; i < values.length; i++) {
    this.node.setData('value', values[i]);
    const value = this.node.getData('value');
    if (!SUI.isSame(value, values[i])) {
      this.showError('setData(value)', values[i]);
      this.showError('getData(value)', value);
    }
  }
  this.node.removeData('value');
};
