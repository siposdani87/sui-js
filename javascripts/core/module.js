goog.provide('SUI.Module');

goog.require('SUI');

/**
 * @constructor
 * @this {SUI.Module}
 */
SUI.Module = function() {
  this._modules = {};
  this._instances = {};
  this._injections = {};
  this._dependencies = [];
  this._services = [];
  this._controller = {
    enter: SUI.noop(),
    exit: SUI.noop(),
  };
};

/**
 * @param {!Object} instances
 * @param {!Object} injections
 * @return {undefined}
 */
SUI.Module.prototype.load = function(instances, injections) {
  this._instances = instances;
  this._injections = injections;

  this._instances[this._injections.instances] = this._instances;
};

/**
 * @return {!Object}
 */
SUI.Module.prototype.getController = function() {
  return this._controller;
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 * @return {undefined}
 */
SUI.Module.prototype.add = function(name, moduleInjections, moduleCallback, opt_extendModule) {
  this._modules[name] = this._getDependencies(moduleInjections, moduleCallback, opt_extendModule);
};

/**
 * @private
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 * @return {!Object}
 */
SUI.Module.prototype._getDependencies = function(moduleInjections, moduleCallback, opt_extendModule) {
  if (opt_extendModule) {
    moduleInjections.push(opt_extendModule);
  }
  return {
    moduleInjections: moduleInjections,
    moduleCallback: moduleCallback,
    extendModule: opt_extendModule,
  };
};

/**
 * @private
 * @param {!Object} dependency
 * @return {!Object}
 */
SUI.Module.prototype._resolveDependencies = function(dependency) {
  let moduleArgs = [];
  SUI.each(dependency.moduleInjections, (injection) => {
    moduleArgs.push(this._instances[injection]);
  });

  let extendCallback;
  let extendArgs;
  if (this._modules[dependency.extendModule]) {
    extendCallback = this._modules[dependency.extendModule].moduleCallback;
    extendArgs = [];
    SUI.each(this._modules[dependency.extendModule].moduleInjections, (injection) => {
      extendArgs.push(this._instances[injection]);
    });
  }

  return SUI.invoke(dependency.moduleCallback, moduleArgs, extendCallback, extendArgs);
};

/**
 * @private
 * @return {undefined}
 */
SUI.Module.prototype._orderServices = function() {
  for (let key in this._modules) {
    if (this._modules.hasOwnProperty(key) && this._isModule(key)) {
      if (this._services.indexOf(key) === -1) {
        this._services.push(key);
      }
      let injections = this._modules[key].moduleInjections;
      for (let j = 0; j < injections.length; j++) {
        if (this._isModule(injections[j])) {
          if (this._services.indexOf(injections[j]) === -1) {
            this._services.push(injections[j]);
          }
          this._changeServices(key, injections[j]);
        }
      }
    }
  }
};

/**
 * @private
 * @param {string} value
 * @return {boolean}
 */
SUI.Module.prototype._isModule = function(value) {
  let lastCharacters = value.substr(value.length - 7);
  return SUI.eq(lastCharacters, 'Service') || SUI.eq(lastCharacters, 'Factory');
};

/**
 * @private
 * @param {string} service
 * @param {string} injection
 * @return {undefined}
 */
SUI.Module.prototype._changeServices = function(service, injection) {
  if (this._dependencies.indexOf([injection, service].join('-')) !== -1) {
    console.error('SUI.Modules._changeServices()', 'Dependency injection circular loop', injection, '<=>', service);
  }
  this._dependencies.push([service, injection].join('-'));
  let servicePosition = this._services.indexOf(service);
  let injectionPosition = this._services.indexOf(injection);
  if (injectionPosition > servicePosition) {
    let tmpService = this._services[servicePosition];
    this._services.splice(servicePosition, 1);
    this._services.push(tmpService);
  }
};

/**
 * @return {undefined}
 */
SUI.Module.prototype.handleServices = function() {
  this._orderServices();
  let calls = [];
  SUI.each(this._services, function(serviceName) {
    let moduleCall = function() {
      this._instances[serviceName] = this._resolveDependencies(this._modules[serviceName]);

      let enter = SUI.noop();
      if (SUI.isFunction(this._instances[serviceName].enter)) {
        enter = this._instances[serviceName].enter.bind(this._instances[serviceName]);
      }
      return enter();
    }.bind(this);
    calls.push(moduleCall);
  }.bind(this));

  this.eventAfterInit();
  let async = new SUI.Async();
  async.serial(calls).then(function() {
    this.eventServiceLoaded();
    this._instances[this._injections.state].run();
  }.bind(this), function() {
    this.eventServiceFailed();
  }.bind(this));
};

/**
 * @param {!Array} routes
 * @param {!Object} options
 * @return {undefined}
 */
SUI.Module.prototype.handleRoutes = function(routes, options) {
  this._instances[this._injections.state] = new SUI.State(routes, options);
  this._instances[this._injections.state].eventChange = function(currentState, previousState) {
    let exit = SUI.noop();
    if (!previousState.isEmpty() && SUI.isObject(this._controller) && SUI.isFunction(this._controller.exit)) {
      exit = this._controller.exit.bind(this._controller);
    }

    let async = new SUI.Async();
    async.serial([exit]).then(function() {
      this._handleStateChange(currentState);
    }.bind(this));
  }.bind(this);
};

/**
 * @param {!SUI.Object} currentState
 * @return {undefined}
 */
SUI.Module.prototype._handleStateChange = function(currentState) {
  this.eventStateChange(currentState).then(() => {
    if (SUI.isString(currentState.get('template'))) {
      let templateUrl = currentState.get('templateUrl');
      this._instances[this._injections.template].load(templateUrl).then((dom) => {
        this.eventModuleLoaded(currentState);
        this._initController(currentState, dom);
      }, () => {
        this.eventModuleFailed(currentState);
      });
    } else {
      this.eventModuleLoaded(currentState);
      this._initController(currentState, this._instances[this._injections.template].getViewNode());
    }
  }, () => {
    this.eventModuleFailed(currentState);
  });
};

/**
 * @private
 * @param {!SUI.Object} state
 * @param {!SUI.Node} dom
 * @return {undefined}
 */
SUI.Module.prototype._initController = function(state, dom) {
  this._instances[this._injections.dom] = dom;
  let controller = this._modules[state.get('controller')];
  this.eventDomChange(state, dom).then(() => {
    this._controller = this._resolveDependencies(controller);
    if (SUI.isObject(this._controller) && SUI.isFunction(this._controller.enter)) {
      let async = new SUI.Async();
      async.serial([this._controller.enter.bind(this._controller)]).then(() => {
        this.eventControllerLoaded(dom);
      });
    } else {
      this.eventControllerLoaded(dom);
    }
  });
};

/**
 * @param {!SUI.Node} dom
 * @return {undefined}
 */
SUI.Module.prototype.eventControllerLoaded = function(dom) {
  console.warn('SUI.Module.eventControllerLoaded()', dom);
};

/**
 * @param {!SUI.Object} state
 * @return {undefined}
 */
SUI.Module.prototype.eventModuleFailed = function(state) {
  console.warn('SUI.Module.eventModuleFailed()', state);
};

/**
 * @param {!SUI.Object} state
 * @return {undefined}
 */
SUI.Module.prototype.eventModuleLoaded = function(state) {
  console.warn('SUI.Module.eventModuleLoaded()', state);
};

/**
 * @param {!SUI.Object} state
 * @return {!SUI.Promise}
 */
SUI.Module.prototype.eventStateChange = function(state) {
  let deferred = new SUI.Deferred();
  console.warn('SUI.Module.eventStateChange()', state);
  deferred.resolve();
  return deferred.promise();
};

/**
 * @param {!SUI.Object} state
 * @param {!SUI.Node} dom
 * @return {!SUI.Promise}
 */
SUI.Module.prototype.eventDomChange = function(state, dom) {
  let deferred = new SUI.Deferred();
  console.warn('SUI.Module.eventDomChange()', state, dom);
  deferred.resolve();
  return deferred.promise();
};

/**
 * @return {undefined}
 */
SUI.Module.prototype.eventAfterInit = function() {
  console.warn('SUI.Module.eventAfterInit()');
};

/**
 * @return {undefined}
 */
SUI.Module.prototype.eventServiceLoaded = function() {
  console.warn('SUI.Module.eventServiceLoaded()');
};

/**
 * @return {undefined}
 */
SUI.Module.prototype.eventServiceFailed = function() {
  console.warn('SUI.Module.eventServiceFailed()');
};
