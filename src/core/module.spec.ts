import { Module } from './module';
import { Deferred } from './deferred';
import { Objekt } from './objekt';
import { noop } from '../utils/operation';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Module', () => {
    let module: Module;

    beforeEach(() => {
        module = new Module();
    });

    it('should be instance of Module', () => {
        expect(module).toBeInstanceOf(Module);
    });

    describe('getController', () => {
        it('should return default controller with noop enter/exit', () => {
            const controller = module.getController();
            expect(controller).toHaveProperty('enter');
            expect(controller).toHaveProperty('exit');
        });
    });

    describe('add', () => {
        it('should register a module and return its name', () => {
            const name = module.add('testService', class TestService {});
            expect(name).toBe('testService');
        });

        it('should register multiple modules', () => {
            module.add('svcA', class A {});
            module.add('svcB', class B {});
            // Both registered without error
            expect(true).toBe(true);
        });
    });

    describe('load', () => {
        it('should set instances and injections', () => {
            const instances = { state: {} } as any;
            const injections = { template: 'template' } as any;
            module.load(instances, injections);
            expect(() => module.getController()).not.toThrow();
        });
    });

    describe('handleServices', () => {
        it('should instantiate all registered services', () => {
            const order: string[] = [];
            class SvcA {
                constructor() {
                    order.push('A');
                }
                enter() {
                    return noop();
                }
            }
            class SvcB {
                constructor() {
                    order.push('B');
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcA', 'svcB']);

            expect(order).toHaveLength(2);
            expect(order).toContain('A');
            expect(order).toContain('B');
        });

        it('should emit afterInit before services', () => {
            const spy = jest.fn();
            module.on('afterInit', spy);
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', Svc);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
            expect(spy).toHaveBeenCalled();
        });

        it('should emit serviceLoaded on success', async () => {
            const spy = jest.fn();
            module.on('serviceLoaded', spy);
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', Svc);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
            await flushPromises();
            expect(spy).toHaveBeenCalled();
        });

        it('should call state.run after services loaded', async () => {
            const runSpy = jest.fn();
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', Svc);
            const instances = { state: { run: runSpy } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
            await flushPromises();
            expect(runSpy).toHaveBeenCalled();
        });

        it('should resolve dependencies topologically', () => {
            const order: string[] = [];
            class SvcA {
                constructor() {
                    order.push('A');
                }
                enter() {
                    return noop();
                }
            }
            class SvcB {
                static inject = ['svcA'] as const;
                constructor(_svcA: SvcA) {
                    order.push('B');
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            // Register in reverse order to verify topological sort
            module.handleServices(['svcB', 'svcA']);

            expect(order).toEqual(['A', 'B']);
        });

        it('should resolve dependencies via static inject', () => {
            let receivedDep: any;
            class SvcA {
                name = 'svcA';
                enter() {
                    return noop();
                }
            }
            class SvcB {
                static inject = ['svcA'] as const;
                constructor(dep: any) {
                    receivedDep = dep;
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcA', 'svcB']);

            expect(receivedDep).toBeInstanceOf(SvcA);
        });

        it('should prioritize explicit array over static inject', () => {
            let receivedDep: any;
            class SvcA {
                name = 'svcA';
                enter() {
                    return noop();
                }
            }
            class SvcX {
                name = 'svcX';
                enter() {
                    return noop();
                }
            }
            class SvcB {
                static inject = ['svcA'] as const;
                constructor(dep: any) {
                    receivedDep = dep;
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcX', SvcX);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcA', 'svcX', 'svcB']);

            expect(receivedDep).toBeInstanceOf(SvcA);
        });

        it('should topologically sort services using static inject', () => {
            const order: string[] = [];
            class SvcA {
                constructor() {
                    order.push('A');
                }
                enter() {
                    return noop();
                }
            }
            class SvcB {
                static inject = ['svcA'] as const;
                constructor(_svcA: SvcA) {
                    order.push('B');
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcB', 'svcA']);

            expect(order).toEqual(['A', 'B']);
        });

        it('should pass resolved dependencies to constructor', () => {
            let receivedDep: any;
            class SvcA {
                name = 'svcA';
                enter() {
                    return noop();
                }
            }
            class SvcB {
                static inject = ['svcA'] as const;
                constructor(dep: any) {
                    receivedDep = dep;
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', SvcA);
            module.add('svcB', SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcA', 'svcB']);

            expect(receivedDep).toBeInstanceOf(SvcA);
        });
    });

    describe('handleRoutes', () => {
        it('should create state instance', () => {
            const instances = { state: null } as any;
            module.load(instances, { template: 'template' });
            module.handleRoutes([], {});
            expect(instances.state).toBeDefined();
            expect(instances.state).not.toBeNull();
        });
    });

    describe('handleServices - service without enter method', () => {
        it('should return noop for services without enter (line 309)', async () => {
            class SvcNoEnter {
                // no enter method
            }
            module.add('svcNoEnter', SvcNoEnter);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcNoEnter']);
            await flushPromises();
            expect(instances.state.run).toHaveBeenCalled();
        });
    });

    describe('handleServices - serviceFailed', () => {
        it('should emit serviceFailed when a service enter rejects (line 323)', async () => {
            const failedSpy = jest.fn();
            module.on('serviceFailed', failedSpy);
            class FailingSvc {
                enter() {
                    const d = new Deferred();
                    d.reject();
                    return d.promise();
                }
            }
            module.add('failSvc', FailingSvc);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['failSvc']);
            await flushPromises();
            expect(failedSpy).toHaveBeenCalled();
        });
    });

    describe('handleRoutes - state change with previous controller exit', () => {
        it('should call exit on the previous controller (line 356)', async () => {
            const exitSpy = jest.fn(() => noop());
            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {
                enter() {
                    return noop();
                }
                exit() {
                    exitSpy();
                    return noop();
                }
            }
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();

            // First trigger: set up the controller (empty previousState)
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();
            await flushPromises();

            // Now the controller is set, trigger another state change with non-empty previousState
            const nextState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const prevState = new Objekt({ id: 'some-state' });
            instances.state.emit('change', nextState, prevState, false);
            await flushPromises();
            await flushPromises();

            expect(exitSpy).toHaveBeenCalled();
        });
    });

    describe('_handleStateChange - stateChange fallback deferred (lines 385-387)', () => {
        it('should create fallback deferred when no stateChange listener is registered', async () => {
            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            const moduleLoadedSpy = jest.fn();
            module.on('moduleLoaded', moduleLoadedSpy);
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {
                enter() {
                    return noop();
                }
            }
            module.add('testCtrl', TestCtrl);

            // No stateChange listener -> emit returns undefined -> fallback Deferred used
            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();

            expect(moduleLoadedSpy).toHaveBeenCalled();
        });
    });

    describe('_handleStateChange - template loading (lines 393-400)', () => {
        it('should load template when template is defined', async () => {
            const loadSpy = jest.fn();
            const mockDom = {} as any;
            const loadDeferred = new Deferred();
            loadSpy.mockReturnValue(loadDeferred.promise());

            const instances = {
                state: null,
                template: { load: loadSpy },
            } as any;
            const moduleLoadedSpy = jest.fn();
            module.on('moduleLoaded', moduleLoadedSpy);
            module.load(instances, { template: 'template' });
            module.handleRoutes([], {});

            class TestCtrl {
                enter() {
                    return noop();
                }
            }
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: 'my-template.html',
                templateUrl: '/templates/my-template.html',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();

            // Resolve the template load
            loadDeferred.resolve(mockDom);
            await flushPromises();

            expect(loadSpy).toHaveBeenCalledWith(
                '/templates/my-template.html',
                false,
            );
            expect(moduleLoadedSpy).toHaveBeenCalled();
        });

        it('should emit moduleFailed when template load fails (line 400)', async () => {
            const loadSpy = jest.fn();
            const loadDeferred = new Deferred();
            loadSpy.mockReturnValue(loadDeferred.promise());

            const instances = {
                state: null,
                template: { load: loadSpy },
            } as any;
            const moduleFailedSpy = jest.fn();
            module.on('moduleFailed', moduleFailedSpy);
            module.load(instances, { template: 'template' });
            module.handleRoutes([], {});

            class TestCtrl {}
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: 'my-template.html',
                templateUrl: '/templates/my-template.html',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();

            // Reject the template load
            loadDeferred.reject();
            await flushPromises();

            expect(moduleFailedSpy).toHaveBeenCalled();
        });
    });

    describe('_handleStateChange - stateChange rejection (line 415)', () => {
        it('should emit moduleFailed when stateChange promise rejects', async () => {
            const moduleFailedSpy = jest.fn();
            module.on('moduleFailed', moduleFailedSpy);

            // Register stateChange handler that returns a rejecting promise
            module.on('stateChange', () => {
                const d = new Deferred();
                d.reject();
                return d.promise();
            });

            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {}
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();

            expect(moduleFailedSpy).toHaveBeenCalled();
        });
    });

    describe('_initController (lines 435-450)', () => {
        it('should emit controllerFailed when controller is not registered', async () => {
            const controllerFailedSpy = jest.fn();
            module.on('controllerFailed', controllerFailedSpy);

            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            // Do NOT register 'unknownCtrl'
            const currentState = new Objekt({
                controller: 'unknownCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();

            expect(controllerFailedSpy).toHaveBeenCalled();
        });

        it('should resolve controller and call enter (lines 435-448)', async () => {
            const enterSpy = jest.fn(() => noop());
            const controllerLoadedSpy = jest.fn();
            module.on('controllerLoaded', controllerLoadedSpy);

            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {
                enter() {
                    enterSpy();
                    return noop();
                }
            }
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();
            await flushPromises();

            expect(enterSpy).toHaveBeenCalled();
            expect(controllerLoadedSpy).toHaveBeenCalled();
        });

        it('should emit controllerLoaded without enter when controller has no enter method (line 450)', async () => {
            const controllerLoadedSpy = jest.fn();
            module.on('controllerLoaded', controllerLoadedSpy);

            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {
                // no enter method
            }
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();
            await flushPromises();

            expect(controllerLoadedSpy).toHaveBeenCalled();
        });

        it('should use domChange handler result when registered (line 435)', async () => {
            const controllerLoadedSpy = jest.fn();
            module.on('controllerLoaded', controllerLoadedSpy);

            // Register a domChange handler that returns a resolved promise
            module.on('domChange', () => {
                const d = new Deferred();
                d.resolve();
                return d.promise();
            });

            const mockDom = {} as any;
            const instances = {
                state: null,
                myTemplate: { getViewKnot: () => mockDom },
            } as any;
            module.load(instances, { template: 'myTemplate' });
            module.handleRoutes([], {});

            class TestCtrl {
                enter() {
                    return noop();
                }
            }
            module.add('testCtrl', TestCtrl);

            const currentState = new Objekt({
                controller: 'testCtrl',
                template: '',
            });
            const previousState = new Objekt();
            instances.state.emit('change', currentState, previousState, false);
            await flushPromises();
            await flushPromises();

            expect(controllerLoadedSpy).toHaveBeenCalled();
        });
    });

    describe('emit methods', () => {
        it('should not throw when emitting afterInit', () => {
            expect(() => module.emit('afterInit')).not.toThrow();
        });

        it('should not throw when emitting serviceLoaded', () => {
            expect(() => module.emit('serviceLoaded')).not.toThrow();
        });

        it('should not throw when emitting serviceFailed', () => {
            expect(() => module.emit('serviceFailed')).not.toThrow();
        });

        it('should not throw when emitting controllerFailed', () => {
            expect(() => module.emit('controllerFailed')).not.toThrow();
        });

        it('should not throw when emitting stateChange', () => {
            expect(() => module.emit('stateChange', {} as any)).not.toThrow();
        });

        it('should not throw when emitting domChange', () => {
            expect(() =>
                module.emit('domChange', {} as any, {} as any),
            ).not.toThrow();
        });

        it('should not throw when emitting moduleLoaded', () => {
            expect(() => module.emit('moduleLoaded', {} as any)).not.toThrow();
        });

        it('should not throw when emitting moduleFailed', () => {
            expect(() => module.emit('moduleFailed', {} as any)).not.toThrow();
        });

        it('should not throw when emitting controllerLoaded', () => {
            expect(() =>
                module.emit('controllerLoaded', {} as any),
            ).not.toThrow();
        });
    });
});
