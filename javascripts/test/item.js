goog.provide('SUI.test.Item');

goog.require('SUI.Item');
goog.require('SUI.Test');

/**
 * @constructor
 * @this {SUI.test.Item}
 * @extends {SUI.Test}
 */
SUI.test.Item = function() {
  SUI.Test.call(this, 'Item');
};
goog.inherits(SUI.test.Item, SUI.Test);

/**
 * @override
 */
SUI.test.Item.prototype.init = function() {
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

SUI.test.Item.prototype.testGet = function() {
  this.item.set('attr1', 2);
  if (this.item.get('attr1') !== 2) {
    this.showError('get', 1);
  }
  this.item.set('obj1.attr2', 3.1);
  if (this.item.get('obj1.attr2') !== 3.1) {
    this.showError('get', 2);
  }
};

SUI.test.Item.prototype.testSet = function() {
  this.item.set('attr1', 3);
  if (this.item.get('attr1') !== 3) {
    this.showError('set', 1);
  }

  this.item.set('obj1.attr5', 5.34);
  if (this.item.get('obj1.attr5') !== 5.34) {
    this.showError('set', 2);
  }
};

SUI.test.Item.prototype.testMerge = function() {
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
