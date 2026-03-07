import { Async } from './async';
import { Deferred } from './deferred';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Async', () => {
    it('should instantiate', () => {
        const async = new Async();
        expect(async).toBeInstanceOf(Async);
    });

    describe('parallel', () => {
        it('should resolve for empty calls', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            async.parallel([]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
        });

        it('should execute parallel calls and collect results', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call1 = () => {
                const d = new Deferred<string>();
                d.resolve('a');
                return d.promise();
            };
            const call2 = () => {
                const d = new Deferred<string>();
                d.resolve('b');
                return d.promise();
            };

            async.parallel([call1, call2]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
            const args = onResolve.mock.calls[0];
            expect(args).toContain('a');
            expect(args).toContain('b');
        });

        it('should handle single call', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => {
                const d = new Deferred<number>();
                d.resolve(42);
                return d.promise();
            };

            async.parallel([call]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
            expect(onResolve.mock.calls[0]).toContain(42);
        });

        it('should track error state when a call fails', async () => {
            const async = new Async();

            const call = () => {
                const d = new Deferred();
                d.reject('error' as any);
                return d.promise();
            };

            async.parallel([call]);

            await flushPromises();
            // After the call completes with error, call state is cleared
            expect(async.call.isError).toBe(false);
        });

        it('should handle sync calls that return undefined', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => undefined;

            async.parallel([call]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
        });
    });

    describe('serial', () => {
        it('should resolve for empty calls', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            async.serial([]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
        });

        it('should execute serial calls in order', async () => {
            const async = new Async();
            const onResolve = jest.fn();
            const order: number[] = [];

            const call1 = () => {
                order.push(1);
                const d = new Deferred<string>();
                d.resolve('first');
                return d.promise();
            };
            const call2 = () => {
                order.push(2);
                const d = new Deferred<string>();
                d.resolve('second');
                return d.promise();
            };

            async.serial([call1, call2]).then(onResolve);

            await flushPromises();
            expect(order).toEqual([1, 2]);
            expect(onResolve).toHaveBeenCalled();
        });

        it('should reject when a serial call fails', async () => {
            const async = new Async();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            const call1 = () => {
                const d = new Deferred();
                d.reject('fail' as any);
                return d.promise();
            };
            const call2 = jest.fn();

            async.serial([call1, call2]).then(onResolve, onReject);

            await flushPromises();
            expect(onReject).toHaveBeenCalled();
            expect(call2).not.toHaveBeenCalled();
        });

        it('should handle sync calls returning undefined', async () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => undefined;

            async.serial([call]).then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
        });
    });

    describe('setStatus', () => {
        it('should set call status fields', () => {
            const async = new Async();
            async.setStatus(5, true, 3, ['a', 'b']);

            expect(async.call.sum).toBe(5);
            expect(async.call.isError).toBe(true);
            expect(async.call.counter).toBe(3);
            expect(async.call.results).toEqual(['a', 'b']);
        });
    });
});
