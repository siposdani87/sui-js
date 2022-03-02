import { consoleInfo, consoleError } from "../base";
import { TestContainer } from "../test/container";
import { TestDeferred } from "../test/deferred";
import { TestNode } from "../test/node";
import { TestObjekt } from "../test/objekt";

/**
 * @constructor
 * @this {Test}
 */
export const Test = function() {

};

/**
 * @return {undefined}
 */
Test.prototype.run = function() {
  const tests = [
    new TestContainer(),
    new TestDeferred(),
    new TestNode(),
    new TestObjekt(),
  ];
  for (const test of tests) {
    test.init();
    consoleInfo(`Test${test.name}.init()`);
  }
};

/**
 * @param {string} message
 * @param {!Object|string|number|boolean} object
 * @return {undefined}
 */
Test.prototype.showError = function(message, object) {
  consoleError(this.name + '.' + message, object);
};

/**
 * @param {string} message
 * @param {!Object} object
 * @return {undefined}
 */
Test.prototype.showLog = function(message, object) {
  consoleInfo(this.name + '.' + message, object);
};
