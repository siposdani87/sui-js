

goog.provide('SUI.test.Object');

goog.require('SUI.Object');
goog.require('SUI.Test');

/**
 * @constructor
 * @this {SUI.test.Object}
 * @extends {SUI.Test}
 */
SUI.test.Object = function() {
  
  SUI.Test.call(this, 'Object');
};
goog.inherits(SUI.test.Object, SUI.Test);

/**
 * @override
 */
SUI.test.Object.prototype.init = function() {
  
  this.testMerge();
  this.testGetTypedValue();
  this.testGet();
  this.testSet();
  this.testRemove();
  this.testCopy();
};

SUI.test.Object.prototype.testMerge = function() {
  
  var options = new SUI.Object({
    attr: null,
    obj: {
      attr2: 1,
      attr4: 3
    }
  });
  if (options.attr !== null) {
    this.showError('merge', 1);
  }
  options.merge({
    attr: 'value1',
    obj: {
      attr2: 2,
      attr3: null
    }
  });
  if (options.attr !== 'value1') {
    this.showError('merge', 2);
  }
  if (options.obj.attr2 !== 2) {
    this.showError('merge', 3);
  }
  if (options.obj.attr3 !== null) {
    this.showError('merge', 4);
  }
  if (options.obj.attr4 !== 3) {
    this.showError('merge', 5);
  }
};

SUI.test.Object.prototype.testGetTypedValue = function() {
  
  var options = new SUI.Object({
    attr: 'null',
    obj: {
      attr2: '1',
      attr3: '3.2'
    },
    attr4: 'false',
    attr5: 'true',
    attr6: 'string123,456.789',
    attr7: undefined,
    attr8: null
  });
  if (options.attr !== null) {
    this.showError('_getTypedValue', 0);
  }
  if (options.obj.attr2 !== 1) {
    this.showError('_getTypedValue', 1);
  }
  if (options.obj.attr3 !== 3.2) {
    this.showError('_getTypedValue', 2);
  }
  if (options.attr4 !== false) {
    this.showError('_getTypedValue', 3);
  }
  if (options.attr5 !== true) {
    this.showError('_getTypedValue', 4);
  }
  if (options.attr6 !== 'string123,456.789') {
    this.showError('_getTypedValue', 5);
  }
  if (options.attr7 !== undefined) {
    this.showError('_getTypedValue', 6);
  }
  if (options.attr8 !== null) {
    this.showError('_getTypedValue', 7);
  }
};

SUI.test.Object.prototype.testGet = function() {
  
  var options = new SUI.Object({
    attr: null,
    obj: {
      attr2: 1,
      obj2: {
        attr4: 2,
        attr3: 3.2,
        attr5: 4.5
      }
    }
  });
  options.set('attr', null);
  if (options.get('attr') !== null) {
    this.showError('get', 0);
  }
  options.set('obj.attr2', 1);
  if (options.get('obj.attr2') !== 1) {
    this.showError('get', 1);
  }
  options.set('obj.obj2.attr3', 3.2);
  if (options.get('obj.obj2.attr3') !== 3.2) {
    this.showError('get', 2);
  }
  if (options.get('obj.obj3') !== undefined) {
    this.showError('get', 3);
  }
};


SUI.test.Object.prototype.testSet = function() {
  
  var options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0
      }
    }
  });
  options.set('attr', null);
  if (options.get('attr') !== null) {
    this.showError('set', 0);
  }
  options.set('obj.attr2', 1);
  if (options.get('obj.attr2') !== 1) {
    this.showError('set', 1);
  }
  options.set('obj.obj2.attr3', 3.2);
  if (options.get('obj.obj2.attr3') !== 3.2) {
    this.showError('set', 2);
  }
  options.set('obj.obj3', 5);
  if (options.get('obj.obj3') === undefined) {
    this.showError('set', 3);
  }
};

SUI.test.Object.prototype.testRemove = function() {
  
  var options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0
      }
    }
  });
  options.remove('attr');
  if (options.get('attr') !== undefined) {
    this.showError('remove', 0);
  }
  options.remove('obj.attr2');
  if (options.get('obj.attr2') !== undefined) {
    this.showError('remove', 1);
  }
  options.remove('obj.obj2.attr3');
  if (options.get('obj.obj2.attr3') !== undefined) {
    this.showError('remove', 2);
  }
  options.remove('obj.obj3');
  if (options.get('obj.obj3') !== undefined) {
    this.showError('remove', 3);
  }
};

SUI.test.Object.prototype.testCopy = function() {
  
  var options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0
      }
    }
  });
  options.set('obj.attr2', 0);
  var optionsCopy = options.copy();
  optionsCopy.remove('obj.attr2');
  if (options.get('obj.attr2') !== 0) {
    this.showError('copy', 0);
  }
};
