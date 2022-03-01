goog.provide('SUI.Test');

goog.require('SUI');
goog.require('SUI.TestContainer');
goog.require('SUI.TestDeferred');
goog.require('SUI.TestItem');
goog.require('SUI.TestNode');
goog.require('SUI.TestObject');

/**
 * @constructor
 * @this {SUI.Test}
 */
SUI.Test = function() {

};

/**
 * @return {undefined}
 */
SUI.Test.prototype.run = function() {
  const tests = [
    new SUI.TestContainer(),
    new SUI.TestDeferred(),
    new SUI.TestItem(),
    new SUI.TestNode(),
    new SUI.TestObject(),
  ];
  for (const test of tests) {
    test.init();
    SUI.consoleInfo(`SUI.Test${test.name}.init()`);
  }
};

/**
 * @param {string} message
 * @param {!Object|string|number|boolean} object
 * @return {undefined}
 */
SUI.Test.prototype.showError = function(message, object) {
  SUI.consoleError(this.name + '.' + message, object);
};

/**
 * @param {string} message
 * @param {!Object} object
 * @return {undefined}
 */
SUI.Test.prototype.showLog = function(message, object) {
  SUI.consoleInfo(this.name + '.' + message, object);
};
