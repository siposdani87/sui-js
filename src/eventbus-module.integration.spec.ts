import { EventBus } from './module/eventBus';

describe('EventBus Module Integration', () => {
    let eventBus: EventBus;

    beforeEach(() => {
        eventBus = new EventBus();
    });

    it('should deliver events between multiple subscribers', () => {
        const results: string[] = [];

        eventBus.set('data:loaded', () => {
            results.push('subscriber-1');
        });
        eventBus.set('data:loaded', () => {
            results.push('subscriber-2');
        });

        eventBus.call('data:loaded');
        expect(results).toEqual(['subscriber-1', 'subscriber-2']);
    });

    it('should preserve delivery order', () => {
        const order: number[] = [];

        eventBus.set('order-test', () => {
            order.push(1);
        });
        eventBus.set('order-test', () => {
            order.push(2);
        });
        eventBus.set('order-test', () => {
            order.push(3);
        });

        eventBus.call('order-test');
        expect(order).toEqual([1, 2, 3]);
    });

    it('should isolate event namespaces', () => {
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        eventBus.set('module:event-a', spy1);
        eventBus.set('module:event-b', spy2);

        eventBus.call('module:event-a');
        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
    });

    it('should handle subscriber removal during event flow', () => {
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        eventBus.set('remove-test', spy1);
        const cb2 = eventBus.set('remove-test', spy2);

        eventBus.remove('remove-test', cb2);
        eventBus.call('remove-test');

        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
    });

    it('should pass arguments to all subscribers', () => {
        const results: any[] = [];

        eventBus.set('with-args', (data: string, count: number) => {
            results.push({ data, count });
        });
        eventBus.set('with-args', (data: string, count: number) => {
            results.push({ data, count, extra: true });
        });

        eventBus.call('with-args', ['hello', 42]);
        expect(results).toEqual([
            { data: 'hello', count: 42 },
            { data: 'hello', count: 42, extra: true },
        ]);
    });

    it('should handle events with no subscribers gracefully', () => {
        expect(() => {
            eventBus.call('no-subscribers');
        }).not.toThrow();
    });

    it('should support multiple independent EventBus instances', () => {
        const eventBus2 = new EventBus();
        const spy1 = jest.fn();
        const spy2 = jest.fn();

        eventBus.set('shared-name', spy1);
        eventBus2.set('shared-name', spy2);

        eventBus.call('shared-name');
        expect(spy1).toHaveBeenCalled();
        expect(spy2).not.toHaveBeenCalled();
    });

    it('should allow re-registering after removal', () => {
        const spy = jest.fn();
        const cb = eventBus.set('reregister', spy);
        eventBus.remove('reregister', cb);

        const spy2 = jest.fn();
        eventBus.set('reregister', spy2);
        eventBus.call('reregister');

        expect(spy).not.toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    it('should use default callback in override when no subscribers', () => {
        const defaultCb = jest.fn();
        eventBus.override('no-override', ['arg1'], defaultCb);
        expect(defaultCb).toHaveBeenCalledWith('arg1');
    });

    it('should call registered callback instead of default in override', () => {
        const defaultCb = jest.fn();
        const registeredCb = jest.fn();

        eventBus.set('has-override', registeredCb);
        eventBus.override('has-override', ['arg1'], defaultCb);

        expect(registeredCb).toHaveBeenCalledWith('arg1');
        expect(defaultCb).not.toHaveBeenCalled();
    });
});
