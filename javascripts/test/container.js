goog.provide('SUI.TestContainer');

goog.require('SUI.test');
goog.require('SUI.Collection');
goog.require('SUI.Object');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.TestContainer}
 * @extends {SUI.BaseTest}
 */
SUI.TestContainer = function() {
  SUI.TestContainer.base(this, 'constructor', 'Container');
};
goog.inherits(SUI.TestContainer, SUI.BaseTest);

/**
 * @override
 */
SUI.TestContainer.prototype.init = function() {
  this.container = /** @type {!SUI.Collection<!SUI.Object>} */ (new SUI.Collection([
    {
      id: 1,
      text: 'text',
    },
    {
      id: 2,
      text: 'text2',
    },
  ]));

  this.testInit();
  this.testLoad();
};

SUI.TestContainer.prototype.testInit = function() {

};

SUI.TestContainer.prototype.testLoad = function() {

};
