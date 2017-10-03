goog.provide('SUI.Test');

goog.require('SUI');


/**
 * @constructor
 * @this {SUI.Test}
 * @param {string=} opt_name
 */
SUI.Test = function(opt_name) {
  this.name = opt_name;
};

/**
 * @returns {undefined}
 */
SUI.Test.prototype.init = function() {

};

/**
 * @returns {undefined}
 */
SUI.Test.prototype.run = function() {
  for (var key in SUI.test) {
    if (SUI.test.hasOwnProperty(key)) {
      var test = new SUI.test[key]();
      test.init();
    }
  }
};

/**
 * @param {string} message
 * @param {!Object|string|number|boolean} object
 * @returns {undefined}
 */
SUI.Test.prototype.showError = function(message, object) {
  console.error(this.name + '.' + message, object);
  //throw '';
};

/**
 * @param {string} message
 * @param {!Object} object
 * @returns {undefined}
 */
SUI.Test.prototype.showLog = function(message, object) {
  console.info(this.name + '.' + message, object);
};
