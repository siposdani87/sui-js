import { Deferred, Promize, Async } from './core';
import { debounce } from './utils/operation';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Async cleanup and timer management', () => {
    describe('Deferred resolution', () => {
        it('should resolve and call resolve handler', async () => {
            const deferred = new Deferred<string>();
            const spy = jest.fn();

            deferred.promise().then(spy);
            deferred.resolve('done');

            await flushPromises();
            expect(spy).toHaveBeenCalledWith('done');
        });

        it('should reject and call reject handler', async () => {
            const deferred = new Deferred<string, string>();
            const resolveSpy = jest.fn();
            const rejectSpy = jest.fn();

            deferred.promise().then(resolveSpy, rejectSpy);
            deferred.reject('error');

            await flushPromises();
            expect(resolveSpy).not.toHaveBeenCalled();
            expect(rejectSpy).toHaveBeenCalledWith('error');
        });

        it('should handle resolve before then', async () => {
            const deferred = new Deferred<string>();
            deferred.resolve('early');

            const spy = jest.fn();
            deferred.promise().then(spy);
            await flushPromises();
            expect(spy).toHaveBeenCalledWith('early');
        });

        it('should handle reject before then', async () => {
            const deferred = new Deferred<string, string>();
            deferred.reject('early-error');

            const resolveSpy = jest.fn();
            const rejectSpy = jest.fn();
            deferred.promise().then(resolveSpy, rejectSpy);
            await flushPromises();
            expect(rejectSpy).toHaveBeenCalledWith('early-error');
        });

        it('should call complete callback on resolve', async () => {
            const deferred = new Deferred<string>();
            const completeSpy = jest.fn();

            deferred.promise().then(jest.fn(), jest.fn(), completeSpy);
            deferred.resolve('data');

            await flushPromises();
            expect(completeSpy).toHaveBeenCalledWith('data');
        });

        it('should call complete callback on reject', async () => {
            const deferred = new Deferred<string, string>();
            const completeSpy = jest.fn();

            deferred.promise().then(jest.fn(), jest.fn(), completeSpy);
            deferred.reject('err');

            await flushPromises();
            expect(completeSpy).toHaveBeenCalledWith('err');
        });
    });

    describe('Promize chaining', () => {
        it('should defer resolution to another deferred', async () => {
            const deferred1 = new Deferred();
            const deferred2 = new Deferred();
            const spy = jest.fn();

            deferred2.promise().then(spy);
            deferred1.promise().defer(deferred2);
            deferred1.resolve({ value: 'chained' });

            await flushPromises();
            expect(spy).toHaveBeenCalled();
        });

        it('should handle rapid resolve without leaking', async () => {
            for (let i = 1; i <= 100; i++) {
                const deferred = new Deferred<number>();
                const spy = jest.fn();
                deferred.promise().then(spy);
                deferred.resolve(i);
                await flushPromises();
                expect(spy).toHaveBeenCalledWith(i);
            }
        });

        it('should handle rapid reject without leaking', async () => {
            for (let i = 1; i <= 100; i++) {
                const deferred = new Deferred<string, string>();
                const rejectSpy = jest.fn();
                deferred.promise().then(jest.fn(), rejectSpy);
                deferred.reject(`error-${i}`);
                await flushPromises();
                expect(rejectSpy).toHaveBeenCalledWith(`error-${i}`);
            }
        });
    });

    describe('Async serial execution', () => {
        it('should execute functions in order', async () => {
            const async = new Async();
            const order: number[] = [];
            const fns = [
                () => order.push(1),
                () => order.push(2),
                () => order.push(3),
            ];

            async.serial(fns);
            await flushPromises();
            expect(order).toEqual([1, 2, 3]);
        });

        it('should pass args to each function', async () => {
            const async = new Async();
            const spy = jest.fn();
            const fns = [spy, spy];

            async.serial(fns, ['arg1', 'arg2']);
            await flushPromises();
            expect(spy).toHaveBeenCalledTimes(2);
            expect(spy).toHaveBeenCalledWith('arg1', 'arg2');
        });
    });

    describe('Debounce timer cleanup', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('should debounce function calls', () => {
            const spy = jest.fn();
            const debounced = debounce(spy, 100);
            const event = new Event('resize');

            debounced.call(window, event);
            debounced.call(window, event);
            debounced.call(window, event);

            expect(spy).not.toHaveBeenCalled();
            jest.advanceTimersByTime(100);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should cancel previous timer on repeated calls', () => {
            const spy = jest.fn();
            const debounced = debounce(spy, 200);
            const event = new Event('resize');

            debounced.call(window, event);
            jest.advanceTimersByTime(100);
            debounced.call(window, event);
            jest.advanceTimersByTime(100);

            expect(spy).not.toHaveBeenCalled();
            jest.advanceTimersByTime(100);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it('should execute immediately when opt_immediate is true', () => {
            const spy = jest.fn();
            const debounced = debounce(spy, 200, true);
            const event = new Event('resize');

            debounced.call(window, event);
            expect(spy).toHaveBeenCalledTimes(1);

            debounced.call(window, event);
            expect(spy).toHaveBeenCalledTimes(1);

            jest.advanceTimersByTime(200);
            debounced.call(window, event);
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });
});
