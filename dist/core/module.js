import { noop, each, isString, eq, isFunction, isObject, merge, } from '../utils/operation';
import { consoleError, consoleWarn } from '../utils/log';
import { Async } from './async';
import { Deferred } from './deferred';
import { State } from './state';
/**
 * @param {!Object} baseModule
 * @param {!Array} baseModuleArgs
 * @param {!Object=} opt_extendModule
 * @param {!Array=} opt_extendModuleArgs
 * @return {!Object}
 */
const invoke = (baseModule, baseModuleArgs, opt_extendModule, opt_extendModuleArgs) => {
    /**
     * @constructor
     * @this {Cls}
     * @return {!Object}
     */
    const Cls = function () {
        if (opt_extendModule) {
            opt_extendModule.apply(this, opt_extendModuleArgs || baseModuleArgs);
        }
        // TODO: remove return value
        baseModule.apply(this, baseModuleArgs);
    };
    if (opt_extendModule) {
        Cls.prototype = merge(opt_extendModule.prototype, baseModule.prototype);
        Cls.prototype.constructor = Cls;
    }
    else {
        Cls.prototype = baseModule.prototype;
    }
    return new Cls();
};
/**
 * @class
 */
export class Module {
    /**
     */
    constructor() {
        this._modules = {};
        this._instances = {};
        this._injections = {};
        this._dependencies = [];
        this._services = [];
        this._controller = {
            enter: noop(),
            exit: noop(),
        };
    }
    /**
     * @param {!Object} instances
     * @param {!Object} injections
     * @return {undefined}
     */
    load(instances, injections) {
        this._instances = instances;
        this._injections = injections;
        this._instances[this._injections.instances] = this._instances;
    }
    /**
     * @return {!Object}
     */
    getController() {
        return this._controller;
    }
    /**
     * @param {string} name
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @return {undefined}
     */
    add(name, moduleInjections, moduleCallback) {
        this._modules[name] = this._getDependencies(moduleInjections, moduleCallback);
    }
    /**
     * @private
     * @param {!Array} moduleInjections
     * @param {!Function} moduleCallback
     * @param {string=} opt_extendModule
     * @return {!Object}
     */
    _getDependencies(moduleInjections, moduleCallback, opt_extendModule) {
        if (opt_extendModule) {
            moduleInjections.push(opt_extendModule);
        }
        return {
            moduleInjections: moduleInjections,
            moduleCallback: moduleCallback,
            extendModule: opt_extendModule,
        };
    }
    /**
     * @private
     * @param {!Object} dependency
     * @return {!Object}
     */
    _resolveDependencies(dependency) {
        const moduleArgs = [];
        each(dependency.moduleInjections, (injection) => {
            moduleArgs.push(this._instances[injection] || injection);
        });
        let extendCallback;
        let extendArgs;
        if (dependency.extendModule && this._modules[dependency.extendModule]) {
            extendCallback =
                this._modules[dependency.extendModule].moduleCallback;
            extendArgs = [];
            each(this._modules[dependency.extendModule].moduleInjections, (injection) => {
                extendArgs.push(this._instances[injection] || injection);
            });
        }
        return invoke(dependency.moduleCallback, moduleArgs, extendCallback, extendArgs);
    }
    /**
     * @private
     * @return {undefined}
     */
    _orderServices() {
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
    }
    /**
     * @private
     * @param {string} value
     * @return {boolean}
     */
    _isModule(value) {
        if (isString(value)) {
            const lastCharacters = value.substr(value.length - 7);
            return (eq(lastCharacters, 'Service') || eq(lastCharacters, 'Factory'));
        }
        return false;
    }
    /**
     * @private
     * @param {string} service
     * @param {string} injection
     * @return {undefined}
     */
    _changeServices(service, injection) {
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
    }
    /**
     * @return {undefined}
     */
    handleServices() {
        this._orderServices();
        const calls = [];
        each(this._services, (serviceName) => {
            const moduleCall = () => {
                this._instances[serviceName] = this._resolveDependencies(this._modules[serviceName]);
                let enter = noop();
                if (isFunction(this._instances[serviceName].enter)) {
                    enter = this._instances[serviceName].enter.bind(this._instances[serviceName]);
                }
                return enter();
            };
            calls.push(moduleCall);
        });
        this.eventAfterInit();
        const async = new Async();
        async.serial(calls).then(() => {
            this.eventServiceLoaded();
            this._instances[this._injections.state].run();
        }, () => {
            this.eventServiceFailed();
        });
    }
    /**
     * @param {!Array} routes
     * @param {!Object} options
     * @return {undefined}
     */
    handleRoutes(routes, options) {
        this._instances[this._injections.state] = new State(routes, options);
        this._instances[this._injections.state].eventChange = (currentState, previousState, force) => {
            let exit = noop();
            if (!previousState.isEmpty() &&
                isObject(this._controller) &&
                isFunction(this._controller.exit)) {
                exit = this._controller.exit.bind(this._controller);
            }
            const async = new Async();
            async.serial([exit]).then(() => {
                this._handleStateChange(currentState, force);
            });
        };
    }
    /**
     * @param {!Objekt} currentState
     * @param {boolean=} opt_force
     * @return {undefined}
     */
    _handleStateChange(currentState, opt_force = false) {
        this.eventStateChange(currentState).then(() => {
            const template = currentState.get('template');
            if (template) {
                const templateUrl = currentState.get('templateUrl');
                this._instances[this._injections.template]
                    .load(templateUrl, opt_force)
                    .then((dom) => {
                    this.eventModuleLoaded(currentState);
                    this._initController(currentState, dom);
                }, () => {
                    this.eventModuleFailed(currentState);
                });
            }
            else {
                this.eventModuleLoaded(currentState);
                this._initController(currentState, this._instances[this._injections.template].getViewNode());
            }
        }, () => {
            this.eventModuleFailed(currentState);
        });
    }
    /**
     * @private
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {undefined}
     */
    _initController(state, dom) {
        this._instances[this._injections.dom] = dom;
        const controller = this._modules[state.get('controller')];
        if (controller) {
            this.eventDomChange(state, dom).then(() => {
                this._controller = this._resolveDependencies(controller);
                if (isObject(this._controller) &&
                    isFunction(this._controller.enter)) {
                    const async = new Async();
                    async
                        .serial([this._controller.enter.bind(this._controller)])
                        .then(() => {
                        this.eventControllerLoaded(dom);
                    });
                }
                else {
                    this.eventControllerLoaded(dom);
                }
            });
        }
        else {
            this.eventControllerFailed();
        }
    }
    /**
     * @param {!Item} dom
     * @return {undefined}
     */
    eventControllerLoaded(dom) {
        consoleWarn('Module.eventControllerLoaded()', dom);
    }
    /**
     * @return {undefined}
     */
    eventControllerFailed() {
        consoleWarn('Module.eventControllerFailed()');
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleFailed(state) {
        consoleWarn('Module.eventModuleFailed()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {undefined}
     */
    eventModuleLoaded(state) {
        consoleWarn('Module.eventModuleLoaded()', state);
    }
    /**
     * @param {!Objekt} state
     * @return {!Promize}
     */
    eventStateChange(state) {
        const deferred = new Deferred();
        consoleWarn('Module.eventStateChange()', state);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @param {!Objekt} state
     * @param {!Item} dom
     * @return {!Promize}
     */
    eventDomChange(state, dom) {
        const deferred = new Deferred();
        consoleWarn('Module.eventDomChange()', state, dom);
        deferred.resolve();
        return deferred.promise();
    }
    /**
     * @return {undefined}
     */
    eventAfterInit() {
        consoleWarn('Module.eventAfterInit()');
    }
    /**
     * @return {undefined}
     */
    eventServiceLoaded() {
        consoleWarn('Module.eventServiceLoaded()');
    }
    /**
     * @return {undefined}
     */
    eventServiceFailed() {
        consoleWarn('Module.eventServiceFailed()');
    }
}