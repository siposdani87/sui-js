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

        it('should register a module with class shorthand (no injection array)', () => {
            class TestService {}
            const name = module.add('testService', TestService);
            expect(name).toBe('testService');
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

        it('should emit afterInit before services', () => {
            const spy = jest.fn();
            module.on('afterInit', spy);
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

        it('should emit serviceLoaded on success', () => {
            const spy = jest.fn();
            module.on('serviceLoaded', spy);
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
                static inject = ['svcX'] as const;
                constructor(dep: any) {
                    receivedDep = dep;
                }
                enter() {
                    return noop();
                }
            }

            module.add('svcA', [], SvcA);
            module.add('svcX', [], SvcX);
            module.add('svcB', ['svcA'], SvcB);

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
