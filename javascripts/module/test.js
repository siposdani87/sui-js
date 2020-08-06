goog.provide('SUI.Test');

goog.require('SUI');
goog.require('SUI.test.Container');
goog.require('SUI.test.Deferred');
goog.require('SUI.test.Item');
goog.require('SUI.test.Node');
goog.require('SUI.test.Object');

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
    new SUI.test.Container(),
    new SUI.test.Deferred(),
    new SUI.test.Item(),
    new SUI.test.Node(),
    new SUI.test.Object(),
  ];
  for (const test of tests) {
    test.init();
    console.info(`SUI.test.${test.name}.init()`);
  }
};

/**
 * @param {string} message
 * @param {!Object|string|number|boolean} object
 * @return {undefined}
 */
SUI.Test.prototype.showError = function(message, object) {
  console.error(this.name + '.' + message, object);
};

/**
 * @param {string} message
 * @param {!Object} object
 * @return {undefined}
 */
SUI.Test.prototype.showLog = function(message, object) {
  console.info(this.name + '.' + message, object);
};
