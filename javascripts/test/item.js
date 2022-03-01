goog.provide('SUI.TestItem');

goog.require('SUI.test');
goog.require('SUI.Item');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.TestItem}
 * @extends {SUI.BaseTest}
 */
SUI.TestItem = function() {
  SUI.TestItem.base(this, 'constructor', 'Item');
};
goog.inherits(SUI.TestItem, SUI.BaseTest);

/**
 * @override
 */
SUI.TestItem.prototype.init = function() {
  this.item = new SUI.Item(this, {
    attr1: 2,
    obj1: {
      attr2: 3.1,
    },
  });

  this.testGet();
  this.testSet();
  this.testMerge();
};

SUI.TestItem.prototype.testGet = function() {
  this.item.set('attr1', 2);
  if (this.item.get('attr1') !== 2) {
    this.showError('get', 1);
  }
  this.item.set('obj1.attr2', 3.1);
  if (this.item.get('obj1.attr2') !== 3.1) {
    this.showError('get', 2);
  }
};

SUI.TestItem.prototype.testSet = function() {
  this.item.set('attr1', 3);
  if (this.item.get('attr1') !== 3) {
    this.showError('set', 1);
  }

  this.item.set('obj1.attr5', 5.34);
  if (this.item.get('obj1.attr5') !== 5.34) {
    this.showError('set', 2);
  }
};

SUI.TestItem.prototype.testMerge = function() {
  this.item.merge({
    attr1: 1,
    obj1: {
      obj2: {
        attr4: null,
      },
    },
    attr3: null,
  });

  this.item.set('attr1', 1);
  if (this.item.get('attr1') !== 1) {
    this.showError('merge', 1);
  }

  this.item.set('obj1.attr2', 3.1);
  if (this.item.get('obj1.attr2') !== 3.1) {
    this.showError('merge', 2);
  }

  this.item.set('obj1.obj2.attr4', null);
  if (this.item.get('obj1.obj2.attr4') !== null) {
    this.showError('merge', 3);
  }

  this.item.set('attr3', null);
  if (this.item.get('attr3') !== null) {
    this.showError('merge', 4);
  }
};
