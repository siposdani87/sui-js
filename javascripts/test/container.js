goog.provide('SUI.test.Container');

goog.require('SUI.test');
goog.require('SUI.Collection');
goog.require('SUI.Object');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.test.Container}
 * @extends {SUI.BaseTest}
 */
SUI.test.Container = function() {
  SUI.test.Container.base(this, 'constructor', 'Container');
};
goog.inherits(SUI.test.Container, SUI.BaseTest);

/**
 * @override
 */
SUI.test.Container.prototype.init = function() {
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

SUI.test.Container.prototype.testInit = function() {

};

SUI.test.Container.prototype.testLoad = function() {

};
