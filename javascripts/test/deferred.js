goog.provide('SUI.test.Deferred');

goog.require('SUI.Deferred');
goog.require('SUI.Promise');
goog.require('SUI.Test');

/**
 * @constructor
 * @this {SUI.test.Deferred}
 * @extends {SUI.Test}
 */
SUI.test.Deferred = function() {
  
  SUI.Test.call(this, 'Deferred');
};
goog.inherits(SUI.test.Deferred, SUI.Test);

/**
 * @override
 */
SUI.test.Deferred.prototype.init = function() {
  
  this.ajaxResolve = function() {
    var deferred = new SUI.Deferred();
    window.setTimeout(function() {
      deferred.resolve(1);
    }, 100);
    return deferred.promise();
  };

  this.funcResolve = function() {
    var deferred = new SUI.Deferred();
    deferred.resolve(2);
    return deferred.promise();
  };

  this.ajaxReject = function() {
    var deferred = new SUI.Deferred();
    window.setTimeout(function() {
      deferred.reject(1);
    }, 100);
    return deferred.promise();
  };

  this.funcReject = function() {
    var deferred = new SUI.Deferred();
    deferred.reject(2);
    return deferred.promise();
  };

  this.testPromise();
  this.testResolve();
  this.testReject();

};

SUI.test.Deferred.prototype.testPromise = function() {
  
  var deferred = new SUI.Deferred();
  var promise = deferred.promise();
  if (!(promise instanceof SUI.Promise)) {
    this.showError('promise', 1);
  }
};


SUI.test.Deferred.prototype.testResolve = function() {
  
  this.ajaxResolve().then(function(value) {
    if (value !== 1) {
      this.showError('resolve', 1);
    }
  }, function() {
    this.showError('resolve', 2);
  });

  this.funcResolve().then(function(value) {
    if (value !== 2) {
      this.showError('resolve', 3);
    }
  }, function() {
    this.showError('resolve', 4);
  });
};

SUI.test.Deferred.prototype.testReject = function() {
  

  this.ajaxReject().then(function() {
    this.showError('reject', 1);
  }, function(value) {
    if (value !== 1) {
      this.showError('reject', 2);
    }
  });

  this.funcReject().then(function() {
    this.showError('reject', 3);
  }, function(value) {
    if (value !== 2) {
      this.showError('reject', 4);
    }
  });

};
