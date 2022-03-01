goog.provide('SUI.TestDeferred');

goog.require('SUI.test');
goog.require('SUI.Deferred');
goog.require('SUI.Promise');
goog.require('SUI.BaseTest');

/**
 * @constructor
 * @this {SUI.TestDeferred}
 * @extends {SUI.BaseTest}
 */
SUI.TestDeferred = function() {
  SUI.TestDeferred.base(this, 'constructor', 'Deferred');
};
goog.inherits(SUI.TestDeferred, SUI.BaseTest);

/**
 * @override
 */
SUI.TestDeferred.prototype.init = function() {
  this.ajaxResolve = function() {
    const deferred = new SUI.Deferred();
    window.setTimeout(function() {
      deferred.resolve(1);
    }, 100);
    return deferred.promise();
  };

  this.funcResolve = function() {
    const deferred = new SUI.Deferred();
    deferred.resolve(2);
    return deferred.promise();
  };

  this.ajaxReject = function() {
    const deferred = new SUI.Deferred();
    window.setTimeout(function() {
      deferred.reject(1);
    }, 100);
    return deferred.promise();
  };

  this.funcReject = function() {
    const deferred = new SUI.Deferred();
    deferred.reject(2);
    return deferred.promise();
  };

  this.testPromise();
  this.testResolve();
  this.testReject();
};

SUI.TestDeferred.prototype.testPromise = function() {
  const deferred = new SUI.Deferred();
  const promise = deferred.promise();
  if (!(promise instanceof SUI.Promise)) {
    this.showError('promise', 1);
  }
};


SUI.TestDeferred.prototype.testResolve = function() {
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

SUI.TestDeferred.prototype.testReject = function() {
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
