import { BaseTest } from "../component/baseTest";
import { Collection } from "../core/collection";

/**
 * @constructor
 * @this {TestContainer}
 * @extends {BaseTest}
 */
export const TestContainer = function() {
  BaseTest.call(this, 'Container');
};
TestContainer.prototype = Object.create(BaseTest.prototype);
TestContainer.prototype.constructor = TestContainer;

/**
 * @override
 */
TestContainer.prototype.init = function() {
  this.container = /** @type {!Collection<!Objekt>} */ (new Collection([
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

TestContainer.prototype.testInit = function() {

};

TestContainer.prototype.testLoad = function() {

};
