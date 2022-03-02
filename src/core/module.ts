import { noop, each, invoke, isString, eq, consoleError, isFunction, isObject, consoleWarn } from "../base";
import { Async } from "./async";
import { Deferred } from "./deferred";
import { State } from "./state";

/**
 * @constructor
 * @this {Module}
 */
export const Module = function() {
  this._modules = {};
  this._instances = {};
  this._injections = {};
  this._dependencies = [];
  this._services = [];
  this._controller = {
    enter: noop(),
    exit: noop(),
  };
};

/**
 * @param {!Object} instances
 * @param {!Object} injections
 * @return {undefined}
 */
Module.prototype.load = function(instances, injections) {
  this._instances = instances;
  this._injections = injections;

  this._instances[this._injections.instances] = this._instances;
};

/**
 * @return {!Object}
 */
Module.prototype.getController = function() {
  return this._controller;
};

/**
 * @param {string} name
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @return {undefined}
 */
Module.prototype.add = function(name, moduleInjections, moduleCallback) {
  this._modules[name] = this._getDependencies(moduleInjections, moduleCallback);
};

/**
 * @private
 * @param {!Array} moduleInjections
 * @param {!Function} moduleCallback
 * @param {string=} opt_extendModule
 * @return {!Object}
 */
Module.prototype._getDependencies = function(moduleInjections, moduleCallback, opt_extendModule) {
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
Module.prototype._resolveDependencies = function(dependency) {
  const moduleArgs = [];
  each(dependency.moduleInjections, (injection) => {
    moduleArgs.push(this._instances[injection] || injection);
  });

  let extendCallback;
  let extendArgs;
  if (dependency.extendModule && this._modules[dependency.extendModule]) {
    extendCallback = this._modules[dependency.extendModule].moduleCallback;
    extendArgs = [];
    each(this._modules[dependency.extendModule].moduleInjections, (injection) => {
      extendArgs.push(this._instances[injection] || injection);
    });
  }

  return invoke(dependency.moduleCallback, moduleArgs, extendCallback, extendArgs);
};

/**
 * @private
 * @return {undefined}
 */
Module.prototype._orderServices = function() {
  for (const key in this._modules) {
    if (this._modules.hasOwnProperty(key) && this._isModule(key)) {
      if (this._services.indexOf(key) === -1) {
        this._services.push(key);
      }
      const injections = this._modules[key].moduleInjections;
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
Module.prototype._isModule = function(value) {
  if (isString(value)) {
    const lastCharacters = value.substr(value.length - 7);
    return eq(lastCharacters, 'Service') || eq(lastCharacters, 'Factory');
  }
  return false;
};

/**
 * @private
 * @param {string} service
 * @param {string} injection
 * @return {undefined}
 */
Module.prototype._changeServices = function(service, injection) {
  if (this._dependencies.indexOf([injection, service].join('-')) !== -1) {
    consoleError('Modules._changeServices()', 'Dependency injection circular loop', injection, '<=>', service);
  }
  this._dependencies.push([service, injection].join('-'));
  const servicePosition = this._services.indexOf(service);
  const injectionPosition = this._services.indexOf(injection);
  if (injectionPosition > servicePosition) {
    const tmpService = this._services[servicePosition];
    this._services.splice(servicePosition, 1);
    this._services.push(tmpService);
  }
};

/**
 * @return {undefined}
 */
Module.prototype.handleServices = function() {
  this._orderServices();
  const calls = [];
  each(this._services, function(serviceName) {
    const moduleCall = function() {
      this._instances[serviceName] = this._resolveDependencies(this._modules[serviceName]);

      let enter = noop();
      if (isFunction(this._instances[serviceName].enter)) {
        enter = this._instances[serviceName].enter.bind(this._instances[serviceName]);
      }
      return enter();
    }.bind(this);
    calls.push(moduleCall);
  }.bind(this));

  this.eventAfterInit();
  const async = new Async();
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
Module.prototype.handleRoutes = function(routes, options) {
  this._instances[this._injections.state] = new State(routes, options);
  this._instances[this._injections.state].eventChange = function(currentState, previousState, force) {
    let exit = noop();
    if (!previousState.isEmpty() && isObject(this._controller) && isFunction(this._controller.exit)) {
      exit = this._controller.exit.bind(this._controller);
    }

    const async = new Async();
    async.serial([exit]).then(function() {
      this._handleStateChange(currentState, force);
    }.bind(this));
  }.bind(this);
};

/**
 * @param {!Objekt} currentState
 * @param {boolean=} opt_force
 * @return {undefined}
 */
Module.prototype._handleStateChange = function(currentState, opt_force = false) {
  this.eventStateChange(currentState).then(() => {
    const template = currentState.get('template');
    if (template) {
      const templateUrl = currentState.get('templateUrl');
      this._instances[this._injections.template].load(templateUrl, opt_force).then((dom) => {
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
 * @param {!Objekt} state
 * @param {!Item} dom
 * @return {undefined}
 */
Module.prototype._initController = function(state, dom) {
  this._instances[this._injections.dom] = dom;
  const controller = this._modules[state.get('controller')];
  if (controller) {
    this.eventDomChange(state, dom).then(() => {
      this._controller = this._resolveDependencies(controller);
      if (isObject(this._controller) && isFunction(this._controller.enter)) {
        const async = new Async();
        async.serial([this._controller.enter.bind(this._controller)]).then(() => {
          this.eventControllerLoaded(dom);
        });
      } else {
        this.eventControllerLoaded(dom);
      }
    });
  } else {
    this.eventControllerFailed();
  }
};

/**
 * @param {!Item} dom
 * @return {undefined}
 */
Module.prototype.eventControllerLoaded = function(dom) {
  consoleWarn('Module.eventControllerLoaded()', dom);
};

/**
 * @return {undefined}
 */
Module.prototype.eventControllerFailed = function() {
  consoleWarn('Module.eventControllerFailed()');
};

/**
 * @param {!Objekt} state
 * @return {undefined}
 */
Module.prototype.eventModuleFailed = function(state) {
  consoleWarn('Module.eventModuleFailed()', state);
};

/**
 * @param {!Objekt} state
 * @return {undefined}
 */
Module.prototype.eventModuleLoaded = function(state) {
  consoleWarn('Module.eventModuleLoaded()', state);
};

/**
 * @param {!Objekt} state
 * @return {!Promize}
 */
Module.prototype.eventStateChange = function(state) {
  const deferred = new Deferred();
  consoleWarn('Module.eventStateChange()', state);
  deferred.resolve();
  return deferred.promise();
};

/**
 * @param {!Objekt} state
 * @param {!Item} dom
 * @return {!Promize}
 */
Module.prototype.eventDomChange = function(state, dom) {
  const deferred = new Deferred();
  consoleWarn('Module.eventDomChange()', state, dom);
  deferred.resolve();
  return deferred.promise();
};

/**
 * @return {undefined}
 */
Module.prototype.eventAfterInit = function() {
  consoleWarn('Module.eventAfterInit()');
};

/**
 * @return {undefined}
 */
Module.prototype.eventServiceLoaded = function() {
  consoleWarn('Module.eventServiceLoaded()');
};

/**
 * @return {undefined}
 */
Module.prototype.eventServiceFailed = function() {
  consoleWarn('Module.eventServiceFailed()');
};
