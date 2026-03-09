import { Emitter } from './emitter';

describe('Emitter', () => {
    let emitter: Emitter;

    beforeEach(() => {
        emitter = new Emitter();
    });

    describe('on', () => {
        it('should register a handler', () => {
            const spy = jest.fn();
            emitter.on('test', spy);
            emitter.emit('test');
            expect(spy).toHaveBeenCalled();
        });

        it('should support multiple handlers for the same event', () => {
            const spy1 = jest.fn();
            const spy2 = jest.fn();
            emitter.on('test', spy1);
            emitter.on('test', spy2);
            emitter.emit('test');
            expect(spy1).toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        });
    });

    describe('off', () => {
        it('should remove all handlers for an event', () => {
            const spy = jest.fn();
            emitter.on('test', spy);
            emitter.off('test');
            emitter.emit('test');
            expect(spy).not.toHaveBeenCalled();
        });

        it('should remove a specific handler', () => {
            const spy1 = jest.fn();
            const spy2 = jest.fn();
            emitter.on('test', spy1);
            emitter.on('test', spy2);
            emitter.off('test', spy1);
            emitter.emit('test');
            expect(spy1).not.toHaveBeenCalled();
            expect(spy2).toHaveBeenCalled();
        });

        it('should handle removing a handler that was not registered', () => {
            const spy = jest.fn();
            expect(() => emitter.off('test', spy)).not.toThrow();
        });

        it('should handle removing from an event with no handlers', () => {
            expect(() => emitter.off('nonexistent')).not.toThrow();
        });
    });

    describe('emit', () => {
        it('should pass arguments to handlers', () => {
            const spy = jest.fn();
            emitter.on('test', spy);
            emitter.emit('test', 'a', 42, true);
            expect(spy).toHaveBeenCalledWith('a', 42, true);
        });

        it('should return undefined when no handlers are registered', () => {
            expect(emitter.emit('test')).toBeUndefined();
        });

        it('should return the result of the last handler', () => {
            emitter.on('test', () => 'first');
            emitter.on('test', () => 'second');
            expect(emitter.emit('test')).toBe('second');
        });

        it('should not throw when emitting an event with no handlers', () => {
            expect(() => emitter.emit('nonexistent')).not.toThrow();
        });

        it('should call handlers in registration order', () => {
            const order: number[] = [];
            emitter.on('test', () => order.push(1));
            emitter.on('test', () => order.push(2));
            emitter.on('test', () => order.push(3));
            emitter.emit('test');
            expect(order).toEqual([1, 2, 3]);
        });
    });
});
