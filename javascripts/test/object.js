

goog.provide('SUI.test.Object');

goog.require('SUI.test');
goog.require('SUI.Object');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.test.Object}
 * @extends {SUI.BaseTest}
 */
SUI.test.Object = function() {
  SUI.test.Object.base(this, 'constructor', 'Object');
};
goog.inherits(SUI.test.Object, SUI.BaseTest);

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
  const options = new SUI.Object({
    attr: null,
    obj: {
      attr2: 1,
      attr4: 3,
    },
  });
  if (options.attr !== null) {
    this.showError('merge', 1);
  }
  options.merge({
    attr: 'value1',
    obj: {
      attr2: 2,
      attr3: null,
    },
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
  const options = new SUI.Object({
    attr: 'null',
    obj: {
      attr2: '1',
      attr3: '3.2',
    },
    attr4: 'false',
    attr5: 'true',
    attr6: 'string123,456.789',
    attr7: undefined,
    attr8: null,
    attr9: '1e+3',
    attr10: '1e-3',
    attr11: '1E3',
    attr12: '2e234',
    attr13: '8e23467',
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
  if (options.attr9 !== 1e+3) {
    this.showError('_getTypedValue', 8);
  }
  if (options.attr10 !== 1e-3) {
    this.showError('_getTypedValue', 9);
  }
  if (options.attr11 !== 1E3) {
    this.showError('_getTypedValue', 10);
  }
  if (options.attr12 !== 2e234) {
    this.showError('_getTypedValue', 11);
  }
  if (options.attr13 !== '8e23467') {
    this.showError('_getTypedValue', 12);
  }
};

SUI.test.Object.prototype.testGet = function() {
  const options = new SUI.Object({
    'attr': null,
    'obj': {
      'attr2': 1,
      'obj2': {
        'attr4': 2,
        'attr3': 3.2,
        'attr5': 4.5,
      },
    },
    'arr': [{
      'attr1': -4,
    }],
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
  if (options.get('arr.0.attr1') !== -4) {
    this.showError('get', 4);
  }
};

SUI.test.Object.prototype.testSet = function() {
  const options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0,
      },
    },
    other: {
      attr4: 32,
    },
    other2: {
      other3: {
        attr5: 13,
        attr6: 'title',
      },
    },
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
  options.set('other', null);
  if (options.get('other') !== null) {
    this.showError('set', 4);
  }
  options.set('other2.other3', null);
  if (options.get('other2.other3') !== null) {
    this.showError('set', 5);
  }
};

SUI.test.Object.prototype.testRemove = function() {
  const options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0,
      },
    },
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
  const options = new SUI.Object({
    attr: 0,
    obj: {
      attr2: 0,
      obj2: {
        attr3: 0,
      },
    },
  });
  options.set('obj.attr2', 0);
  const optionsCopy = options.copy();
  optionsCopy.remove('obj.attr2');
  if (options.get('obj.attr2') !== 0) {
    this.showError('copy', 0);
  }
};
