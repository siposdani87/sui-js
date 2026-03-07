import { Promize } from './promize';
import { Deferred } from './deferred';

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('Promize', () => {
    it('should be instance of Promize', () => {
        const promize = new Promize();
        expect(promize).toBeInstanceOf(Promize);
    });

    describe('resolve', () => {
        it('should resolve with a value and call resolve handler', async () => {
            const promize = new Promize<any>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.then(onResolve, onReject);
            promize.resolve(42 as any);

            await flushPromises();
            expect(onResolve).toHaveBeenCalledWith(42);
            expect(onReject).not.toHaveBeenCalled();
        });

        it('should call then handler when already resolved (pre-resolved)', async () => {
            const promize = new Promize<number>();
            const onResolve = jest.fn();

            promize.resolve(10);
            promize.then(onResolve);

            await flushPromises();
            expect(onResolve).toHaveBeenCalledWith(10);
        });
    });

    describe('reject', () => {
        it('should reject with a reason and call reject handler', async () => {
            const promize = new Promize();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.then(onResolve, onReject);
            promize.reject('error' as any);

            await flushPromises();
            expect(onReject).toHaveBeenCalledWith('error');
            expect(onResolve).not.toHaveBeenCalled();
        });

        it('should call reject handler when already rejected (pre-rejected)', async () => {
            const promize = new Promize<number, string>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.reject('fail' as any);
            promize.then(onResolve, onReject);

            await flushPromises();
            expect(onReject).toHaveBeenCalledWith('fail');
            expect(onResolve).not.toHaveBeenCalled();
        });
    });

    describe('complete handler', () => {
        it('should call complete handler after resolve', async () => {
            const promize = new Promize<number>();
            const onResolve = jest.fn();
            const onComplete = jest.fn();

            promize.then(onResolve, jest.fn(), onComplete);
            promize.resolve(7);

            await flushPromises();
            expect(onResolve).toHaveBeenCalledWith(7);
            expect(onComplete).toHaveBeenCalledWith(7);
        });

        it('should call complete handler after reject', async () => {
            const promize = new Promize<number, number>();
            const onReject = jest.fn();
            const onComplete = jest.fn();

            promize.then(jest.fn(), onReject, onComplete);
            promize.reject(9);

            await flushPromises();
            expect(onReject).toHaveBeenCalledWith(9);
            expect(onComplete).toHaveBeenCalledWith(9);
        });
    });

    describe('defer', () => {
        it('should defer resolution to another Deferred', async () => {
            const promize = new Promize();
            const deferred = new Deferred();
            const onResolve = jest.fn();

            deferred.promise().then(onResolve);
            promize.defer(deferred as any);
            promize.resolve(99 as any);

            await flushPromises();
            expect(onResolve).toHaveBeenCalled();
        });
    });

    describe('settle-once semantics', () => {
        it('should ignore second resolve', async () => {
            const promize = new Promize<number>();
            const onResolve = jest.fn();

            promize.then(onResolve);
            promize.resolve(1);
            promize.resolve(2);

            await flushPromises();
            expect(onResolve).toHaveBeenCalledTimes(1);
            expect(onResolve).toHaveBeenCalledWith(1);
        });

        it('should ignore reject after resolve', async () => {
            const promize = new Promize<number, number>();
            const onResolve = jest.fn();
            const onReject = jest.fn();

            promize.then(onResolve, onReject);
            promize.resolve(1);
            promize.reject(2);

            await flushPromises();
            expect(onResolve).toHaveBeenCalledWith(1);
            expect(onReject).not.toHaveBeenCalled();
        });
    });
});
