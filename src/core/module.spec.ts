import { Module } from './module';

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
    });

    describe('load', () => {
        it('should set instances and injections', () => {
            const instances = { state: {} } as any;
            const injections = { template: 'template' } as any;
            module.load(instances, injections);

            expect(() => module.getController()).not.toThrow();
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
    });
});
