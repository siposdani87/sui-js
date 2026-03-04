import { Module } from './module';
import { noop } from '../utils/operation';

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
            const name = module.add('testService', [], class TestService {});
            expect(name).toBe('testService');
        });

        it('should register multiple modules', () => {
            module.add('svcA', [], class A {});
            module.add('svcB', [], class B {});
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

            module.add('svcA', [], SvcA);
            module.add('svcB', [], SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svcA', 'svcB']);

            expect(order).toHaveLength(2);
            expect(order).toContain('A');
            expect(order).toContain('B');
        });

        it('should call eventAfterInit before services', () => {
            const spy = jest.spyOn(module, 'eventAfterInit');
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', [], Svc);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
            expect(spy).toHaveBeenCalled();
        });

        it('should call eventServiceLoaded on success', () => {
            const spy = jest.spyOn(module, 'eventServiceLoaded');
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', [], Svc);
            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
            expect(spy).toHaveBeenCalled();
        });

        it('should call state.run after services loaded', () => {
            const runSpy = jest.fn();
            class Svc {
                enter() {
                    return noop();
                }
            }
            module.add('svc', [], Svc);
            const instances = { state: { run: runSpy } } as any;
            module.load(instances, {});
            module.handleServices(['svc']);
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
                constructor(_svcA: SvcA) {
                    order.push('B');
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', [], SvcA);
            module.add('svcB', ['svcA'], SvcB);

            const instances = { state: { run: jest.fn() } } as any;
            module.load(instances, {});
            // Register in reverse order to verify topological sort
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
                constructor(dep: any) {
                    receivedDep = dep;
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', [], SvcA);
            module.add('svcB', ['svcA'], SvcB);

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

    describe('event methods', () => {
        it('should not throw when calling eventAfterInit', () => {
            expect(() => module.eventAfterInit()).not.toThrow();
        });

        it('should not throw when calling eventServiceLoaded', () => {
            expect(() => module.eventServiceLoaded()).not.toThrow();
        });

        it('should not throw when calling eventServiceFailed', () => {
            expect(() => module.eventServiceFailed()).not.toThrow();
        });

        it('should not throw when calling eventControllerFailed', () => {
            expect(() => module.eventControllerFailed()).not.toThrow();
        });

        it('should return a promise from eventStateChange', () => {
            const result = module.eventStateChange({} as any);
            expect(result).toBeDefined();
            expect(typeof result.then).toBe('function');
        });

        it('should return a promise from eventDomChange', () => {
            const result = module.eventDomChange({} as any, {} as any);
            expect(result).toBeDefined();
            expect(typeof result.then).toBe('function');
        });

        it('should not throw when calling eventModuleLoaded', () => {
            expect(() => module.eventModuleLoaded({} as any)).not.toThrow();
        });

        it('should not throw when calling eventModuleFailed', () => {
            expect(() => module.eventModuleFailed({} as any)).not.toThrow();
        });

        it('should not throw when calling eventControllerLoaded', () => {
            expect(() =>
                module.eventControllerLoaded({} as any),
            ).not.toThrow();
        });
    });
});
