import { BaseTest } from "../component/baseTest";
import { Deferred } from "../core/deferred";
import { Promize } from "../core/promize";

/**
 * @constructor
 * @this {TestDeferred}
 * @extends {BaseTest}
 */
export const TestDeferred = function() {
  BaseTest.call(this, 'Deferred');
};
TestDeferred.prototype = Object.create(BaseTest.prototype);
TestDeferred.prototype.constructor = TestDeferred;

/**
 * @override
 */
TestDeferred.prototype.init = function() {
  this.ajaxResolve = function() {
    const deferred = new Deferred();
    window.setTimeout(function() {
      deferred.resolve(1);
    }, 100);
    return deferred.promise();
  };

  this.funcResolve = function() {
    const deferred = new Deferred();
    deferred.resolve(2);
    return deferred.promise();
  };

  this.ajaxReject = function() {
    const deferred = new Deferred();
    window.setTimeout(function() {
      deferred.reject(1);
    }, 100);
    return deferred.promise();
  };

  this.funcReject = function() {
    const deferred = new Deferred();
    deferred.reject(2);
    return deferred.promise();
  };

  this.testPromise();
  this.testResolve();
  this.testReject();
};

TestDeferred.prototype.testPromise = function() {
  const deferred = new Deferred();
  const promise = deferred.promise();
  if (!(promise instanceof Promize)) {
    this.showError('promise', 1);
  }
};


TestDeferred.prototype.testResolve = function() {
  this.ajaxResolve().then((value) => {
    if (value !== 1) {
      this.showError('resolve', 1);
    }
  }, () => {
    this.showError('resolve', 2);
  });

  this.funcResolve().then((value) => {
    if (value !== 2) {
      this.showError('resolve', 3);
    }
  }, () => {
    this.showError('resolve', 4);
  });
};

TestDeferred.prototype.testReject = function() {
  this.ajaxReject().then(() => {
    this.showError('reject', 1);
  }, (value) => {
    if (value !== 1) {
      this.showError('reject', 2);
    }
  });

  this.funcReject().then(() => {
    this.showError('reject', 3);
  }, (value) => {
    if (value !== 2) {
      this.showError('reject', 4);
    }
  });
};
