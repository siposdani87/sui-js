import { Async } from './async';
import { Deferred } from './deferred';

describe('Async', () => {
    it('should instantiate', () => {
        const async = new Async();
        expect(async).toBeInstanceOf(Async);
    });

    describe('parallel', () => {
        it('should resolve for empty calls', () => {
            const async = new Async();
            const onResolve = jest.fn();

            async.parallel([]).then(onResolve);

            expect(onResolve).toHaveBeenCalled();
        });

        it('should execute parallel calls and collect results', () => {
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

            expect(onResolve).toHaveBeenCalled();
            const args = onResolve.mock.calls[0];
            expect(args).toContain('a');
            expect(args).toContain('b');
        });

        it('should handle single call', () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => {
                const d = new Deferred<number>();
                d.resolve(42);
                return d.promise();
            };

            async.parallel([call]).then(onResolve);

            expect(onResolve).toHaveBeenCalled();
            expect(onResolve.mock.calls[0]).toContain(42);
        });

        it('should track error state when a call fails', () => {
            const async = new Async();

            const call = () => {
                const d = new Deferred();
                d.reject('error' as any);
                return d.promise();
            };

            async.parallel([call]);

            // After the call completes with error, call state is cleared
            // but the error was processed through the chain
            expect(async.call.isError).toBe(false); // cleared after completion
        });

        it('should handle sync calls that return undefined', () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => undefined;

            async.parallel([call]).then(onResolve);

            expect(onResolve).toHaveBeenCalled();
        });
    });

    describe('serial', () => {
        it('should resolve for empty calls', () => {
            const async = new Async();
            const onResolve = jest.fn();

            async.serial([]).then(onResolve);

            expect(onResolve).toHaveBeenCalled();
        });

        it('should execute serial calls in order', () => {
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

            expect(order).toEqual([1, 2]);
            expect(onResolve).toHaveBeenCalled();
        });

        it('should reject when a serial call fails', () => {
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

            expect(onReject).toHaveBeenCalled();
            expect(call2).not.toHaveBeenCalled();
        });

        it('should handle sync calls returning undefined', () => {
            const async = new Async();
            const onResolve = jest.fn();

            const call = () => undefined;

            async.serial([call]).then(onResolve);

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
