import { EventBus } from './eventBus';

describe('EventBus', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('should be instance of EventBus', () => {
        expect(eventBus).toBeInstanceOf(EventBus);
    });

    describe('set', () => {
        it('should register a callback', () => {
            const cb = jest.fn();
            const result = eventBus.set('test', cb);
            expect(result).toBe(cb);
        });

        it('should register multiple callbacks for same event', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            eventBus.set('test', cb1);
            eventBus.set('test', cb2);

            const events = eventBus.eventStore.get<Function[]>('test', []);
            expect(events).toHaveLength(2);
        });

        it('should not register non-function values', () => {
            eventBus.set('test', null as any);
            const events = eventBus.eventStore.get<Function[]>('test', []);
            expect(events).toHaveLength(0);
        });
    });

    describe('remove', () => {
        it('should remove a specific callback', () => {
            const cb = jest.fn();
            eventBus.set('test', cb);
            eventBus.remove('test', cb);

            const events = eventBus.eventStore.get<Function[]>('test', []);
            expect(events).toHaveLength(0);
        });

        it('should only remove the specified callback', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            eventBus.set('test', cb1);
            eventBus.set('test', cb2);
            eventBus.remove('test', cb1);

            const events = eventBus.eventStore.get<Function[]>('test', []);
            expect(events).toHaveLength(1);
            expect(events[0]).toBe(cb2);
        });

        it('should handle removing non-existent callback', () => {
            const cb = jest.fn();
            expect(() => eventBus.remove('test', cb)).not.toThrow();
        });
    });

    describe('pop', () => {
        it('should remove last callback', () => {
            const cb1 = jest.fn();
            const cb2 = jest.fn();
            eventBus.set('test', cb1);
            eventBus.set('test', cb2);
            eventBus.pop('test');

            const events = eventBus.eventStore.get<Function[]>('test', []);
            expect(events).toHaveLength(1);
            expect(events[0]).toBe(cb1);
        });

        it('should handle pop on empty event list', () => {
            expect(() => eventBus.pop('empty')).not.toThrow();
        });
    });

    describe('call', () => {
        it('should call registered callbacks', () => {
            const cb = jest.fn();
            eventBus.set('test', cb);
            eventBus.call('test');
            expect(cb).toHaveBeenCalled();
        });

        it('should pass arguments to callbacks', () => {
            const cb = jest.fn();
            eventBus.set('test', cb);
            eventBus.call('test', ['arg1', 'arg2']);
            expect(cb).toHaveBeenCalledWith('arg1', 'arg2');
        });

        it('should call noop for unregistered event', () => {
            expect(() => eventBus.call('unregistered')).not.toThrow();
        });
    });

    describe('override', () => {
        it('should use default callback when no handler set', () => {
            const defaultCb = jest.fn();
            eventBus.override('test', [], defaultCb);
            expect(defaultCb).toHaveBeenCalled();
        });

        it('should use registered handler over default', () => {
            const registeredCb = jest.fn();
            const defaultCb = jest.fn();
            eventBus.set('test', registeredCb);
            eventBus.override('test', ['arg'], defaultCb);
            expect(registeredCb).toHaveBeenCalledWith('arg');
        });
    });
});
