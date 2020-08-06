goog.provide('SUI.BaseTest');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.BaseTest}
 * @param {string=} opt_name
 */
SUI.BaseTest = function(opt_name) {
  this.name = opt_name;
};

/**
 * @return {undefined}
 */
SUI.BaseTest.prototype.init = function() {

};

/**
 * @param {string} message
 * @param {!Object|string|number|boolean} object
 * @return {undefined}
 */
SUI.BaseTest.prototype.showError = function(message, object) {
  console.error(this.name + '.' + message, object);
};

/**
 * @param {string} message
 * @param {!Object} object
 * @return {undefined}
 */
SUI.BaseTest.prototype.showLog = function(message, object) {
  console.info(this.name + '.' + message, object);
};
